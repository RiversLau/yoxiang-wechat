package com.yoxiang.common.interceptors;

import com.alibaba.fastjson.JSONObject;
import com.yoxiang.common.PropertiesHelper;
import com.yoxiang.controller.BaseCtrl;
import com.yoxiang.controller.UserCtrl;
import com.yoxiang.manager.PropertiesManager;
import com.yoxiang.manager.UserApplyManager;
import com.yoxiang.manager.UserManager;
import com.yoxiang.utils.StringUtils;
import com.yoxiang.utils.WechatHttpUtils;
import com.yoxiang.vo.UserApplyVO;
import com.yoxiang.vo.UserVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Map;

/**
 * Author: RiversLau
 * Date: 2017/10/18 14:02
 */
public class WechatOpenidInterceptor extends HandlerInterceptorAdapter {

    private String USER_AGENT = "User-Agent";
    private static String MICROMESSENGER = "micromessenger";
    private String TURN_URL = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";

    private static final Logger logger = LoggerFactory.getLogger(WechatOpenidInterceptor.class);

    @Autowired
    private UserManager userManager;
    @Autowired
    private UserApplyManager userApplyManager;
    @Autowired
    private PropertiesManager propertiesManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        logger.info("=========================================================================");
        logger.info("请求IP:" + request.getHeader("X-Real-IP") + ";" + request.getRequestURI());
        logger.info("请求Open_id:" + request.getSession().getAttribute(UserCtrl.OPEN_ID));
        logger.info("请求Doctor_user_id:" + request.getSession().getAttribute(UserCtrl.DOCTOR_USER_ID));
        logger.info("请求浏览器：" + request.getHeader(USER_AGENT));

        Map<String, String[]> paramMap = request.getParameterMap();
        for (Iterator<String> iter = paramMap.keySet().iterator(); iter.hasNext(); ) {
            String strKey = iter.next();
            Object strObj = request.getParameter(strKey);
            logger.info("请求参数:" + strKey + "-->>" + strObj);
        }
        logger.info("=========================================================================");

        String wechat_app_id = PropertiesHelper.getWechatAppId();

        if (handler.getClass().isAssignableFrom(HandlerMethod.class)) {

            Authc authEnum = ((HandlerMethod) handler).getMethodAnnotation(Authc.class);
            if (authEnum == null) {
                return true;
            } else {

                String DOMAIN = propertiesManager.getContextPath();
                HttpSession session = request.getSession();
                String userAgent = request.getHeader(USER_AGENT);
                boolean is_weixin = (userAgent != null && userAgent.toLowerCase().contains(MICROMESSENGER));
                session.setAttribute(BaseCtrl.OPEN_IN_WEIXIN, is_weixin ? "1" : "0");

                // 如果是微信浏览器，则获取open_id放入session中
                if (is_weixin) {

                    logger.info("微信浏览器打开的链接。。。。。。。");

                    String open_id = String.valueOf(session.getAttribute(UserCtrl.OPEN_ID));
                    String doctor_user_id = String.valueOf(session.getAttribute(UserCtrl.DOCTOR_USER_ID));

                    logger.info("open_id:" + open_id + ";doctor_user_id:" + doctor_user_id);

                    if (StringUtils.isEmptyOrNull(open_id)) {

                        String code = request.getParameter("code");
                        String mark = request.getParameter("mark");

                        // 通过组织url重定向到微信获取open_id
                        if (!StringUtils.isEmpty(code) && !StringUtils.isEmpty(mark)) {
                            open_id = getOpenId(code);

                            if (!StringUtils.isEmpty(open_id)) {

                                session.setAttribute(UserCtrl.OPEN_ID, open_id);  // 将open_id 放入session

                                UserVO user = userManager.getUserByOpenId(open_id);
                                if (user != null) {     // 该openid已注册为认证用户
                                    session.setAttribute(BaseCtrl.DOCTOR_USER_ID, user.getId());
                                    session.setAttribute(BaseCtrl.BINDING_PHONE, user.getPhone());
                                } else {    // 未认证，需要跳转到对应的页面
                                    UserApplyVO apply = userApplyManager.getNotDeletedByOpenid(open_id);
                                    if (apply != null) {
                                        logger.info("已注册申请，跳转到注册信息页面。。。。。。。。。");
                                        String forwordUrl = DOMAIN + "/user/register/info";
                                        response.sendRedirect(forwordUrl);
                                        return false;
                                    } else {    // 不存在申请，跳转到注册页面
                                        logger.info("尚未注册申请，跳转到注册页面。。。。。。。。。");
                                        String forwordUrl = DOMAIN + "/user/register";
                                        response.sendRedirect(forwordUrl);
                                        return false;
                                    }
                                }
                                return true;

                            } else {
                                return false;
                            }

                        } else if (!StringUtils.isEmpty(code) && StringUtils.isEmpty(mark)) {

                            String uri = DOMAIN + request.getRequestURI();
                            String params = request.getQueryString() == null ? "?mark=yes" : "?"
                                    + request.getQueryString() + "&mark=yes";
                            String url = uri + params;

                            response.sendRedirect(url);

                            return false;
                        } else if (StringUtils.isEmpty(mark)) {

                            String uri = DOMAIN + request.getRequestURI();
                            String params = request.getQueryString() == null ? "" : "?"
                                    + request.getQueryString();

                            String url = uri + params;

                            String forwordUrl = String.format(TURN_URL, wechat_app_id, URLEncoder.encode(url, "UTF-8"));

                            logger.info("重定向地址：" + forwordUrl);
                            response.sendRedirect(forwordUrl);
                            return false;
                        } else {
                            return false;
                        }
                    } else {
                        if (StringUtils.isEmptyOrNull(doctor_user_id)) {
                            UserVO user = userManager.getUserByOpenId(open_id);
                            if (user != null) {
                                session.setAttribute(BaseCtrl.DOCTOR_USER_ID, user.getId());
                                session.setAttribute(BaseCtrl.BINDING_PHONE, user.getPhone());
                            } else {
                                UserApplyVO apply = userApplyManager.getNotDeletedByOpenid(open_id);
                                if (apply != null) {
                                    String forwordUrl = DOMAIN + "/user/register/info";
                                    response.sendRedirect(forwordUrl);
                                    return false;
                                } else {    // 不存在申请，跳转到注册页面
                                    String forwordUrl = DOMAIN + "/user/register";
                                    response.sendRedirect(forwordUrl);
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                } else {
                    logger.info("普通浏览器打开的链接。。。。。。。");

                    // 非微信浏览器的处理
                    String forwordUrl = DOMAIN + "/error/open_in_weixin.html";
                    response.sendRedirect(forwordUrl);
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 若为微信浏览器，则注册页面事件
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response,
                           Object handler, ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }

    /**
     * 获取openid
     * @param code
     * @return
     * @throws Exception
     */
    private String getOpenId(String code) throws Exception {

        StringBuilder urlBuilder = new StringBuilder();
        urlBuilder.append("https://api.weixin.qq.com/sns/oauth2/access_token?appid=");
        urlBuilder.append(PropertiesHelper.getWechatAppId());
        urlBuilder.append("&secret=");
        urlBuilder.append(PropertiesHelper.getWechatAppSecrect());
        urlBuilder.append("&code=");
        urlBuilder.append(code);
        urlBuilder.append("&grant_type=authorization_code");

        String jsonStr = WechatHttpUtils.doGet(urlBuilder.toString());
        JSONObject json = JSONObject.parseObject(jsonStr);
        return json.getString("openid");
    }
}
