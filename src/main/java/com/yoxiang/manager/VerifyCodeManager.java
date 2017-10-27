package com.yoxiang.manager;

import com.yoxiang.common.enums.VerifyCodeType;

/**
 * Author: RiversLau
 * Date: 2017/10/26 19:06
 */
public interface VerifyCodeManager {

    /**
     * 验证码默认有效时间，单位分钟
     */
    int VERIFY_CODE_VALID_TIME = 5;

    /**
     * 手机验证码次数Key前缀
     */
    String VERIFY_CODE_NUM_KEY = "vcodeNum:";

    /**
     * 手机验证码一段时间内最多获取次数
     */
    int VERIFY_CODE_MAX_NUM = 3;

    /**
     * 验证码推送
     * @param phone 手机号
     * @param verifyCodeType 验证码用途类型
     * @return 业务状态码
     */
    Integer pushVerifyCode(String phone, VerifyCodeType verifyCodeType);

    /**
     * 验证手机与对应验证码是否有效
     * @param phone 手机号码
     * @param code 验证码
     * @return
     */
    boolean isValidCode(String phone, String code);

    /**
     * 获取验证有效时间，如果配置文件未配置，则给定系统默认5分钟
     * @return
     */
    Integer getVerifyCodeValidTime();

    /**
     * 删除验证码，逻辑删除，标记为已使用
     * 从Redis中移除
     * @param phone
     */
    void deleteVerifyCode(String phone);
}
