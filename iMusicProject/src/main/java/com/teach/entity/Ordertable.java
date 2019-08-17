package com.teach.entity;

public class Ordertable {
    private Integer ordertableId;

    private String userId;

    private String ordertableNumber;

    private String ordertableInfo;

    private Float ordertableState;

    public Integer getOrdertableId() {
        return ordertableId;
    }

    public void setOrdertableId(Integer ordertableId) {
        this.ordertableId = ordertableId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getOrdertableNumber() {
        return ordertableNumber;
    }

    public void setOrdertableNumber(String ordertableNumber) {
        this.ordertableNumber = ordertableNumber;
    }

    public String getOrdertableInfo() {
        return ordertableInfo;
    }

    public void setOrdertableInfo(String ordertableInfo) {
        this.ordertableInfo = ordertableInfo;
    }

    public Float getOrdertableState() {
        return ordertableState;
    }

    public void setOrdertableState(Float ordertableState) {
        this.ordertableState = ordertableState;
    }
}