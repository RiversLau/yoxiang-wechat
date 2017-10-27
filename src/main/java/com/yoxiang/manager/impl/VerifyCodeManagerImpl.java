package com.yoxiang.manager.impl;

import com.yoxiang.common.ReturnCode;
import com.yoxiang.common.enums.VerifyCodeType;
import com.yoxiang.manager.PropertiesManager;
import com.yoxiang.manager.ThreadManager;
import com.yoxiang.manager.UserManager;
import com.yoxiang.manager.VerifyCodeManager;
import com.yoxiang.utils.StringUtils;
import com.yoxiang.utils.VCodeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

/**
 * Author: RiversLau
 * Date: 2017/10/26 19:06
 */
@Service("verifyCodeManager")
public class VerifyCodeManagerImpl implements VerifyCodeManager {

    private static final Logger log = LoggerFactory.getLogger(VerifyCodeManagerImpl.class);

    @Autowired
    private JedisPool jedisPool;
    @Autowired
    private UserManager userManager;
    @Autowired
    private ThreadManager threadManager;
    @Autowired
    private PropertiesManager propertiesManager;

    /**
     * 推送手机验证码
     * 验证码存储于Redis，30分钟内获取超过3次提示太频繁
     * @param phone 手机号
     * @param type 手机号验证码用途类型
     * @return
     */
    public Integer pushVerifyCode(String phone, VerifyCodeType type) {

        Integer errCode;
        boolean flag = userManager.isPhoneRegistered(phone);
        // 如果是注册，则判断手机号是否已经注册或者已申请
        if (VerifyCodeType.doctor_register.equals(type) ||
                VerifyCodeType.doctor_unbind.equals(type)) {
            errCode = flag ? ReturnCode.PHONE_ALREADY_REGISTERED : ReturnCode.SUCCESS;
        } else if (VerifyCodeType.forget_password.equals(type)) {
            errCode = flag ? ReturnCode.SUCCESS : ReturnCode.PHONE_NOT_REGISTER;
        } else {
            errCode = ReturnCode.SUCCESS;
        }

        if (errCode == ReturnCode.SUCCESS) {
            // 查看缓存中该手机号验证码次数是否已经超出最大限制
            final String numKey = VERIFY_CODE_NUM_KEY + phone;

            Jedis conn = null;
            try {
                conn = jedisPool.getResource();
                String vcodeNumValue = conn.get(numKey);

                if (StringUtils.isEmpty(vcodeNumValue) || VERIFY_CODE_MAX_NUM > Integer.parseInt(vcodeNumValue)) {
                    String vcode = VCodeUtil.generateVCode(true, 6);
                    log.info(">>>>>>>>>>>>> 手机号==" + phone + "，验证码==" + vcode);

                    conn.setex(phone, getVerifyCodeValidTime() * 60, vcode);
                    conn.incr(numKey);
                    conn.expire(numKey, getVerifyCodeValidTime() * 60);

                    // 另起线程发送短信验证码
                    String templateIds = propertiesManager.getCcpSmsTemplateId();
                    String[] tidList = templateIds.split(",|;");
                    threadManager.sendSMS(phone, new String[]{vcode, getVerifyCodeValidTime().toString()}, tidList);

                    errCode = ReturnCode.SUCCESS;
                } else {
                    errCode = ReturnCode.VCODE_PUSH_TOO_OFTEN;
                }
            } finally {
                if (conn != null) {
                    conn.close();
                }
            }
        }

        return errCode;
    }

    /**
     * 判断手机验证码有效性，有效返回true，无效返回false
     *
     * @param phone 手机号码
     * @param code  验证码
     * @return
     */
    @Override
    public boolean isValidCode(String phone, String code) {

        boolean flag = false;

        Jedis conn = null;
        String value;
        try {
            conn = jedisPool.getResource();
            value = conn.get(phone);
        } finally {
            if (conn != null) {
                conn.close();
            }
        }

        if (!org.apache.commons.lang3.StringUtils.isEmpty(value) && value.equals(code)) {
            flag = true;
        }
        return flag;
    }

    /**
     * 获取验证码有效时间
     *
     * @return
     */
    @Override
    public Integer getVerifyCodeValidTime() {

        return VERIFY_CODE_VALID_TIME;
    }

    /**
     * 删除手机验证码，逻辑删除，标记为已用
     * 从Redis中移除
     */
    @Override
    public void deleteVerifyCode(String phone) {

        Jedis conn = null;
        try {
            conn = jedisPool.getResource();
            Long result = conn.del(phone);
            log.info(result == 1 ? "删除Key成功" : "删除Key失败");
        } finally {
            if (conn != null) {
                conn.close();
            }
        }
    }
}
