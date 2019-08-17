package com.teach.mapper;

import com.teach.entity.Systemnotice;

public interface SystemnoticeMapper {
    int deleteByPrimaryKey(String systemnoticeId);

    int insert(Systemnotice record);

    int insertSelective(Systemnotice record);

    Systemnotice selectByPrimaryKey(String systemnoticeId);

    int updateByPrimaryKeySelective(Systemnotice record);

    int updateByPrimaryKeyWithBLOBs(Systemnotice record);

    int updateByPrimaryKey(Systemnotice record);
}