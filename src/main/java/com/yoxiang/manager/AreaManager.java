package com.yoxiang.manager;

import com.yoxiang.vo.AreaVO;

import java.util.List;

/**
 * Author: RiversLau
 * Date: 2017/7/19 16:32
 */
public interface AreaManager {

    List<AreaVO> getList(Integer parentId);
}
