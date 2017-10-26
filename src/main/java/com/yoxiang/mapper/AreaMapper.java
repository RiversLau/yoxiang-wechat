package com.yoxiang.mapper;

import com.yoxiang.vo.AreaVO;

import java.util.List;

/**
 * Author: RiversLau
 * Date: 2017/10/26 15:09
 */
public interface AreaMapper {

    List<AreaVO> getList(Integer parentId);
}
