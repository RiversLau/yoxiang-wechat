package com.yoxiang.utils;

import com.qiniu.util.Auth;
import lombok.extern.log4j.Log4j;

/**
 * Author: RiversLau
 * Date: 2017/7/19 18:56
 */
@Log4j
public class QiniuUtil {

    /**
     * 获取上传图片token
     * @param accessKey AK
     * @param secretKey SK
     * @param bucketName 存储空间名称
     * @return
     */
    public static String getUploadToken(String accessKey, String secretKey, String bucketName) {

        log.info(">>>>>>>>>>>>>>>>> fetch qiniu upload token START");
        Auth auth = Auth.create(accessKey, secretKey);

        String uptoken = "";
        try {
            uptoken = auth.uploadToken(bucketName);
        } catch (Exception e) {
            log.error(">>>>>>>>>>>>>>>>> fetch qiniu upload token error occurs, error msg == " + e.getMessage());
        }

        log.info(">>>>>>>>>>>>>>>>> fetch qiniu upload token END" + ", token == " + uptoken);
        return uptoken;
    }
}
