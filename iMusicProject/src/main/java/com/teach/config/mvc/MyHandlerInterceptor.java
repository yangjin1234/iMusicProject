package com.teach.config.mvc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**<pre>
 * TODO:Mvc的拦截器
 * ClassName : com.teach.config.interceptor.MyHandlerInterceptor
 * Author : J.L.Zhou
 * Date : 2019年8月16日 上午10:36:31
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
@Component
public class MyHandlerInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		return true;
	}
	
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}
}
