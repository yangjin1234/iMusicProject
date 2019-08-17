package com.teach.mapper;

import com.teach.entity.Usersong;

public interface UsersongMapper {
    int deleteByPrimaryKey(String usersongId);

    int insert(Usersong record);

    int insertSelective(Usersong record);

    Usersong selectByPrimaryKey(String usersongId);

    int updateByPrimaryKeySelective(Usersong record);

    int updateByPrimaryKey(Usersong record);
}