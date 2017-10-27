package com.yoxiang.manager.impl;

import com.yoxiang.common.ApplicationContextHelper;
import com.yoxiang.manager.PropertiesManager;
import com.yoxiang.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.MissingResourceException;
import java.util.ResourceBundle;

/**
 * Author: Rivers
 * Date: 2017/10/27 09:50
 */
@Service("propertiesManager")
public class PropertiesManagerImpl implements PropertiesManager {

    private static final Logger log = LoggerFactory.getLogger(PropertiesManagerImpl.class);

    @Autowired
    private ApplicationContextHelper contextHelper;

    private static final String PROPERTY_FILE_PRODUCTION_NAME = "system_production";
    private static final String PROPERTY_FILE_DEELOP_NAME = "system_develop";

    private ResourceBundle resourceBundle;

    /**
     * 加载Properties文件
     * @return
     */
    public ResourceBundle loadProfileProperties() {

        if (resourceBundle == null) {
            Environment env = contextHelper.getApplicationContext().getEnvironment();
            if (env.containsProperty("spring.profiles.active")) {
                if ("production".equalsIgnoreCase(env.getProperty("spring.profiles.active"))) {
                    return resourceBundle = ResourceBundle.getBundle(PROPERTY_FILE_PRODUCTION_NAME);
                }
                return resourceBundle = ResourceBundle.getBundle(PROPERTY_FILE_DEELOP_NAME);
            }

            log.info(">>>>>>Not Configure Active Profile in web.xml,then choose the default properties to load");
            return resourceBundle = ResourceBundle.getBundle(PROPERTY_FILE_DEELOP_NAME);
        }

        return resourceBundle;
    }

    /**
     * 根据key获取对应值
     * @param key
     * @return
     */
    private String getProperty(String key) {

        resourceBundle = loadProfileProperties();

        if (StringUtils.isEmpty(key)) {
            return "";
        }
        String result = "";
        try {
            result = resourceBundle.getString(key);
        } catch (MissingResourceException e) {
            e.printStackTrace();
        }
        return result;
    }

    // ====================== 获取property值

    /**微信模块*/
    private static final String WX_MP_APPID = "WX_MP_APPID";
    private static final String WX_MP_APPSECRET = "WX_MP_APPSECRET";
    private static final String WX_MP_INIT_TOKEN = "WX_MP_INIT_TOKEN";

    @Override
    public String getWechatMpAppId() {
        return getProperty(WX_MP_APPID);
    }

    @Override
    public String getWechatMpAppSecret() {
        return getProperty(WX_MP_APPSECRET);
    }

    @Override
    public String getWechatMpInitToken() {
        return getProperty(WX_MP_INIT_TOKEN);
    }

    /**
     * 容联云相关配置信息
     */
    // 容联云账号ID
    private static final String CCP_ACCOUNT_SID = "CCP_ACCOUNT_SID";
    // 容联云账号token
    private static final String CCP_ACCOUNT_TOKEN = "CCP_ACCOUNT_TOKEN";
    // 容联云App ID
    private static final String CCP_APPID = "CCP_APPID";
    // 容联云服务器地址
    private static final String CCP_SERVICE_IP = "CCP_SERVICE_IP";
    // 容联云服务器端口
    private static final String CCP_SERVICE_PORT = "CCP_SERVICE_PORT";
    // 容联云短信模板ID
    private static final String CCP_SMS_TEMPLATE_ID = "CCP_SMS_TEMPLATE_ID";
    // 注册通知消息模板ID
    private static final String CCP_SMS_REGISTER_NOTICE_TEMPLATE_ID = "CCP_SMS_REGISTER_NOTICE_TEMPLATE_ID";

    @Override
    public String getCcpAccountSid() {
        return getProperty(CCP_ACCOUNT_SID);
    }

    @Override
    public String getCcpAccountToken() {
        return getProperty(CCP_ACCOUNT_TOKEN);
    }

    @Override
    public String getCcpAppid() {
        return getProperty(CCP_APPID);
    }

    @Override
    public String getCcpServiceIp() {
        return getProperty(CCP_SERVICE_IP);
    }

    @Override
    public String getCcpServicePort() {
        return getProperty(CCP_SERVICE_PORT);
    }

    @Override
    public String getCcpSmsTemplateId() {
        return getProperty(CCP_SMS_TEMPLATE_ID);
    }

    @Override
    public String getCcpSmsRegisterNoticeTemplateId() {
        return getProperty(CCP_SMS_REGISTER_NOTICE_TEMPLATE_ID);
    }

    /**
     * 七牛云存储相关账号信息
     */

    private static final String QINIU_ACCESS_KEY = "QINIU_ACCESS_KEY";
    private static final String QINIU_SECRET_KEY = "QINIU_SECRET_KEY";
    /**
     * 七牛OSS外链默认域名
     */
    private static final String QINIU_DOCTOR_OSS_URL = "QINIU_DOCTOR_OSS_URL";
    private static final String QINIU_OSS_BUCKET_NAME = "QINIU_OSS_BUCKET_NAME";

    @Override
    public String getQiNiuAccessKey() {
        return getProperty(QINIU_ACCESS_KEY);
    }

    @Override
    public String getQiNiuSecretKey() {
        return getProperty(QINIU_SECRET_KEY);
    }

    @Override
    public String getQiNiuDoctorOssUrl() {
        return getProperty(QINIU_DOCTOR_OSS_URL);
    }

    @Override
    public String getQiNiuBucketName() {
        return getProperty(QINIU_OSS_BUCKET_NAME);
    }
}
