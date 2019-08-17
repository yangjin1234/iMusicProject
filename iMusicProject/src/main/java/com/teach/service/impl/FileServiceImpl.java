package com.teach.service.impl;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.teach.commons.FileUtil;
import com.teach.commons.Id;
import com.teach.config.ConfigProperties;
import com.teach.exception.CodeException;
import com.teach.service.FileService;

import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

/**<pre>
 * TODO:文件服务
 * ClassName : com.teach.service.impl.FileServiceImpl
 * Author : J.L.Zhou
 * Date : 2019年8月14日 下午8:01:38
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
@Service
@Slf4j
public class FileServiceImpl implements FileService {

	@Autowired
	private ConfigProperties config;

	
	@Autowired
	private Id id;
	@Override
	public String saveImage3(MultipartFile img) {
		String uri = new SimpleDateFormat("yyyy/MM/dd/").format(new Date())+id.nextId();
		try{
			File path = new File(config.getRootFile(),uri);
			log.debug(path.getAbsolutePath());
			path.mkdirs();
			File file = new File(path,"0."+FileUtil.getFileExt(img.getOriginalFilename()));
			img.transferTo(file);
			
			BufferedImage i = ImageIO.read(new FileInputStream(file));
			Thumbnails.of(i).size(100, 100).outputFormat("png").toFile(new File(path,"1.png"));
			
			BufferedImage image = ImageIO.read(new File(config.getRootFile(),"_w.png"));
			Thumbnails.of(i).size(800, 800)
				.watermark(Positions.CENTER, image, 1)
				.outputFormat("png").toFile(new File(path,"2.png"));
			
		}catch(Exception ex){
			log.warn("保存原图失败",ex);
			throw new CodeException(0, "保存原图失败");
		}
		return uri;
	}

	@Override
	public File getImage3(String uri, int type) {
		if(type==0) {
			File[] fs =new File(config.getRootFile(),uri).listFiles(new FileFilter() {
				
				@Override
				public boolean accept(File pathname) {
					return pathname.getName().startsWith("0.");
				}
			});
			return fs[0];
		}else {
			return new File(config.getRootFile(),uri+"/"+type+".png");
		}
	}

}
