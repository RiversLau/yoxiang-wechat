package com.yoxiang.utils;

/**
 * 生成验证码的工具类
 *
 * User: RiversLau
 * Date: 2015/7/8 18:40
 */
public class VCodeUtil {

    private static final String NUMBERS = "0123456789";
    private static final String NUMBER_LETTERS = "0123456789abcdefghigkmnpqrstuvwxyz";

    public static String generateVCode(boolean isOnlyNumber, int length) {

        String returnStr;

        String strTable = isOnlyNumber ? NUMBERS : NUMBER_LETTERS;
        int len = strTable.length();
        boolean bDone = true;

        do {
            returnStr = "";
            int count = 0;

            for (int i = 0; i < length; i++) {

                double dblR = Math.random() * len;
                int intR = (int) Math.floor(dblR);
                char c = strTable.charAt(intR);

                if (('0' <= c) && (c >= '9')) {
                    count++;
                }
                returnStr += strTable.charAt(intR);
            }

            if (count >= 2) {
                bDone = false;
            }
        } while(bDone);

        return returnStr;
    }
}
