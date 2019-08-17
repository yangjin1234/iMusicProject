package com.teach.mapper;

import com.teach.entity.Music;

public interface MusicMapper {
    int deleteByPrimaryKey(String musicId);

    int insert(Music record);

    int insertSelective(Music record);

    Music selectByPrimaryKey(String musicId);

    int updateByPrimaryKeySelective(Music record);

    int updateByPrimaryKey(Music record);
}