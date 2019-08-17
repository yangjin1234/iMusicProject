package com.teach.mapper;

import com.teach.entity.Anchor;

public interface AnchorMapper {
    int deleteByPrimaryKey(String anchorId);

    int insert(Anchor record);

    int insertSelective(Anchor record);

    Anchor selectByPrimaryKey(String anchorId);

    int updateByPrimaryKeySelective(Anchor record);

    int updateByPrimaryKey(Anchor record);
}