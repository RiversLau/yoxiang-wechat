package com.yoxiang.manager;

import com.yoxiang.common.enums.DoctorType;
import com.yoxiang.vo.TitleVO;

import java.util.List;

/**
 * Author: RiversLau
 * Date: 2017/7/19 17:01
 */
public interface TitleManager {

    List<TitleVO> getEnabledList();

    List<TitleVO> getEnabledListByType(DoctorType doctorType);
}
