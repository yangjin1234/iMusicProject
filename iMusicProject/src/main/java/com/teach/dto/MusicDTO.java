package com.teach.dto;

import lombok.Data;

@Data
public class MusicDTO {
	//music表字段
	private String musicId;

    private String musicSingerId;

    private String musicAlbumId;

    private String musicVideoId;

    private Integer musicEmotionId;

    private Integer musicStyleId;

    private Integer musicThemeId;

    private Integer musicLanguageId;

    private String musicName;

    private String musicFile;

    private String musicWord;

    private String musicPicture;

    private String musicInfo;

    private Integer musicPlaynum;

    private Integer musicGrade;
    
    //singer表字段
    private String singerId;

    private String singerName;

    private Integer singerAge;

    private String singerSex;

    private String singerDescription;

    private String singerPicture;

    private String singerNationality;
}
