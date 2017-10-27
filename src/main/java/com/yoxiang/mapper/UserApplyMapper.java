package com.yoxiang.mapper;

import com.yoxiang.vo.UserApplyVO;
import org.apache.ibatis.annotations.Param;

/**
 * Author: Rivers
 * Date: 2017/10/27 08:31
 */
public interface UserApplyMapper {

    UserApplyVO getStatusNotEqualByPhone(@Param("status") Integer status, @Param("phone") String phone);

    UserApplyVO getStatusNotEqualByOpenid(@Param("status") Integer ordinal, @Param("openid") String openid);

    int saveUserApply(UserApplyVO apply);
}
