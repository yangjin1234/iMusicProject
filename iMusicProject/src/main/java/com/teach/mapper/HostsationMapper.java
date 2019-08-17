package com.teach.mapper;

import com.teach.entity.Hostsation;

public interface HostsationMapper {
    int deleteByPrimaryKey(String hoststationId);

    int insert(Hostsation record);

    int insertSelective(Hostsation record);

    Hostsation selectByPrimaryKey(String hoststationId);

    int updateByPrimaryKeySelective(Hostsation record);

    int updateByPrimaryKeyWithBLOBs(Hostsation record);

    int updateByPrimaryKey(Hostsation record);
}