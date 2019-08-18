package com.teach.mapper;

import com.teach.entity.Dynamic;
import com.teach.entity.DynamicWithBLOBs;

public interface DynamicMapper {
    int deleteByPrimaryKey(String dynamicId);

    int insert(DynamicWithBLOBs record);

    int insertSelective(DynamicWithBLOBs record);

    DynamicWithBLOBs selectByPrimaryKey(String dynamicId);

    int updateByPrimaryKeySelective(DynamicWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(DynamicWithBLOBs record);

    int updateByPrimaryKey(Dynamic record);
}