window.onload = function() {
	var yzmsti;

	$(function() {
		function init() {
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

		$("#phone_yzmbtn").click(function() {
			var mobile = $("#mobile").val();
			var _this = $(this);
			if(_this.hasClass("sended")) {

			} else {
				$.post("/ajax/send_mobile_code_register.php", {
					"mobile": mobile
				}, function(data) {
					if(data.code == '1') {
						$(this).addClass("sended");
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

		$("#more_dsf_btn").click(function() {

			if($(this).attr("opened") == 0) {
				$("#nl_moredsf").slideDown();
				$(this).html("收起 ∧");
				$(this).attr("opened", "1");
			} else {
				$("#nl_moredsf").slideUp();
				$(this).html("更多第三方登录方式 ∨");
				$(this).attr("opened", "0");
			}

		});

		$("#nl_gozc").click(function() {

			if($(this).attr("opened") == 0) {
				$("#nl_more_zc").slideDown();
				$(this).html("已有账号？马上登陆 ∧");
				$(this).attr("opened", "1");
				$(this).attr("onclick", "_hmt.push(['_trackEvent', 'zhuce', 'click', '注册登录页_去登录'])");
				$("#msj_loginbox").slideUp();
				$(".nl_title").html('<span class="nl_t_left"></span>注册iMusic<span class="nl_t_right">');
			} else {
				$("#nl_more_zc").slideUp();
				$(this).html("还没有账号？免费注册 ∨");
				$(this).attr("opened", "0");
				$(this).attr("onclick", "_hmt.push(['_trackEvent', 'zhuce', 'click', '注册登录页_去注册'])");
				$("#msj_loginbox").slideDown();
				$(".nl_title").html('<span class="nl_t_left"></span>登录iMusic<span class="nl_t_right">');
			}

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
		$("#zc_email").click(function() {
			var _this = $(this);
			$(".nl_loginbox_ww").animate({
				"margin-left": "-320px"
			}, 300, function() {
				_this.siblings().removeClass("current");
				_this.addClass("current");
			});
		});

		$(".pn_forcheck").keyup(function() {
			var val = $(this).val();
			$(this).parent().next().show();
			var _this = $(this);
			if(checkPhonenum(val)) {
				$.post("/ajax/register.php", {
					"mobile": val,
					"check": 'true'
				}, function(data) {
					if(data.code == '1') {
						_this.parent().next().removeClass().addClass("login_tips true");
						_this.parent().next().html("手机号码格式正确");
						_this.attr("passCheck", "1");
						$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn');
					} else {
						_this.parent().next().removeClass().addClass("login_tips tip");
						_this.parent().next().html(data.msg);
						$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn sended');
					}
				}, 'json');

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
				$.post("/ajax/register.php", {
					"mobile": val,
					"check": 'true'
				}, function(data) {
					if(data.code == '1') {
						_this.parent().next().removeClass().addClass("login_tips true");
						_this.parent().next().html("手机号码格式正确");
						_this.attr("passCheck", "1");
						if($("#phone_yzmbtn").html() == "免费获取验证码") {
							$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn');
						}
					} else {
						_this.parent().next().removeClass().addClass("login_tips false");
						_this.parent().next().html(data.msg);
						$("#phone_yzmbtn").removeClass().addClass('phone_yzmbtn sended');
					}
				}, 'json');
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
			if(!mobile_code) {
				$(this).parent().next().html("请输入验证码");
				return false;
			}
			var _this = $(this);
			$.post("/ajax/register.php", {
				"mobile_code": mobile_code,
				"mobile": mobile,
				"check": 'true'
			}, function(data) {
				if(data.code == '1') {
					_this.parent().next().removeClass().addClass("login_tips true");
					_this.parent().next().html("验证码正确");
					_this.attr("passCheck", "1");
					_this.parent().next().show();
				} else {
					_this.parent().next().removeClass().addClass("login_tips false");
					_this.parent().next().html(data.msg);
					_this.attr("passCheck", "0");
					_this.parent().next().show();
				}
			}, "json");
		});

		$(".email_forcheck").keyup(function() {
			var val = $(this).val();
			$(this).parent().next().show();
			if(checkEmail(val)) {
				$(this).parent().next().removeClass().addClass("login_tips true");
				$(this).parent().next().html("邮箱格式正确");
				$(this).attr("passCheck", "1");

			} else {
				$(this).parent().next().removeClass().addClass("login_tips tip");
				$(this).parent().next().html("请输入正确的邮箱");
				$(this).attr("passCheck", "0");
			}

		});
		$(".email_forcheck").blur(function() {
			var val = $(this).val();
			$(this).parent().next().show();
			var _this = $(this);
			if(checkEmail(val)) {
				$.post("/ajax/register.php", {
					"email": val,
					"check": 'true'
				}, function(data) {
					if(data.code == '1') {
						_this.parent().next().removeClass().addClass("login_tips true");
						_this.parent().next().html("邮箱格式正确");
						_this.attr("passCheck", "1");
					} else {
						_this.parent().next().removeClass().addClass("login_tips false");
						_this.parent().next().html(data.msg);
						_this.attr("passCheck", "0");
					}
				}, "json");
			} else {
				$(this).parent().next().removeClass().addClass("login_tips false");
				$(this).parent().next().html("请输入正确的邮箱");
				$(this).attr("passCheck", "0");
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

		$(".register_submit").click(function(e) {
			var i = $(this).attr("id");
			if($('#reg_from').size() > 0) {
				var reg_from = $('#reg_from').val();
			} else {
				var reg_from = '';
			}
			if($('#obj_id').size() > 0) {
				var obj_id = $('#obj_id').val();
			} else {
				var obj_id = '';
			}
			if($('#invite_id').size() > 0) {
				var invite_id = $('#invite_id').val();
			} else {
				var invite_id = 0;
			}
			var f = submitCheck($(this));
			e.preventDefault();
			if(f == 1) {
				if(i == "nl_phone_submit_btn") {
					var mobile = $('#mobile').val();
					var password = $('#password_mobile').val();
					var mobile_code = $('#mobile_code').val();
					var y = $('#mobile_check').attr('checked');
					if(y != "checked") {
						return;
					}
					$.post("/ajax/register.php", {
						"mobile": mobile,
						"password": password,
						"mobile_code": mobile_code,
						"reg_from": reg_from,
						"obj_id": obj_id,
						"i": invite_id,
						"regist_type": 'mobile'
					}, function(data) {
						if(data.code == '1') {
							window.location.href = "http://i.meishi.cc/account/basic.php";
						} else {
							switch(data.code) {
								case -5:
									$("#mobile").parent().next().removeClass().addClass("login_tips false");
									$("#mobile").parent().next().html(data.msg);
									break;
								case -6:
									$('.pyzm_forcheck').parent().next().removeClass().addClass("login_tips false");
									$('.pyzm_forcheck').parent().next().html(data.msg);
									break;
								case -3:
									$('.pw_forcheck').parent().next().removeClass().addClass("login_tips false");
									$('.pw_forcheck').parent().next().html("密码的长度应为6-16位");
									break;
								default:
									alert(data.msg);
									break;
							}
						}
					}, "json");
				} else if(i == "nl_email_submit_btn") {
					var y = $('#email_check').attr('checked');
					if(y != "checked") {
						return;
					}
					var email = $("#email").val();
					var password = $("#email_password").val();
					var yzm = $("#email_yzm").val();
					var verifycode_key = $("#verifycode_key").val();
					$.post("/ajax/register.php", {
						"email": email,
						"password": password,
						"verifycode": yzm,
						"verifycode_key": verifycode_key,
						"reg_from": reg_from,
						"obj_id": obj_id,
						"i": invite_id,
						"regist_type": 'email'
					}, function(data) {
						if(data.code == '1') {
							$.get('/ajax/send_active.php', function() {});
							window.location.href = "http://i.meishi.cc/mail_verify.php";
						} else {
							switch(data.code) {
								case -2:
									$("#email").parent().next().removeClass().addClass("login_tips false");
									$("#email").parent().next().html(data.msg);
									$("#email").attr("passCheck", "0");
									break;
								case -3:
									$("#email_password").parent().next().removeClass().addClass("login_tips false");
									$("#email_password").parent().next().html(data.msg);
									$("#email_password").attr("passCheck", "0");
									break;
								case -4:
									$("#email_yzm").parent().next().removeClass().addClass("login_tips false");
									$("#email_yzm").parent().next().html(data.msg);
									$("#email_yzm").attr("passCheck", "0");
									break;
								default:
									alert(data.msg);
									break;
							}
						}
					}, "json");

				}
			} else {
				$.each($("#" + i + "_form .forcheck"), function() {
					$(this).blur();
				});
			}

		});

	});

	function checkPhonenum(string) {
		var reg = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
		return reg.test(string);
	}

	function checkEmail(string) {
		var reg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;;
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

	function submitCheck(ele) {
		var f = ele.parents("form");

		if(f.hasClass("register_form_pn")) {

			var e = $(".register_form_pn .forcheck");

		} else if(f.hasClass("register_form_email")) {
			var e = $(".register_form_email .forcheck");
		}

		var arr = [];
		$.each(e, function() {
			arr.push($(this).attr("passCheck"));

		});

		if($.inArray("0", arr) == -1) {
			return 1;
		} else {
			return 0;
		}

	}

	$(".change_yzm_img").live("click", function() {
		var verify_code_key = $('#verifycode_key_mobile').val();
		var url = '/ajax/verfiy_img.php?verifycode_key=';
		url = url + verify_code_key + '&rand=' + (new Date()).getTime();
		$(this).siblings('img').attr('src', url);

	});

	$("#mail_yzm_refresh").live("click", function() {
		var verify_code_key = $('#verifycode_key').val();
		var url = '/ajax/verfiy_img.php?verifycode_key=';
		url = url + verify_code_key + '&rand=' + (new Date()).getTime();
		$(this).siblings('img').attr('src', url);

	});

	$("#send_mobile_code_byyzm").live("click", function() {
		var mobile = $("#mobile").val();
		var yzm_mobile = $("#windown-box #yzm_mobile").val();
		if(yzm_mobile.length != 4) {
			alert('验证码不正确');
			$(".change_yzm_img").trigger('click');
			return;
		}
		var verify_code_key = $('#verifycode_key_mobile').val();

		$.post("/ajax/send_mobile_code_register.php", {
			"mobile": mobile,
			"verifycode": yzm_mobile,
			"verifycode_key": verify_code_key
		}, function(data) {
			if(data.code == '1') {
				$("#windown-close").click();
				$("#phone_yzmbtn").addClass("sended");
				$("#phone_yzmbtn").html("60秒后重新发送");
				var i = 59;
				yzmsti = setInterval(function() {
					$("#phone_yzmbtn").html(i + "秒后重新发送");
					if(i == 0) {
						clearInterval(yzmsti);
						$("#phone_yzmbtn").removeClass("sended");
						$("#phone_yzmbtn").html("免费获取验证码");
					}
					i--;
				}, 1000);
			} else if(data.code == "-1") {
				alert(data.msg);
				$(".change_yzm_img").trigger('click');
			} else {
				alert(data.msg);
			}
		}, "json");
	})
}