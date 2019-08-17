package com.teach.commons;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanNameGenerator;

public class FullBeanNameGenerator implements BeanNameGenerator {

	@Override
	public String generateBeanName(BeanDefinition arg0, BeanDefinitionRegistry arg1) {
		arg1.registerBeanDefinition(arg0.getBeanClassName(), arg0);
		return arg0.getBeanClassName();
	}

}
