package com.yoxiang.vo;

import com.yoxiang.common.enums.DoctorType;
import com.yoxiang.common.enums.Sex;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * Author: Rivers
 * Date: 2017/10/27 08:29
 */
@Getter
@Setter
public class UserApplyVO {

    /**
     * 0:待审核
     * 1:申请被拒
     * 2:审请通过
     * 3:已删除
     * 4:需填写资料信息
     */
    public enum Status {
        WAITING, FAILURE, SUCCESS, DELETED, NEED_INFORMATION
    }

    /**
     * 能够制作器具
     * CANNOT-不能
     * CAN-能
     */
    public enum MakeModel {
        CANNOT, CAN
    }

    private Integer id;
    private Date createTime;
    private Date updateTime;

    private Sex sex;            // 性别
    private String name;        // 姓名

    private DoctorType type;    // 类型，医生或治疗师

    private Status status;      // 审核状态
    private String phone;       // 电话
    private String openid;      // 用户公众号openid
    private String password;    // 密码

    private String hospital;    // 所属医院
    private String dept;        // 部门或者科室
    private String title;       // 职称

    private String certimg;         // 资质证书图片URL地址，多个逗号分隔
    private MakeModel makeModel;    // 是否能够制作器具

    private String remark;
    private Integer areaId;

    private String code;        // 手机验证码
}
