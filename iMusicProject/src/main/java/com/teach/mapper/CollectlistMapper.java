package com.teach.mapper;

import com.teach.entity.Collectlist;

public interface CollectlistMapper {
    int deleteByPrimaryKey(String collectlistId);

    int insert(Collectlist record);

    int insertSelective(Collectlist record);

    Collectlist selectByPrimaryKey(String collectlistId);

    int updateByPrimaryKeySelective(Collectlist record);

    int updateByPrimaryKeyWithBLOBs(Collectlist record);

    int updateByPrimaryKey(Collectlist record);
}