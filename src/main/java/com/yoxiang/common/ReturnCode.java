package com.yoxiang.common;

import java.util.HashMap;
import java.util.Map;

/**
 * Author: Rivers
 * Date: 2017/10/27 09:05
 */
public class ReturnCode {

    private static final Map<Integer, String> msgMap = new HashMap<Integer, String>();

    public static final Integer SUCCESS = 0;
    public static final Integer SYSTEM_EXCEPTION = -1;

    /**手机号格式错误*/
    public static final Integer PHONE_FORMAT_ERROR = 300000;
    /**手机号已注册*/
    public static final Integer PHONE_ALREADY_REGISTERED = 300001;
    /**手机号暂未注册*/
    public static final Integer PHONE_NOT_REGISTER = 300002;
    /**验证获取太频繁*/
    public static final Integer VCODE_PUSH_TOO_OFTEN = 300003;
    /**手机号与验证码不匹配*/
    public static final Integer PHONE_VCODE_NOT_MATCH = 300004;

    /**密码格式错误*/
    public static final Integer PASSWORD_FORMAT_ERROR = 310000;
    /**姓名格式错误*/
    public static final Integer NAME_FORMAT_ERROR = 310001;
    /**资质证书错误*/
    public static final Integer CERTIMG_FORMAT_ERROR = 310002;

    static {
        msgMap.put(SUCCESS, "操作成功");
        msgMap.put(SYSTEM_EXCEPTION, "系统异常");

        msgMap.put(PHONE_FORMAT_ERROR, "手机号格式错误");
        msgMap.put(PHONE_ALREADY_REGISTERED, "手机号已注册");
        msgMap.put(PHONE_NOT_REGISTER, "手机号暂未注册");
        msgMap.put(VCODE_PUSH_TOO_OFTEN, "验证获取太频繁");
        msgMap.put(PHONE_VCODE_NOT_MATCH, "手机号与验证码不匹配");

        msgMap.put(PASSWORD_FORMAT_ERROR, "密码格式错误");
        msgMap.put(NAME_FORMAT_ERROR, "姓名错误");
        msgMap.put(CERTIMG_FORMAT_ERROR, "证书、证件错误");
    }

    public static String getErrMsg(Integer code) {
        return msgMap.get(code);
    }
}
