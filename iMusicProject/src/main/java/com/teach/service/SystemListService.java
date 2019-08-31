package com.teach.service;

import java.util.List;

import com.teach.entity.Music;

public interface SystemListService {
	public List<Music> selectMusic(int systemId,int page,int count);

}
