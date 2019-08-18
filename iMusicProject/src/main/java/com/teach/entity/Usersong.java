package com.teach.entity;

import java.util.Date;

public class Usersong {
    private String usersongId;

    private String usersongUserId;

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

    public String getUsersongUserId() {
        return usersongUserId;
    }

    public void setUsersongUserId(String usersongUserId) {
        this.usersongUserId = usersongUserId;
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