package com.teach.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.teach.R;
import com.teach.config.ConfigProperties;
import com.teach.service.MailService;

import lombok.extern.slf4j.Slf4j;

/**<pre>
 * TODO:
 * ClassName : com.teach.controller.MailController
 * Author : J.L.Zhou
 * Date : 2019年8月10日 下午8:48:12
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */

@RestController
@RequestMapping("/mail")
@Slf4j
public class MailController {
	
	@Autowired
	private MailService service;
	
	@Autowired
	private ConfigProperties config;

	@PostMapping("send-text.do")
	public R doSendText(String[] to,String subject,String content) {
		service.sendText(to, subject, content);
		return R.ok();
	}
	
	@PostMapping("send-html.do")
	public R doSendHtml(String[] to,String subject,String[] key,String[] value,MultipartFile[] file) {
		Map<String, Object> map = new HashMap<String, Object>();
		if(key!=null&& key.length>0) {
			for(int i=0;i<key.length&&i<value.length;i++) {
				map.put(key[i], value[i]);
			}
		}
		List<File> files = new ArrayList<>();
		if(file!=null && file.length>0) {
			for(MultipartFile f :file) {
				try {
					String uri = "temp/"+new SimpleDateFormat("yyyy/MM/dd/").format(new Date())+UUID.randomUUID();
					File path = new File(config.getRootFile(),uri);
					path.mkdirs();
					File f1 = new File(path,f.getOriginalFilename());
					f.transferTo(f1);
					files.add(f1);
				}catch (Exception e) {
					log.debug("保存文件失败",e);
				}
			}
		}
		service.sendHtml(to, subject, map, "test", files.toArray(new File[0]));
		return R.ok();
	}
}
