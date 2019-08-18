package com.teach.entity;

import java.util.Date;

public class AttentionId {
    private Date attentionTime;

    private String attentionUserIdIng;

    private String attentionUserIdEd;

    public Date getAttentionTime() {
        return attentionTime;
    }

    public void setAttentionTime(Date attentionTime) {
        this.attentionTime = attentionTime;
    }

    public String getAttentionUserIdIng() {
        return attentionUserIdIng;
    }

    public void setAttentionUserIdIng(String attentionUserIdIng) {
        this.attentionUserIdIng = attentionUserIdIng;
    }

    public String getAttentionUserIdEd() {
        return attentionUserIdEd;
    }

    public void setAttentionUserIdEd(String attentionUserIdEd) {
        this.attentionUserIdEd = attentionUserIdEd;
    }
}