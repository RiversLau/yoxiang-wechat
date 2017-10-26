package com.yoxiang.manager.impl;

import com.yoxiang.common.enums.DoctorType;
import com.yoxiang.manager.TitleManager;
import com.yoxiang.mapper.TitleMapper;
import com.yoxiang.vo.TitleVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Author: RiversLau
 * Date: 2017/10/26 14:28
 */
@Service("titleManager")
public class TitleManagerImpl implements TitleManager {

    @Autowired
    private TitleMapper titleMapper;

    @Override
    public List<TitleVO> getEnabledList() {

        return titleMapper.getStatusEqualList(TitleVO.Status.ENABLED.ordinal());
    }

    public List<TitleVO> getEnabledListByType(DoctorType doctorType) {
        return titleMapper.getStatusEqualListByType(doctorType.ordinal(), TitleVO.Status.ENABLED.ordinal());
    }
}
