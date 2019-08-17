package com.teach.dto;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.annotation.JsonFormat;


public class UserRegFormDTO {

    private String userName;
    private String userPwd;
    private String userRealName;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date userBirthdate;
    private Boolean userSex;
    private String userTel;
    private String userQq;
    private String userIdcard;
    private String userAddress;
    private String userImg;
    
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPwd() {
		return userPwd;
	}
	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}
	public String getUserRealName() {
		return userRealName;
	}
	public void setUserRealName(String userRealName) {
		this.userRealName = userRealName;
	}
	public Date getUserBirthdate() {
		return userBirthdate;
	}
	public void setUserBirthdate(Date userBirthdate) {
		this.userBirthdate = userBirthdate;
	}
	public Boolean getUserSex() {
		return userSex;
	}
	public void setUserSex(Boolean userSex) {
		this.userSex = userSex;
	}
	public String getUserTel() {
		return userTel;
	}
	public void setUserTel(String userTel) {
		this.userTel = userTel;
	}
	public String getUserQq() {
		return userQq;
	}
	public void setUserQq(String userQq) {
		this.userQq = userQq;
	}
	public String getUserIdcard() {
		return userIdcard;
	}
	public void setUserIdcard(String userIdcard) {
		this.userIdcard = userIdcard;
	}
	public String getUserAddress() {
		return userAddress;
	}
	public void setUserAddress( String userAddress) {
		this.userAddress = userAddress;
	}
	public String getUserImg() {
		return userImg;
	}
	public void setUserImg(String userImg) {
		this.userImg = userImg;
	}
    
    

}
