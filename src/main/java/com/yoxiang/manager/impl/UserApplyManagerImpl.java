package com.yoxiang.manager.impl;

import com.yoxiang.common.ReturnCode;
import com.yoxiang.manager.PropertiesManager;
import com.yoxiang.manager.UserApplyManager;
import com.yoxiang.manager.VerifyCodeManager;
import com.yoxiang.mapper.UserApplyMapper;
import com.yoxiang.utils.Constants;
import com.yoxiang.utils.EncryptUtils;
import com.yoxiang.utils.ImageUtils;
import com.yoxiang.utils.StringUtils;
import com.yoxiang.vo.UserApplyVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Author: Rivers
 * Date: 2017/10/27 08:27
 */
@Service("userApplyManager")
public class UserApplyManagerImpl implements UserApplyManager {

    @Autowired
    private UserApplyMapper userApplyMapper;

    @Autowired
    private PropertiesManager propertiesManager;
    @Autowired
    private VerifyCodeManager verifyCodeManager;

    /**
     * 根据手机号获取未删除的申请
     * @param phone 手机号
     * @return
     */
    @Override
    public UserApplyVO getNotDeletedByPhone(String phone) {

        return userApplyMapper.getStatusNotEqualByPhone(UserApplyVO.Status.DELETED.ordinal(), phone);
    }

    /**
     * 根据openid获取未删除的申请
     * @param openid 微信openId
     * @return
     */
    @Override
    public UserApplyVO getNotDeletedByOpenid(String openid) {
        return userApplyMapper.getStatusNotEqualByOpenid(UserApplyVO.Status.DELETED.ordinal(), openid);
    }

    @Override
    public Integer saveUserApply(UserApplyVO apply) {

        Integer errCode;
        // 手机号
        String phone = apply.getPhone();
        if (!StringUtils.isMatchPhoneNumFormatter(phone)) {
            errCode = ReturnCode.PHONE_FORMAT_ERROR;
            return errCode;
        }
        // 密码
        String password = apply.getPassword();
        if (!StringUtils.isMatchPasswordFormatter(password)) {
            errCode = ReturnCode.PASSWORD_FORMAT_ERROR;
            return errCode;
        }
        // 姓名
        if (StringUtils.isEmpty(apply.getName())) {
            errCode = ReturnCode.NAME_FORMAT_ERROR;
            return errCode;
        }
        // 资质证书
        String certimg = apply.getCertimg();
        if (StringUtils.isEmpty(certimg)) {
            errCode = ReturnCode.CERTIMG_FORMAT_ERROR;
            return errCode;
        }
        // 手机号与验证码匹配
        boolean flag = verifyCodeManager.isValidCode(phone, apply.getCode());
        if (!flag) {
            errCode = ReturnCode.PHONE_VCODE_NOT_MATCH;
            return errCode;
        }

        String hospital = apply.getHospital();
        String dept = apply.getDept();
        apply.setHospital(StringUtils.isEmpty(hospital) ? "" : hospital);
        apply.setDept(StringUtils.isEmpty(dept) ? "" : dept);
        apply.setCertimg(ImageUtils.dealWithImgUrl(propertiesManager.getQiNiuDoctorOssUrl(), certimg));
        apply.setPassword(EncryptUtils.md5Encode(password, Constants.DEFAULT_CHARSET_NAME));
        apply.setStatus(UserApplyVO.Status.WAITING);
        apply.setCreateTime(new Date());
        apply.setUpdateTime(new Date());
        userApplyMapper.saveUserApply(apply);

        verifyCodeManager.deleteVerifyCode(phone);

        errCode = ReturnCode.SUCCESS;

        return errCode;
    }
}
