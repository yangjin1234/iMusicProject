package com.teach.config;

import java.util.ArrayList;

import javax.servlet.Filter;
import javax.servlet.Servlet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.teach.config.servet.CorsFilter;
import com.teach.config.servet.MyFilter;
import com.teach.config.servet.MyServlet;
import com.teach.config.servet.SessionListener;




/**<pre>
 * TODO:javaEE组件的注册
 * ClassName : com.teach.config.ServletConfig
 * Author : J.L.Zhou
 * Date : 2019年8月16日 上午8:20:30
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
@Configuration
public class ServletConfig {

	@Autowired
	private SessionListener sessionListener;
	
	@Autowired
	private MyFilter filter;
	
	@Autowired
	private MyServlet servlet;
	
	
	/**
	 * 注册监听器
	 */
	@Bean
	public ServletListenerRegistrationBean<SessionListener> sessionListenerRegistrationBean(){
		ServletListenerRegistrationBean<SessionListener> bean = new ServletListenerRegistrationBean<SessionListener>(sessionListener);
		bean.setOrder(1);
		return bean;
	}
	
	
	/**
	 * 注册跨域过滤器
	 */
	@Bean
    public FilterRegistrationBean<Filter>  corsFilterRegistrationBean() {
        FilterRegistrationBean<Filter> registrationBean = new FilterRegistrationBean<Filter>();
        registrationBean.setFilter(new CorsFilter());
        java.util.List<String> urlPatterns = new ArrayList<String>();
        urlPatterns.add("/*");
        registrationBean.setUrlPatterns(urlPatterns);
        registrationBean.setOrder(1);
        return registrationBean;
    }
	/**
	 * 注册过滤器
	 * @return
	 */
	@Bean
    public FilterRegistrationBean<MyFilter>  loginFilterRegistrationBean() {
        FilterRegistrationBean<MyFilter> registrationBean = new FilterRegistrationBean<MyFilter>();
        registrationBean.setFilter(filter);
        java.util.List<String> urlPatterns = new ArrayList<String>();
        urlPatterns.add("/*");
        registrationBean.setUrlPatterns(urlPatterns);
        registrationBean.setOrder(2);
        return registrationBean;
    }
	
	/**
	 * 注册Servlet
	 * @return
	 */
	@Bean
	public ServletRegistrationBean<Servlet> myServletRegistrationBean(){
		return new ServletRegistrationBean<Servlet>(servlet, "/xxx.s");
	}
	
	
}
