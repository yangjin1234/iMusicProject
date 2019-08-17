package com.teach.mapper;

import com.teach.entity.Collect;

public interface CollectMapper {
    int deleteByPrimaryKey(String collectId);

    int insert(Collect record);

    int insertSelective(Collect record);

    Collect selectByPrimaryKey(String collectId);

    int updateByPrimaryKeySelective(Collect record);

    int updateByPrimaryKeyWithBLOBs(Collect record);

    int updateByPrimaryKey(Collect record);
}