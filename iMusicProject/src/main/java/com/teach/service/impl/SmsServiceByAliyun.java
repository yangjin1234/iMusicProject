package com.teach.service.impl;

/**<pre>
 * TODO:验证码短信发送服务的阿里云实现
 * ClassName : com.teach.service.impl.SmsServiceByAliyun
 * Author : J.L.Zhou
 * Date : 2019年8月10日 下午10:29:29
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.teach.config.ConfigProperties;
import com.teach.exception.CodeException;
import com.teach.service.SmsCacheService;
import com.teach.service.SmsService;

import lombok.extern.slf4j.Slf4j;

/**
 * <pre>
 * TODO:短信验证码的阿里云实现
 * ClassName : com.teach.service.impl.SmsServiceByAliyun
 * Author : J.L.Zhou
 * Date : 2019年8月10日 下午10:32:49
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
@Service
@Slf4j
public class SmsServiceByAliyun implements SmsService {

	@Autowired
	private ConfigProperties config;
	
	@Autowired
	private SmsCacheService cache;


	private Random random = new Random();

	// 产品名称:云通信短信API产品,开发者无需替换
	private static final String product = "Dysmsapi";
	// 产品域名,开发者无需替换
	private static final String domain = "dysmsapi.aliyuncs.com";


	
	private Map<String,String> codeMessage = new HashMap<String,String>();
	
	{
		codeMessage.put("OK","请求成功");
		codeMessage.put("isp.RAM_PERMISSION_DENY","RAM权限DENY");
		codeMessage.put("isv.OUT_OF_SERVICE","业务停机");
		codeMessage.put("isv.PRODUCT_UN_SUBSCRIPT","未开通云通信产品的阿里云客户");
		codeMessage.put("isv.PRODUCT_UNSUBSCRIBE","产品未开通");
		codeMessage.put("isv.ACCOUNT_NOT_EXISTS","账户不存在");
		codeMessage.put("isv.ACCOUNT_ABNORMAL","账户异常");
		codeMessage.put("isv.SMS_TEMPLATE_ILLEGAL","短信模板不合法");
		codeMessage.put("isv.SMS_SIGNATURE_ILLEGAL","短信签名不合法");
		codeMessage.put("isv.INVALID_PARAMETERS","参数异常");
		codeMessage.put("isp.SYSTEM_ERROR","系统错误");
		codeMessage.put("isv.MOBILE_NUMBER_ILLEGAL","非法手机号");
		codeMessage.put("isv.MOBILE_COUNT_OVER_LIMIT","手机号码数量超过限制");
		codeMessage.put("isv.TEMPLATE_MISSING_PARAMETERS","模板缺少变量");
		codeMessage.put("isv.BUSINESS_LIMIT_CONTROL","业务限流");
		codeMessage.put("isv.INVALID_JSON_PARAM","JSON参数不合法，只接受字符串值");
		codeMessage.put("isv.BLACK_KEY_CONTROL_LIMIT","黑名单管控");
		codeMessage.put("isv.PARAM_LENGTH_LIMIT","参数超出长度限制");
		codeMessage.put("isv.PARAM_NOT_SUPPORT_URL","不支持URL");
		codeMessage.put("isv.AMOUNT_NOT_ENOUGH","账户余额不足");
	}

	@Override
	public String getRandomCode(int len) {
		String codes = config.sms.codes;
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < len; i++) {
			sb.append(codes.charAt(random.nextInt(codes.length())));
		}
		log.debug("生成{}位验证码:{}", len, sb);
		return sb.toString();
	}

	@Override
	public String send(String tel)  {
		String code = getRandomCode(6);
		send(tel, code);
		return code;
	}

	@Override
	public void send(String tel, String code)  {
		log.debug("准备发送手机[{}]验证码[{}]", tel, code);
		if(cache.get(tel)!=null){
			throw new CodeException(61);
		}
		SendSmsResponse sendSmsResponse = null;
		try {
			// 可自助调整超时时间
			System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
			System.setProperty("sun.net.client.defaultReadTimeout", "10000");

			// 初始化acsClient,暂不支持region化
			IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", config.sms.aliyun.accessKeyId, config.sms.aliyun.accessKeySecret);
			DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);
			IAcsClient acsClient = new DefaultAcsClient(profile);

			// 组装请求对象-具体描述见控制台-文档部分内容
			SendSmsRequest request = new SendSmsRequest();
			// 必填:待发送手机号
			request.setPhoneNumbers(tel);
			// 必填:短信签名-可在短信控制台中找到
			request.setSignName(config.sms.aliyun.signName);
			log.debug("设置短信签名：{}",config.sms.aliyun.signName);
			// 必填:短信模板-可在短信控制台中找到
			request.setTemplateCode(config.sms.aliyun.templateCode);
			log.debug("设置短信模板签名：{}",config.sms.aliyun.templateCode);
			// 可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时,此处的值为
			request.setTemplateParam("{\"num\":\""+code+"\"}");

			// 选填-上行短信扩展码(无特殊需求用户请忽略此字段)
			// request.setSmsUpExtendCode("90997");

			// 可选:outId为提供给业务方扩展字段,最终在短信回执消息中将此值带回给调用者
			// request.setOutId("yourOutId");

			// hint 此处可能会抛出异常，注意catch
			sendSmsResponse = acsClient.getAcsResponse(request);
		} catch (Exception ex) {
			throw new CodeException(62);
		}
		if(!sendSmsResponse.getCode().equals("OK")){
			String message = codeMessage.get(sendSmsResponse.getCode());
			if(message==null){
				message = sendSmsResponse.getMessage();
			}
			throw new CodeException(62,new Exception(message));
		}else{
			cache.push(tel, code);
			log.debug("加入缓存：手机[{}]验证码[{}]", tel, code);
		}
	}

	@Override
	public boolean check(String tel, String code)  {
		String temp = cache.get(tel);
		log.debug("检查手机[{}]验证码[{}],缓存中掩码[{}]", tel, code, temp);
		if (temp == null) {
			throw new CodeException(63);
		}
		return temp.equals(code);
	}


	/**
	 * 设置Aliyun短信发送响应码对应的消息，已设置默认值
	 * @param codeMessage
	 */
	public void setCodeMessage(Map<String,String> codeMessage){
		this.codeMessage = codeMessage;
	}

	
}
