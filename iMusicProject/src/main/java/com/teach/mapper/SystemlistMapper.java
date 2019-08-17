package com.teach.mapper;

import com.teach.entity.Systemlist;

public interface SystemlistMapper {
    int deleteByPrimaryKey(Integer systemlistId);

    int insert(Systemlist record);

    int insertSelective(Systemlist record);

    Systemlist selectByPrimaryKey(Integer systemlistId);

    int updateByPrimaryKeySelective(Systemlist record);

    int updateByPrimaryKeyWithBLOBs(Systemlist record);

    int updateByPrimaryKey(Systemlist record);
}