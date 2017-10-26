package com.yoxiang.mapper;

import com.yoxiang.vo.TitleVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Author: RiversLau
 * Date: 2017/10/26 17:36
 */
public interface TitleMapper {

    List<TitleVO> getStatusEqualList(Integer status);

    List<TitleVO> getStatusEqualListByType(@Param("type") Integer type, @Param("status")Integer status);
}
