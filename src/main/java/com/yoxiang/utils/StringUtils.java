package com.yoxiang.utils;

/**
 * Author: RiversLau
 * Date: 2017/10/20 14:59
 */
public class StringUtils {

    /**
     * 判断字符串是否为空
     * 如果字符串为null，长度为0，trim后长度为0，则返回true；否则返回false
     * @param str
     * @return
     */
    public static boolean isEmpty(String str) {
        boolean flag = false;
        if (str == null || str.length() == 0 || str.trim().length() == 0) {
            flag = true;
        }
        return flag;
    }

    public static boolean isNullString(String str) {
        boolean flag = false;
        if (!isEmpty(str) && "NULL".equalsIgnoreCase(str)) {
            flag = true;
        }
        return flag;
    }

    public static boolean isEmptyOrNull(String str) {
        boolean flag = false;
        if (isEmpty(str) || isNullString(str)) {
            flag = true;
        }
        return flag;
    }
}
