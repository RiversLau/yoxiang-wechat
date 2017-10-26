package com.yoxiang.manager.impl;

import com.yoxiang.manager.UserManager;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Author: RiversLau
 * Date: 2017/10/26 11:15
 */
@Service("userManager")
public class UserManagerImpl implements UserManager {



    public Map<String, Object> getUserByOpenId(String openId) {
        return null;
    }

    public boolean isPhoneRegistered(String phone) {
        boolean flag = false;
        // 判断是否有注册申请
        return flag;
    }
}
