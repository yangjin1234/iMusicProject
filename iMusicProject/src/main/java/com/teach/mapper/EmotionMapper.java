package com.teach.mapper;

import com.teach.entity.Emotion;

public interface EmotionMapper {
    int deleteByPrimaryKey(Integer emotionId);

    int insert(Emotion record);

    int insertSelective(Emotion record);

    Emotion selectByPrimaryKey(Integer emotionId);

    int updateByPrimaryKeySelective(Emotion record);

    int updateByPrimaryKey(Emotion record);
}