package com.teach.mapper;

import com.teach.entity.Style;

public interface StyleMapper {
    int deleteByPrimaryKey(Integer styleId);

    int insert(Style record);

    int insertSelective(Style record);

    Style selectByPrimaryKey(Integer styleId);

    int updateByPrimaryKeySelective(Style record);

    int updateByPrimaryKey(Style record);
}