package com.teach.entity;

import java.util.Date;

public class Comment {
    private String commentId;

    private String commentUserId;

    private String commentId2;

    private Date commentDate;

    private Integer commentType;

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public String getCommentUserId() {
        return commentUserId;
    }

    public void setCommentUserId(String commentUserId) {
        this.commentUserId = commentUserId;
    }

    public String getCommentId2() {
        return commentId2;
    }

    public void setCommentId2(String commentId2) {
        this.commentId2 = commentId2;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }

    public Integer getCommentType() {
        return commentType;
    }

    public void setCommentType(Integer commentType) {
        this.commentType = commentType;
    }
}