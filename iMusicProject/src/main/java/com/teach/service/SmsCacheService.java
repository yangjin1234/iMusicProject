package com.teach.service;

/**<pre>
 * TODO:Sms缓存服务
 * ClassName : com.teach.service.SmsCacheService
 * Author : J.L.Zhou
 * Date : 2019年8月10日 下午10:25:14
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
public interface SmsCacheService {

	/**
	 * 加入缓存
	 * @param tel
	 * @param code
	 */
	void push(String tel,String code);
	
	/**
	 * 获取缓存数据
	 * @param tel
	 * @return
	 */
	String get(String tel);
	
	
}
