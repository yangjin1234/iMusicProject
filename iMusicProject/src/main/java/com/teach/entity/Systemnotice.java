package com.teach.entity;

import java.util.Date;

public class Systemnotice {
    private String systemnoticeId;

    private String systemnoticeName;

    private Date systemnoticeDate;

    private String systemnoticeContent;

    public String getSystemnoticeId() {
        return systemnoticeId;
    }

    public void setSystemnoticeId(String systemnoticeId) {
        this.systemnoticeId = systemnoticeId;
    }

    public String getSystemnoticeName() {
        return systemnoticeName;
    }

    public void setSystemnoticeName(String systemnoticeName) {
        this.systemnoticeName = systemnoticeName;
    }

    public Date getSystemnoticeDate() {
        return systemnoticeDate;
    }

    public void setSystemnoticeDate(Date systemnoticeDate) {
        this.systemnoticeDate = systemnoticeDate;
    }

    public String getSystemnoticeContent() {
        return systemnoticeContent;
    }

    public void setSystemnoticeContent(String systemnoticeContent) {
        this.systemnoticeContent = systemnoticeContent;
    }
}