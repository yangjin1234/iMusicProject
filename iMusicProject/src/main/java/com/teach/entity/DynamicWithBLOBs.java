package com.teach.entity;

public class DynamicWithBLOBs extends Dynamic {
    private String dynamicInfo;

    private String dynamicLikeIds;

    public String getDynamicInfo() {
        return dynamicInfo;
    }

    public void setDynamicInfo(String dynamicInfo) {
        this.dynamicInfo = dynamicInfo;
    }

    public String getDynamicLikeIds() {
        return dynamicLikeIds;
    }

    public void setDynamicLikeIds(String dynamicLikeIds) {
        this.dynamicLikeIds = dynamicLikeIds;
    }
}