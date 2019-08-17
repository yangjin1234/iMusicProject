window.onload = function() {
		$("#find_phone").on("click", function() {
			$("#find_phone").attr("style", "color: black;");
			$("#find_ques").attr("style", "color: dimgray;");
			$("#ques_Div").hide();
			$("#phone_Div").show();
		});
		$("#find_ques").on("click", function() {
			$("#find_phone").attr("style", "color: dimgray;");
			$("#find_ques").attr("style", "color: black;");
			$("#phone_Div").hide();
			$("#ques_Div").show();
		});

		//手机号码
//		$(".pn_forcheck").keyup(function() {
//				var val = $(this).val();
//				$(this).parent().next().show();
//				var _this = $(this);
//				if(checkPhonenum(val)) {
//					$.post("/ajax/register.php", {
//						"mobile": val,
//						"check": 'true'
//					}, function(data) {
//						if(data.code == '1') {
//							_this.parent().next().removeClass().addClass("login_tips true");
//							_this.parent().next().html("手机号码格式正确");
//							_this.attr("passCheck", "1");
//							$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn');
//						} else {
//							_this.parent().next().removeClass().addClass("login_tips tip");
//							_this.parent().next().html(data.msg);
//							$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn sended');
//						}
//					}, 'json');
//
//				} else {
//					$(this).parent().next().removeClass().addClass("login_tips tip");
//					$(this).parent().next().html("请输入正确的手机pn_forcheck"
//						号码 ");
//						$(this).attr("passCheck", "0");
//
//					}
//
//				}); $(".pn_forcheck").blur(function() {
//				var val = $(this).val();
//				$(this).parent().next().show();
//				var _this = $(this);
//				if(checkPhonenum(val)) {
//					$.post("/ajax/register.php", {
//						"mobile": val,
//						"check": 'true'
//					}, function(data) {
//						if(data.code == '1') {
//							_this.parent().next().removeClass().addClass("login_tips true");
//							_this.parent().next().html("手机号码格式正确");
//							_this.attr("passCheck", "1");
//							if($("#phone_yzmbtn").html() == "免费获取验证码") {
//								$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn');
//							}
//						} else {
//							_this.parent().next().removeClass().addClass("login_tips false");
//							_this.parent().next().html(data.msg);
//							$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn sended');
//						}
//					}, 'json');
//				} else {
//					$(this).parent().next().removeClass().addClass("login_tips false");
//					$(this).parent().next().html("请输入正确的手机号码");
//					$(this).attr("passCheck", "0");
//					$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn sended');
//				}
//			});

		}