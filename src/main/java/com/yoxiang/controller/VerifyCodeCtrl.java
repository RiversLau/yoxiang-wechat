package com.yoxiang.controller;

import com.yoxiang.common.enums.VerifyCodeType;
import com.yoxiang.manager.VerifyCodeManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

/**
 * 推送二维码
 * Author: RiversLau
 * Date: 2017/7/11 11:52
 */
@Controller
@RequestMapping("/vcode")
public class VerifyCodeCtrl extends BaseCtrl {

    @Autowired
    private VerifyCodeManager verifyCodeManager;

    /**
     * 验证推送接口
     * @param params 手机号与验证码类型
     * @return
     */
    @RequestMapping(value = "/push", method = RequestMethod.POST)
    public ModelAndView generateVCode(@RequestBody Map<String, String> params) {

        String phone = params.get("phone");
        String type = params.get("type");

        String responseMsg = verifyCodeManager.pushVerifyCode(phone, VerifyCodeType.valueOf(type));

        ModelAndView mv = new ModelAndView();
        mv.addObject("errCode", 0);
        mv.addObject("errMsg", responseMsg);
        return mv;
    }
}
