window.onload = function() {
	//	@我的
	//鼠标上移事件
	$("#mes-at-li").on("mouseover", function() {
		$("#mes-at-li").attr("style", "background-color: white;");
	});
	$("#mes-at-li").on("mouseout", function() {
		//判断div是否显示
		if(!$("#my-main-div").is(":hidden")) {
			$("#mes-at-li").attr("style", "background-color: white;");
		} else {
			$("#mes-at-li").attr("style", "background-color: #f3f4f5;");
		}
	});
	//点击事件
	$("#mes-at-li").on("click", function() {
		$("#mes-at-li").attr("style", "background-color: white;");
		$("#mes-private-li").attr("style", "background-color: #f3f4f5;");
		$("#mes-comment-li").attr("style", "background-color: #f3f4f5;");
		$("#mes-inf-li").attr("style", "background-color: #f3f4f5;");
		$("#my-main-div").attr("style", "display: block;");
		$("#mes-main-div").attr("style", "display: none;");
		$("#com-main-div").attr("style", "display: none;");
		$("#inf-main-div").attr("style", "display: none;");
	});

	//私信
	//鼠标上移事件
	$("#mes-private-li").on("mouseover", function() {
		$("#mes-private-li").attr("style", "background-color: white;");
	});
	$("#mes-private-li").on("mouseout", function() {
		//判断div是否显示
		if(!$("#mes-main-div").is(":hidden")) {
			$("#mes-private-li").attr("style", "background-color: white;");
		} else {
			$("#mes-private-li").attr("style", "background-color: #f3f4f5;");
		}
	});
	//点击事件
	$("#mes-mes-div1").on("mouseover", function() {
		$("#mes-mes-div1-del").attr("style", "visibility: visible;");
		$("#mes-mes-div1").attr("style", "background-color: #f3f4f5;");
	});
	$("#mes-mes-div1").on("mouseout", function() {
		$("#mes-mes-div1-del").attr("style", "visibility: hidden;");
		$("#mes-mes-div1").attr("style", "background-color: white;");
	});
	$("#mes-private-li").on("click", function() {
		$("#mes-at-li").attr("style", "background-color: #f3f4f5;");
		$("#mes-private-li").attr("style", "background-color: white;");
		$("#mes-comment-li").attr("style", "background-color: #f3f4f5;");
		$("#mes-inf-li").attr("style", "background-color: #f3f4f5;");
		$("#my-main-div").attr("style", "display: none;");
		$("#mes-main-div").attr("style", "display: block;");
		$("#com-main-div").attr("style", "display: none;");
		$("#inf-main-div").attr("style", "display: none;");
	});

	//评论
	//鼠标上移事件
	$("#mes-comment-li").on("mouseover", function() {
		$("#mes-comment-li").attr("style", "background-color: white;");
	});
	$("#mes-comment-li").on("mouseout", function() {
		//判断div是否显示
		if(!$("#com-main-div").is(":hidden")) {
			$("#mes-comment-li").attr("style", "background-color: white;");
		} else {
			$("#mes-comment-li").attr("style", "background-color: #f3f4f5;");
		}
	});
	//点击事件
	$("#mes-com-div1").on("mouseover", function() {
		$("#mes-com-div1-del").attr("style", "visibility: visible;");
	});
	$("#mes-com-div1").on("mouseout", function() {
		$("#mes-com-div1-del").attr("style", "visibility: hidden;");
	});
	$("#mes-comment-li").on("click", function() {
		$("#mes-at-li").attr("style", "background-color: #f3f4f5;");
		$("#mes-private-li").attr("style", "background-color: #f3f4f5;");
		$("#mes-comment-li").attr("style", "background-color: white;");
		$("#mes-inf-li").attr("style", "background-color: #f3f4f5;");
		$("#my-main-div").attr("style", "display: none;");
		$("#mes-main-div").attr("style", "display: none;");
		$("#com-main-div").attr("style", "display: block;");
		$("#inf-main-div").attr("style", "display: none;");
	});

	//	通知
	//鼠标上移事件
	$("#mes-inf-li").on("mouseover", function() {
		$("#mes-inf-li").attr("style", "background-color: white;");
	});
	$("#mes-inf-li").on("mouseout", function() {
		//判断div是否显示
		if(!$("#inf-main-div").is(":hidden")) {
			$("#mes-inf-li").attr("style", "background-color: white;");
		} else {
			$("#mes-inf-li").attr("style", "background-color: #f3f4f5;");
		}
	});
	//点击事件
	$("#mes-inf-div1").on("mouseover", function() {
		$("#mes-inf-div1").attr("style", "background-color: #f3f4f5;");
	});
	$("#mes-inf-div1").on("mouseout", function() {
		$("#mes-inf-div1").attr("style", "background-color: white;");
	});
	$("#mes-inf-li").on("click", function() {
		$("#mes-at-li").attr("style", "background-color: #f3f4f5;");
		$("#mes-private-li").attr("style", "background-color: #f3f4f5;");
		$("#mes-comment-li").attr("style", "background-color: #f3f4f5;");
		$("#mes-inf-li").attr("style", "background-color: white;");
		$("#my-main-div").attr("style", "display: none;");
		$("#mes-main-div").attr("style", "display: none;");
		$("#com-main-div").attr("style", "display: none;");
		$("#inf-main-div").attr("style", "display: block;");
	});

}