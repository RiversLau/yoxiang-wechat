package com.yoxiang.controller;

import com.yoxiang.common.interceptors.Authc;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * Author: RiversLau
 * Date: 2017/10/26 10:24
 */
@Controller
@RequestMapping("/user")
public class UserCtrl extends BaseCtrl {

    /**
     * 用户个人信息
     * @param request
     * @return
     */
    @Authc(needOpenid = true)
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public String userInfo(HttpServletRequest request) {
        System.out.println(request.getSession().getAttribute(OPEN_ID));
        return "/user/user_info";
    }

    /**
     * 注册页面
     * @return
     */
    @Authc(needOpenid = true)
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String register() {

        return "/user/user_register";
    }
}
