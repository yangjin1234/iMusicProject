package com.teach.service.impl;

import java.io.File;
import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.teach.service.MailService;

import lombok.extern.slf4j.Slf4j;

/**
 * <pre>
 * TODO:邮件发送的具体实现
 * ClassName : com.teach.service.impl.MailService
 * Author : J.L.Zhou
 * Date : 2019年8月10日 下午4:57:21
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.
 * </pre>
 */
@Service
@Slf4j
public class MailServiceImpl implements MailService {

	@Autowired
	private JavaMailSender sender;

	@Autowired
	private TemplateEngine templateEngine;

	@Value("${spring.mail.username}")
	private String from;

	@Override
	public void sendText(String[] to, String subject, String content) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(from);
		message.setTo(to);
		message.setSubject(subject);
		message.setText(content);
		try {
			sender.send(message);
			log.info("邮件发送成功");
		} catch (Exception ex) {
			log.error("邮件发送错误", ex);
			throw new RuntimeException("邮件发送失败");
		}

	}

	@Override
	public void sendHtml(String[] to, String subject, Map<String, Object> data, String template, File[] files) {
		MimeMessage message = sender.createMimeMessage();

		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
			helper.setFrom(from);
			helper.setTo(to);
			helper.setSubject(subject);
			Context context = new Context();
			context.setVariables(data);
			String html = templateEngine.process("mail/" + template, context);
			helper.setText(html, true);
			if (files != null && files.length > 0) {
				for (File file : files) {
					helper.addAttachment(file.getName(), file);
				}
			}
			log.debug(html);
			sender.send(message);
			log.info("邮件发送成功");
		} catch (Exception ex) {
			log.error("邮件发送错误", ex);
			throw new RuntimeException("邮件发送失败");
		}
	}

}
