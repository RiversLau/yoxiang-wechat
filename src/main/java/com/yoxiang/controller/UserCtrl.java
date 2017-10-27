package com.yoxiang.controller;

import com.yoxiang.common.PropertiesHelper;
import com.yoxiang.common.ReturnCode;
import com.yoxiang.common.enums.DoctorType;
import com.yoxiang.common.interceptors.Authc;
import com.yoxiang.manager.AreaManager;
import com.yoxiang.manager.TitleManager;
import com.yoxiang.manager.UserApplyManager;
import com.yoxiang.utils.QiniuUtil;
import com.yoxiang.vo.AreaVO;
import com.yoxiang.vo.TitleVO;
import com.yoxiang.vo.UserApplyVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Author: RiversLau
 * Date: 2017/10/26 10:24
 */
@Controller
@RequestMapping("/user")
public class UserCtrl extends BaseCtrl {

    @Autowired
    private AreaManager areaManager;
    @Autowired
    private TitleManager titleManager;
    @Autowired
    private UserApplyManager userApplyManager;

    /**
     * 用户个人信息
     * @param request
     * @return
     */
    @Authc(needOpenid = true)
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public String userInfo(HttpServletRequest request) {
        System.out.println(request.getSession().getAttribute(OPEN_ID));
        return "/user/user_info";
    }

    /**
     * 注册页面
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String register(HttpServletRequest request) {

        List<AreaVO> areaList = areaManager.getList(null);

        List<TitleVO> doctorTitles = titleManager.getEnabledListByType(DoctorType.DOCTOR);
        List<TitleVO> therapistTitles = titleManager.getEnabledListByType(DoctorType.THERAPIST);

        String accessKey = PropertiesHelper.getQiniuAccessKey();
        String secretKey = PropertiesHelper.getQiniuSecretKey();
        String bucketName = PropertiesHelper.getBucketName();

        String token = QiniuUtil.getUploadToken(accessKey, secretKey, bucketName);

        request.setAttribute("uptoken", token);
        request.setAttribute("areaList", areaList);
        request.setAttribute("doctorTitles", doctorTitles);
        request.setAttribute("therapistTitles", therapistTitles);
        return "user/user_register";
    }

    /**
     * 用户注册
     * @return
     */
    @Authc(needOpenid = true)
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ModelAndView saveRegisterUser(UserApplyVO apply, HttpServletRequest request) {

        String openId = String.valueOf(request.getSession().getAttribute(OPEN_ID));
        apply.setOpenid(openId);
        Integer errCode = userApplyManager.saveUserApply(apply);

        ModelAndView mv = new ModelAndView(new MappingJackson2JsonView());
        mv.addObject("returnCode", errCode);
        if (errCode != ReturnCode.SUCCESS) {
            mv.addObject("errMsg", ReturnCode.getErrMsg(errCode));
        }
        return mv;
    }

    /**
     * 获取用户注册信息
     * @param request
     * @return
     */
    @Authc(needOpenid = true)
    @RequestMapping(value = "/register/info", method = RequestMethod.GET)
    public String registerInfo(HttpServletRequest request) {

        String openId = String.valueOf(request.getSession().getAttribute(OPEN_ID));

        return "user/user_apply_waiting";
    }
}
