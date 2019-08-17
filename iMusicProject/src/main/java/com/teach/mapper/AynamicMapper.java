package com.teach.mapper;

import com.teach.entity.Aynamic;
import com.teach.entity.AynamicWithBLOBs;

public interface AynamicMapper {
    int deleteByPrimaryKey(String aynamicId);

    int insert(AynamicWithBLOBs record);

    int insertSelective(AynamicWithBLOBs record);

    AynamicWithBLOBs selectByPrimaryKey(String aynamicId);

    int updateByPrimaryKeySelective(AynamicWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(AynamicWithBLOBs record);

    int updateByPrimaryKey(Aynamic record);
}