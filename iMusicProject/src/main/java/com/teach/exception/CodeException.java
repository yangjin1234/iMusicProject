package com.teach.exception;
/**
 * <pre>
 * 含错误编号和错误消息的自定义异常
 * ClassName : com.teach.exception.CodeException
 * Author : J.L.Zhou
 * Date : 2019年7月30日 下午4:25:31
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * 注意：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目</pre>
 */
@SuppressWarnings("serial")
public class CodeException extends RuntimeException {

	private int code;
	private String message;
	public CodeException(int code) {
		super();
		this.code = code;
	}
	public CodeException(int code,String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		this.code = code;
		this.message=message;
	}
	public CodeException(int code,String message, Throwable cause) {
		super(message, cause);
		this.code = code;
		this.message=message;
	}
	public CodeException(int code,String message) {
		super(message);
		this.code = code;
		this.message=message;
	}
	public CodeException(int code,Throwable cause) {
		super(cause);
		this.code = code;
	}
	
	public int getCode() {
		return code;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	public void setCode(int code) {
		this.code = code;
	}

	@Override
	public String getMessage() {
		if(message!=null){
			return message;
		}else{
			return "code."+code;
		}
	}
}
