package com.yoxiang.manager.impl;

import com.yoxiang.manager.AreaManager;
import com.yoxiang.mapper.AreaMapper;
import com.yoxiang.vo.AreaVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Author: RiversLau
 * Date: 2017/10/26 14:28
 */
@Service("areaManager")
public class AreaManagerImpl implements AreaManager {

    @Autowired
    private AreaMapper areaMapper;

    public List<AreaVO> getList(Integer parentId) {
        return areaMapper.getList(parentId);
    }
}
