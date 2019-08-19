/**
 * 
 */
package com.teach.service;

import com.teach.entity.User;
import com.teach.mapper.UserMapper;

/**
 * ClassName:com.teach.service.LoginService
 * @author yangjin 
 * Date:2019年8月18日 下午7:02:23
 * Version:V1.0
 */
public interface UserService {

	
	void register(User user)throws Exception;
}
