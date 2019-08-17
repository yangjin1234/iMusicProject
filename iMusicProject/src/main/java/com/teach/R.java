package com.teach;

import java.util.HashMap;
import java.util.Map;

/**
 * 用于SpringMVC的JSON消息返回
 * 消息属性：
 * 	ok:true/false
 * 	code:int 消息编号
 *  message:String 消息内容
 * @author J.L.Zhou
 *
 */
@SuppressWarnings("serial")
public class R extends HashMap<String, Object> {

	private R(){
		super();
	}
	
	private R(boolean ok){
		super();
		this.put("ok",ok);
	}
	
	public static R error(){
		return new R(false);
	}
	
	public static R error(int code){
		return new R(false).put("code", code);
	}
	
	public static R error(String message){
		return new R(false).put("message", message);
	}
	
	public static R error(int code,String message){
		return new R(false).put("code", code).put("message", message);
	}
	
	public static R error(Map<String, Object> map){
		R r = new R(false);
		r.putAll(map);
		return r;
	}
	
	public static R empty(){
		return new R();
	}
	
	public static R ok(){
		return new R(true);
	}
	
	public static R ok(int code){
		return new R(true).put("code", code);
	}
	
	public static R ok(String message){
		return new R(true).put("message", message);
	}
	
	public static R ok(int code,String message){
		return new R(true).put("code", code).put("message", message);
	}
	
	public static R ok(Map<String, Object> map){
		R r = new R(true);
		r.putAll(map);
		return r;
	}
	
	

	@Override
	public R put(String key, Object value) {
		super.put(key, value);
		return this;
	}

	@Override
	public R remove(Object key) {
		super.remove(key);
		return this;
	}
	
	 
}
