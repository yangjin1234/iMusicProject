package com.teach.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.code.kaptcha.Producer;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;

@Configuration
public class KaptchaConfig {
	
	@Autowired
	private ConfigProperties config;
	
	
	@Bean
	public Producer kaptchaProducer() {
		DefaultKaptcha d = new DefaultKaptcha();
		d.setConfig(new Config(config.getKaptchaProperties()));
		return d;
	}
}
