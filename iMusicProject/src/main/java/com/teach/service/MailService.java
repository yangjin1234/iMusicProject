package com.teach.service;

import java.io.File;
import java.util.Map;

/**<pre>
 * TODO:邮件服务
 * ClassName : com.teach.service.MailService
 * Author : J.L.Zhou
 * Date : 2019年8月10日 下午4:50:40
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
public interface MailService {

	/**
	 * 发送简单邮件
	 * @param to	接受邮件的地址，可以多个
	 * @param subject 邮件的标题
	 * @param content 邮件的内容
	 * @throws RuntimeException:邮件发送失败
	 */
	void sendText(String[] to,String subject,String content);
	
	/**
	 * 发送含附件的html邮件
	 * @param to	接受邮件的地址，可以多个
	 * @param subject 邮件的标题
	 * @param data 邮件的数据（模板引擎的数据）
	 * @param template 邮件的模板(模板引擎的模板名称)
	 * @param files 邮件的附件
	 * @throws RuntimeException:邮件发送失败
	 */
	void sendHtml(String[] to,String subject,Map<String,Object> data,String template,File[] files);
}
