package com.teach.mapper;

import com.teach.entity.Chat;

public interface ChatMapper {
    int deleteByPrimaryKey(String chatId);

    int insert(Chat record);

    int insertSelective(Chat record);

    Chat selectByPrimaryKey(String chatId);

    int updateByPrimaryKeySelective(Chat record);

    int updateByPrimaryKeyWithBLOBs(Chat record);

    int updateByPrimaryKey(Chat record);
}