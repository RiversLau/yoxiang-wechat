package com.yoxiang.manager;

import com.yoxiang.vo.UserApplyVO;

/**
 * Author: Rivers
 * Date: 2017/10/27 08:26
 */
public interface UserApplyManager {

    /**
     * 通过手机号获取未删除的申请
     * @param phone
     * @return
     */
    UserApplyVO getNotDeletedByPhone(String phone);

    /**
     * 通过openID获取未删除的申请
     * @param openid
     * @return
     */
    UserApplyVO getNotDeletedByOpenid(String openid);

    /**
     * 新增注册申请
     * @param apply 申请VO
     * @return
     */
    Integer saveUserApply(UserApplyVO apply);
}
