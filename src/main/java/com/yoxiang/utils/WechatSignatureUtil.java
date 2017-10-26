package com.yoxiang.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Formatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * 微信签名工具类
 * Author: Rivers
 * Date: 2017/6/29 14:42
 */
public class WechatSignatureUtil {

    /**
     * 生成JS-SDK签名
     * @param ticket
     * @param url
     * @return
     */
    public static Map<String, String> generateJSSignature(String ticket, String url) {

        Map<String, String> result = new HashMap<String, String>();

        String nonce_str = create_nonce_str();
        String timestamp = create_timestamp();

        if (url.indexOf("#") > 0) {
            url = url.substring(0, url.indexOf("#"));
        }

        String tempStr = "jsapi_ticket=" + ticket + "&noncestr=" + nonce_str + "&timestamp=" + timestamp +
                "&url=" + url;
        String signature = "";

        try {
            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            crypt.update(tempStr.getBytes("UTF-8"));
            signature = byteToHex(crypt.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        result.put("nonceStr", nonce_str);
        result.put("timestamp", timestamp);
        result.put("signature", signature);

        return result;
    }

    /**
     * 生成微信验证开发者信息的签名
     * @param timestamp
     * @param nonce
     * @param token
     * @return
     */
    public static String generateInitCheckSignature(String timestamp, String nonce, String token) {

        String signature = null;
        String tempStr = nonce + timestamp + token;
        try {
            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            crypt.update(tempStr.getBytes("UTF-8"));
            signature = byteToHex(crypt.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return signature;
    }

    /**
     * 转16进制
     * @param hash
     * @return
     */
    private static String byteToHex(final byte[] hash) {

        Formatter formatter = new Formatter();
        for (byte b : hash) {
            formatter.format("%02x", b);
        }

        String result = formatter.toString();
        formatter.close();
        return result;
    }

    /**
     * 生成随机字符串
     * @return
     */
    private static String create_nonce_str() {

        return UUID.randomUUID().toString();
    }

    /**
     * 生成时间戳
     * @return
     */
    private static String create_timestamp() {

        return Long.toString(System.currentTimeMillis() / 1000);
    }
}
