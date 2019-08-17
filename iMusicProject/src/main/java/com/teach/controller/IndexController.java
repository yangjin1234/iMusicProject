package com.teach.controller;

import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.teach.R;
import com.teach.commons.Id;
import com.teach.dto.DateDto;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/")
@Slf4j
public class IndexController {
	
	@Autowired
	private Id id;
	
	@Autowired
	private ObjectMapper objectMapper;
	

	@GetMapping("json.do")
	public Object doJSON() throws JsonProcessingException {
		if(log.isDebugEnabled()) {
			log.debug("aaaa:"+objectMapper.writeValueAsString(new Date()));
		}
		return new Date();
	}
	

	@GetMapping("jsonp.do")
	public void doJSONP(HttpServletResponse response, @RequestParam(defaultValue = "callback") String callback) throws Exception {
		R r = R.ok().put("datacenterId", id.getDatacenterId())
		.put("workerId", id.getWorkerId())
		.put("nextId", id.nextId())
		.put("root", this.getClass().getResource("/"));
		
		response.setContentType("text/javascript");
		response.getWriter().print(callback);
		response.getWriter().print("(");
		response.getWriter().print(objectMapper.writeValueAsString(r));
		response.getWriter().print(")");
		response.getWriter().close();
	}
	
	@GetMapping("id.do")
	@CrossOrigin
	public R doId() {
		return R.ok().put("datacenterId", id.getDatacenterId())
				.put("workerId", id.getWorkerId())
				.put("nextId", id.nextId())
				.put("root", this.getClass().getResource("/"));
	}
	
	@GetMapping("date.do")
	public R doDate() {
		return R.ok().put("date", new DateDto());
	}
}
