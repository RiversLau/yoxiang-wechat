package com.yoxiang.manager;

import com.yoxiang.common.enums.VerifyCodeType;

/**
 * Author: RiversLau
 * Date: 2017/10/26 19:06
 */
public interface VerifyCodeManager {

    String pushVerifyCode(String phone, VerifyCodeType verifyCodeType);
}
