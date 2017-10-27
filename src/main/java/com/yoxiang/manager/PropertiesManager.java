package com.yoxiang.manager;

/**
 * Author: Rivers
 * Date: 2017/10/27 09:50
 */
public interface PropertiesManager {

    String getWechatMpAppId();

    String getWechatMpAppSecret();

    String getWechatMpInitToken();

    /**
     * 容联通信信息
     * @return
     */
    String getCcpAccountSid();
    String getCcpAccountToken();
    String getCcpAppid();
    String getCcpServiceIp();
    String getCcpServicePort();
    String getCcpSmsTemplateId();
    String getCcpSmsRegisterNoticeTemplateId();

    /**
     * 七牛云存储
     */
    String getQiNiuAccessKey();
    String getQiNiuSecretKey();
    String getQiNiuDoctorOssUrl();
    String getQiNiuBucketName();

    String getContextPath();
}
