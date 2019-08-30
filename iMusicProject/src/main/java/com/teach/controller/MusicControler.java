/**
 * 
 */
package com.teach.controller;

import javax.jws.WebParam.Mode;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teach.R;

import lombok.extern.slf4j.Slf4j;

/**
 * ClassName:com.teach.controller.MusicControler
 * @author yangjin 
 * Date:2019年8月24日 上午11:09:48
 * Version:V1.0
 */
@RestController
@RequestMapping("/music")
@Slf4j
public class MusicControler {

	@RequestMapping("/play.do")
	public R playMusic(String obj) {
		log.info("进入l{}",obj);
		return null;
		
	}
}
