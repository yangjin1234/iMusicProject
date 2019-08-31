package com.teach.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.github.pagehelper.PageHelper;
import com.teach.dto.MusicDTO;
import com.teach.entity.Music;
import com.teach.entity.Singer;
import com.teach.entity.Systemlist;
import com.teach.mapper.MusicMapper;
import com.teach.mapper.SingerMapper;
import com.teach.mapper.SystemlistMapper;
@Controller
public class SystemListServiceImpl {
	Systemlist sys=null;
	Music m=null;
	Singer s=null;
	MusicDTO md=null;
	@Autowired
	private SystemlistMapper slmapper;
	private MusicMapper mmapper;
	private SingerMapper smapper;
	
	public List<Music> selectMusic(int systemId,int page,int count)
	{
		sys=slmapper.selectByPrimaryKey(systemId);
		String musicid=sys.getSystemlistMusicIds();
		PageHelper.startPage(page,count);
		List<Music> list=mmapper.selectByIds(musicid);
		return list;
//		List<MusicDTO> list=new ArrayList<MusicDTO>();
//		sys=slmapper.selectByPrimaryKey(systemId);
//		String musicid=sys.getSystemlistMusicIds();
//		String[] str=musicid.split(",");
//		for (String string : str) {
//			System.out.println("string==="+str);
//			m=mmapper.selectByPrimaryKey(string);
//			//得到music表的所有字段信息
//			String maId=m.getMusicAlbumId();
//			int meId=m.getMusicEmotionId();
//			String mf=m.getMusicFile();
//			int mg=m.getMusicGrade();
//			String mId=m.getMusicId();
//			String mi=m.getMusicInfo();
//			int mlId=m.getMusicLanguageId();
//			String mn=m.getMusicName();
//			String mp=m.getMusicPicture();
//			int mpn=m.getMusicPlaynum();
//			String msId=m.getMusicSingerId();
//			int msyId=m.getMusicStyleId();
//			int mtId=m.getMusicThemeId();
//			String mvId=m.getMusicVideoId();
//			String mw=m.getMusicWord();
//			s=smapper.selectByPrimaryKey(m.getMusicSingerId());
//			//得到歌手表的所有字段信息
//			int sa=s.getSingerAge();
//			String sd=s.getSingerDescription();
//			String sId=s.getSingerId();
//			String sn=s.getSingerName();
//			String snl=s.getSingerNationality();
//			String sp=s.getSingerPicture();
//			String ss=s.getSingerSex();
//			//将music表与singer表字段全部存储在musicdto实体中
//			md=new MusicDTO();
//			md.setMusicAlbumId(maId);
//			md.setMusicEmotionId(meId);
//			md.setMusicFile(mf);
//			md.setMusicGrade(mg);
//			md.setMusicId(mId);
//			md.setMusicInfo(mi);
//			md.setMusicLanguageId(mlId);
//			md.setMusicName(mn);
//			md.setMusicPicture(mp);
//			md.setMusicPlaynum(mpn);
//			md.setMusicSingerId(msId);
//			md.setMusicStyleId(msyId);
//			md.setMusicThemeId(mtId);
//			md.setMusicVideoId(mvId);
//			md.setMusicWord(mw);
//			md.setSingerAge(sa);
//			md.setSingerDescription(sd);
//			md.setSingerId(sId);
//			md.setSingerName(sn);
//			md.setSingerNationality(snl);
//			md.setSingerPicture(sp);
//			md.setSingerSex(ss);
//			list.add(md);
//		}
//		return list;
		
	}
	

}
