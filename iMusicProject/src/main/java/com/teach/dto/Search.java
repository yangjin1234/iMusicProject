package com.teach.dto;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/**
 * <pre>
 * TODO:含基础搜素条件的分页查询模型
 * ClassName : com.teach.dto.Search
 * Author : J.L.Zhou
 * Date : 2019年8月9日 下午6:12:25
 * Version : V1.0
 * @param <T>
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
@Data
public class Search {
	
	/**
	 * 当前页面，默认：1
	 */
	private Integer current = 1;
	
	/**
	 * 每页最大数，默认：10
	 */
	private Integer rowMax = 10;
	/**
	 * 是否需要统计总数，默认：true
	 */
	private Boolean isSearchCount = true;
	

	/**
	 * 通用开始日期，格式:yyyy-MM-dd
	 */
	@JsonFormat(pattern = "yyyy-MM-dd")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date startDate;
	
	/**
	 * 通用结束时间，格式:yyyy-MM-dd
	 */
	@JsonFormat(pattern = "yyyy-MM-dd")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date endDate;

	/**
	 * 通用开始时间，格式：yyyy-MM-dd HH:mm
	 */
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	private Date startTime;
	/**
	 * 通用结束时间，格式：yyyy-MM-dd HH:mm
	 */
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	private Date endTime;
	
	/**
	 * 通用关键字
	 */
	private String key;
	
	/**
	 * 通用排序条件，需要成对设置,如:{"a","asc","b","desc"}
	 */
	private String[] orderBy;


	public void setStartDate(Date startDate) {
		this.startDate = startDate;
		formatStartEnd(this.startDate, this.endDate);
	}


	public void setEndDate(Date endDate) {
		this.endDate = endDate;
		formatStartEnd(this.startDate, this.endDate);
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
		formatStartEnd(this.startTime, this.endTime);
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
		formatStartEnd(this.startTime, this.endTime);
	}

	/**
	 * 调整时间，确保第一个时间小于第二个时间
	 * @param d1
	 * @param d2
	 */
	private void formatStartEnd(Date d1, Date d2) {
		if (d1 != null && d2 != null) {
			if(d1.after(d2)) {
				long d3 = d2.getTime();
				d2.setTime(d1.getTime());
				d1.setTime(d3);
			}
		}
	}

}
