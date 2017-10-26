package com.yoxiang.controller;

import com.yoxiang.common.enums.DoctorType;
import com.yoxiang.common.interceptors.Authc;
import com.yoxiang.manager.AreaManager;
import com.yoxiang.manager.TitleManager;
import com.yoxiang.vo.AreaVO;
import com.yoxiang.vo.TitleVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Author: RiversLau
 * Date: 2017/10/26 10:24
 */
@Controller
@RequestMapping("/user")
public class UserCtrl extends BaseCtrl {

    @Autowired
    private AreaManager areaManager;
    @Autowired
    private TitleManager titleManager;

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
//    @Authc(needOpenid = true)
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String register(HttpServletRequest request) {

        List<AreaVO> areaList = areaManager.getList(null);

        List<TitleVO> doctorTitles = titleManager.getEnabledListByType(DoctorType.DOCTOR);
        List<TitleVO> therapistTitles = titleManager.getEnabledListByType(DoctorType.THERAPIST);

        request.setAttribute("areaList", areaList);
        request.setAttribute("doctorTitles", doctorTitles);
        request.setAttribute("therapistTitles", therapistTitles);
        return "user/user_register";
    }

    /**
     * 用户注册
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String saveRegisterUser() {

        return "/user/user_apply_waiting";
    }
}
