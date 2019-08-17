package com.teach.dto;


import lombok.Data;

@Data
public class LoginUserDTO {

	private String userName;
	private Integer roleId;
	private String userRealName;
	private String roleName;
	
}
