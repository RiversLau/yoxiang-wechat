package com.yoxiang.controller;

import com.yoxiang.common.ReturnCode;
import com.yoxiang.common.enums.VerifyCodeType;
import com.yoxiang.manager.VerifyCodeManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

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
     * @param phone 手机号
     * @param type 验证过用途类型
     * @return
     */
    @RequestMapping(value = "/push", method = RequestMethod.POST)
    public ModelAndView generateVCode(@RequestParam(value = "phone") String phone,
                                      @RequestParam(value = "type") String type) {

        Integer errCode = verifyCodeManager.pushVerifyCode(phone, VerifyCodeType.valueOf(type));

        ModelAndView mv = new ModelAndView(new MappingJackson2JsonView());
        mv.addObject("returnCode", errCode);
        if (errCode != ReturnCode.SUCCESS) {
            mv.addObject("errMsg", ReturnCode.getErrMsg(errCode));
        }
        return mv;
    }
}
