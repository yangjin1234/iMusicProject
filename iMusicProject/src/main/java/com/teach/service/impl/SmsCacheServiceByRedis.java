package com.teach.service.impl;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.teach.config.ConfigProperties;
import com.teach.service.SmsCacheService;

import lombok.extern.slf4j.Slf4j;

/**<pre>
 * TODO:采用Redis实现的短信验证码缓存
 * ClassName : com.teach.service.impl.SmsCacheServiceByRedis
 * Author : J.L.Zhou
 * Date : 2019年8月11日 上午8:47:17
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
@Service
@Slf4j
public class SmsCacheServiceByRedis implements SmsCacheService {
	
	@Autowired
	private ConfigProperties config;
	
	@Autowired
	private RedisTemplate<String, String> template;

	@Override
	public void push(String tel, String code) {
		template.opsForValue().set("sms_"+tel, code);
		template.expire("sms_"+tel, config.sms.timeout, TimeUnit.SECONDS);
		log.debug("设置{}的验证码{}的redis缓存，{}后超时",tel,code,config.sms.timeout);
	}

	@Override
	public String get(String tel) {
		String code = template.opsForValue().get("sms_"+tel);
		log.debug("获取{}的手机验证码缓存为：{}",tel,code);
		return code;
	}



}
