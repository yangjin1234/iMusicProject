package com.teach.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class DateDto {

	@JsonFormat(pattern = "yyyy年MM月dd日")
	private Date d1 = new Date();
	
	@JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss.SSS")
	private Date d2 = new Date();
}
