package com.teach.entity;

import java.util.Date;

public class Chat {
    private String chatId;

    private String chatUser1Id;

    private String chatUser2Id;

    private Date chatDate;

    private String chatMessage;

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public String getChatUser1Id() {
        return chatUser1Id;
    }

    public void setChatUser1Id(String chatUser1Id) {
        this.chatUser1Id = chatUser1Id;
    }

    public String getChatUser2Id() {
        return chatUser2Id;
    }

    public void setChatUser2Id(String chatUser2Id) {
        this.chatUser2Id = chatUser2Id;
    }

    public Date getChatDate() {
        return chatDate;
    }

    public void setChatDate(Date chatDate) {
        this.chatDate = chatDate;
    }

    public String getChatMessage() {
        return chatMessage;
    }

    public void setChatMessage(String chatMessage) {
        this.chatMessage = chatMessage;
    }
}