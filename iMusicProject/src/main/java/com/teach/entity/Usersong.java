package com.teach.entity;

import java.util.Date;

public class Usersong {
    private String usersongId;

    private String userId;

    private String usersongName;

    private String usersongMessage;

    private String usersongPicture;

    private Date usersongDate;

    public String getUsersongId() {
        return usersongId;
    }

    public void setUsersongId(String usersongId) {
        this.usersongId = usersongId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsersongName() {
        return usersongName;
    }

    public void setUsersongName(String usersongName) {
        this.usersongName = usersongName;
    }

    public String getUsersongMessage() {
        return usersongMessage;
    }

    public void setUsersongMessage(String usersongMessage) {
        this.usersongMessage = usersongMessage;
    }

    public String getUsersongPicture() {
        return usersongPicture;
    }

    public void setUsersongPicture(String usersongPicture) {
        this.usersongPicture = usersongPicture;
    }

    public Date getUsersongDate() {
        return usersongDate;
    }

    public void setUsersongDate(Date usersongDate) {
        this.usersongDate = usersongDate;
    }
}