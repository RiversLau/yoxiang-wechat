package com.yoxiang.manager;

import com.yoxiang.vo.UserVO;

import java.util.Map;

/**
 * Author: RiversLau
 * Date: 2017/10/26 10:26
 */
public interface UserManager {

    UserVO getUserByOpenId(String openId);

    /**
     * 判断手机号是否已经注册
     * @param phone
     * @return
     */
    boolean isPhoneRegistered(String phone);
}
