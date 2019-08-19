package com.teach.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teach.R;
import com.teach.service.SmsService;

/**<pre>
 * TODO:手机验证码前端
 * ClassName : com.teach.controller.SmsController
 * Author : J.L.Zhou
 * Date : 2019年8月11日 上午9:00:11
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
@RestController
@RequestMapping("/sms")
public class SmsController {
	
	@Autowired
	private SmsService service;

	@PostMapping("send.do")
	public R doSend(String tel) {
//		service.send(tel);
		return R.ok();
	}
	
	@PostMapping("check.do")
	public R doCheck(String tel,String code) {
		return R.empty().put("ok", service.check(tel, code));
	}
}
