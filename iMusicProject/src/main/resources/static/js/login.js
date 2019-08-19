window.onload = function() {
	var yzmsti;
	
	$("#login_pwd").on("click", function() {
		$("#login_pwd").attr("style", "color: black;");
		$("#login_vercode").attr("style", "color: dimgray;");
		$("#login-verCodebox").hide();
		$("#login-pwdBox").show();
	});
	$("#login_vercode").on("click", function() {
		$("#login_pwd").attr("style", "color: dimgray;");
		$("#login_vercode").attr("style", "color: black;");
		$("#login-pwdBox").hide();
		$("#login-verCodebox").show();
	});
	
	$(function(){
		function init(){
			$('#mobile').val('');
			$('#password_mobile').val('');
			$('#mobile_code').val('');
			$("#email").val('');
			$("#email_password").val('');
			if($("#email_yzm").size() > 0) {
				$("#email_yzm").val('');
			}
		}
		init();
		
		$("#nl_gozc").click(function() {

			if($(this).attr("opened") == 0) {
				$("#nl_more_zc").slideDown();
				$(this).html("已有账号？马上登陆 ∧");
				$(this).attr("opened", "1");
				$(this).attr("onclick", "_hmt.push(['_trackEvent', 'zhuce', 'click', '注册登录页_去登录'])");
				$("#login-pwdBox").slideUp();
				$(".nl_tab").slideUp();
				$(".nl_title").html('<span class="nl_t_left"></span>注册iMusic<span class="nl_t_right">');
			} else {
				$("#nl_more_zc").slideUp();
				$(this).html("还没有账号？免费注册 ∨");
				$(this).attr("opened", "0");
				$(this).attr("onclick", "_hmt.push(['_trackEvent', 'zhuce', 'click', '注册登录页_去注册'])");
				$("#login-pwdBox").slideDown();
				$(".nl_tab").slideDown();
				$(".nl_title").html('<span class="nl_t_left"></span>登录iMusic<span class="nl_t_right">');
			}

		});
		
		
		
		$(".pw_forcheck").keyup(function() {

			var val = $(this).val();

			if(val.length < 5) {
				$(this).parent().next().show();
				$(this).parent().next().next().hide();
				$(this).parent().next().removeClass().addClass("login_tips false");
				$(this).parent().next().html("密码的长度应为6-16位");
				$(this).attr("passCheck", "0");
			} else if(val.length > 15) {
				$(this).parent().next().show();
				$(this).parent().next().next().hide();
				$(this).parent().next().removeClass().addClass("login_tips false");
				$(this).parent().next().html("密码的长度应为6-16位");
				$(this).attr("passCheck", "0");
			} else {
				$(this).parent().next().hide();
				$(this).parent().next().next().show();
				var pwcheckele = $(this).parent().next().next();
				var x = checkPw(val);
				if(x == 1) {
					pwcheckele.removeClass().addClass("login_pw_tips state1");
					pwcheckele.html("密码强度：弱");
				} else if(x == 2) {
					pwcheckele.removeClass().addClass("login_pw_tips state2");
					pwcheckele.html("密码强度：中");
				} else if(x == 3) {
					pwcheckele.removeClass().addClass("login_pw_tips state3");
					pwcheckele.html("密码强度：强");
				} else {}

				$(this).attr("passCheck", "1");
			}

		});

		
		$(".pn_forcheck").keyup(function() {
			var val = $(this).val();
			$(this).parent().next().show();
			var _this = $(this);
			if(checkPhonenum(val)) {
//				$.post("/ajax/register.php", {
//					"mobile": val,
//					"check": 'true'
//				}, function(data) {
//					if(data.code == '1') {
						_this.parent().next().removeClass().addClass("login_tips true");
						_this.parent().next().html("手机号码格式正确");
						_this.attr("passCheck", "1");
						$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn');
//					} else {
//						_this.parent().next().removeClass().addClass("login_tips tip");
//						_this.parent().next().html(data.msg);
//						$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn sended');
//					}
//				}, 'json');

			} else {
				$(this).parent().next().removeClass().addClass("login_tips tip");
				$(this).parent().next().html("请输入正确的手机号码");
				$(this).attr("passCheck", "0");

			}

		});
		$(".pn_forcheck").blur(function() {
			var val = $(this).val();
			$(this).parent().next().show();
			var _this = $(this);
			if(checkPhonenum(val)) {
				_this.parent().next().html("手机号码格式正确");
				$("#phone_yzmbtn").html("免费获取验证码");
//				$.post("/ajax/register.php", {
//					"mobile": val,
//					"check": 'true'
//				}, function(data) {
//					if(data.code == '1') {
//						_this.parent().next().removeClass().addClass("login_tips true");
//						_this.parent().next().html("手机号码格式正确");
//						_this.attr("passCheck", "1");
						if($("#phone_yzmbtn").html() == "免费获取验证码") {
							$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn');
						}
//					} else {
//						_this.parent().next().removeClass().addClass("login_tips false");
//						_this.parent().next().html(data.msg);
//						$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn sended');
//					}
//				}, 'json');
			} else {
				$(this).parent().next().removeClass().addClass("login_tips false");
				$(this).parent().next().html("请输入正确的手机号码");
				$(this).attr("passCheck", "0");
				$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn sended');
			}
		});

		$(".pyzm_forcheck").blur(function() {
			var mobile_code = $(this).val();
			var mobile = $("#mobile").val();
			//验证手机号
			if(!checkPhonenum(mobile)) {
				$("#mobile").parent().next().removeClass().addClass("login_tips false");
				$("#mobile").parent().next().html("请输入正确的手机号码");
				$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn sended');
				return false;
			}
			if(mobile_code=="") {
				$(this).parent().next().html("请输入验证码");
				return false;
			}
			var _this = $(this);
			$.post("/sms/check.do", {
				"code": mobile_code,
				"tel": mobile,
				"check": 'true'
			}, function(data) {
				if(data.ok==true) {
					_this.parent().next().removeClass().addClass("login_tips true");
					_this.parent().next().html("验证码正确");
					_this.attr("passCheck", "1");
					_this.parent().next().show();
				} 
				else if(data.code==63){
					_this.parent().next().removeClass().addClass("login_tips false");
					_this.parent().next().html("验证码已失效");
					_this.attr("passCheck", "0");
					_this.parent().next().show();
				}else {
					_this.parent().next().removeClass().addClass("login_tips false");
					_this.parent().next().html("验证码错误");
					_this.attr("passCheck", "0");
					_this.parent().next().show();
				}
			}, "json");
		});

		$("#zc_phone").click(function() {
			var _this = $(this);
			$(".nl_loginbox_ww").animate({
				"margin-left": "0px"
			}, 300, function() {
				_this.siblings().removeClass("current");
				_this.addClass("current");
			});
		});
		
		var ind=0;
		$("#phone_yzmbtn").click(function() {
			var mobile = $("#mobile").val();
			var _this = $(this);
			if(ind==0){
				_this.removeClass("sended");
				ind=1;
			}
			console.info(ind+","+_this.hasClass("sended"));
			if(_this.hasClass("sended")) {
				
			} 
			else if(!checkPhonenum(mobile)){
				_this.html("请输入正确手机号码");
			}
			else {
				$.post("/sms/send.do", {
					"tel": mobile
				}, function(data) {
					console.info(data);
					if(data) {
//						$(this).addClass("sended");
						_this.addClass("sended");
						_this.html("60秒后重新发送");
						var i = 59;
						yzmsti = setInterval(function() {
							_this.html(i + "秒后重新发送");
							if(i == 0) {
								clearInterval(yzmsti);
								_this.removeClass("sended");
								_this.html("免费获取验证码");
							}
							i--;
						}, 1000);
					} else if(data.code == '-3') {
						Alert("请输入验证码", "id:yzmbox", "400", "185", "false", "", "true", "img");
					} else {
						_this.parent().next().removeClass().addClass("login_tips false");
						_this.parent().next().html(data.msg);
						$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn sended');
					}
				}, "json");

			}

		});
		function checkPhonenum(string) {
			var reg = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
			return reg.test(string);
		}
		function checkPw(string) {

			var Mcolor, Wcolor, Scolor, Color_Html;
			var m = 0;
			var Modes = 0;
			if(string.length <= 4) {
				m = 1;
			}
			if(string.length <= 0) {
				m = 0;
			}

			for(i = 0; i < string.length; i++) {
				var charType = 0;
				var t = string.charCodeAt(i);
				if(t >= 48 && t <= 57) {
					charType = 1;
				} else if(t >= 65 && t <= 90) {
					charType = 2;
				} else if(t >= 97 && t <= 122) {
					charType = 4;
				} else {
					charType = 4;
				}
				Modes |= charType;
			}
			for(i = 0; i < 4; i++) {
				if(Modes & 1) {
					m++;
				}
				Modes >>>= 1;
			}
			return(m);
		}
	});
	$(".register_submit").click(function(e) {
		var y = $('#mobile_check').prop('checked');
		var mobile=$('#mobile').val();
		var pass=$('#password_mobile').val();
		var code=$('#mobile_code').val();
		if(!y||mobile==""||pass==""||code=="") {
			toastr.info("请将信息补充完成");
			return;
		}
		$.post("/user/register.do"),{
			"tel":mobile,
			"pass":pass
		},function(data){
			alert(data);
		},'json';
	});

}