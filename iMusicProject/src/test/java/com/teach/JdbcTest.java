package com.teach;

import javax.sql.DataSource;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import com.alibaba.fastjson.JSON;
import com.teach.service.FileService;

import lombok.extern.slf4j.Slf4j;
import redis.clients.jedis.Jedis;

@SpringBootTest
@Slf4j
public class JdbcTest {

	@Autowired
	private DataSource ds;
	
	@Autowired
	private JdbcTemplate jdbc;
	
	@Autowired
	private FileService fileservice;
	
	@Test
	public void test1() {
//		log.info("ds:{}",ds);
//		log.info("role_info:{}",jdbc.queryForList("select * from role_info"));
		log.info("fileservice:{}",fileservice.toString());
	}
	
	@Test
	public void testConnect() {
		// 连接本地的 Redis 服务
		Jedis jedis = new Jedis("127.0.0.1");
		System.out.println("连接成功");
		// 查看服务是否运行
		System.out.println("服务正在运行: " + jedis.ping());
		jedis.close();
		
	}
}
