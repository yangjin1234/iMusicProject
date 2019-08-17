package com.teach.mapper;

import com.teach.entity.Comment;
import com.teach.entity.CommentWithBLOBs;

public interface CommentMapper {
    int deleteByPrimaryKey(String commentId);

    int insert(CommentWithBLOBs record);

    int insertSelective(CommentWithBLOBs record);

    CommentWithBLOBs selectByPrimaryKey(String commentId);

    int updateByPrimaryKeySelective(CommentWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(CommentWithBLOBs record);

    int updateByPrimaryKey(Comment record);
}