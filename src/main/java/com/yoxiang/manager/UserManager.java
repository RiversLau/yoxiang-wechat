package com.yoxiang.manager;

import java.util.Map;

/**
 * Author: RiversLau
 * Date: 2017/10/26 10:26
 */
public interface UserManager {

    Map<String,Object> getUserByOpenId(String openId);
}
