package com.teach.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.pagehelper.PageInterceptor;
import com.teach.commons.Id;



@Configuration
public class BeanConfig {
	

	@Autowired
	private ConfigProperties config;
	
	/**
	 * 配置雪花数实例
	 * @return
	 */
	@Bean
	public Id id() {
		return new Id(config.getId().getWorkerId(), config.getId().getDatacenterId());
	}
	
	@Bean
	public PageInterceptor pageInterceptor() {
		PageInterceptor p = new PageInterceptor();
		Properties properties = new Properties();
		properties.setProperty("helperDialect", "mysql");
		p.setProperties(properties);
		return p;
	}

	

	
}
