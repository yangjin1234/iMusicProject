package com.teach.entity;

public class CommentWithBLOBs extends Comment {
    private String commentContent;

    private String commentMainId;

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public String getCommentMainId() {
        return commentMainId;
    }

    public void setCommentMainId(String commentMainId) {
        this.commentMainId = commentMainId;
    }
}