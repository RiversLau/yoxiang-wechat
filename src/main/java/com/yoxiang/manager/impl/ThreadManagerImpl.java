package com.yoxiang.manager.impl;

import com.yoxiang.manager.CcpSmsManager;
import com.yoxiang.manager.ThreadManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Author: Rivers
 * Date: 2017/10/27 09:23
 */
@Service("threadManager")
public class ThreadManagerImpl implements ThreadManager {

    @Autowired
    private ThreadPoolTaskExecutor taskExecutor;

    @Autowired
    private CcpSmsManager ccpSmsManager;

    @Override
    public void sendSMS(final String phone, final String[] datas, final String[] templateIds) {

        taskExecutor.execute(new Runnable() {
            @Override
            public void run() {
                ccpSmsManager.sendMsg(phone, datas, templateIds);
            }
        });
    }

    @Override
    public void sendRegisterNotice(final Map<String, String[]> params, final String templateId) {
        taskExecutor.execute(new Runnable() {
            @Override
            public void run() {
                ccpSmsManager.sendRegisterNotice(params, templateId);
            }
        });
    }
}
