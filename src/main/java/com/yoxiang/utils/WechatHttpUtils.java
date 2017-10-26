package com.yoxiang.utils;

import org.apache.http.HttpEntity;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.utils.HttpClientUtils;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Date;

/**
 * Author: Rivers
 * Date: 2017/6/29 13:41
 */
public final class WechatHttpUtils {

    private static Logger logger = LogManager.getLogger(WechatHttpUtils.class);

    /**
     * 默认连接超时时间(毫秒)
     * 由于目前的设计原因，该变量定义为静态的，超时时间不能针对每一次的请求做定制
     * 备选优化方案：
     * 1.考虑是否重新设计这个工具类，每次请求都需要创建一个实例;
     * 2.请求方法里加入超时时间参数
     * 或者说是否没必要定制,10秒是一个比较适中的选择，但有些请求可能就是需要快速给出结果T_T
     */
    public static final int CONNECT_TIMEOUT = 5 * 1000;

    private static final Charset UTF8 = Charset.forName("UTF-8");

    private WechatHttpUtils() {
    }

    /**
     * GET请求
     * @param url
     * @return
     */
    public static String doGet(String url) {

        //如果url没有传入，则直接返回
        if (null == url || url.length() == 0) {
            logger.warn("The url is null or empty!!You must give it to me!OK?");
            return null;
        }

        RequestConfig config = RequestConfig.custom().setConnectionRequestTimeout(CONNECT_TIMEOUT).setConnectTimeout(CONNECT_TIMEOUT).setSocketTimeout(CONNECT_TIMEOUT).build();
        CloseableHttpClient client = HttpClientBuilder.create().setDefaultRequestConfig(config).build();
        HttpUriRequest request = new HttpGet(url);

        logger.info("》》》》》》开始请求微信服务器...");
        Long start = new Date().getTime();

        CloseableHttpResponse response = null;
        try {
            response = client.execute(request);
            HttpEntity entity = response.getEntity();
            String resultJson = EntityUtils.toString(entity, UTF8);
            logger.info("》》》》》》请求微信服务器成功，花费 " + (new Date().getTime() - start) + "ms");
            return resultJson;
        } catch (IOException e) {
            logger.error("IOException:", e);
            return null;
        } finally {
            if (null != request && !request.isAborted()) {
                request.abort();
            }
            HttpClientUtils.closeQuietly(client);
            HttpClientUtils.closeQuietly(response);
            logger.info("》》》》》》关闭HttpClient成功...");
        }
    }

    /**
     * POST请求
     * @param url
     * @param params
     * @return
     */
    public static String doPost(String url, String params) {

        //如果url没有传入，则直接返回
        if (null == url || url.length() == 0) {
            logger.warn("The url is null or empty!!You must give it to me!OK?");
            return null;
        }

        RequestConfig config = RequestConfig.custom().setConnectionRequestTimeout(CONNECT_TIMEOUT).setConnectTimeout(CONNECT_TIMEOUT).setSocketTimeout(CONNECT_TIMEOUT).build();
        CloseableHttpClient client = HttpClientBuilder.create().setDefaultRequestConfig(config).build();
        HttpUriRequest request = new HttpPost(url);
        if (null != params) {
            StringEntity strEntity = new StringEntity(params, UTF8);
            ((HttpPost)request).setEntity(strEntity);
        }

        CloseableHttpResponse response = null;
        try {
            response = client.execute(request);
            HttpEntity entity = response.getEntity();
            String resultJson = EntityUtils.toString(entity, UTF8);
            return resultJson;
        } catch (IOException e) {
            logger.error("IOException:", e);
            return null;
        } finally {
            if (null != request && !request.isAborted()) {
                request.abort();
            }
            HttpClientUtils.closeQuietly(client);
            HttpClientUtils.closeQuietly(response);
        }
    }

    public static String getWxMpAccessToken(String appid, String secret) {

        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret;

        RequestConfig config = RequestConfig.custom().setConnectionRequestTimeout(CONNECT_TIMEOUT).setConnectTimeout(CONNECT_TIMEOUT).setSocketTimeout(CONNECT_TIMEOUT).build();
        CloseableHttpClient client = HttpClientBuilder.create().setDefaultRequestConfig(config).build();
        HttpUriRequest request = new HttpGet(url);

        CloseableHttpResponse response = null;
        try {
            response = client.execute(request);
            HttpEntity entity = response.getEntity();
            String resultJson = EntityUtils.toString(entity, UTF8);
            return resultJson;
        } catch (IOException e) {
            logger.error("IOException:", e);
            return null;
        } finally {
            if (null != request && !request.isAborted()) {
                request.abort();
            }
            HttpClientUtils.closeQuietly(client);
            HttpClientUtils.closeQuietly(response);
        }
    }
}
