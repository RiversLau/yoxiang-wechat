package com.yoxiang.controller;

import com.yoxiang.utils.WechatSignatureUtil;
import lombok.extern.log4j.Log4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;

/**
 * Author: Rivers
 * Date: 2017/6/29 10:45
 */
@Log4j
@Controller
@RequestMapping("/wx/mp")
public class WechatMsgCtrl extends BaseCtrl {

    private static final String TRUST_REFERER = "rrdkf.com";

    /**
     * 微信服务器验证开发者的接口
     * @param request
     * @param response
     * @throws IOException
     */
    @RequestMapping(value = "/msg", method = RequestMethod.GET)
    public void responseEchostrGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        log.info("》》》》》》微信发送过来的信息：request method = GET");

        String signature = request.getParameter("signature");// 微信加密签名

        String timestamp = request.getParameter("timestamp");// 时间戳
        String nonce = request.getParameter("nonce");// 随机数
        String echostr = request.getParameter("echostr");// 随机字符串

        String token = "yoxiang35yoxiang";
        String echoSignature = WechatSignatureUtil.generateInitCheckSignature(timestamp, nonce, token);

        //两者签名相同，验证开发者成功，将微信发送过来的echostr返回给微信服务器
        if (echoSignature != null && echoSignature.equals(signature)) {
            Writer out = response.getWriter();
            out.write(echostr);// 请求验证成功，返回随机码
            out.flush();
            out.close();

            log.info("》》》》》》开发者认真信息认证通过《《《《《《");
        }
    }
}
