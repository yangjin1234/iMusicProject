package com.teach.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.github.pagehelper.Page;
import com.teach.dto.MusicDTO;
import com.teach.entity.Music;
import com.teach.entity.Singer;
import com.teach.mapper.SingerMapper;
import com.teach.mapper.SystemlistMapper;
import com.teach.service.SystemListService;

@Controller
public class SystemlistController {
	@Autowired
	private SingerMapper sm;
	@Autowired
	private SystemListService service;
	@RequestMapping("/templates/{page}")
	public String index(ModelMap model,@PathVariable("page") int page){
		Singer s=null;
		MusicDTO md=null;
		List<MusicDTO> list1=new ArrayList<MusicDTO>();
		int count = 10;
		List<Music> beans = service.selectMusic(1, page, count);//1为分页进来的第一个id
		int max = ((Page)beans).getPages();
		int cp = ((Page)beans).getPageNum();
		int[] nums = new int[max];
		for(int i=1;i<=max;i++){
			nums[i-1] = i;
		}
		for (Music m : beans) {
			
			String maId=m.getMusicAlbumId();
			int meId=m.getMusicEmotionId();
			String mf=m.getMusicFile();
			int mg=m.getMusicGrade();
			String mId=m.getMusicId();
			String mi=m.getMusicInfo();
			int mlId=m.getMusicLanguageId();
			String mn=m.getMusicName();
			String mp=m.getMusicPicture();
			int mpn=m.getMusicPlaynum();
			String msId=m.getMusicSingerId();
			int msyId=m.getMusicStyleId();
			int mtId=m.getMusicThemeId();
			String mvId=m.getMusicVideoId();
			String mw=m.getMusicWord();
			s=sm.selectByPrimaryKey(m.getMusicSingerId());
			//得到歌手表的所有字段信息
			int sa=s.getSingerAge();
			String sd=s.getSingerDescription();
			String sId=s.getSingerId();
			String sn=s.getSingerName();
			String snl=s.getSingerNationality();
			String sp=s.getSingerPicture();
			String ss=s.getSingerSex();
			//将music表与singer表字段全部存储在musicdto实体中
			md=new MusicDTO();
			md.setMusicAlbumId(maId);
			md.setMusicEmotionId(meId);
			md.setMusicFile(mf);
			md.setMusicGrade(mg);
			md.setMusicId(mId);
			md.setMusicInfo(mi);
			md.setMusicLanguageId(mlId);
			md.setMusicName(mn);
			md.setMusicPicture(mp);
			md.setMusicPlaynum(mpn);
			md.setMusicSingerId(msId);
			md.setMusicStyleId(msyId);
			md.setMusicThemeId(mtId);
			md.setMusicVideoId(mvId);
			md.setMusicWord(mw);
			md.setSingerAge(sa);
			md.setSingerDescription(sd);
			md.setSingerId(sId);
			md.setSingerName(sn);
			md.setSingerNationality(snl);
			md.setSingerPicture(sp);
			md.setSingerSex(ss);
			list1.add(md);
			
		}
		
		model.put("list1", list1);
		model.put("nums", nums);
		model.put("cp", cp);
		return "list";
	}
	

}
