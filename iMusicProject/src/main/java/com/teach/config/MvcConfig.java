package com.teach.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.teach.config.mvc.LoginHandlerMethodArgumentResolver;
import com.teach.config.mvc.MyHandlerInterceptor;

/**<pre>
 * TODO:Mvc的配置
 * ClassName : com.teach.config.MvcConfig
 * Author : J.L.Zhou
 * Date : 2019年8月16日 上午8:31:21
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
@Configuration
public class MvcConfig implements WebMvcConfigurer {
	
	@Autowired
	private MyHandlerInterceptor interceptor;
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(interceptor).addPathPatterns("/**");
		WebMvcConfigurer.super.addInterceptors(registry);
	}
	
	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(new LoginHandlerMethodArgumentResolver());
		WebMvcConfigurer.super.addArgumentResolvers(resolvers);
	}
}
