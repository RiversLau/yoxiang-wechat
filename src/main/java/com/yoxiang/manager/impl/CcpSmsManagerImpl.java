package com.yoxiang.manager.impl;

import com.cloopen.rest.sdk.CCPRestSDK;
import com.yoxiang.manager.CcpSmsManager;
import com.yoxiang.manager.PropertiesManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

/**
 * Author: Rivers
 * Date: 2017/10/27 09:25
 */
@Service("ccpSmsManager")
public class CcpSmsManagerImpl implements CcpSmsManager {

    private static final Logger log = LoggerFactory.getLogger(CcpSmsManagerImpl.class);

    private CCPRestSDK ccpRestSDK;

    @Autowired
    private PropertiesManager propertiesManager;

    @PostConstruct
    public void init() {
        if (ccpRestSDK == null) {
            ccpRestSDK = new CCPRestSDK();
        }
        ccpRestSDK.init(propertiesManager.getCcpServiceIp(), propertiesManager.getCcpServicePort());
        ccpRestSDK.setAccount(propertiesManager.getCcpAccountSid(), propertiesManager.getCcpAccountToken());
        ccpRestSDK.setAppId(propertiesManager.getCcpAppid());
    }

    @Override
    public Integer sendMsg(String phone, String[] datas, String[] templateIds) {

        Integer result = -1;
        if (templateIds != null && templateIds.length > 0) {
            String tempId = getRandomTemplateId(templateIds);
            try {
                HashMap<String, Object> res = ccpRestSDK.sendTemplateSMS(phone, tempId, datas);
                if (res.get("statusCode").equals("000000")) {
                    result = 0;
                    log.info(">>>>>> 发送验证码短信成功 phone:" + phone);
                } else {
                    log.error(">>>>>> 发送短信验证码失败，statusCode=" + res.get("statusCode").toString() + ", statusMsg=" + res.get("statusMsg"));
                }
            } catch (Exception e) {
                log.error(">>>>>> 发送验证码短信失败 phone:" + phone);
                e.printStackTrace();
            }
        } else {
            log.error(">>>>>> 模板消息ID未配置，无法发送短信");
        }

        return result;
    }

    @Override
    public void sendRegisterNotice(Map<String, String[]> params, String templateId) {

        for (Map.Entry<String, String[]> entry : params.entrySet()) {
            String phone = entry.getKey();
            String[] datas = entry.getValue();
            try {
                HashMap<String, Object> res = ccpRestSDK.sendTemplateSMS(phone, templateId, datas);
                if (res.get("statusCode").equals("000000")) {
                    log.info(">>>>>> 发送验证码短信成功 phone:" + phone);
                } else {
                    log.error(">>>>>> 发送短信验证码失败，statusCode=" + res.get("statusCode").toString() + ", statusMsg=" + res.get("statusMsg"));
                }
            } catch (Exception e) {
                log.error(">>>>>> 发送验证码短信失败 phone:" + phone);
                e.printStackTrace();
            }
        }
    }

    /**
     * 配置多个短信验证码时通过随机数获取模板ID
     * @param templateIds
     * @return
     */
    private String getRandomTemplateId(String[] templateIds) {

        int Min = 0;
        int Max = templateIds.length - 1;
        int result = Min + (int)(Math.random() * ((Max - Min) + 1));

        return templateIds[result];
    }
}
