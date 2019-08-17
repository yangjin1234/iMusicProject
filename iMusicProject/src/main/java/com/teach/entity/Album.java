package com.teach.entity;

import java.util.Date;

public class Album {
    private String albumId;

    private String singerId;

    private String albumName;

    private String albumCover;

    private String albumInfo;

    private Integer albumPlaynum;

    private Date albumDate;

    private String albumMusicIds;

    public String getAlbumId() {
        return albumId;
    }

    public void setAlbumId(String albumId) {
        this.albumId = albumId;
    }

    public String getSingerId() {
        return singerId;
    }

    public void setSingerId(String singerId) {
        this.singerId = singerId;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getAlbumCover() {
        return albumCover;
    }

    public void setAlbumCover(String albumCover) {
        this.albumCover = albumCover;
    }

    public String getAlbumInfo() {
        return albumInfo;
    }

    public void setAlbumInfo(String albumInfo) {
        this.albumInfo = albumInfo;
    }

    public Integer getAlbumPlaynum() {
        return albumPlaynum;
    }

    public void setAlbumPlaynum(Integer albumPlaynum) {
        this.albumPlaynum = albumPlaynum;
    }

    public Date getAlbumDate() {
        return albumDate;
    }

    public void setAlbumDate(Date albumDate) {
        this.albumDate = albumDate;
    }

    public String getAlbumMusicIds() {
        return albumMusicIds;
    }

    public void setAlbumMusicIds(String albumMusicIds) {
        this.albumMusicIds = albumMusicIds;
    }
}