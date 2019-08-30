window.onload = function() {
	var dataGrid = $("#list_content_song");
	var trTemplate = dataGrid.children(":eq(0)");

	//格式话数据
	var formatData = function(date) {
		dataGrid.empty();
		$("#progressBar").hide();
		var songs=date.songs.kuwo;
		$.each(songs, function(i, obj) {
			console.info(obj);
			let tr = trTemplate.clone().appendTo(dataGrid);
			obj.rowNum = i + 1;
			$.each(obj, function(name, value) {
				if (name == "pic_info") {
					// tr.find("._" + name).value(value);
					
				} else {
					tr.find("._" + name).text(value);
				}
			});

        tr.find(".icon_play").click(function() {
			// playsong(obj);
			$("#audio").src=songs.song_url;
			// $("#audio").play();
			$.post("music/play.do",{
				"obj":obj,
			});
		});
		});
		
	}

//获得数据
	$(".search_icon").on("click", function() {
		var name = $("#search_named").val();
		$("#progressBar").show();
		$(".search_key_word").children(":eq(0)").text(name);
		$.get("/musicServlet", {
			"name": name,
			"count": 10,
			"pages": 1
		}, function(date) {
			formatData(date);
		}, "json");
	});
	
	//播放音乐
	var playsong=function(obj){
		window.location.href="../playmusic.html";
	}
}
