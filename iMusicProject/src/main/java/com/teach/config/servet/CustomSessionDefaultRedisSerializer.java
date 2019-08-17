package com.teach.config.servet;

import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

/**
 * <pre>
 * TODO:
 * ClassName : com.teach.config.servet.CustomSessionDefaultRedisSerializer
 * Author : J.L.Zhou
 * Date : 2019年8月16日 上午10:59:01
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.
 * </pre>
 */
@Component("springSessionDefaultRedisSerializer")
@Slf4j
public class CustomSessionDefaultRedisSerializer extends JdkSerializationRedisSerializer {

	public Object deserialize(@Nullable byte[] bytes) {
		Object deserialObj = null;
		try {
			deserialObj = super.deserialize(bytes);
		} catch (Exception e) {
			log.warn("deserialize session Object error!", e);
		}
		return deserialObj;
	}
}
