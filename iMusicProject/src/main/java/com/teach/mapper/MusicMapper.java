package com.teach.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.teach.entity.Music;

import io.lettuce.core.dynamic.annotation.Param;

public interface MusicMapper {
    int deleteByPrimaryKey(String musicId);

    int insert(Music record);

    int insertSelective(Music record);

    Music selectByPrimaryKey(String musicId);

    int updateByPrimaryKeySelective(Music record);

    int updateByPrimaryKey(Music record);
    @Select("select * from music where musicId='${ids}'")
    List<Music> selectByIds(@Param("ids") String mId); 
}