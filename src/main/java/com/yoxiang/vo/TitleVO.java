package com.yoxiang.vo;

import com.yoxiang.common.enums.DoctorType;
import lombok.Getter;
import lombok.Setter;

/**
 * Author: RiversLau
 * Date: 2017/10/26 14:15
 */
@Getter
@Setter
public class TitleVO {

    public enum Status {
        DELETED, ENABLED
    }

    private Integer id;
    private String name;
    private DoctorType type;
}
