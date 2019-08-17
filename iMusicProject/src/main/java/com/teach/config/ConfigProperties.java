package com.teach.config;

import java.io.File;
import java.util.Properties;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

/**
 * <pre>
 * TODO:全局配置文件
 * ClassName : com.teach.config.ConfigProperties
 * Author : J.L.Zhou
 * Date : 2019年8月9日 上午11:36:10
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.
 * </pre>
 */
@ConfigurationProperties(prefix = "config", ignoreInvalidFields = true, ignoreUnknownFields = true)
@Configurable
@Data
@Slf4j
public class ConfigProperties {

	/**
	 * 根路径配置,默认：""，表示当前工程目录target或者运行时的jar路径
	 */
	public String root = "";

	public File rootFile;

	@PostConstruct
	public void init() {
		if (root.equals("")) {
			try {
				String path = ConfigProperties.class.getProtectionDomain().getCodeSource().getLocation().getPath();
				path = java.net.URLDecoder.decode(path, "utf-8");
				if (path.indexOf("!") > -1) {
					path = path.substring(0, path.indexOf("!"));
				}
				if (path.endsWith(".jar")) {
					path = path.substring(0, path.lastIndexOf("/") + 1);
					if (path.startsWith("file:")) {
						path = path.substring(5);
					}
					rootFile = new File(path);
				} else {
					rootFile = new File(path).getParentFile();
				}
			} catch (Exception e) {
				log.warn("获取当前目录失败", e);
				rootFile = new File("./").getAbsoluteFile();
			}
			root = rootFile.getAbsolutePath();
		} else {
			rootFile = new File(root);
		}
		log.info("当前项目使用的根目录：" + rootFile.getAbsolutePath());
	}

	/**
	 * 注册信息配置
	 */
	public Reg reg = new Reg();

	/**
	 * 雪花数配置
	 */
	public Id id = new Id();

	/**
	 * 图片验证码的配置信息
	 */
	public Properties kaptchaProperties;

	/**
	 * 异常错误处理相关配置信息
	 */
	public Error error = new Error();

	/**
	 * 短信配置
	 */
	public Sms sms = new Sms();

	@Data
	public static class Id {
		/**
		 * 雪花数的节点编号，0-31，默认0
		 */
		public Long workerId = 0L;
		/**
		 * 雪花数的数据中心编号，0-31，默认0
		 */
		public Long datacenterId = 0L;
	}

	@Data
	public static class Error {
		/**
		 * 默认错误视图名，默认：error
		 */
		public String viewName = "error";
		/**
		 * 显示错误页面需要添加的请求参数名称，默认：_err
		 */
		public String paramName = "_err";
		/**
		 * JSON格式的输出的文档类型，默认：text/plain;charset=UTF-8
		 */
		public String jsonContentType = "text/plain;charset=UTF-8";

		/**
		 * 错误视图中的异常属性名称，默认：ex
		 */
		public String exceptionName = "ex";
	}

	@Data
	public static class Reg {
		/**
		 * 注册时的默认角色
		 */
		public Integer roleId = 0;

		/**
		 * 注册时用户锁定状态
		 */
		public Boolean userLocked = false;

	}

	@Data
	public static class Sms {
		
		public Aliyun aliyun;
		
		/**
		 * 短信超时，默认60秒
		 */
		public Integer timeout = 60;			
		
		/**
		 * 随机符号,默认：0123456789
		 */
		public String codes = "0123456789";

		@Data
		public static class Aliyun {

			/**
			 * 开发者自己的AccessKeyId(在阿里云访问控制台寻找)
			 */
			public String accessKeyId;
			/**
			 * 开发者自己的AccessKeySecret(在阿里云访问控制台寻找)
			 */
			public String accessKeySecret;
			/**
			 * 短信签名
			 */
			public String signName;
			/**
			 * 短信模板code
			 */
			public String templateCode;

		}
	}

}
