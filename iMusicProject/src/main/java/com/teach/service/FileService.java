package com.teach.service;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

/**<pre>
 * TODO:文件服务
 * ClassName : com.teach.service.ImageService
 * Author : J.L.Zhou
 * Date : 2019年8月14日 下午7:56:23
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
public interface FileService {
	
	/**
	 * 保存3张图片
	 * 小图 1，加水印大图 2，原图 0
	 * @param img
	 * @return
	 */
	String saveImage3(MultipartFile img) ;
	
	/**
	 * 获取三张图片数据
	 * @param uri 存放位置
	 * @param type 0 原图 1 小图 2 大图
	 * @return
	 */
	File getImage3(String uri,int type);
	
}
