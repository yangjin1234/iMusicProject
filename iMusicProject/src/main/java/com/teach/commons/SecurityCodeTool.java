package com.teach.commons;

import javax.servlet.http.HttpSession;

import com.google.code.kaptcha.Constants;

/**
 * <pre>
 * 验证码是否一致验证
 * ClassName : com.teach.commons.SecurityCodeTool
 * Author : J.L.Zhou
 * Date : 2019年8月1日 上午10:53:55
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * 注意：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目</pre>
 */
public class SecurityCodeTool {

	private SecurityCodeTool() {}
	
	public static boolean check(HttpSession session,String code) {
		String code1 = (String)session.getAttribute(Constants.KAPTCHA_SESSION_KEY);
		if(code1==null || code == null) {
			return false;
		}
		if(!code1.equals(code)) {
			return false;
		}
		return true;
	}
}
