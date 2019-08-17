package com.teach.mapper;

import com.teach.entity.Language;

public interface LanguageMapper {
    int deleteByPrimaryKey(Integer languageId);

    int insert(Language record);

    int insertSelective(Language record);

    Language selectByPrimaryKey(Integer languageId);

    int updateByPrimaryKeySelective(Language record);

    int updateByPrimaryKey(Language record);
}