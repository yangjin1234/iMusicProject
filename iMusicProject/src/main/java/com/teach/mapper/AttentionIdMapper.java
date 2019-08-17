package com.teach.mapper;

import com.teach.entity.AttentionId;
import java.util.Date;

public interface AttentionIdMapper {
    int deleteByPrimaryKey(Date attentionTime);

    int insert(AttentionId record);

    int insertSelective(AttentionId record);

    AttentionId selectByPrimaryKey(Date attentionTime);

    int updateByPrimaryKeySelective(AttentionId record);

    int updateByPrimaryKey(AttentionId record);
}