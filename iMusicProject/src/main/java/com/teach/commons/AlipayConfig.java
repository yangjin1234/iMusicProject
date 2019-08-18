package com.teach.commons;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016101000655703";
//	public static String app_id = "2019072165869423";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQColqld4NlPD6qomvsuxMNnZ7xmjhS5eHBdS/8CPK4si4bkglNZdGGx2HO4bGbFIvZhepvCeQ6LwtpYfZoAaSIWQN9E8a3ZnFBfTQaPOCg4mkH11QHFtnaqiVuSABxTLoeWS3fzROqeo8WhPwbesZovQlxtO9ISZXZOwt5awZ8YCv1vyUuIEXagjCoBUJ9HQc7+LVNa3IoNY+bMs4It1lFx5HCGEZeyL8LUzRHD4jaOMXNwqVkDsfYk2LTphnLSq3rNUm1e0TlXxgK+aqightexUQYXmmFq/5sgtkK8AWzkd3P8SFmFAExfCDXYbS7npmYn1fqlIgHObpjoxoU2uq8BAgMBAAECggEBAILoYmE0PGmIx8KefVbmkLjVs1SLFQqju9SmM0DAb5rFSRxdGm2G0mlvowPcoLyJFnnA4/vRVnst9a/q789L050mCHiXlaA5Iauuut4xBAJXvcou+W5V7bUkbYdkMJpisgQBXAX5SJmgn9BCiYoYrJnv1Kc5YTjJsmEcLd6ZJHlcpKMYK7o3ZiJYPjNdn38MRt/caBVPxJsaD/IugDo6R81qLvJ6PMes7pZmA0wIaWiFwAtx+q6pe18eHjwW+4dudIBTHy3Wfuftm5Ji0Oqpio1FYDij7+Jf9nt5o1qYEkOvYvhk552NetWXEfZmwFlEhQlY0XjV6wtszD16znwfiDECgYEA0cDxZZa1qganLkgqZgKGTGCWfhPx1IPNuzJ//AZgUWbRHz6SVfIq9C561TXsqtFocCanofWxrE9ik4qeBPjtIQSLmE6E/5zHcKxdRssx7Ws3P8nqHTINwUFPKp+cnxhPPfpjwWLS++hZpVJf/HRC1Cpicw/7clhpGYzMsm6OplUCgYEAzcI/RuzKSyvWze/kiQ9PIJRTlwZ55O+eNsTaZUaaQVdnd4IY3RQ6CgyBAIt3KTRKUglUJnAkNNfkzkzTtxaeT7qz/YUEs8y/7Cw/3L4VTDHOyqzJDzlVNdbPVpbZuENNcunXrP4wG/6aXTRd508o147rrisx8Kt2PS5QMr16Gf0CgYEAnNobqkw5LRwsiH+OtRnOM+9GmqFvhevKPOJWsrBR9o1cdHDmHT8qv87CLA5XHKXb44IEeSix5Ji4rnxKDo3XRYmQmiSdcEhdG/TJC9eHTnOOrTTgzVRQ1ONxv/37sT0MhNxpHIQ6IgZugyJGhRKrptzLIiAheDCE54ZSzFvAcMECgYBjL4ghQHQj2HYrv8CC8YZLRjUlUFHiMkAqVqqQt4AUj3Wo/mXN7LotrelhwdknW7WX5jdScCyD7K63ZAGK+LRH6tBpHX4uzjyWNJ50Yo0RtdDhknk5hYG1+l7odr9tO8RR6Le3BLFcTVdMJro9jsM5ZgPmaZwhUAYnZ/PxAbWiYQKBgQC4lxYa2I7WMuqKz5pQxy23s8pL03hTpKLDp3enZGNp9H1IVmp6xUedZMi8yCYjyEZkyVwz6YuNjwTQiL1Kh+8pTaV/6wXZ60/S05swlZuQliudU2VtUIOm+Q/USvP2BQAwyMQ3kMcLJORgVB2V32o8WgFSZnt94TNnoePfkzJNJw==";
	
	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAllExc1nuTP28lFUi76xEcEZGmkQyINhR2ugT7C/a9Qr4s5geN+DwDViNNfkFoLxLfl+kbkVtSbKa3gSO9tw+JNMIWpCtTSJhL7jaJD7VY2hboZ/pICHUAzB2ibMUrSG+EquGcWJkgcXQap5jLQ1egsVhrs9qchem5d/0WUWkAfYCltvIIBMje7DDqLm+RxrdKmd5yg6BkeKnSRoAH6XJg2LvMS0CsD0IRzROetp7MUvG2HP0rj1iFKwgRQAdg/JA4/k/vJz8w8Ue7nVK4lCxACRGffAt+Z2SKxAWBON4AO8c5+X3DkRef6Hqo1vOeoRhAEUkM9HPzU8U8ea84uqImwIDAQAB";

	// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = " http://yn5y8d.natappfree.cc/demo20190705-1/notify_url.jsp";

	// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = " http://yn5y8d.natappfree.cc/demo20190705-1/return_url.jsp";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

