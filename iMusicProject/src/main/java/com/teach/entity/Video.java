package com.teach.entity;

public class Video {
    private String videoId;

    private String videoName;

    private Integer videoPlaynum;

    private String videoFile;

    private String videoMessage;

    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }

    public Integer getVideoPlaynum() {
        return videoPlaynum;
    }

    public void setVideoPlaynum(Integer videoPlaynum) {
        this.videoPlaynum = videoPlaynum;
    }

    public String getVideoFile() {
        return videoFile;
    }

    public void setVideoFile(String videoFile) {
        this.videoFile = videoFile;
    }

    public String getVideoMessage() {
        return videoMessage;
    }

    public void setVideoMessage(String videoMessage) {
        this.videoMessage = videoMessage;
    }
}