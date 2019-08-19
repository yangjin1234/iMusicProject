/**
 * 
 */
package com.teach.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.teach.entity.User;
import com.teach.mapper.UserMapper;
import com.teach.service.UserService;

/**
 * ClassName:com.teach.service.impl.UserServiceImpl
 * @author yangjin 
 * Date:2019年8月18日 下午7:04:32
 * Version:V1.0
 */
@Component
public class UserServiceImpl implements UserService{

	@Autowired
	private UserMapper mapper;
	
	@Override
	public void register(User user) throws Exception {
		mapper.insertSelective(user);
	}

}
