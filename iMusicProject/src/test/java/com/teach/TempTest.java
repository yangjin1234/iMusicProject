package com.teach;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Random;

import org.junit.jupiter.api.Test;

public class TempTest {

	
	
	@Test
	public void test1()throws Exception {
		String a = "a a+a中";
		String b = URLEncoder.encode(a, "UTF-8");
		String c = URLDecoder.decode(b, "UTF-8");
		System.out.println(a);
		System.out.println(b);
		System.out.println(c);
	}
	
	@Test
	public void test2() {
		Random r = new Random();
		for(int i=0;i<100;i++) {
			System.out.println(r.nextGaussian());
		}
	}
}
