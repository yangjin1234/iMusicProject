package com.teach.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.teach.mapper.SystemlistMapper;

@Controller
public class SystemlistController {
	@Autowired
	private SystemlistMapper mapper;
	
	

}
