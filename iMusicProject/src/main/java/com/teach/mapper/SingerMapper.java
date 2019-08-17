package com.teach.mapper;

import com.teach.entity.Singer;

public interface SingerMapper {
    int deleteByPrimaryKey(String singerId);

    int insert(Singer record);

    int insertSelective(Singer record);

    Singer selectByPrimaryKey(String singerId);

    int updateByPrimaryKeySelective(Singer record);

    int updateByPrimaryKey(Singer record);
}