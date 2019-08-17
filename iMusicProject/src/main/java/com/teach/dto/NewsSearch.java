/**
 * 
 */
package com.teach.dto;


import lombok.Data;

/**<pre>
 * TODO:新闻搜索条件
 * ClassName : com.teach.dto.NewsSearch
 * Author : J.L.Zhou
 * Date : 2019年8月9日 下午6:25:12
 * Version : V1.0
 * Copyright 2019 jlzhou.top Inc. All rights reserved. 
 * Warning：本内容仅限于公司内部传阅，禁止外泄以及用于其他的商业目.</pre>
 */
@Data
public class NewsSearch extends Search {

	private Integer newsClassId;
	
	private String userName;
	
}
