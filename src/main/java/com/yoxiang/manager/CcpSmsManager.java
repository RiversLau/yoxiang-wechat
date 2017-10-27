package com.yoxiang.manager;

import java.util.Map;

/**
 * Author: Rivers
 * Date: 2017/10/27 09:25
 */
public interface CcpSmsManager {

    Integer sendMsg(String phone,String[] datas, String[] templateIds);

    void sendRegisterNotice(Map<String, String[]> params, String templateId);
}
