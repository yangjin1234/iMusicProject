package com.teach.service;

/**<pre>
 * TODO:手机验证码服务
 * ClassName : com.teach.service.SmsService
 * Author : J.L.Zhou
 * Date : 2019年8月10日 下午10:23:03
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
public interface SmsService {

	/**
	 * 随机长度len的字符串
	 * @param len
	 * @return
	 */
	String getRandomCode(int len);
	
	/**
	 * 发送随机6位验证码
	 * @param tel 	手机号码
	 * @return		验证码
	 * @throws CodeException 61:重复发送 62:发送异常
	 */
	String send(String tel);
	
	/**
	 * 发送验证码
	 * @param tel	手机号码
	 * @param code	验证码
	 * @throws CodeException 61:重复发送 62:发送异常
	 */
	void send(String tel,String code);
	
	/**
	 * 检查手机验证码是否正确
	 * @param tel	手机号码
	 * @param code	验证码
	 * @return		是否匹配
	 * @throws CodeException 63:验证码已失效
	 */
	boolean check(String tel,String code);
	
}
