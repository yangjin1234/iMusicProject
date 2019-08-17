package com.teach.commons;

import java.security.MessageDigest;
import java.util.Base64;

public class MD5 {
	
	private MD5(){}
	
	/**
	 * 进行MD5加密
	 * @param value
	 * @return
	 */
	public static String encode(String value){
		
		try{
			byte[] btInput = value.getBytes();
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(btInput);
            // 获得密文
            byte[] md = mdInst.digest();
            return Base64.getEncoder().encodeToString(md);
		}catch(Exception ex){
			throw new RuntimeException("MD5加密失败", ex.getCause());
		}
	}
	
	public static void main(String[] args) {
		System.out.println(encode("123"));
		System.out.println(encode("adsfsadf2").length());
	}
}