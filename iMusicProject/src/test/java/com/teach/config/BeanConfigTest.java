package com.teach.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import com.teach.commons.Id;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class BeanConfigTest {

	@Autowired
	private BeanConfig beanConfig;
	
	@Autowired
	private ApplicationContext act;
	
	@Autowired
	private Id id;
	
	@Autowired
	private Id id1;
	
	@Autowired
//	@Qualifier("id")
	private Id abc;
	
	@Test
	public void test1() {
		log.info("beanConfig:{}",beanConfig);

		log.info("id:{}",act.getBean("id"));
//		log.info("id1:{}",act.getBean("id1"));

		log.info("@Autowired:id:{}",id);
		log.info("@Autowired:id1:{}",id1);
		log.info("@Autowired:abc:{}",abc);
		
		log.info("nextId:{}",id.nextId());

		log.info("getWorkerId():{}",id.getWorkerId());
		log.info("getDatacenterId():{}",id.getDatacenterId());
	}
}
