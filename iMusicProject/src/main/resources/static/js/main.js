String.prototype.trim = function(){return this.replace(/^\s*|\s*$/g,"");};


var radioType = {"name":["全部电台","主题电台","风格电台","语言电台","人群电台","地点电台","心情电台"],"id":[0,7,2,3,5,6,4]};
//生成左侧列表
var makeList = function() {
	
    
	
	var htmlStr = "<dl>";
	
	for(var j = 0; j < radioType.name.length; j++) {

		htmlStr +=  "<dd><a hidefocus='true' class='' href='javascript:makeRightList("+radioType.id[j]+","+j+");'>"+radioType.name[j]+"</a></dd>";
		
	}	
	htmlStr += "</dl>";	
	document.getElementById("radioList").innerHTML += htmlStr;
	
}
function setIframeHeight(){
	setTimeout(function(){
		top.document.getElementById("iframe").style.height = document.documentElement.scrollHeight + "px";
	},100)
}
//生成右侧电台列表
var makeRightList = function(n,m){
    
	var aas = document.getElementById("radioList").getElementsByTagName("a");
	for(var s = 0; s < aas.length; s++) {
	    aas.item(s).className = "";	
	}
	aas.item(m).className = "current";
	var htmlStr ="";
	var radioNums = radioData.length;
	var displayRadio = new Array();
	for(var s = 0; s < radioNums; s ++) {
	    if(radioData[s].classid == n) {
		    displayRadio.push(s);	
		} else if(n == 0) {
		    displayRadio.push(s);	
		}	
	}
	var numsStr1 = displayRadio.length.toString();
	
	document.getElementById("radionum").innerHTML = numsStr1;
	document.getElementById("radiotype").innerHTML = radioType.name[m];
	var displayNo = Math.floor(Math.random()*5);
	for(var j = 0; j < displayRadio.length; j++) {

		var radioName = radioData[displayRadio[j]].fmname;
		var imgurl = radioData[displayRadio[j]].imgurl32;
		var radioId = radioData[displayRadio[j]].fmid;
		
		htmlStr +=  "<dd id ="+radioId+"><a hidefocus='true' href='javascript:playRadio("+radioId+");'><i><div id='radioImg"+radioId+"' style='background:url("+ imgurl +")'></div><strong style='display:none' class='pic'></strong><strong style='display:none' class='shadow'></strong></i><em title = '点击收听"+radioName+"电台' class='popu'>"+radioName+"<b class=''></b></em>";
		htmlStr += "<div class='songs'>";
        var songName="";
		for(var k = 0; k < 5 && k < radioData[displayRadio[j]].songs.length; k++) {
			if(radioData[displayRadio[j]].songs!=null){
			  
			 
			  songName = radioData[displayRadio[j]].songs[k].name.replace(/\'/g,"&acute;");
			  
			  if(k == displayNo) {
				  htmlStr += "<span _order='"+k+"' style='display:block' title='"+songName+"'>"+songName+"</span>";	
			  } else {
				  htmlStr += "<span _order='"+k+"' style='display:none' title='"+songName+"'>"+songName+"</span>";	  
			  }
			  
			}		  
		}
		htmlStr += "</div></a></dd>";
	}	
	
	document.getElementById("rightRadioList").innerHTML = htmlStr; 
	
	playOffset = 0;	
	if(typeof(myImageCacheGrid)!='undefined'){
		myImageCacheGrid.showImg(myImageCacheGrid);
	}
	if(m!=0){
	 
	  var dataObj = { "acounterclass":"新版电台分类点击(WEB)", "acountname":radioType.name[m], "astringvalue":"", "acounterdeatiltype" :"0", "anumericvalue" :"1"};	
	  var data = Kg.JSON.stringify(dataObj);  
	  //KgSuperCall.AddStringExCount(data);
	}
	try{
	  var playingid = document.getElementById("webplayer").GetFmId();
	  
	  var tagsor = document.getElementById(playingid).getElementsByTagName("strong");
	  tagsor.item(0).style.display = "block";
	  tagsor.item(1).style.display = "block";
	} catch(ex) {
	  	
	}
}

//改变状态
var randomsort = function(){
    return Math.random()>0.5 ? -1 : 1;
}
var playOffset = 0;
var songOffsets = new Array();
var changeState = function(fmArr){
	
    var fmObj = document.getElementById(fmArr[playOffset]);
    var spans = fmObj.getElementsByTagName("span");
	
	var songNo = Math.floor(Math.random()*5);
	
	for(var i = 0; i < spans.length; i ++) {
		spans.item(i).style.display = "none";	
	}
	if(spans.item(songNo) != null) {
	  	
	
		spans.item(songNo).style.display = "block";
	
		var marginO = 10;
		spans.item(songNo).style.marginTop = marginO+"px";
		
		var timer = setInterval(function(){
			if(marginO>0 && spans.item(songNo) != null) {
				marginO--;
				
				spans.item(songNo).style.marginTop = marginO+"px";
			}
			if(marginO == 0){
				
				clearInterval(timer);
			}
		},100);
	}
	playOffset++;
    playOffset = playOffset%fmArr.length;
	
}

//发送数据到客户端
var changeOrder = function(datas,doms,y,w){
	var orsong = datas[y].songs[0];
    datas[y].songs[0] = datas[y].songs[w];
	datas[y].songs[w] = orsong;
	return datas;
}
// Object.prototype.Clone = function()
//  {
//     var objClone;
//     if ( this.constructor == Object ) objClone = new this.constructor(); 
//     else objClone = new this.constructor(this.valueOf()); 
//     for ( var key in this )
//     {
//         if ( objClone[key] != this[key] )
//         { 
//             if ( typeof(this[key]) == 'object' )
//             { 
//                 objClone[key] = this[key].Clone();
//             }
//             else
//             {
//                 objClone[key] = this[key];
//             }
//         }
//     }
//     objClone.toString = this.toString;
//     objClone.valueOf = this.valueOf;
//     return objClone; 
//  }

var playHotRadio = function(fmid,songOffset){
	var fmInfo = null;
	for(var r = 0; r < hotRadioData.length; r++) {
	    if(hotRadioData[r].fmid == fmid) {
		    fmInfo = hotRadioData[r];	
		    break;
		}	
	}
	if(fmInfo==null){
		return;
	}
	var temp = fmInfo.songs[songOffset];
	fmInfo.songs[songOffset] = fmInfo.songs[0];
	fmInfo.songs[0] = temp;
	sendData(fmInfo,"");
}
var temp;
var changePlayState = function(id){
    
	if(temp != id) {
	  	var tags = document.getElementById(id).getElementsByTagName("strong");
	
		tags.item(0).style.display = "block";
		tags.item(1).style.display = "block";	
		
		try{
			
		  var tagsor = document.getElementById(temp).getElementsByTagName("strong");
		  tagsor.item(0).style.display = "none";
		  tagsor.item(1).style.display = "none";
		} catch(ex) {
			
		}
		temp = id;
	} else if(temp == id) {
	    //暂停播放
		//document.getElementById("webplayer").SetFMdata(dataSendStr);	
	}
	
		
}

var changePlayStateBack = function(id,state){
	if(state == 1) {
	  	var tagsnow = document.getElementById(id).getElementsByTagName("strong");
		tagsnow.item(0).style.display = "none";
		tagsnow.item(1).style.display = "none";	
	} else if(state == 0) {
	    var tagsnow_1 = document.getElementById(id).getElementsByTagName("strong");
		tagsnow_1.item(0).style.display = "block";
		tagsnow_1.item(1).style.display = "block";		
	}
    
}

var playRadio = function(fmid){
    var fmData = radioData;
	var displayRadio = new Array();
	for(var r = 0; r < fmData.length; r++) {
	    if(fmData[r].fmid == fmid) {
		    displayRadio.push(r);	
		}	
	}
	var spans = document.getElementById(fmid).getElementsByTagName("span");
	
	for(var i = 0; i < spans.length; i ++) {
	  if(spans.item(i).style.display == "block") {
		  
		  changeOrder(fmData,spans,displayRadio[0],i);
		  
	  }	
	}	
	sendData(fmData[displayRadio[0]],"");
	changePlayState(fmid);
}

var sendData = function(fmInfo,num){
	
	var r =/[^\x00-\xff]/g;
	var radioName = fmInfo.fmname;
		var changeStr = radioName.replace(r, "mm");
		if(changeStr.length <= 4) {
		  	fmInfo.fmname+="电台";
		}
    var dataSendStr = Kg.JSON.stringify(fmInfo);	
	//console.log("发送数据给flash,micro为"+ num);
	try{
		document.getElementById("webplayer").SetFMdata(dataSendStr,num);
	}catch(e){}
	listenHistory();
	//KgSuperCall.CollectRadio(dataSendStr);SetFMdata(dataSendStr);	
	
}

//创建个性频道页面生成
function getScrollTop(){
var scrollTop=0;
if(document.documentElement&&document.documentElement.scrollTop){
  scrollTop=document.documentElement.scrollTop;
} else if(document.body){
  scrollTop=document.body.scrollTop;
}
  return scrollTop;
}
var showHtml = function(htmlStr){
	document.getElementById("createBox").innerHTML = htmlStr;	
	document.getElementById("createBox").style.display = "block";
	var isIE6 = !-[1,] && !window.XMLHttpRequest;
	if(isIE6) {
	  	var topval = getScrollTop();
	
	    document.getElementById("createBox").style.top = topval+100;
	}
	
	document.getElementById("createBox").style.top = top.document.getElementById("mainIframe").scrollTop + 100 +"px";
	document.getElementById("shadow").style.width = Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)-1;
	document.getElementById("shadow").style.height = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
	//document.getElementById("shadow").style.left = -(document.body.clientWidth - 615)/2+"px";
	if(document.body.clientWidth < 615) {
	  	//document.getElementById("shadow").style.left = -(615 - document.body.clientWidth)/2+"px";
	}
	document.getElementById("shadow").style.display = "block";
}

//改变输入框样式
var changeValue = function(dom){
	if(dom.value.trim() == "输入歌手/歌曲名称创建电台") {
	    dom.value = '';	
		dom.style.color = "#000";
		dom.focus();	
		document.getElementById("searchtips").style.display = "block";
		document.getElementById("tipcon").style.display = "block";		  
		document.getElementById("tipresult").style.display = "none";
		document.getElementById("tipcon").innerHTML = "<h3>通过搜索歌手或歌曲创建您的个性电台:</h3><div class='tips'></div>";  
	}	
}
var changeBack = function(dom){	
	if(dom.value.trim() == "") {
		dom.style.color = "#c4c4c4";	  	
		dom.value = "输入歌手/歌曲名称创建电台";
		document.getElementById("searchtips").style.display = "none";
	}    	
}


//回车键处理
/*function processKeyup(event){  
     
	 var myEvent = event || windows.event;  
	 var keyCode = myEvent.keyCode;  
	 var type = document.getElementById("inputSinger").getAttribute("_type");
	 if(keyCode == 13){  
	     if(type == 0) {
		    createPer();  	 
		 } else if(type == 1) {
		    createClick(); 	 
		 }
		 
	 }  
}  
if(window.attachEvent) {
	try {
  	  document.getElementById("inputSong").attachEvent("onkeyup",processKeyup);
	} catch(ex) {
	  	
	}
}*/

//创建个性频道动作处理
//首先判断能否创建
var canOrNotPer=0;
var canOrNotSin=0;
var personalSongs;
var singerSongs;
var personalImg;
var singerImg;
var singerOffset;
var judge = function(singer,song){
  	var xmlHttp=null;
	try{
	  xmlHttp=new XMLHttpRequest();
	}
	catch(e){
	  try{
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	  catch(e){		
		return;  
	  }
	}
	singer = encodeURIComponent(singer);	
	song = encodeURIComponent(song);
	var url;
	if(song != "") {
	    url = "/fm/app/i/index.php?cmd=3&singer=" + singer +"&song="+song;	
	} else if(song == "") {
	    url = "/fm/app/i/index.php?cmd=4&singer=" + singer;	
	}
	xmlHttp.open("GET", url, false);
	xmlHttp.setRequestHeader("Content-Type", "text/plain");
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var jsonText = xmlHttp.responseText;
			if (jsonText == null || jsonText == "") {
				
				return;
			}
			var jsonObj = eval('(' + jsonText + ')');
			
			if(song != "") {
				if(jsonObj.status == 1) {
				  	canOrNotPer =  jsonObj.hascontent;
				}
				
				personalSongs = jsonObj.songs;
				personalImg = jsonObj.imgurl;
			} else if(song == "") {
			    canOrNotSin =  jsonObj.status;
				singerSongs = jsonObj.songs;
				singerImg = jsonObj.imgurl;
				singerOffset = jsonObj.offset;	
			}
		}
	};
	xmlHttp.send(null);		
}

//创建成功
var createSucc = function(type,value,fmtype,imgurl,offset,songs){
	
    var sendStr = {
		"fmid":value,
		"fmname":value+"电台",
		"fmtype":fmtype,
		"classid":0,
		"classname":"",
		"imgurl":imgurl,
		"offset":offset,
		"heat":80,
		"description":"",        
		"songs":songs
	}
	var data = Kg.JSON.stringify(sendStr);
	//console.log(data);
	//KgSuperCall.CollectRadio(data);
	
	try{
	  var playingid = document.getElementById("webplayer").GetFmId();
	  
	  var tagsor = document.getElementById(playingid).getElementsByTagName("strong");
	  tagsor.item(0).style.display = "none";
	  tagsor.item(1).style.display = "none";
	} catch(ex) {
	  	
	}
	document.getElementById("webplayer").SetFMdata(data);
	listenHistory();
	sdnClick(12180);
	//document.getElementById("createBox").style.display = "none";
	//document.getElementById("shadow").style.display = "none";	
}
//创建失败
var createFail = function(words){
    var poptips = "<a href='javascript:hideTips()' class='shut'></a><h3>提示</h3><i></i><p>"+words+"</p><div class='clearBoth'><span></span><div class='buBox'><input type='button' class='button' value='返回' id='cancle' onclick='backCrea()'/></div>";
	document.getElementById("poptips").innerHTML = poptips;
	document.getElementById("poptips").style.display = "block";		
}
//创建动作处理
//创建个性电台
var createPer = function(){
    
	var song = document.getElementById("inputSong").value.trim();
	var singer = "";	
	
    if(song == "" || song == "输入歌手/歌曲名称创建电台") {
      alert("请输入歌手/歌曲名称创建电台！")
	  return;	
    }
    
	judge(singer,song);
	if(canOrNotPer == 1) {//创建个性电台成功
	  	var value = singer + " - " + song;
		createSucc("per",value,4,personalImg,"",personalSongs);
		document.getElementById("searchtips").style.display = "none";
		
	} else if(canOrNotPer == 0){//创建个性电台失败
	    //alert("这首歌曲没有足够的相关歌曲以创建新的频道，请试试其他歌曲。");
		document.getElementById("searchtips").style.display = "block";
	    document.getElementById("tipcon").innerHTML = "暂时没有足够的歌曲以创建该电台";
	} 
}
//创建歌手电台

var createSin = function(singer,source){
    
    var song = "";
	judge(singer,song);
	if(canOrNotSin == 1) {//创建歌手电台成功
	  	var value = singer;
		createSucc("sin",value,3,singerImg,singerOffset,singerSongs);
		document.getElementById("searchtips").style.display = "none";
				
	} else if(canOrNotSin == 0){//创建歌手电台失败
	    if(source == "radio") {
		  	//alert("这个歌手没有足够的相关歌曲以创建新的频道，请试试其他歌手。");
			document.getElementById("searchtips").style.display = "block";
			document.getElementById("tipcon").innerHTML = "<h4>暂时没有足够的歌曲以创建该电台</h4>";
			document.getElementById("tipcon").style.display = "block";
			document.getElementById("tipresult").style.display = "none";
   
		} else {
		    return 0;	
		}
	    
		
	}  
}
//电台页面点击创建歌手频道页面中确定按钮
var createClick = function(){
    var dataObj = { "wactionid":"3422", "wcount":"1"};	
	var dataClick = Kg.JSON.stringify(dataObj);  
	//KgSuperCall.AddAction(dataClick);
	var singer = document.getElementById("inputSong").value.trim();	
	
	if(singer == "" || singer == "歌手名") {
	  document.getElementById("tips").innerHTML = "提示：请输入歌手名";
	  document.getElementById("tips").style.display = "block";
	  return;	
	}	
	createSin(singer,"radio");	
	sdnClick(12179);
}
//点击关闭个性频道弹窗提示
var hideTips = function(){
    document.getElementById("poptips").style.display = "none";	
	document.getElementById("tips").style.display = "none";
	document.getElementById("createBox").style.display = "none";	
	document.getElementById("shadow").style.display = "none";
}
//点击返回创建电台
var backCrea = function(){
    document.getElementById("poptips").style.display = "none";	
	document.getElementById("tips").style.display = "none";
}


//请求图片
function makeCrc32Table() {
    if (typeof(window.crc32Table) != "undefined") return;
    window.crc32Table = new Array(256);
    for (var i = 0; i < 256; i++) {
        var k = i;
        for (var j = 0; j < 8; j++)
            if (k & 1)
                k = (k >> 1) ^ 0xedb88320;
            else k >>= 1;
        crc32Table[i] = k;
    }
}
function crc32(str) {
    makeCrc32Table();
    if (typeof str != "string") str = "" + str;
    var crc = 0xffffffff;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (code > 0xff) {
            crc = (crc >> 8) ^ crc32Table[(crc & 0xff) ^ (code & 0xff)];
            crc = (crc >> 8) ^ crc32Table[(crc & 0xff) ^ (code >> 8)];
        } else crc = (crc >> 8) ^ crc32Table[(crc & 0xff) ^ code];
    }
    return crc ^ 0xffffffff;
}

function ImageCacheGrid(url,width, height, format) {
    this.maxWidth = width;
    this.maxHeight = height;
    this.format = format;
    this.imageUrl = url;
    this.imageFullUrl = "";
    this.imageArr = [];
    this.objIDArr = [];
    this.index = 0;
    this.myImage = new Image();
    this.add = function(objID, src) {
        this.imageArr.push(src);
        this.objIDArr.push(objID);
    }
    this.load2 = function(){
    	this.myImage.src = this.imageFullUrl;
        if(document.all){
        var oThis = this;
	        if(this.myImage.readyState=="complete"){
	            this.showImg(this);
	        }else{
	            this.myImage.onload = function(){oThis.showImg(oThis);}
	        }
        }else{
            this.showImg(this);
        }
    },
    this.load = function() {
		/*
				var imageStr = "";
        for (var i = 0; i < this.imageArr.length; i++) {
            imageStr += this.imageArr[i];
            if(i<this.imageArr.length-1){
            	imageStr+="|";
            }
        }
        var key = crc32(imageStr);
        var loadUrl = this.imageUrl + "?q=70&format=" + this.format + "&imageUrls=" + imageStr + "&maxWidth=" + this.maxWidth + "&maxHeight=" + this.maxHeight+"&key="+key;

        this.imageFullUrl = 'http://imge.kugou.com/imageupload/cache2/'+key.toString().substr(0,2)+'/'+key+'.'+this.format;
       	this.myImage.src = loadUrl;
		*/
		/*
		this.myImage.src = this.imageFullUrl;
        if(document.all){
        var oThis = this;
	        if(this.myImage.readyState=="complete"){
	            this.showImg(this);
	        }else{
	            this.myImage.onload = function(){oThis.showImg(oThis);}
	        }
        }else{
            this.showImg(this);
        }
        */
    }
    this.showImg = function(oThis){
    	/*
        for (var i = 0; i < oThis.imageArr.length; i++) {
            try{
                document.getElementById(oThis.objIDArr[i]).style.backgroundImage = "url("+oThis.imageFullUrl+")";
                document.getElementById(oThis.objIDArr[i]).style.backgroundPosition = "0px -" + (i * oThis.maxHeight) + "px";
            }catch(err){}
        }
        */
    }
}

//获取索引
function index(current, obj){
    for (var i = 0; i < obj.length; i++) {
        if (obj[i] == current) {
            return i;
        }
    }
}
//加载内容
var loadCon = function(){
    
	
	makeList();
	
	makeRightList(0,0);
	
	
	var aas = document.getElementById("radioList").getElementsByTagName("a");
	
	aas.item(0).className = "current";
	
	
	
	setInterval(function(){
	  var fmArr = new Array();
	  var dds = document.getElementById("rightRadioList").getElementsByTagName("dd");
	  
	  for(var i = 0; i < dds.length; i ++) {
		  fmArr.push(dds.item(i).id);
	  }
	  if(fmArr.length > 6) {
		  fmArr.sort(randomsort);
	  }
	  
	  	
	  changeState(fmArr);	
	},3000);
	
	//随机播放一个电台
	/*var playRadioIds = [1,2,3,4,5,11,9,18,20,25,27,46,30,29,43,32];
	var ranNum = Math.floor(Math.random()*16);
	var chosenPlayId = playRadioIds[ranNum];
	playRadio(chosenPlayId);*/
}

//登录
var KugooID = getCookie("KuGoo","KugooID"); 
function getCookie(cookieName,key) {
	var arr = document.cookie.match(new RegExp("(^| )" + cookieName + "=([^;]*)(;|$)"));
	if (arr && arr[2] && arr[2].indexOf("&")>0) {
		var items = arr[2].split("&"); //用"="分割Cookie的名称与值 
		var cva = [];
		for (i = 0; i < items.length; i++) {
			var temp = items[i].split("="); //用"="分割Cookie的名称与值   
			cva[temp[0]] = unescape(temp[1]);
		}
		return cva[key];
	}	
}

//获取用户头像
// function getUserIcon(picName) {
// 	if(!picName) {
// 		return "http://image8.kugou.com/myicon/icon1/baike1.gif";
// 	}
// 	var dir = picName.substring(0,8)+"/"+picName.substring(8,10)+"/";
// 	var path = "http://image8.kugou.com/myicon/icon2/"+dir+picName;	
// 	return "http://image8.kugou.com/myicon/icon2/"+dir+picName;
// }

//调用flash提取试听记录
function getlishis(){
    var s = document.getElementById("webplayer").ListenHistory();	
	//alert(s);
}
//flash调用
function InitComplete(){
	//随机播放任意一个电台
	/*var radionums = radioData.length;
    var ininum = Math.floor(Math.random()*radionums);
	var fid = radioData[ininum].fmid;
	playRadio(fid);*/
	
	
	
	
	var url = document.location.toString();	
	
	if(url.indexOf("?") != -1) {
	  
	  shareLink(url);	
	} else {
	  //随机播放指定几个电台
	  var playRadioIds = [1,2,3,4,5,11,9,18,20,25,27,46,30,29,43,32];
	  var nums = playRadioIds.length;
	  var ranNum = Math.floor(Math.random()*nums);
	  var chosenPlayId = playRadioIds[ranNum];
	  playRadio(chosenPlayId);	
	}
	
	if(KugooID) {
	  document.getElementById("webplayer").LoginSucc(KugooID);  
    }
}

// function login(){
// 	var kugouC = read("KuGoo");
// 	var user_name = kugouC.NickName;
// 	var kugou_id = kugouC.KugooID;
// 	var pic_src = kugouC.Pic;
// 	var str = "";
// 	var el = document.getElementById("lng");
 
// 	user_name = user_name.replace(/%/g, "\\");
// 	var user = eval("'" + user_name + "'");
 
// 	el.className += " logined";
// 	if(!pic_src){
// 		pic_src = "http://image8.kugou.com/myicon/icon1/20111125/10/20111125102548106.jpg";
// 	} else {
// 		pic_src = 'http://image8.kugou.com/myicon/icon1/' + pic_src.substr(0,8) + '/' + pic_src.substr(8,2) + '/' + pic_src + '';
// 	}
 
// 	str += '<a class="pic" hidefocus="true" target="_blank" hidefocus="true" href="http://www1.kugou.com/uc/' + kugou_id + '.html"><img src="' + pic_src + '" width="32" height="32"/></a>';
 
// 	str += '<a hidefocus="true" target="_blank" href="http://www1.kugou.com/uc/' + kugou_id + '.html" class="blue">' + user + '</a> <a hidefocus="true" href="http://www1.kugou.com/user/logout.aspx" class="logout">退出登录</span>';
 
// 	el.innerHTML = str;
 
// 	document.getElementById("link_uc").href = "http://www1.kugou.com/uc/" + kugouC.KugooID + ".html";
// 	document.getElementById("link_uc").target = "_blank";
// 	loginNotice && loginNotice();
// }


function loginCallback(){
    UsLogin(login);	
}

//flash发送最近听的记录，格式为[{"fmid":"25","fmName":"90后电台","fmtype":2},{"fmid":"27","fmName":"咖啡厅","fmtype":2},{"fmid":"31","fmName":"甜蜜电台","fmtype":2}]

function deleteHis(str) {
	//var sendstr = Radio.JSON.stringify(str);
	//alert("删除历史序号为"+str);
   document.getElementById("webplayer").delHistory(str); 
   listenHistory();	
   sdnClick(12182);
}

//获取电台最近历史记录
function listenHistory(){
   
   var historys = document.getElementById("webplayer").ListenHistory();
   //alert(history);
   var hisobj = Kg.JSON.parse(historys);
   var items = hisobj.length > 10 ? 10 : hisobj.length;
   var hisclass = "";
   if(items <= 5) {
	   hisclass = "schide";  
   }
   var htmlstr = "<dt>最近听过的电台</dt><div class='hisbox "+hisclass+"'>";
   //var htmlstr = "<dt><a href=''>最近听的电台</a><a href=''>最近听的歌曲</a></dt><div class='hisbox "+hisclass+"'>";
   var classname = "";
   for(var i = 0; i < 10; i++) {
	   if(i == 1 || i == 3 || i == 5 || i == 7 || i == 9) {
		  classname = "gray";   
	   }else {
		  classname = "";    
	   }
	   //var hisstr = Radio.JSON.stringify(hisobj[i]);
	   //htmlstr += "<dd class='"+classname+"'><a href=''>"+hisobj[i].fmName+"</a> <a href='javascript:deleteHis("+hisstr+")' class='shut' style='display:none'></a></dd>";  
	   htmlstr += "<dd class='"+classname+"'></dd>";
   }
    htmlstr += "</div>";
    document.getElementById("recentlist").innerHTML = htmlstr;
   
    var dds = document.getElementById("recentlist").getElementsByTagName("dd");
	var r = /^[0-9]*[1-9][0-9]*$/;
	for(var i = 0; i < items ; i++) {
		var hisstr = Kg.JSON.stringify(hisobj[i]);
		if(r.test(hisobj[i].fmid)) {
		  	dds.item(parseInt(items-i-1)).innerHTML = "<a href='javascript:playRadio("+hisobj[i].fmid+");sdnClick(12181)'>"+hisobj[i].fmName+"</a> <a href='javascript:deleteHis("+i+")' class='shut' style='display:none'></a>";
		} else {
			dds.item(parseInt(items-i-1)).innerHTML = "<a href='javascript:createSin("+"\""+hisobj[i].fmid+"\""+",\"radio\");sdnClick(12181)'>"+hisobj[i].fmName+"</a> <a href='javascript:deleteHis("+i+")' class='shut' style='display:none'></a>";
		    	
		}
	  	
	}
	// try{
	//   for(var i = 0; i < dds.length; i++) {		
	// 	dds.item(i).onmouseover = function(){
	// 	   this.lastChild.style.display = "block"; 
	// 	}	
	// 	dds.item(i).onmouseout = function(){
	// 	   this.lastChild.style.display = "none"; 
	// 	}	
	//   }    	
	// } catch(ex) {
	// }
	
	// 改用jquery  实现
	$("#recentlist dd").mouseover(function(){
		$(this).find(".shut").show();
	}).mouseout(function(){
		$(this).find(".shut").hide();
	})
} 


//获取歌曲最近历史记录
var songHistory = function(){
    	
}
//分享到微博后链接进来http://170.kugou.com/webradio/index.html?filename=%u5B59%u6960__-__%u6C38%u8FDC%u7684%u670B__%u53CB&hash=A1E0B78B7A00BCEDFDBC57458362283F&timelen=269000&MicroBlog=1&chanelId=1
//{"fmid":39,"fmname":"校园电台","classid":6,"classname":"地点","fmtype":2,"heat":0,"imgurl":"http://imge.kugou.com/fmlogo/24/20110928170301836136.jpg","imgurl32":"http://imge.kugou.com/fmlogo/32/20110928170301278002.jpg","imgurl100":"http://imge.kugou.com/fmlogo/145/20110928165744398358.jpg","description":0,"songs":[{"sid":179441,"name":"林妙可 - 歌唱祖国","hash":"7358EDA5FAC14AB4EA43695388A377A5","size":3540453,"ext":"mp3","time":221000,"bitrate":128,"trac":0},{"sid":179602,"name":"程琳 - 相聚","hash":"AF5E8951D1553D6D87572A369C540D5F","size":2678784,"ext":"mp3","time":167000,"bitrate":128,"trac":0},{"sid":179553,"name":"小娟 - 离家五百里","hash":"1DB517459EA1DC6B5D56B30D9C084DF6","size":8456192,"ext":"mp3","time":211000,"bitrate":320,"trac":0},{"sid":179501,"name":"杨幂 - 爱的供养","hash":"1B20F37A75145024A89E829EEA5FB510","size":4990250,"ext":"mp3","time":207000,"bitrate":192,"trac":0},{"sid":179322,"name":"刘若英 - 后来","hash":"94DEAE331691202F5511AA53DD33A7CE","size":5464064,"ext":"mp3","time":341000,"bitrate":128,"trac":0}]}
var shareLink = function(url){
	
    var paras = url.split("?")[1];	
	if(paras.indexOf("&") != -1) {
		var paraArr = paras.split("&");
		var songname;
		var hash;
		var timelen;
		var fmid;
		var fmtype;
		var fmname;
		var micro;
		for(var i = 0; i < paraArr.length; i++) {
			var items = paraArr[i].split("=")[0];
			var itemvalue = paraArr[i].split("=")[1];
			if(items == "filename") {
				songname = itemvalue;				
			}
			else if(items == "hash") {
				hash = itemvalue;
			}
			else if(items == "timelen") {
				timelen = itemvalue;
			}
			else if(items == "chanelId") {
				fmid = itemvalue;
			}
			else if(items == "fmid") {
				fmid = itemvalue;
			}
			else if(items == "fmname") {
				fmname = itemvalue;
			}
			else if(items == "fmtype") {
				fmtype = itemvalue;
			}
			else if(items == "MicroBlog") {
				micro = itemvalue;
			}
		}
		var re = /^[0-9]*[1-9][0-9]*$/;
		if(re.test(fmid)) {
		  var linkfmData = radioData;
		  if(fmtype == 2) {
			  for(var j = 0; j < linkfmData.length; j++) {
				if(fmid == linkfmData[j].fmid) {
					var name = unescape(songname);
					var re = /__/g;
					linkfmData[j].songs[0].name = name.replace(re," ");
					linkfmData[j].songs[0].hash = hash;
					linkfmData[j].songs[0].time = timelen;
					linkfmData[j].fmname = decodeURI(fmname);
					sendData(linkfmData[j],micro);
					changePlayState(fmid);
				}	
				
			  }	
		   }
		   if(fmtype == 6) {
			    var name = unescape(songname);
				var re = /__/g;
				linkfmData[0].songs[0].name = name.replace(re," ");
				linkfmData[0].songs[0].hash = hash;
				linkfmData[0].songs[0].time = timelen;
				linkfmData[0].fmname = decodeURI(fmname);
				linkfmData[0].fmtype = fmtype;
				linkfmData[0].fmid = fmid;
				
				//linkfmData[0].songs.splice(1, 1);
				//linkfmData[0].songs.splice(1, 1);
				//linkfmData[0].songs.splice(1, 1);
				//linkfmData[0].songs.splice(1, 1);
				sendData(linkfmData[0],micro);	
			}		  	
		} else {
		  var singername = unescape(fmid);	
		  createSin(singername,"radio");	
		}
		
	}
	else if(paras.indexOf("&") == -1) {
	    var id;
		if(paras.split("=")[0] == "chanelId"){
		  	id = paras.split("=")[1];
			
			playRadio(id);
		}	
	}	
}

//搜索提示
var data;
function getSearchTips(){
    var keyword = encodeURIComponent(document.getElementById("inputSong").value);
	var type1 = 1;
	var type0 = 0;
	document.getElementById("webplayer").GetSearchTips(keyword,type1);	
	document.getElementById("webplayer").GetSearchTips(keyword,type0);	
}

var SearchTips = function(result){
    data = result;
	processResponse(data);
}


var highLightIndex = -1;  
var timeoutId;  
if(window.attachEvent) {
	try {
  	  document.getElementById("inputSong").attachEvent("onkeyup",processKeyup);
	} catch(ex) {
	  	
	}
}  

if(window.addEventListener) {
    try {
	  document.getElementById("inputSong").addEventListener("keyup",processKeyup,false);	
	} catch(ex) {
		
	}	
}

/**  
* 处理键盘按下后弹起的事件  
* @param event  
*/  
function processKeyup(event){  
    
	 var myEvent = event || windows.event;  
	 var keyCode = myEvent.keyCode;  
	 
	 if(keyCode != 38 && keyCode != 40 && keyCode != 13){  
		  
		  highLightIndex = -1;  
		  clearTimeout(timeoutId);  
		  
		  timeoutId = setTimeout(getSearchTips,500);  
		  //timeoutId = setTimeout(processResponse(testdata),500);
		  //processResponse(testdata);
	 //处理上下键(up,down)  
	 }else if(keyCode == 38 || keyCode == 40){  
		 processKeyUpAndDown(keyCode);  
	 //按下了回车键  
	 }else if(keyCode == 13){  
		 processEnter();  
	 }  
}  

/***  
* 初始化弹出框列表的位置，大小  
*/  
function init(){  
  document.getElementById("searchtips").style.display = "none";
}  


/**  
* 处理回复  
* @param data Ajax请求得到的返回结果为dom文档对象  
*/  
function processResponse(data){  
   //console.log(data);
   var datastr = data.toString();
   var infoarr = datastr.split("\r\n");

   if(data.length != 0) {
	   document.getElementById("searchtips").style.display = "block";
	   document.getElementById("tipcon").style.display = "none";
	   document.getElementById("tipresult").innerHTML = "";
	   document.getElementById("tipresult").style.display = "block";
	   var nums = infoarr.length>11 ? 11:infoarr.length;
	   
	   for(var i = nums-2; i >=0 ; i--) {
		  var detail = infoarr[i].split("\t");
		  //console.log(detail);  
		  var imgsrc;
		  if(detail[2] == "") {
			  imgsrc = "images/songbg.png";
		  } else {
			  imgsrc = "http://singerimg.kugou.com/uploadpic/pass/softhead/48/"+detail[2].substring(0,8) + "/"+detail[2]; 
		  }
		  var word_div = document.createElement("div"); 
		  word_div.innerHTML = "<span class='img'><img src='"+imgsrc+"' width='48' height='48'></span><p>"+detail[1]+"</p><a href=''></a>";
		  word_div.className = "";
		  word_div.onmouseover = fnOver;
		  word_div.onmouseout = fnOut;
		  word_div.onclick = getAutoText;
		  document.getElementById("tipresult").appendChild(word_div);
	   }
	   
   } 
   
   
      
   /*var nums = dataobj.length>5 ? 5:dataobj.length;
   
	for(var i = nums-1; i >=0 ; i--) {
		
	   
	  var word_div = document.createElement("div"); 
	  word_div.innerHTML = data.data[i].keywords;
	  word_div.onmouseover = fnOver;
	  word_div.onmouseout = fnOut;
	  word_div.onclick = getAutoText;
	  document.getElementById("tipresult").appendChild(word_div);
	}*/
}  

/**  
* 处理鼠标滑过  
*/  
function fnOver(){  
   
	changeToWhite();  
	
	document.getElementById("tipresult").style.backgroundColor 
	this.className = "gray";
	var objs = document.getElementById("tipresult").getElementsByTagName("div");	
	highLightIndex = index(this,objs); 
}  
 
/**  
* 处理鼠标移除  
*/  
function fnOut(){  
   
   this.className = "";;
}  

/**  
* 得到自动填充文本  
*/  
function getAutoText(){  
  //有高亮显示的则选中当前选中当前高亮的文本
  if(highLightIndex != -1){  
      
	  document.getElementById("inputSong").value = this.getElementsByTagName("p").item(0).innerHTML;
	  document.getElementById("tipresult").innerHTML = "";
      document.getElementById("searchtips").style.display = "none"; 
	  document.getElementById("searchbutton").focus();
  }  
}  

/**  
* 处理按下Enter键  
* @param keyCode  
*/  
function processEnter(){  
    
   createClick();
}  

/**  
* 处理按上下键的情况  
*/  
function processKeyUpAndDown(keyCode){    
   
   
   var words = document.getElementById("tipresult").childNodes;
   var num = words.length;
   console.log(num)
   if(num <= 0) return;  
   changeToWhite();  
   highLightIndex = ((keyCode != 38 ? num + 1:num - 1)+highLightIndex) % num; 
   words.item(highLightIndex).className = "gray";
   document.getElementById("inputSong").value = words.item(highLightIndex).getElementsByTagName("p").item(0).innerHTML;
}  

/**  
* 如果有高亮的则把高亮变白  
*/  
function changeToWhite(){  
   if(highLightIndex != -1){    
	   var words = document.getElementById("tipresult").childNodes;
	   words.item(highLightIndex).className = "";
   }  
}  



