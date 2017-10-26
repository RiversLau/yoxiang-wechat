package com.yoxiang.manager.impl;

import com.yoxiang.common.enums.VerifyCodeType;
import com.yoxiang.manager.UserManager;
import com.yoxiang.manager.VerifyCodeManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Author: RiversLau
 * Date: 2017/10/26 19:06
 */
@Service("verifyCodeManager")
public class VerifyCodeManagerImpl implements VerifyCodeManager {

    @Autowired
    private UserManager userManager;

    public String pushVerifyCode(String phone, VerifyCodeType type) {

        // 如果是注册，则判断手机号是否已经注册或者已申请
        if (VerifyCodeType.doctor_register.equals(type)) {
            boolean flag = userManager.isPhoneRegistered(phone);
        }

        return "";
    }
}
