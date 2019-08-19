/**
 * 
 */
package com.teach.controller;

import java.util.UUID;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teach.R;
import com.teach.commons.MD5;
import com.teach.entity.User;
import com.teach.service.UserService;

import lombok.extern.slf4j.Slf4j;

/**
 * ClassName:com.teach.controller.UserController
 * @author yangjin 
 * Date:2019年8月18日 下午7:08:30
 * Version:V1.0
 */
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

	@Autowired
	private UserService service;
	
	@RequestMapping("/register.do")
	public R register(String tel,String pass) {
		User user=new User();
		user.setUserId(UUID.randomUUID().toString());
		user.setUserPhone(tel);
		user.setUserPass(MD5.encode(pass));
		log.info("tel{}",tel);
		log.info("pass{}",pass);
		try {
			service.register(user);
			log.info("注册成功");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return R.ok();
	}
	
}
