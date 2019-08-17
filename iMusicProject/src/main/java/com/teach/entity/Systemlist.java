package com.teach.entity;

import java.util.Date;

public class Systemlist {
    private Integer systemlistId;

    private String systemlistName;

    private String systemlistPicture;

    private String systemlistMessage;

    private Integer systemlistPlaynum;

    private Date systemlistDate;

    private String systemlistMusicIds;

    public Integer getSystemlistId() {
        return systemlistId;
    }

    public void setSystemlistId(Integer systemlistId) {
        this.systemlistId = systemlistId;
    }

    public String getSystemlistName() {
        return systemlistName;
    }

    public void setSystemlistName(String systemlistName) {
        this.systemlistName = systemlistName;
    }

    public String getSystemlistPicture() {
        return systemlistPicture;
    }

    public void setSystemlistPicture(String systemlistPicture) {
        this.systemlistPicture = systemlistPicture;
    }

    public String getSystemlistMessage() {
        return systemlistMessage;
    }

    public void setSystemlistMessage(String systemlistMessage) {
        this.systemlistMessage = systemlistMessage;
    }

    public Integer getSystemlistPlaynum() {
        return systemlistPlaynum;
    }

    public void setSystemlistPlaynum(Integer systemlistPlaynum) {
        this.systemlistPlaynum = systemlistPlaynum;
    }

    public Date getSystemlistDate() {
        return systemlistDate;
    }

    public void setSystemlistDate(Date systemlistDate) {
        this.systemlistDate = systemlistDate;
    }

    public String getSystemlistMusicIds() {
        return systemlistMusicIds;
    }

    public void setSystemlistMusicIds(String systemlistMusicIds) {
        this.systemlistMusicIds = systemlistMusicIds;
    }
}