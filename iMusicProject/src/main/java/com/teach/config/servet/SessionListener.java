package com.teach.config.servet;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.teach.service.RedisService;

/**<pre>
 * TODO:
 * ClassName : com.teach.config.servet.SessionListener
 * Author : J.L.Zhou
 * Date : 2019年8月16日 上午9:01:54
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
//@WebListener
@Component
public class SessionListener implements HttpSessionListener {

	@Autowired
	private RedisService<String, Object> service;
	
	@Override
	public void sessionCreated(HttpSessionEvent se) {
	}
	
	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
	}
}
