package com.yoxiang.vo;

import com.yoxiang.common.enums.DoctorType;
import lombok.Getter;
import lombok.Setter;

/**
 * Author: Rivers
 * Date: 2017/10/27 18:49
 */
@Getter
@Setter
public class UserVO {

    private Integer id;
    private String name;
    private DoctorType type;

    private String phone;
    private String password;
}
