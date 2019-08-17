package com.teach.mapper;

import com.teach.entity.Ordertable;

public interface OrdertableMapper {
    int deleteByPrimaryKey(Integer ordertableId);

    int insert(Ordertable record);

    int insertSelective(Ordertable record);

    Ordertable selectByPrimaryKey(Integer ordertableId);

    int updateByPrimaryKeySelective(Ordertable record);

    int updateByPrimaryKey(Ordertable record);
}