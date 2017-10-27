package com.yoxiang.manager.impl;

import com.yoxiang.manager.UserApplyManager;
import com.yoxiang.manager.UserManager;
import com.yoxiang.utils.StringUtils;
import com.yoxiang.vo.UserApplyVO;
import com.yoxiang.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Author: RiversLau
 * Date: 2017/10/26 11:15
 */
@Service("userManager")
public class UserManagerImpl implements UserManager {

    @Autowired
    private UserApplyManager userApplyManager;

    public UserVO getUserByOpenId(String openId) {
        return null;
    }

    /**
     * 判断手机号是否已经注册
     * 如果手机号为空或null，直接返回false
     * @param phone 手机号
     * @return
     */
    public boolean isPhoneRegistered(String phone) {

        boolean flag;
        if (StringUtils.isEmpty(phone)) {
            flag = false;
            return flag;
        }

        // 判断是否有注册申请
        UserApplyVO apply = userApplyManager.getNotDeletedByPhone(phone);
        flag = apply == null ? false : true;
        return flag;
    }
}
