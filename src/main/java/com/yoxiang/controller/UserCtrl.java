package com.yoxiang.controller;

import com.yoxiang.common.interceptors.Authc;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Author: RiversLau
 * Date: 2017/10/26 10:24
 */
@Controller
@RequestMapping("/user")
public class UserCtrl extends BaseCtrl {

    @Authc(needOpenid = true)
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public String userInfo() {
        return "/user/user_info";
    }
}
