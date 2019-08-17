package com.teach;

import javax.sql.DataSource;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class JdbcTest {

	@Autowired
	private DataSource ds;
	
	@Autowired
	private JdbcTemplate jdbc;
	
	@Test
	public void test1() {
		log.info("ds:{}",ds);
		log.info("role_info:{}",jdbc.queryForList("select * from role_info"));
	}
}
