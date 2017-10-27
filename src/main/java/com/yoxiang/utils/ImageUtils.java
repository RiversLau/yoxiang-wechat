package com.yoxiang.utils;

import org.apache.commons.lang3.StringUtils;

/**
 * Author: RiversLau
 * Date: 2017/10/20 10:33
 */
public class ImageUtils {

    /**
     * 处理图片
     * @param pictureNames
     * @return
     */
    public static String dealWithImgUrl(String prefix, String pictureNames) {

        String result = "";
        if (!StringUtils.isEmpty(pictureNames)) {
            String[] keyResult = pictureNames.split(";|,");
            for (int i = 0; i < keyResult.length; i++) {
                if (i == keyResult.length - 1) {
                    result += prefix + keyResult[i];
                } else {
                    result += prefix + keyResult[i] + ";";
                }
            }
        }
        return result;
    }
}
