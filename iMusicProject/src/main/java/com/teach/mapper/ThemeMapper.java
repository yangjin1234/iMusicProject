package com.teach.mapper;

import com.teach.entity.Theme;

public interface ThemeMapper {
    int deleteByPrimaryKey(Integer themeId);

    int insert(Theme record);

    int insertSelective(Theme record);

    Theme selectByPrimaryKey(Integer themeId);

    int updateByPrimaryKeySelective(Theme record);

    int updateByPrimaryKey(Theme record);
}