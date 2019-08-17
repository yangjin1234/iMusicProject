! function(modules) {
	function __webpack_require__(moduleId) {
		if (installedModules[moduleId]) return installedModules[moduleId].exports;
		var module = installedModules[moduleId] = {
			exports: {},
			id: moduleId,
			loaded: !1
		};
		return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.loaded = !0,
			module.exports
	}
	var installedModules = {};
	return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.p = "",
		__webpack_require__(0)
}([function(module, exports, __webpack_require__) {
	var utility = __webpack_require__(1),
		header = __webpack_require__(2),
		song = __webpack_require__(3),
		special = __webpack_require__(5),
		config = (__webpack_require__(7), __webpack_require__(4));
	__webpack_require__(8);
	__webpack_require__(9), __webpack_require__(10);
	var MD5 = __webpack_require__(6),
		Base64 = __webpack_require__(11),
		search = {
			isPageBottom: function() {
				var scrollTop = $(document).scrollTop(),
					clientHeight = $(document).height(),
					winHeight = $(window).height();
				return scrollTop + winHeight > clientHeight - 200
			},
			init: function() {
				var searchInput = $(".search_input input"),
					$top_searchInput = $(".top_search .search_input input"),
					_this = this,
					$content_searchInput = $(".content_search .search_input input"),
					$top_search_recommend = $(".top_search_recommend"),
					$content_search_recommend = $(".content_search_recommend"),
					searchType = utility.QueryString("searchType") || "song",
					searchKeyWord = decodeURIComponent(utility.QueryString("searchKeyWord")) || searchInput.val().replace(
						/(^\s+)|(\s+$)/g, "");
				header.init(), _this.nofouce(function(data) {
					"{}" != utility.JSON.stringify(data) && "undefined" != typeof data && "" != data && 0 != data.length &&
						"undefined" != data[0] && "undefined" != data[0].keyword && (utility.hasPlaceholder() ? ($top_searchInput.attr(
							"placeholder", data[0].keyword), $content_searchInput.attr("placeholder", data[0].keyword)) : (
							$top_searchInput.val(data[0].keyword), $content_searchInput.val(data[0].keyword))), searchKeyWord ? (config
							.defaultKey = !0, searchInput.val(searchKeyWord || ""), config.searchKeyWord = searchKeyWord || "",
							setTimeout(function() {
								$content_search_recommend.removeClass("show").addClass("hide").hide(), $top_search_recommend.removeClass(
									"show").addClass("hide").hide()
							}, 200)) : config.searchKeyWord = $content_searchInput.attr("placeholder"), header.showActive(searchType)
				}), _this.bindUI()
			},
			bindUI: function() {
				var _this = this,
					$searh_btn = $(".content_search .searh_btn"),
					$top_history = $(".top_search_histroy"),
					$top_search_recommend = $(".top_search_recommend"),
					$content_history = $(".content_search_histroy"),
					$content_search_recommend = $(".content_search_recommend"),
					songEle = document.getElementById("search_song"),
					$top_searchInput = (document.getElementById("search_special"), $(".top_search .search_input input")),
					$content_searchInput = $(".content_search .search_input input"),
					contenTime = null,
					wordRecommendTime = null,
					getval = null,
					downFlag = 1,
					upFlag = 2,
					loadfrom = location.href,
					reffer = document.referrer,
					downloadLink = "http://download.kugou.com/download/kugou_pc";
				try {
					loadfrom.indexOf("baidu") != -1 || reffer.indexOf("baidu.com") != -1 ? downloadLink =
						"http://xiazai.kugou.com/Corp/kugou7_3762.exe" : loadfrom.indexOf("sogou") == -1 && reffer.indexOf("sogou") ==
						-1 || (downloadLink = "http://xiazai.kugou.com/Corp/kugou7_3814.exe")
				} catch (ex) {}
				window.onhashchange = function() {
					var hashchangeKey = decodeURIComponent(utility.QueryString("searchKeyWord"));
					"" != hashchangeKey && config.searchKeyWord != hashchangeKey && (config.searchKeyWord = hashchangeKey, config.searchType =
						utility.QueryString("searchType"), $top_searchInput.val(config.searchKeyWord), $content_searchInput.val(
							config.searchKeyWord), header.resetSearchSetting(function() {
							config.searchType = "song", header.showActive("song")
						}))
				}, $("#downlaod a").attr("href", downloadLink);
				var thisOs = utility.detectOS();
				"Mac" == thisOs && $("#downlaod a").attr("href", "http://download.kugou.com/download/kugou_mac"), $(
					".search_tab li").on("click", function(event) {
					return $(this).addClass("active").siblings("li").removeClass("active"), config.fo = "搜索页", config.searchType =
						$(this).attr("data-type"), header.showActive(config.searchType), !1
				}), $content_history.on("click", ".clear_histroy", function() {
					localStorage.s_keyword = "", $content_history.find(".history_song_list").empty(), $content_history.removeClass(
						"show").addClass("hide")
				}), $searh_btn.off("click").on("click", function() {
					$(this).parent().parent().hasClass("content_search") ? config.fo = "搜索页" : config.fo = "头部导航栏", config.searchKeyWord =
						$content_searchInput.val().replace(/(^\s+)|(\s+$)/g, ""), "" == config.searchKeyWord && (config.searchKeyWord =
							$content_searchInput.attr("placeholder") || ""), $content_searchInput.val(config.searchKeyWord),
						$top_searchInput.val(config.searchKeyWord), header.resetSearchSetting(function() {
							config.searchType = "song", header.showActive("song")
						})
				}), $content_searchInput.on("keydown", function(e) {
					var histroydd = $(".content_search_histroy dd"),
						songdd = $(".content_search_recommend dl.recommend_song_list dd"),
						mvdd = $(".content_search_recommend dl.recommend_mv_list dd"),
						histroyIndex = $(".content_search_histroy dd.hover").index(),
						songIndex = $(".content_search_recommend .recommend_song_list dd.hover").index(),
						MvIndex = $(".content_search_recommend .recommend_mv_list dd.hover").index();
					13 === e.keyCode ? (config.fo = "搜索页", config.searchKeyWord = $content_searchInput.val().replace(
						/(^\s+)|(\s+$)/g, ""), $top_searchInput.val($content_searchInput.val()), header.resetSearchSetting(
						function() {
							config.searchType = "song", header.showActive("song")
						}), $content_history.removeClass("show").addClass("hide"), $content_search_recommend.removeClass("show").addClass(
						"hide")) : 38 == e.keyCode ? (upFlag = songIndex != -1 ? 1 : 2, $content_history.hasClass("show") ?
						histroyIndex + 1 == 0 ? histroydd.eq(histroydd.length - 1).addClass("hover").siblings("dd").removeClass(
							"hover") : histroydd.eq(histroyIndex - 1).addClass("hover").siblings("dd").removeClass("hover") :
						$content_search_recommend.hasClass("show") && (0 == mvdd.length && 0 != songdd.length && (upFlag = 1,
								songIndex + 1 == 0 ? (upFlag = 1, songdd.removeClass("hover"), songdd.eq(songdd.length - 1).addClass(
									"hover")) : (upFlag = 1, songdd.removeClass("hover"), songdd.eq(songIndex - 1).addClass("hover"))), 0 ==
							songdd.length && 0 != mvdd.length && (upFlag = 2, MvIndex + 1 == 0 ? (songdd.removeClass("hover"), mvdd.eq(
								mvdd.length - 1).addClass("hover")) : (mvdd.removeClass("hover"), mvdd.eq(MvIndex - 1).addClass("hover"))),
							0 != songdd.length && 0 != mvdd.length && (1 == upFlag ? 0 == songIndex ? (upFlag = 2, songdd.removeClass(
								"hover"), mvdd.eq(mvdd.length - 1).addClass("hover")) : (songdd.removeClass("hover"), songdd.eq(
								songIndex - 1).addClass("hover")) : MvIndex + 1 == 0 ? (songdd.removeClass("hover"), mvdd.eq(mvdd.length -
								1).addClass("hover")) : 0 == MvIndex ? (upFlag = 1, mvdd.removeClass("hover"), songdd.eq(songdd.length -
								1).addClass("hover")) : (mvdd.removeClass("hover"), mvdd.eq(MvIndex - 1).addClass("hover")))),
						$content_history.hasClass("show") ? $content_searchInput.val($(".search_histroy dd.hover").attr("title")) :
						$content_search_recommend.hasClass("show") && (1 == upFlag ? $content_searchInput.val($(
								".content_search_recommend .recommend_song_list dd.hover").attr("title")).attr("data", "song") :
							$content_searchInput.val($(".content_search_recommend .recommend_mv_list dd.hover").attr("title")).attr(
								"data", "mv"))) : 40 == e.keyCode && ($content_history.hasClass("show") ? histroyIndex + 1 == histroydd.length ?
						histroydd.eq(0).addClass("hover").siblings("dd").removeClass("hover") : histroydd.eq(histroyIndex + 1).addClass(
							"hover").siblings("dd").removeClass("hover") : $content_search_recommend.hasClass("show") && (0 == mvdd.length &&
							0 != songdd.length && (downFlag = 1, songIndex + 1 == songdd.length ? (songdd.removeClass("hover"), songdd
								.eq(0).addClass("hover")) : (songdd.removeClass("hover"), songdd.eq(songIndex + 1).addClass("hover"))), 0 ==
							songdd.length && 0 != mvdd.length && (downFlag = 2, MvIndex + 1 == songdd.length ? (mvdd.removeClass(
								"hover"), mvdd.eq(0).addClass("hover")) : (mvdd.removeClass("hover"), mvdd.eq(MvIndex + 1).addClass(
								"hover"))), 0 != songdd.length && 0 != mvdd.length && (1 == downFlag ? songIndex + 1 == 0 ? (mvdd.removeClass(
								"hover"), songdd.eq(0).addClass("hover")) : songIndex + 1 == songdd.length ? (downFlag = 2, songdd.removeClass(
								"hover"), mvdd.eq(0).addClass("hover")) : (songdd.removeClass("hover"), songdd.eq(songIndex + 1).addClass(
								"hover")) : MvIndex + 1 == mvdd.length ? (downFlag = 1, mvdd.removeClass("hover"), songdd.eq(0).addClass(
								"hover")) : (mvdd.removeClass("hover"), mvdd.eq(MvIndex + 1).addClass("hover")))), $content_history.hasClass(
							"show") ? $content_searchInput.val($(".search_histroy dd.hover").attr("title")) :
						$content_search_recommend.hasClass("show") && (1 == downFlag ? $content_searchInput.val($(
								".content_search_recommend .recommend_song_list dd.hover").attr("title")).attr("data", "song") :
							$content_searchInput.val($(".content_search_recommend .recommend_mv_list dd.hover").attr("title")).attr(
								"data", "mv")))
				}).on("click", function() {
					config.defaultKey = !1, $top_search_recommend.fadeOut(100).addClass("hide").removeClass("show"), $top_history
						.fadeOut(100).addClass("hide").removeClass("show"), $content_search_recommend.fadeOut(100).addClass("hide").removeClass(
							"show"), $content_history.fadeOut(100).addClass("hide").removeClass("show"), "" == $content_searchInput.val()
						.replace(/(^\s+)|(\s+$)/g, "") ? header.historyHtml(function(str) {
							"" != str ? $content_history.html(str).fadeIn(100).addClass("show").removeClass("hide") : $content_history
								.addClass("noData")
						}) : (clearTimeout(wordRecommendTime), wordRecommendTime = setTimeout(function() {
							header.wordRecommend({
								keyword: $content_searchInput.val().replace(/(^\s+)|(\s+$)/g, ""),
								callback: function(str) {
									"" != str ? $content_search_recommend.html(str).fadeIn(100).addClass("show").removeClass("hide") :
										$content_history.fadeOut(100).addClass("hide").removeClass("show")
								}
							})
						}, 10))
				}).on("textchange", function() {
					clearTimeout(getval), getval = setTimeout(function() {
						config.defaultKey || ("" != utility.htmlDecode($content_searchInput.val()).replace(/(^\s+)|(\s+$)/g, "") ?
							(clearTimeout(wordRecommendTime), wordRecommendTime = setTimeout(function() {
								header.wordRecommend({
									keyword: utility.htmlDecode($content_searchInput.val()).replace(/(^\s+)|(\s+$)/g, ""),
									callback: function(str) {
										"" != str ? ($content_history.hide().addClass("hide").removeClass("show"),
											$content_search_recommend.show().html(str).addClass("show").removeClass("hide")) : (
											$content_search_recommend.hide().addClass("hide").removeClass("show"), $content_history.hide()
											.addClass("hide").removeClass("show"))
									}
								})
							}, 100)) : (clearTimeout(wordRecommendTime), header.historyHtml(function(str) {
								"" != str ? ($content_search_recommend.hide().addClass("hide").removeClass("show"), $content_history.show()
									.html(str).addClass("show").removeClass("hide")) : ($content_search_recommend.hide().addClass(
									"hide").removeClass("show"), $content_history.hide().addClass("hide").removeClass("show").addClass(
									"noData"))
							})))
					}, 200)
				}).on("blur", function() {
					contenTime = setTimeout(function() {
						$content_history.hasClass("noData") || $content_history.hide().addClass("hide").removeClass("show"),
							$content_search_recommend.hide().addClass("hide").removeClass("show")
					}, 400)
				}), $content_history.mouseover(function() {
					clearTimeout(contenTime), $content_history.removeClass("hide").addClass("show")
				}), $content_history.on("mousedown", "dd", function() {
					config.fo = "搜索页";
					var me = $(this);
					return $content_searchInput.val(utility.SIPHtmlDecode(me.text())), $top_searchInput.val(utility.SIPHtmlDecode(
						me.text())), config.searchKeyWord = utility.SIPHtmlDecode(me.text()), header.resetSearchSetting(function() {
						config.searchType = "song", header.showActive(config.searchType)
					}), $content_history.removeClass("show").addClass("hide"), !1
				}), $content_search_recommend.on("mousedown", "dd", function() {
					config.fo = "搜索页";
					var me = $(this),
						keyword_recommend = me.text();
					return $content_searchInput.val(keyword_recommend), $top_searchInput.val(keyword_recommend), utility.keywordStorge(
							keyword_recommend), config.searchKeyWord = keyword_recommend, config.searchType = me.attr("data-type"),
						header.resetSearchSetting(function() {
							config.searchType = "song", header.showActive("song")
						}), $content_search_recommend.removeClass("show").addClass("hide"), !1
				}), $("#search_song li").on("click", ".checkall", function() {
					$(this).hasClass("checked") ? ($(this).removeClass("checked"), $(songEle).find(".checkbox").removeClass(
						"checked"), $(songEle).find("li").removeClass("active")) : ($(this).addClass("checked"), $(songEle).find(
						".checkbox").addClass("checked"), $(songEle).find("li").addClass("active"))
				}), $(songEle).off("click").on("click", ".play_all", function() {
					var songData = (song.datacache.searchSongData, []),
						playData = [],
						checklist = $(songEle).find(".checked").not(".checkall");
					if ($(checklist).each(function(index) {
							var data = $(this).closest("li").data("song");
							songData.push(data)
						}), 0 != songData.length && $(songData).each(function(index, data) {
							var songObj = {};
							songObj.audio_name = utility.delHtmlTag(data.SongName), songObj.author_name = utility.delHtmlTag(data.SingerName),
								songObj.Hash = data.FileHash, songObj.album_id = data.AlbumID, songObj.timelength = 1e3 * data.Duration,
								songObj.from = "search", songObj.random = (new Date).getTime(), playData.push(songObj)
						}), 0 != playData.length) {
						var resultSongs = JSON.stringify(playData);
						if ("false" == _this.isExists() || null === _this.isExists()) {
							$.jStorage.set("k_play_list", resultSongs), window.open("//www.kugou.com/song/")
						} else $.jStorage.set("newsong", resultSongs), timeForAccident = setTimeout(function() {
							if ($.jStorage.reInit(), null === $.jStorage.get("playdata")) {
								$.jStorage.set("k_play_list", resultSongs), location.href = "//www.kugou.com/song/"
							}
						}, 3e3);
						_this.addTips()
					} else {
						var d = dialog({
							title: "请选择歌曲",
							skin: "download_popup",
							content: ['<div class="dialogContent clearfix" id="forbidPlay">', '<div class="contetText">请选择歌曲</div>',
								'<div class="dialogFooter clearfix">', '<a class="btnDl" id="iKown">我知道了</a>', "</div>", "</div>"
							].join(""),
							onshow: function() {
								$(".btnDl").off("click").on("click", function(e) {
									e.preventDefault(), $(".ui-dialog-close").trigger("click")
								})
							}
						});
						d.show()
					}
				}), $(songEle).on("click", ".icon_play", function() {
					var songObj = {},
						playData = [],
						Songdata = $(this).closest("li").data("song");
					songObj.audio_name = Songdata.SongName.replace(/<em>|<\/em>/g, ""), songObj.author_name = Songdata.SingerName
						.replace(/<em>|<\/em>/g, ""), songObj.Hash = Songdata.FileHash, songObj.album_id = Songdata.AlbumID, songObj
						.timelength = 1e3 * Songdata.Duration, songObj.from = "search", songObj.random = (new Date).getTime(),
						playData.push(songObj);
					var resultSongs = JSON.stringify(playData);
					if ("false" == _this.isExists() || null === _this.isExists()) {
						$.jStorage.set("k_play_list", resultSongs), window.open("//www.kugou.com/song/")
					} else $.jStorage.set("newsong", resultSongs), timeForAccident = setTimeout(function() {
						if ($.jStorage.reInit(), null === $.jStorage.get("playdata")) {
							$.jStorage.set("k_play_list", resultSongs), location.href = "//www.kugou.com/song/"
						}
					}, 3e3);
					_this.addTips()
				}), $(songEle).on("click", ".icon_download", function() {
					var songObj = {},
						Songdata = $(this).closest("li").data("song");
					songObj.audio_name = Songdata.SongName.replace(/<em>|<\/em>/g, ""), songObj.author_name = Songdata.SongName.replace(
							/<em>|<\/em>/g, ""), songObj.Hash = Songdata.FileHash, songObj.privilege = Songdata.Privilege, songObj.album_id =
						Songdata.AlbumID, songObj.FileSize = Songdata.FileSize, songObj.timelength = 1e3 * Songdata.Duration, _this.download(
							songObj)
				}), $(songEle).on("click", ".icon_share", function() {
					var songObj = {},
						Songdata = $(this).closest("li").data("song");
					songObj.audio_name = Songdata.SongName.replace(/<em>|<\/em>/g, ""), songObj.author_name = Songdata.SingerName
						.replace(/<em>|<\/em>/g, ""), songObj.Hash = Songdata.FileHash, songObj.album_id = Songdata.AlbumID, songObj
						.timelength = 1e3 * Songdata.Duration, _this.share(songObj)
				}), $(songEle).on("click", ".song_name", function(e) {
					e.preventDefault();
					var songObj = {},
						playData = [],
						Songdata = $(this).closest("li").data("song");
					songObj.audio_name = Songdata.SongName.replace(/<em>|<\/em>/g, ""), songObj.author_name = Songdata.SingerName
						.replace(/<em>|<\/em>/g, ""), songObj.Hash = Songdata.FileHash, songObj.album_id = Songdata.AlbumID, songObj
						.timelength = 1e3 * Songdata.Duration, songObj.from = "search", songObj.random = (new Date).getTime(),
						playData.push(songObj);
					var resultSongs = JSON.stringify(playData);
					if ("false" == _this.isExists() || null === _this.isExists()) {
						$.jStorage.set("k_play_list", resultSongs), window.open("//www.kugou.com/song/")
					} else $.jStorage.set("newsong", resultSongs), timeForAccident = setTimeout(function() {
						if ($.jStorage.reInit(), null === $.jStorage.get("playdata")) {
							$.jStorage.set("k_play_list", resultSongs), location.href = "//www.kugou.com/song/"
						}
					}, 3e3);
					return _this.addTips(), !1
				}), $("#search_special").off("click").on("click", ".special_link", function(e) {
					e.preventDefault(), window.open($(this).attr("href"))
				}), $("#search_special li").on("mouseover", function(e) {
					$(".play-item").show()
				}).on("mouseout", function(e) {
					$(".play-item").show()
				}), $("#search_special").on("click", ".icon_play", function(e) {
					if (e.preventDefault(), e.stopPropagation(), e.target.className.indexOf("icon_play") != -1) {
						var specialId = $(this).attr("data");
						special.getSpecialSongs({
							collection_id: specialId
						}, function(data) {
							if ("undefined" != typeof data && data.length > 0) {
								for (var specialData = [], i = 0, len = data.length; i < len; i++) {
									var specialObj = {};
									specialObj.audio_name = data[i].audio_name.replace(/<em>|<\/em>/g, ""), specialObj.author_name = data[i]
										.author_name.replace(/<em>|<\/em>/g, ""), specialObj.Hash = data[i].hash, specialObj.album_id = data[i]
										.album_id, specialObj.timelength = data[i].timelength, specialObj.from = "search", specialObj.random =
										(new Date).getTime(), specialData.push(specialObj)
								}
								var resultSongs = JSON.stringify(specialData);
								"false" == _this.isExists() || null === _this.isExists() ? ($.jStorage.set("k_play_list", resultSongs),
									window.location = "//www.kugou.com/song/") : ($.jStorage.set("newsong", resultSongs), timeForAccident =
									setTimeout(function() {
										if ($.jStorage.reInit(), null === $.jStorage.get("playdata")) {
											$.jStorage.set("k_play_list", resultSongs), location.href = "//www.kugou.com/song/"
										}
									}, 3e3)), _this.addTips()
							} else {
								var d = dialog({
									title: "请选择歌曲",
									skin: "download_popup",
									content: ['<div class="dialogContent clearfix" id="forbidPlay">',
										'<div class="contetText">播放失败,请稍后重试</div>', '<div class="dialogFooter clearfix">',
										'<a class="btnDl" id="iKown">我知道了</a>', "</div>", "</div>"
									].join(""),
									onshow: function() {
										$(".btnDl").off("click").on("click", function(e) {
											e.preventDefault(), $(".ui-dialog-close").trigger("click")
										})
									}
								});
								d.show()
							}
						})
					}
				})
			},
			nofouce: function(callback) {
				$.ajax({
					type: "GET",
					url: "https://searchrecommend.kugou.com/v1/word_nofocus?platform=pc",
					dataType: "jsonp",
					success: function(res) {
						callback(1 == res.status ? res.data : "")
					},
					error: function(res) {
						callback("")
					}
				})
			},
			shared: null,
			downloadd: null,
			hashQueryShortUrl: function(option, callback) {
				var _this = this,
					filename = utility.htmlDecode(option.author_name) + "-" + utility.htmlDecode(option.audio_name),
					hash = option.Hash,
					album_id = option.album_id || 0,
					md5Str = MD5.md5(hash + "kgclientshare"),
					from = "weixin" == option.chl ? "webCode" : "",
					dataObj = {
						cmid: 1,
						filename: filename,
						hash: hash,
						album_id: album_id,
						is_short: 1,
						md5: md5Str,
						chl: option.chl || "weixin",
						codes: 1,
						from: from
					};
				$.ajax({
					type: "get",
					url: "https://tservice.kugou.com/app/",
					timeout: 3e3,
					dataType: "jsonp",
					jsonp: "callback",
					data: dataObj,
					success: function(res) {
						res && (res.status ? ($(".qrcode").find("img").attr("src", res.codes_url), callback && callback(res)) :
							31001 == res.err_code && (setTimeout(function() {
								_this.shareIsCanClick = !0
							}, 1e3), $(".qrcode").find("img").attr("src",
								"https://pc.service.kugou.com/apps/kucodeAndShare/static/images/no_share.jpg"), callback && callback(""))
						)
					},
					error: function(xhr, type) {
						callback && callback("")
					}
				})
			},
			download: function(data) {
				var _this = this;
				_this.downloadd || (_this.downloadd = dialog({
					title: "下載歌曲",
					skin: "download_popup",
					fixed: !0,
					content: [' <div class="dialogContent clearfix">', '<div class="contetText">',
						'<p><span class="warn_icon"></span>下载歌曲需要在酷狗音乐客户端操作</p></div>', '<div class="dialogFooter clearfix">',
						"<a href=\"#\" class=\"callClient\" onclick=\"_hmt.push(['_trackEvent', 'hideopen', 'opencilick', 'hopenpc']);\">打开客户端</a>",
						"<a href=\"#\" class=\"btnDl\" onclick=\"_hmt.push(['_trackEvent', 'hidedownnew', 'newcilick', 'newpc']);\">下载新版客户端</a>",
						"</div>", " </div>"
					].join(""),
					onshow: function() {
						$(".btnDl").off("click").on("click", function(e) {
							e.preventDefault();
							window.open("http://download.kugou.com/download/kugou_pc");
							_this.downloadd.close().remove()
						}), $(".callClient").off("click").on("click", function(e) {
							e.preventDefault(), _this.callExe({
								song_info: data
							}), _this.downloadd.close().remove()
						})
					},
					onclose: function() {
						_this.downloadd = null
					}
				}), _this.downloadd.show())
			},
			share: function(data) {
				var _this = this;
				_this.shared || (_this.shared = dialog({
					title: "分享歌曲",
					skin: "share_popup",
					fixed: !0,
					content: ["<div id='share_list'>", " <dl>", "<dt class='share_weixin'></dt>",
						"<dd class='qrcode'><img src='' /></dd>", "<dd>微信</dd>", "</dl>", "<dl>", "<dt class='share_friend'></dt>",
						"<dd>QQ好友</dd>", "</dl>", "<dl>", "<dt class='share_qzone'></dt>", "<dd>QQ空间</dd>", "</dl>", "<dl>",
						"<dt class='share_weibo'></dt>", "<dd>新浪微博</dd>", "</dl>", "</div>"
					].join(""),
					onshow: function() {
						var shareTitle = utility.htmlDecode(data.author_name) + "-" + utility.htmlDecode(data.audio_name),
							shareIntro = "我在酷狗常听的《" + shareTitle + "》，你也来听听吧！（来自 web 酷狗音乐）";
						sharePic = "https://www.kugou.com/yy/static/images/share-cover.png", data.chl = "weixin", _this.hashQueryShortUrl(
							data,
							function(res) {
								var shareShortUrl = res.data;
								$(".share_weixin").mouseover(function() {
									$(".qrcode").show()
								}).mouseout(function() {
									$(".qrcode").hide()
								}), "" != shareShortUrl && 31001 != res.err_code || _this.upSupportShare("微信")
							}), $.ajax({
							type: "get",
							url: "https://www.kugou.com/root/getSongCover?hash=" + data.Hash,
							timeout: 3e3,
							cache: !1,
							success: function(res) {
								1 == res.status && $.isArray(res.data) && res.data[0] && "" != res.data[0].sizable_cover && (sharePic =
									res.data[0].sizable_cover.replace(/{size}/, 135))
							},
							error: function(xhr, type) {}
						}), $(".share_friend").on("click", function() {
							var newWin = window.open("");
							data.chl = "qq", _this.hashQueryShortUrl(data, function(res) {
								var shareShortUrl = res.data;
								"" == shareShortUrl || 31001 == res.err_code ? _this.upSupportShare("QQ") : newWin.location =
									"http://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(shareShortUrl) +
									"&desc=&title=" + encodeURIComponent(shareTitle) + "&summary=" + encodeURIComponent(shareIntro) +
									"&pics=" + sharePic + "&flash=&site=www.kugou.com", _this.shared.close().remove()
							})
						}), $(".share_qzone").on("click", function() {
							var newWin = window.open("");
							data.chl = "qzone", _this.hashQueryShortUrl(data, function(res) {
								var shareShortUrl = res.data;
								"" == shareShortUrl || 31001 == res.err_code ? _this.upSupportShare("QQ空间") : newWin.location =
									"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(
										shareShortUrl) + "&title=" + shareTitle + "&pics=" + sharePic + "&summary=" + shareIntro
							}), _this.shared.close().remove()
						}), $(".share_weibo").on("click", function() {
							var weiboShareIntro;
							weiboShareIntro = shareIntro.replace("#", "%23"), weiboShareIntro = weiboShareIntro.replace(
								"（来自 PC 酷狗音乐）", "（ 来自 @酷狗音乐 web版 ）"), weiboShareIntro = encodeURIComponent(weiboShareIntro);
							var newWin = window.open("");
							data.chl = "weibo", _this.hashQueryShortUrl(data, function(res) {
								var shareShortUrl = res.data;
								"" == shareShortUrl || 31001 == res.err_code ? _this.upSupportShare("微博") : newWin.location =
									"http://v.t.sina.com.cn/share/share.php?appkey=340086183&pic=" + sharePic + "&url=" +
									encodeURIComponent(shareShortUrl) + "&title=" + weiboShareIntro
							}), _this.shared.close().remove()
						})
					},
					onclose: function() {
						_this.shared = null
					}
				}), _this.shared.show())
			},
			upSupportShare: function(msg) {
				var unshare = dialog({
					width: 200,
					height: 50,
					title: "不支持分享",
					skin: "unshare",
					content: "该歌曲不支持" + msg + "分享"
				}).show();
				setTimeout(function() {
					unshare.close().remove()
				}, 2e3)
			},
			callExe: function(option) {
				var _this = this,
					songData = option.song_info,
					FileName = utility.htmlDecode(songData.author_name + "-" + songData.audio_name),
					songWord = FileName.length > 58 ? FileName.substring(0, 58) + "..." : FileName,
					controlData = '{"Files":[{"filename":"' + songWord + '.mp3","hash":"' + songData.Hash + '","size":"' + songData
					.FileSize + '","duration":"' + 1e3 * songData.timelength + '","bitrate":"128","isfilehead":"100","privilege":"' +
					songData.privilege + '","album_id":"' + songData.album_id + '"}]}',
					url = "kugou://download?p=" + Base64.Base64.encode(controlData);
				_this.isIE(6) || _this.isIE(7) || _this.isIE(8) ? window.open(url) : $("body").append(
					" <iframe style='display:none' src='" + url + "'></iframe>")
			},
			isIE: function(ver) {
				var b = document.createElement("b");
				return b.innerHTML = "<!--[if IE " + ver + "]><i></i><![endif]-->", 1 === b.getElementsByTagName("i").length
			},
			isExists: function() {
				return $.jStorage.reInit(), $.jStorage.get("playFlag")
			},
			addTips: function() {
				var html = ['<div class="playtips"><div class="relativeD">', '<div class="playtips_bg"></div>',
						'<img src="https://www.kugou.com/yy/static/images/play/icon_add.png" alt="" class="playtips_icon">',
						'<p class="tipstext">已添加至播放页</p>', "</div></div>"
					].join(""),
					$playtips = $(".playtips");
				$playtips.length > 0 ? $playtips.show().animate({
					opacity: "1"
				}).show() : $("body").append(html);
				var playtipsT = setTimeout(function() {
					$(".playtips").hide().animate({
						opacity: "0"
					}).hide(), clearTimeout(playtipsT)
				}, 1e3)
			}
		};
	$(document).ready(function() {
		search.init()
	})
}, function(module, exports) {
	module.exports = {
		QueryString: function() {
			if (arg1 = arguments[0], arg2 = arguments[1], arguments.length > 1 && "" != arg1 && "" != arg2 && void 0 != arg1 &&
				void 0 != arg2) var b = arguments[0].match(new RegExp("[?#&]" + arg2 + "=([^&|#]*)(&?)", "i"));
			else if ("" != arg1 && void 0 != arg1) var b = location.href.match(new RegExp("[?#&]" + arg1 + "=([^&|#]*)(&?)",
				"i"));
			return b ? b[1] : b
		},
		delHtmlTag: function(str) {
			return "" == str || "undefined" == typeof str || null == str ? "" : str.replace(/<[^>]+>/g, "")
		},
		htmlEncode: function(str) {
			var s = "";
			return 0 == str.length ? s : (s = s.replace(/<[^>]+>/g, ""), s = str.replace(/\</g, "&lt;"), s = s.replace(/\>/g,
				"&gt;"), s = s.replace(/\'/g, "&#39;"), s = s.replace(/\"/g, "&quot;"), s = s.replace(/ /g, "&nbsp;"))
		},
		htmlDecode: function(str) {
			var s = "";
			return 0 == str.length ? s : (s = str.replace(/&amp;/g, "&"), s = s.replace(/&#38;/g, "&"), s = s.replace(
					/&lt;/g, "<"), s = s.replace(/&#60;/g, "<"), s = s.replace(/&gt;/g, ">"), s = s.replace(/&#62;/g, ">"), s = s
				.replace(/&#63;/g, "?"), s = s.replace(/&nbsp;/g, " "), s = s.replace(/&#160;/g, " "), s = s.replace(/&apos;/g,
					"'"), s = s.replace(/&#39;/g, "'"), s = s.replace(/&quot;/g, '"'), s = s.replace(/&#34;/g, '"'), s = s.replace(
					/&#42;/g, "*"), s = s.replace(/&#47;/g, "/"), s = s.replace(/&#92;/g, "\\"), s = s.replace(/&#58;/g, ":"), s =
				s.replace(/&#124;/g, "|"))
		},
		getMS: function(msec) {
			var sec = msec / 1e3,
				t = sec,
				m = Math.floor(t / 60),
				s = Math.floor(t % 60),
				ms = "";
			return ms += m >= 10 ? m : "0" + m, ms += ":", ms += s >= 10 ? s : "0" + s
		},
		detectOS: function() {
			var isWin = (navigator.userAgent, "Win32" == navigator.platform || "Windows" == navigator.platform || "Win64" ==
					navigator.platform),
				isMac = "Mac68K" == navigator.platform || "MacPPC" == navigator.platform || "Macintosh" == navigator.platform ||
				"MacIntel" == navigator.platform;
			if (isMac) return "Mac";
			var isUnix = "X11" == navigator.platform && !isWin && !isMac;
			if (isUnix) return "Unix";
			var isLinux = String(navigator.platform).indexOf("Linux") > -1;
			return isLinux ? "Linux" : isWin ? "Windows" : "other"
		},
		formatDateTime: function(date) {
			var y = date.getFullYear(),
				m = date.getMonth() + 1;
			m = m < 10 ? "0" + m : m;
			var d = date.getDate();
			d = d < 10 ? "0" + d : d;
			var h = date.getHours(),
				minute = date.getMinutes(),
				Seconds = date.getSeconds();
			return minute = minute < 10 ? "0" + minute : minute, Seconds = Seconds < 10 ? "0" + Seconds : Seconds, y + "-" +
				m + "-" + d + " " + h + ":" + minute + ":" + Seconds
		},
		flashChecker: function() {
			var hasFlash = 0,
				flashVersion = 0;
			if (document.all) {
				var swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				swf && (hasFlash = 1, VSwf = swf.GetVariable("$version"), flashVersion = parseInt(VSwf.split(" ")[1].split(",")[
					0]))
			} else if (navigator.plugins && navigator.plugins.length > 0) {
				var swf = navigator.plugins["Shockwave Flash"];
				if (swf) {
					hasFlash = 1;
					for (var words = swf.description.split(" "), i = 0; i < words.length; ++i) isNaN(parseInt(words[i])) || (
						flashVersion = parseInt(words[i]))
				}
			}
			return {
				f: hasFlash,
				v: flashVersion
			}
		},
		getBrowser: function() {
			var s, Sys = {},
				ua = navigator.userAgent.toLowerCase();
			return (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys = {
				v: s[1],
				type: "ie"
			} : (s = ua.match(/msie ([\d.]+)/)) ? Sys = {
				v: s[1],
				type: "ie"
			} : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys = {
				v: s[1],
				type: "firefox"
			} : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys = {
				v: s[1],
				type: "chrome"
			} : (s = ua.match(/opera.([\d.]+)/)) ? Sys = {
				v: s[1],
				type: "opera"
			} : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys = {
				v: s[1],
				type: "safari"
			} : 0, Sys
		},
		keywordStorge: function(keyword) {
			var keyword = keyword.replace(/(^\s+)|(\s+$)/g, "");
			if ("" != keyword) {
				var i, len, deleteindex, historyData = [],
					deleteflag = !1,
					limitLen = 5;
				for ("" != localStorage.s_keyword && "undefined" != typeof localStorage.s_keyword && (historyData =
						localStorage.s_keyword.split("|")), i = 0, len = historyData.length; i < len; i++) historyData[i] ==
					encodeURI(keyword) && (deleteflag = !0, deleteindex = i);
				deleteflag && historyData.splice(deleteindex, 1), historyData.length >= limitLen && (historyData = historyData.slice(
						historyData.length - 4, historyData.length)), historyData.push(encodeURI(keyword)), localStorage.s_keyword =
					historyData.join("|")
			}
		},
		insertArrayAt: function(array, index, arrayToInsert) {
			return Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert)), array
		},
		removeDuplicates: function(arr, prop) {
			var new_arr = [],
				lookup = {};
			for (var i in arr) lookup[arr[i][prop]] = arr[i];
			for (i in lookup) new_arr.push(lookup[i]);
			return new_arr
		},
		isArray: function(value) {
			return "function" == typeof Array.isArray ? Array.isArray(value) : Object.prototype.toString.call(value)
		},
		unique: function(arr) {
			for (var tmpArr = [], hash = {}, i = 0; i < arr.length; i++) hash[arr[i]] || (hash[arr[i]] = !0, tmpArr.push(arr[
				i]));
			return tmpArr
		},
		setCookie: function(c_name, value, expiredays) {
			var exdate = new Date;
			exdate.setDate(exdate.getDate() + expiredays), document.cookie = c_name + "=" + escape(value) + (null ==
				expiredays ? "" : ";expires=" + exdate.toGMTString())
		},
		getCookie: function(c_name) {
			return document.cookie.length > 0 && (c_start = document.cookie.indexOf(c_name + "="), c_start != -1) ? (c_start =
				c_start + c_name.length + 1, c_end = document.cookie.indexOf(";", c_start), c_end == -1 && (c_end = document.cookie
					.length), unescape(document.cookie.substring(c_start, c_end))) : ""
		},
		read: function(name, key) {
			var cookieValue = "",
				search = name + "=";
			document.cookie.split("").length > 0 && (offset = document.cookie.indexOf(search), offset != -1 && (offset +=
				search.length, end = document.cookie.indexOf(";", offset), end == -1 && (end = document.cookie.split("").length),
				cookieValue = document.cookie.substring(offset, end)));
			for (var a = cookieValue.split("&"), o = {}, haveVal = !1, i = 0, l = a.length; i < l; i++) {
				var k = a[i].split("=");
				"" != k[0] && (o[k[0]] = k[1], haveVal = !0)
			}
			return !!haveVal && o
		},
		deleteCookie: function(key) {
			var date = new Date;
			date.setTime(date.getTime() - 1e4), document.cookie = key + "=v; expires =" + date.toGMTString()
		},
		SIPHtmlDecode: function(str) {
			var s = "";
			return 0 == str.length || "undefined" == typeof str ? s : (s = str.replace(/&lt;/g, "<"), s = s.replace(/&#60;/g,
				"<"), s = s.replace(/&gt;/g, ">"), s = s.replace(/&#62;/g, ">"), s = s.replace(/&nbsp;/g, " "))
		},
		hasPlaceholder: function() {
			var attr = "placeholder",
				input = document.createElement("input");
			return attr in input
		},
		JSON: function() {
			function f(n) {
				return n < 10 ? "0" + n : n
			}

			function stringify(value, whitelist) {
				var a, i, k, l, v, r = /["\\\x00-\x1f\x7f-\x9f]/g;
				switch (typeof value) {
					case "string":
						return r.test(value) ? '"' + value.replace(r, function(a) {
							var c = m[a];
							return c ? c : (c = a.charCodeAt(), "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16))
						}) + '"' : '"' + value + '"';
					case "number":
						return isFinite(value) ? String(value) : "";
					case "boolean":
					case "":
						return String(value);
					case "object":
						if (!value) return "";
						if ("function" == typeof value.toJSON) return stringify(value.toJSON());
						if (a = [], "number" == typeof value.length && !value.propertyIsEnumerable("length")) {
							for (l = value.length, i = 0; i < l; i += 1) a.push(stringify(value[i], whitelist) || "");
							return "[" + a.join(",") + "]"
						}
						if (whitelist)
							for (l = whitelist.length, i = 0; i < l; i += 1) k = whitelist[i], "string" == typeof k && (v = stringify(
								value[k], whitelist), v && a.push(stringify(k) + ":" + v));
						else
							for (k in value) "string" == typeof k && (v = stringify(value[k], whitelist), v && a.push(stringify(k) + ":" +
								v));
						return "{" + a.join(",") + "}"
				}
			}
			Date.prototype.toJSON = function() {
				return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) +
					":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
			};
			var m = {
				"\b": "\\b",
				"\t": "\\t",
				"\n": "\\n",
				"\f": "\\f",
				"\r": "\\r",
				'"': '\\"',
				"\\": "\\\\"
			};
			return {
				stringify: stringify,
				parse: function(text, filter) {
					function walk(k, v) {
						var i, n;
						if (v && "object" == typeof v)
							for (i in v) Object.prototype.hasOwnProperty.apply(v, [i]) && (n = walk(i, v[i]), void 0 !== n ? v[i] = n :
								delete v[i]);
						return filter(k, v)
					}
					var j;
					if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, "@").replace(
							/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g,
							""))) return j = eval("(" + text + ")"), "function" == typeof filter ? walk("", j) : j;
					throw new SyntaxError("parseJSON");
				}
			}
		}()
	}
}, function(module, exports, __webpack_require__) {
	var utility = __webpack_require__(1),
		song = __webpack_require__(3),
		special = __webpack_require__(5),
		mv = __webpack_require__(7),
		config = __webpack_require__(4),
		$ = __webpack_require__(8);
	module.exports = {
		init: function() {
			var _this = this;
			_this.herderUI(), _this.navUI(), _this.inputUI(), $(window).unload(function() {
				$.jStorage.set("KeyWord_local", null)
			})
		},
		islogined: function() {
			var loginInfo = utility.read("KuGoo");
			return "" != loginInfo && "undefined" != loginInfo.toString() && loginInfo !== !1
		},
		herderUI: function() {
			var _this = this,
				login_in = document.getElementById("login_in"),
				login_btn = document.getElementById("login_btn"),
				login_out = document.getElementById("login_out"),
				user_menu = document.getElementById("user_menu"),
				menuT = null;
			if (_this.islogined()) {
				var kugouC = utility.read("KuGoo"),
					user_name = kugouC.UserName.replace(/%/g, "\\"),
					user = eval("'" + user_name + "'"),
					uer_img = kugouC.Pic;
				$("#login_in").hide(), $(login_out).show(), $(login_out).find(".user_img").attr("src", replaceHttpsImg(uer_img)),
					$(login_out).find(".user_name").html(user)
			}
			$("#login_btn").on("click", function(e) {
				$.ajax({
					url: "https://staticssl.kugou.com/common/js/min/popuplogin-min.js?" + Math.round((new Date).getTime() /
						1e3),
					dataType: "script",
					success: function() {
						UsLogin()
					}
				})
			}), login_out.onmouseover = function() {
				user_menu.style.cssText = "display:block;"
			}, login_out.onmouseleave = function() {
				menuT = setTimeout(function() {
					user_menu.style.display = "none"
				}, 300)
			}, login_out.onclick = function() {
				window.open("http://www.kugou.com/newuc/user/uc/")
			}, user_menu.onmouseover = function() {
				clearTimeout(menuT), user_menu.style.cssText = "display:block;"
			}, user_menu.onmouseleave = function() {
				user_menu.style.cssText = "display:none"
			}
		},
		navUI: function() {
			var t = null,
				More = document.getElementById("more"),
				showMore = document.getElementById("showMore"),
				subUl = document.getElementById("secondMenu");
			showMore.onclick = function() {
				return !1
			}, More.onmouseover = function() {
				this.setAttribute("class", "more hover"), showMore.setAttribute("class", "icon icon-nav6"), subUl.style.cssText =
					"display:block;"
			}, More.onmouseleave = function() {
				this.setAttribute("class", "more"), showMore.setAttribute("class", "icon icon-nav6"), t = setTimeout(function() {
					subUl.style.display = "none"
				}, 300)
			}, subUl.onmouseover = function() {
				clearTimeout(t), More.setAttribute("class", "more hover"), showMore.setAttribute("class", "icon icon-nav6"),
					subUl.style.cssText = "display:block;"
			}, subUl.onmouseleave = function() {
				More.setAttribute("class", "more"), showMore.setAttribute("class", "icon icon-nav6"), subUl.style.cssText =
					"display:none"
			}
		},
		inputUI: function() {
			var _this = this,
				$searh_btn = $(".top_search .searh_btn"),
				$top_history = $(".top_search_histroy"),
				changeT = null,
				$top_search_recommend = $(".top_search_recommend"),
				$top_searchInput = $(".top_search .search_input input"),
				$content_searchInput = $(".content_search .search_input input"),
				topTime = null,
				downFlag = 1,
				upFlag = 2;
			$top_history.on("click", ".clear_histroy", function() {
				localStorage.s_keyword = "", $top_history.find(".history_song_list").empty(), $top_history.removeClass("show")
					.addClass("hide")
			}), $searh_btn.on("click", function() {
				$(this).parent().parent().hasClass("content_search") ? config.fo = "搜索页" : config.fo = "头部导航栏", config.searchKeyWord =
					$top_searchInput.val().replace(/(^\s+)|(\s+$)/g, ""), "" == config.searchKeyWord && (config.searchKeyWord =
						$top_searchInput.attr("placeholder") || ""), $(".content_search .search_input input").val(config.searchKeyWord),
					_this.resetSearchSetting(function() {
						config.searchType = "song", _this.showActive("song")
					})
			}), $top_searchInput.on("keydown", function(e) {
				var histroydd = ($top_searchInput.val().replace(/(^\s+)|(\s+$)/g, ""), $(".top_search_histroy dd")),
					songdd = $(".top_search_recommend dl.recommend_song_list dd"),
					mvdd = $(".top_search_recommend dl.recommend_mv_list dd"),
					histroyIndex = $(".top_search_histroy dd.hover").index(),
					songIndex = $(".top_search_recommend .recommend_song_list dd.hover").index(),
					MvIndex = $(".top_search_recommend .recommend_mv_list dd.hover").index();
				13 === e.keyCode ? (config.fo = "头部导航栏", _this.resetSearchSetting(function() {
						config.searchType = "song", config.searchKeyWord = $top_searchInput.val().replace(/(^\s+)|(\s+$)/g, ""),
							$(".content_search .search_input input").val(config.searchKeyWord), _this.showActive(config.searchType)
					}), $top_history.removeClass("show").addClass("hide"), $top_search_recommend.removeClass("show").addClass(
						"hide")) : 38 == e.keyCode ? (upFlag = songIndex != -1 ? 1 : 2, $top_history.hasClass("show") ?
						histroyIndex + 1 == 0 ? histroydd.eq(histroydd.length - 1).addClass("hover").siblings("dd").removeClass(
							"hover") : histroydd.eq(histroyIndex - 1).addClass("hover").siblings("dd").removeClass("hover") :
						$top_search_recommend.hasClass("show") && (0 == mvdd.length && 0 != songdd.length && (upFlag = 1, songIndex +
								1 == 0 ? (upFlag = 1, songdd.removeClass("hover"), songdd.eq(songdd.length - 1).addClass("hover")) : (
									upFlag = 1, songdd.removeClass("hover"), songdd.eq(songIndex - 1).addClass("hover"))), 0 == songdd.length &&
							0 != mvdd.length && (upFlag = 2, MvIndex + 1 == 0 ? (songdd.removeClass("hover"), mvdd.eq(mvdd.length - 1)
								.addClass("hover")) : (mvdd.removeClass("hover"), mvdd.eq(MvIndex - 1).addClass("hover"))), 0 != songdd.length &&
							0 != mvdd.length && (1 == upFlag ? 0 == songIndex ? (upFlag = 2, songdd.removeClass("hover"), mvdd.eq(mvdd
									.length - 1).addClass("hover")) : (songdd.removeClass("hover"), songdd.eq(songIndex - 1).addClass(
									"hover")) : MvIndex + 1 == 0 ? (songdd.removeClass("hover"), mvdd.eq(mvdd.length - 1).addClass("hover")) :
								0 == MvIndex ? (upFlag = 1, mvdd.removeClass("hover"), songdd.eq(songdd.length - 1).addClass("hover")) :
								(mvdd.removeClass("hover"), mvdd.eq(MvIndex - 1).addClass("hover")))), $top_history.hasClass("show") ?
						$top_searchInput.val($(".search_histroy dd.hover").attr("title")) : $top_search_recommend.hasClass("show") &&
						(1 == upFlag ? $top_searchInput.val($(".top_search_recommend .recommend_song_list dd.hover").attr("title")) :
							$top_searchInput.val($(".top_search_recommend .recommend_mv_list dd.hover").attr("title")))) : 40 == e.keyCode &&
					($top_history.hasClass("show") ? histroyIndex + 1 == histroydd.length ? histroydd.eq(0).addClass("hover").siblings(
						"dd").removeClass("hover") : histroydd.eq(histroyIndex + 1).addClass("hover").siblings("dd").removeClass(
						"hover") : $top_search_recommend.hasClass("show") && (0 == mvdd.length && 0 != songdd.length && (downFlag =
							1, songIndex + 1 == songdd.length ? (songdd.removeClass("hover"), songdd.eq(0).addClass("hover")) : (
								songdd.removeClass("hover"), songdd.eq(songIndex + 1).addClass("hover"))), 0 == songdd.length && 0 !=
						mvdd.length && (downFlag = 2, MvIndex + 1 == songdd.length ? (mvdd.removeClass("hover"), mvdd.eq(0).addClass(
							"hover")) : (mvdd.removeClass("hover"), mvdd.eq(MvIndex + 1).addClass("hover"))), 0 != songdd.length && 0 !=
						mvdd.length && (1 == downFlag ? songIndex + 1 == 0 ? (mvdd.removeClass("hover"), songdd.eq(0).addClass(
								"hover")) : songIndex + 1 == songdd.length ? (downFlag = 2, songdd.removeClass("hover"), mvdd.eq(0).addClass(
								"hover")) : (songdd.removeClass("hover"), songdd.eq(songIndex + 1).addClass("hover")) : MvIndex + 1 ==
							mvdd.length ? (downFlag = 1, mvdd.removeClass("hover"), songdd.eq(0).addClass("hover")) : (mvdd.removeClass(
								"hover"), mvdd.eq(MvIndex + 1).addClass("hover")))), $top_history.hasClass("show") ? $top_searchInput.val(
						$(".search_histroy dd.hover").attr("title")) : $top_search_recommend.hasClass("show") && (1 == downFlag ?
						$top_searchInput.val($(".top_search_recommend .recommend_song_list dd.hover").attr("title")) :
						$top_searchInput.val($(".top_search_recommend .recommend_mv_list dd.hover").attr("title"))))
			}).on("click", function() {
				config.defaultKey = !1, _this.displayTip()
			}).on("textchange", function() {
				clearTimeout(changeT), changeT = setTimeout(function() {
					config.defaultKey || _this.displayTip()
				}, 100)
			}).on("blur", function() {
				topTime = setTimeout(function() {
					$top_history.hasClass("noData") || $top_history.addClass("hide").removeClass("show"),
						$top_search_recommend.addClass("hide").removeClass("show")
				}, 400)
			}), $top_history.mouseover(function() {
				clearTimeout(topTime), $top_history.removeClass("hide").addClass("show")
			}), $top_history.on("mousedown", "dd", function() {
				config.fo = "头部导航栏";
				var me = $(this);
				return $top_searchInput.val(utility.SIPHtmlDecode(me.text())), $content_searchInput.val(utility.SIPHtmlDecode(
					me.text())), config.searchType = "song", config.searchKeyWord = utility.SIPHtmlDecode(me.text()), _this.resetSearchSetting(
					function() {
						_this.showActive("song")
					}), $top_history.removeClass("show").addClass("hide"), !1
			}), $top_search_recommend.mouseover(function() {
				clearTimeout(topTime), $top_history.removeClass("hide").addClass("show")
			}), $top_search_recommend.on("mousedown", "dd", function() {
				config.fo = "头部导航栏";
				var me = $(this),
					keyword_recommend = utility.SIPHtmlDecode(me.text());
				return $top_searchInput.val(keyword_recommend), $content_searchInput.val(keyword_recommend), utility.keywordStorge(
						keyword_recommend), config.searchType = me.attr("data-type"), config.searchKeyWord = keyword_recommend,
					_this.resetSearchSetting(function() {
						_this.showActive(config.searchType)
					}), $top_search_recommend.removeClass("show").addClass("hide"), !1
			})
		},
		displayTip: function() {
			var _this = this,
				$top_history = $(".top_search_histroy"),
				$top_search_recommend = $(".top_search_recommend"),
				$top_searchInput = $(".top_search .search_input input"),
				wordRecommendTime = null;
			"" != $top_searchInput.val() ? (clearTimeout(wordRecommendTime), wordRecommendTime = setTimeout(function() {
				_this.wordRecommend({
					keyword: $top_searchInput.val(),
					callback: function(str) {
						"" != str ? ($top_history.hide().addClass("hide").removeClass("show"), $top_search_recommend.show().html(
							str).addClass("show").removeClass("hide")) : $top_search_recommend.hide().addClass("hide").removeClass(
							"show")
					}
				})
			}, 100)) : (clearTimeout(wordRecommendTime), _this.historyHtml(function(str) {
				"" != str ? ($top_search_recommend.hide().addClass("hide").removeClass("show"), $top_history.show().html(str)
					.addClass("show").removeClass("hide")) : $top_history.hide().addClass("hide").removeClass("show").addClass(
					"noData")
			}))
		},
		wordRecommend: function(options) {
			var defaults = {
					keyword: "",
					MusicTipCount: 5,
					MVTipCount: 2,
					albumcount: 2
				},
				_this = this,
				op = $.extend(defaults, options);
			$.ajax({
				type: "GET",
				url: "https://searchtip.kugou.com/getSearchTip?MusicTipCount=5&MVTipCount=2&albumcount=2&keyword=" +
					encodeURIComponent(op.keyword),
				crossDomain: !0,
				dataType: "jsonp",
				success: function(res) {
					if (1 == res.status) {
						if (res.data) {
							var recommendhtml = _this.RecommendHtml(res.data, op.keyword);
							options.callback(recommendhtml)
						}
					} else options.callback("")
				},
				error: function(res) {
					options.callback("")
				}
			})
		},
		RecommendHtml: function(wordData, keyword) {
			try {
				var recommendSongstr = "<dl class='recommend_song_list recommend_list'>",
					recommendMvstr = "<h4><span class='icon_arrow'></span>MV</h2><dl class='recommend_mv_list recommend_list'>",
					songData = null,
					mvData = null;
				if (wordData[0] && (songData = wordData[0].RecordDatas), wordData[1] && (mvData = wordData[1].RecordDatas), 0 ==
					songData.length) recommendSongstr = "";
				else {
					for (var i = 0, Songlen = songData.length; i < Songlen; i++) {
						var matchText = "/" + keyword + "/",
							textem = songData[i].HintInfo.replace(eval(matchText), "<em>" + utility.htmlEncode(keyword) + "</em>");
						recommendSongstr += "<dd data-type='song' title='" + utility.htmlEncode(songData[i].HintInfo) + "'>" + textem +
							"</dd>"
					}
					recommendSongstr += "</dl>"
				}
				if (0 == mvData.length) return recommendSongstr;
				for (var j = 0, Mvlen = mvData.length; j < Mvlen; j++) {
					var matchText = "/" + keyword + "/",
						textem = mvData[j].HintInfo.replace(eval(matchText), "<em>" + utility.htmlEncode(keyword) + "</em>");
					recommendMvstr += "<dd data-type='mv' title='" + utility.htmlEncode(mvData[j].HintInfo) + "'>" + textem +
						"</dd>"
				}
				return recommendMvstr += "</dl>", recommendSongstr + recommendMvstr
			} catch (ex) {}
		},
		historyHtml: function(callback) {
			var historyData = [];
			if ("" != localStorage.s_keyword && "undefined" != typeof localStorage.s_keyword && (historyData = localStorage.s_keyword
					.split("|").reverse()), "undefined" != typeof historyData)
				if (0 == historyData.length) callback("");
				else {
					for (var historyStr = "<dl class='history_song_list'>", i = 0, len = historyData.length; i < len; i++)
						historyStr += "<dd>" + utility.htmlEncode(decodeURI(historyData[i])) + "</dd>";
					historyStr += "</dl><dl class='clear_histroy'><dt>清空历史记录</dt></dl>", callback(historyStr)
				}
		},
		resetSearchSetting: function(callback, option) {
			var searchTabLi = $(".search_tab li"),
				downlaod = document.getElementById("downlaod"),
				beforePage = document.getElementById("before_page"),
				songEle = document.getElementById("search_song"),
				specialEle = document.getElementById("search_special"),
				mvEle = document.getElementById("search_mv");
			searchTabLi.eq(0).addClass("active").siblings("li").removeClass("active"), downlaod.style.cssText =
				"display:none", beforePage.style.cssText = "display:block", $(songEle).find(".list_content").empty(), songEle.style
				.cssText = "display:block", $(songEle).find(".similar_singer").hide(), $(".checkall").removeClass("checked"), $(
					specialEle).find(".list_content").empty(), specialEle.style.cssText = "display:none", $(mvEle).find(
					".mv_list ul").empty(), mvEle.style.cssText = "display:none", config.searchType = option && option.searchType ||
				"song", config.searchSongIndex = 1, config.searchSongfinish = !1, config.searchSongLoading = !1, config.searchSpecialIndex =
				1, config.searchSpecialLoading = !1, config.searchSpecialfinish = !1, config.searchMvIndex = 1, config.searchMvLoading = !
				1, config.searchMvfinish = !1, callback && callback()
		},
		showActive: function(searchType) {
			var searchTabLi = $(".search_tab li"),
				downlaod = document.getElementById("downlaod"),
				songEle = document.getElementById("search_song"),
				specialEle = document.getElementById("search_special"),
				mvEle = document.getElementById("search_mv"),
				reffer = document.referrer,
				kugouC = utility.read("KuGoo"),
				defaultConfig = {
					a: 5,
					b: "搜索",
					action: "index"
				};
			switch (defaultConfig.uid = kugouC.KugooID || null, defaultConfig.os = utility.detectOS(), defaultConfig.browser =
				utility.getBrowser().type + " " + utility.getBrowser().v || "ie", defaultConfig.flash = utility.flashChecker().v ||
				"", defaultConfig.ivar4 = config.searchKeyWord, defaultConfig.lvt = utility.formatDateTime(new Date),
				defaultConfig.fo = config.fo, reffer.indexOf("baidu.com") != -1 ? "百度搜索" == defaultConfig.o : reffer.indexOf(
					"so.com") != -1 ? defaultConfig.o = "360搜索" : reffer.indexOf("360.cn") != -1 ? defaultConfig.o = "360导航页" :
				reffer.indexOf("google.com") != -1 ? defaultConfig.o = "谷歌搜索" : "" == reffer || reffer.indexOf("kugou.com") !=
				-1 || reffer.indexOf("download.com") != -1 ? defaultConfig.o = "直接访问" : "" != reffer && (defaultConfig.o =
					"其他访问"), location.hash = "searchType=" + searchType + "&searchKeyWord=" + encodeURIComponent(config.searchKeyWord ||
					""), searchType) {
				case "song":
					if (defaultConfig.ivar5 = "歌曲", config.searchType = "song", searchTabLi.eq(0).addClass("active").siblings("li")
						.removeClass("active"), mvEle.style.cssText = "display:none", specialEle.style.cssText = "display:none", 0 ==
						$(songEle).find(".list_content li").length) {
						config.searchSongIndex = 1, song.getSongs({
							keyword: config.searchKeyWord,
							page: 1
						}), songEle.style.cssText = "display:block";
						var searchData = [30032, defaultConfig, null];
						apmCollectData.push(searchData);
						try {
							newLogCount()
						} catch (ex) {}
					} else songEle.style.cssText = "display:block";
					downlaod.style.cssText = "display:block";
					break;
				case "special":
					if (defaultConfig.ivar5 = "歌单", config.searchType = "special", searchTabLi.eq(1).addClass("active").siblings(
							"li").removeClass("active"), songEle.style.cssText = "display:none", mvEle.style.cssText = "display:none", 0 ==
						$(specialEle).find(".list_content li").length) {
						config.searchSpecialIndex = 1, special.getSpecials({
							keyword: config.searchKeyWord,
							page: 1
						}), specialEle.style.cssText = "display:block";
						var searchData = [30032, defaultConfig, null];
						apmCollectData.push(searchData);
						try {
							newLogCount()
						} catch (ex) {}
					} else specialEle.style.cssText = "display:block";
					downlaod.style.cssText = "display:block";
					break;
				case "mv":
					if (defaultConfig.ivar5 = "MV", config.searchType = "mv", searchTabLi.eq(2).addClass("active").siblings("li").removeClass(
							"active"), songEle.style.cssText = "display:none", specialEle.style.cssText = "display:none", 0 == $(mvEle).find(
							".mv_list li").length) {
						config.searchMvIndex = 1, mv.getMvs({
							keyword: config.searchKeyWord,
							page: 1
						}), mvEle.style.cssText = "display:block";
						var searchData = [30032, defaultConfig, null];
						apmCollectData.push(searchData);
						try {
							newLogCount()
						} catch (ex) {}
					} else mvEle.style.cssText = "display:block";
					downlaod.style.cssText = "display:block";
					break;
				default:
					if (defaultConfig.ivar5 = "歌曲", config.searchType = "song", searchTabLi.eq(0).addClass("active").siblings("li")
						.removeClass("active"), mvEle.style.cssText = "display:none", specialEle.style.cssText = "display:none", 0 ==
						$(songEle).find(".list_content li").length) {
						config.searchSongIndex = 1, song.getSongs({
							keyword: config.searchKeyWord,
							page: 1
						}), songEle.style.cssText = "display:block";
						var searchData = [30032, defaultConfig, null];
						apmCollectData.push(searchData);
						try {
							newLogCount()
						} catch (ex) {}
					} else songEle.style.cssText = "display:block";
					downlaod.style.cssText = "display:block"
			}
		}
	}
}, function(module, exports, __webpack_require__) {
	var utility = __webpack_require__(1),
		config = __webpack_require__(4);
	$.Callbacks("once unique");
	module.exports = {
		datacache: {
			searchSongData: [],
			searchSongSelectData: []
		},
		bindUI: function() {
			$(".song_list .list_content").off("click").on("click", "li", function(e) {
				"EM" != e.target.nodeName && "A" != e.target.nodeName && "SPAN" == e.target.nodeName && ($(e.target).hasClass(
					"checked") && $(".checkall").removeClass("checked"), $(e.target).hasClass("checkbox") && ($(e.target).hasClass(
					"checked") ? $(e.target).removeClass("checked") : $(e.target).addClass("checked")), $(
					".list_content .checked").length === $(".list_content .checkbox").length && $(".checkall").addClass(
					"checked"))
			})
		},
		getSongs: function(options) {
			var _this = this,
				songEle = document.getElementById("search_song"),
				beforePage = document.getElementById("before_page"),
				downlaod = document.getElementById("downlaod"),
				defaults = {
					keyword: "",
					page: 1,
					pagesize: 30,
					userid: -1,
					clientver: "",
					platform: "WebFilter",
					tag: "em",
					filter: 2,
					iscorrection: 1,
					privilege_filter: 0
				};
			_this.datacache.dymnicClass = "list_content" + (new Date).getTime(), $(songEle).find(".list_content").attr("id",
				_this.datacache.dymnicClass), config.searchSongLoading = !0, config.inline && (config.inline = null);
			var op = $.extend(defaults, options),
				interfaceBI = {},
				Browser = utility.getBrowser();
			interfaceBI.ua = utility.JSON.stringify(Browser), interfaceBI.typeid = 10009, interfaceBI.transaction = op.keyword,
				"" != op.keyword ? (utility.keywordStorge(op.keyword), $(songEle).find(".search_key_word").html("搜索到<i>“" +
					utility.htmlEncode(op.keyword) + "”</i>")) : $(songEle).find(".search_key_word i").html(""), $(songEle).find(
					".similar_singer").hide(), $(beforePage).show();
			var interfaceT1 = new Date;
			config.getsongList = $.ajax({
				type: "GET",
				url: "https://songsearch.kugou.com/song_search_v2",
				data: op,
				timeout: 3e3,
				async: !1,
				crossDomain: !0,
				dataType: "jsonp",
				success: function(res) {
					1 == res.status && _this.getSongcallbackFN(res, op, interfaceBI, interfaceT1)
				},
				error: function(XHR, statusText, errorThrown) {
					$(beforePage).hide(), config.searchSongLoading = !1, downlaod.style.cssText = "display:block";
					try {
						var interfaceT2 = new Date;
						interfaceBI.state = 0, interfaceBI.te = "E3", interfaceBI.position = 1, interfaceBI.fs = XHR.status,
							interfaceBI.timelength = interfaceT2 - interfaceT1;
						var loadedData = [12, interfaceBI, null, 1];
						apmCollectData.push(loadedData), newLogCount()
					} catch (ex) {}
					return {
						status: 0
					}
				}
			}), _this.bindUI()
		},
		getSongcallbackFN: function(res, op, interfaceBI, interfaceT1) {
			var _this = this,
				songEle = document.getElementById("search_song"),
				beforePage = document.getElementById("before_page"),
				downlaod = document.getElementById("downlaod"),
				interfaceT2 = new Date;
			interfaceBI.state = 1, interfaceBI.timelength = interfaceT2 - interfaceT1;
			var total = res.data.total;
			if (0 != total) {
				"" == op.keyword || "undefined" == typeof op.keyword ? $(songEle).find(".search_key_word").html("随机搜索推荐") : $(
					songEle).find(".search_key_word").html("搜索到<i>“" + utility.htmlEncode(op.keyword) + "”</i>");
				var listData = res.data.lists,
					searchSongData = _this.datacache.searchSongData;
				utility.insertArrayAt(searchSongData, searchSongData.length, listData);
				var songEle = document.getElementById("search_song");
				if ("scroll" == op.from ? _this.datacache.searchSongData.push(listData) : _this.datacache.searchSongData =
					listData, listData.length > 0 && utility.isArray(listData)) {
					var SongsHtml = _this.getSongsHtml(listData);
					$("#" + _this.datacache.dymnicClass).html(SongsHtml), _this.getRecommendSinger(op.keyword, function() {});
					var loadedData = [12, interfaceBI, null, 1];
					apmCollectData.push(loadedData);
					try {
						newLogCount()
					} catch (ex) {}
					config.searchSongLoading = !1
				}
			} else {
				$(songEle).find(".search_key_word").html("没有搜索到"), interfaceBI.state = 0, interfaceBI.position = 1, interfaceBI
					.te = "E5", interfaceBI.fs = "-1";
				var loadedData = [12, interfaceBI, null, 1];
				apmCollectData.push(loadedData);
				try {
					newLogCount()
				} catch (ex) {}
			}
			downlaod.style.cssText = "display:block", $(beforePage).hide()
		},
		getSongsHtml: function(songs) {
			if (0 != songs.length) {
				for (var SongsHtml = [], liHtml = null, i = 0, len = songs.length; i < len; i++) {
					var albumName = "",
						albumLink = "https://www.kugou.com/yy/album/single/" + songs[i].AlbumID + ".html";
					"" != songs[i].AlbumName && (albumName = "《" + songs[i].AlbumName + "》");
					var titleFileName = songs[i].FileName.replace(/<em>|<\/em>/g, ""),
						titlealbumName = albumName.replace(/<em>|<\/em>/g, ""),
						duration = utility.getMS(1e3 * songs[i].Duration);
					liHtml = $(["<li class='clearfix'>",
						'<div  class="width_f_li clearfix"><span class="search_icon checkbox"></span>',
						'<a class="song_name"  title="' + titleFileName + '" href="javascript:;">' + songs[i].FileName + "</a>",
						"</div>", '<div class="width_s_li"><a class="album_name" title="' + titlealbumName +
						'" target="_blank"  href="' + albumLink + '">' + albumName + "</a>&nbsp;</div>", '<div class="width_t_li">' +
						duration + "</div>",
						'<div class="play-item"  ><span class="common_icon icon_play"></span><span class="common_icon icon_download" onclick="_hmt.push([\'_trackEvent\', \'hidedown\', \'hidecilick\', \'hidepc\']);"></span><span class="common_icon icon_share"></span></div>',
						"</li>"
					].join("")), liHtml.data("song", songs[i]), SongsHtml.push(liHtml)
				}
				return SongsHtml
			}
		},
		getRecommendSinger: function(word, callback) {
			songEle = document.getElementById("search_song"), $.ajax({
				type: "GET",
				url: "https://searchrecommend.kugou.com/get/complex",
				data: {
					word: word
				},
				dataType: "jsonp",
				success: function(res) {
					if (1 == res[0].status && 1 == res[0].ctype) {
						var singerinfo = res[0].data[1];
						singerinfo.singername == word && singerinfo.singername == $(".search_input input").val() ? ($(songEle).find(
								".singer_img").attr("href", "https://www.kugou.com/singer/" + singerinfo.singerid + ".html"), $(songEle)
							.find(".singer_img img").attr("src", replaceHttpsImg(singerinfo.img)), $(songEle).find(".singer_name").html(
								'<a target="_blank" href="https://www.kugou.com/singer/' + singerinfo.singerid + '.html" >' +
								singerinfo.singername + "</a>"), $(songEle).find(".singer_info span").eq(0).html(
								'<a target="_blank" href="https://www.kugou.com/singer/' + singerinfo.singerid + '.html"><i>' +
								singerinfo.song_count + "</i>单曲</a> "), $(songEle).find(".singer_info span").eq(1).html(
								'<a target="_blank" href="https://www.kugou.com/singer/' + singerinfo.singerid + '.html?mv"><i>' +
								singerinfo.mv_count + "</i>MV</a>"), $(songEle).find(".similar_singer").show()) : $(songEle).find(
							".similar_singer").hide()
					} else $(songEle).find(".similar_singer").hide();
					callback && callback()
				},
				error: function(res) {
					$(songEle).find(".similar_singer").hide(), callback && callback()
				}
			})
		}
	}
}, function(module, exports) {
	module.exports = {
		defaultKey: !1,
		searchType: "song",
		searchSongIndex: 1,
		searchSongfinish: !1,
		searchSongLoading: !1,
		getRecommendSingerloading: !1,
		searchSpecialIndex: 1,
		searchSpecialLoading: !1,
		searchSpecialfinish: !1,
		searchMvIndex: 1,
		searchMvLoading: !1,
		searchMvfinish: !1,
		searchKeyWord: "",
		fo: "头部导航栏"
	}
}, function(module, exports, __webpack_require__) {
	var utility = __webpack_require__(1),
		MD5 = __webpack_require__(6),
		config = __webpack_require__(4);
	module.exports = {
		datacache: {
			searchSpecialData: []
		},
		getSpecials: function(options) {
			var _this = this,
				specialEle = document.getElementById("search_special"),
				beforePage = document.getElementById("before_page"),
				downlaod = document.getElementById("downlaod"),
				defaults = {
					keyword: "",
					page: 1,
					pagesize: 30,
					userid: -1,
					clientver: "",
					platform: "WebFilter",
					tag: "em",
					filter: 2,
					iscorrection: 1,
					privilege_filter: 0
				};
			config.searchSpecialLoading = !0;
			var op = $.extend(defaults, options);
			if ("" != op.keyword) {
				var historyData = [];
				"" != localStorage.s_keyword && "undefined" != typeof localStorage.s_keyword && (historyData = localStorage.s_keyword
					.split("|")), historyData = utility.unique(historyData), localStorage.s_keyword = historyData.join("|"), $(
					specialEle).find(".search_key_word").html("搜索到<i>“" + utility.htmlEncode(op.keyword) + "”</i>")
			} else $(specialEle).find(".search_key_word i").html("");
			$(beforePage).show(), $.ajax({
				type: "GET",
				url: "https://specialsearch.kugou.com/special_search",
				data: op,
				timeout: 3e3,
				crossDomain: !0,
				dataType: "jsonp",
				success: function(res) {
					if (1 == res.status) {
						var total = res.data.total;
						if (total > 0) {
							var listData = res.data.lists,
								searchSpecialData = _this.datacache.searchSpecialData;
							if (utility.insertArrayAt(searchSpecialData, searchSpecialData.length, listData), listData.length > 0 &&
								utility.isArray(listData)) {
								var specialsHtml = _this.getSpecialsHtml(listData);
								$(specialEle).find(".list_content").html(specialsHtml), config.searchSpecialLoading = !1
							} else config.searchSpecialfinish = !0
						} else $(specialEle).find(".search_key_word").html("没有搜索到");
						$(beforePage).hide(), downlaod.style.cssText = "display:block"
					}
				},
				error: function(res) {
					return $(beforePage).hide(), config.searchSpecialLoading = !1, downlaod.style.cssText = "display:block", {
						status: 0
					}
				}
			})
		},
		getSpecialsHtml: function(Specials) {
			if (0 != Specials.length) {
				for (var SpecialsHtml = "", i = 0, len = Specials.length; i < len; i++) {
					Specials[i].total_play_count.toString().length > 4 && (Specials[i].total_play_count = (Specials[i].total_play_count /
						1e4).toFixed(1) + "万");
					var titlespecialname = Specials[i].specialname.replace(/<em>|<\/em>/g, ""),
						titlenickname = Specials[i].nickname.replace(/<em>|<\/em>/g, "");
					SpecialsHtml += ["<li>", '<div  class="width_f_li clearfix"><a class="special_link" target="_blank"  title="' +
						titlespecialname + '" href="https://www.kugou.com/yy/special/single/' + Specials[i].specialid +
						'.html"><img class="special_img" src="' + replaceHttpsImg(Specials[i].img) + '"></a>',
						'<a target="_blank" class="special_name special_link" title="' + titlespecialname +
						'" href="https://www.kugou.com/yy/special/single/' + Specials[i].specialid + '.html">' + Specials[i].specialname +
						"</a>", "&nbsp;</div>", '<div class="width_s_li" title="' + titlenickname + '">' + Specials[i].nickname +
						"</div>", '<div class="width_t_li">' + Specials[i].total_play_count + "</div>",
						'<div class="play-item" ><span data="' + Specials[i].specialid + '" class="search_icon icon_play"></div>',
						"</li>"
					].join("")
				}
				return SpecialsHtml
			}
		},
		getSpecialSongs: function(options, callback) {
			var config = {
					appid: 1014,
					clientver: 1022,
					mid: "iYw1iw8z2ji2iphcu80oOo2ki8112p"
				},
				keyStr = MD5.md5(config.appid + config.mid + config.clientver + Math.round((new Date).getTime() / 1e3)),
				defaults = {
					show_video: 0,
					show_obbligato: 0,
					collection_id: "",
					appid: config.appid,
					clientver: config.clientver,
					mid: config.mid,
					clienttime: Math.round((new Date).getTime() / 1e3),
					key: keyStr
				},
				op = $.extend(defaults, options);
			$.ajax({
				type: "POST",
				url: "https://www.kugou.com/yy/index.php?r=play/getsong&id=" + op.collection_id,
				cache: !1,
				dataType: "json",
				success: function(res) {
					callback(1 == res.status ? res.data : [])
				},
				error: function(res) {
					callback([])
				}
			})
		}
	}
}, function(module, exports) {
	var Md5 = {
		hex_chr: "0123456789abcdef",
		rhex: function(num) {
			for (var str = "", j = 0; j <= 3; j++) str += this.hex_chr.charAt(num >> 8 * j + 4 & 15) + this.hex_chr.charAt(
				num >> 8 * j & 15);
			return str
		},
		str2blks_MD5: function(str) {
			for (var nblk = (str.length + 8 >> 6) + 1, blks = new Array(16 * nblk), i = 0; i < 16 * nblk; i++) blks[i] = 0;
			for (var i = 0; i < str.length; i++) blks[i >> 2] |= str.charCodeAt(i) << i % 4 * 8;
			return blks[i >> 2] |= 128 << i % 4 * 8, blks[16 * nblk - 2] = 8 * str.length, blks
		},
		add: function(x, y) {
			var lsw = (65535 & x) + (65535 & y),
				msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return msw << 16 | 65535 & lsw
		},
		rol: function(num, cnt) {
			return num << cnt | num >>> 32 - cnt
		},
		cmn: function(q, a, b, x, s, t) {
			return this.add(this.rol(this.add(this.add(a, q), this.add(x, t)), s), b)
		},
		ff: function(a, b, c, d, x, s, t) {
			return this.cmn(b & c | ~b & d, a, b, x, s, t)
		},
		gg: function(a, b, c, d, x, s, t) {
			return this.cmn(b & d | c & ~d, a, b, x, s, t)
		},
		hh: function(a, b, c, d, x, s, t) {
			return this.cmn(b ^ c ^ d, a, b, x, s, t)
		},
		ii: function(a, b, c, d, x, s, t) {
			return this.cmn(c ^ (b | ~d), a, b, x, s, t)
		},
		md5: function(str) {
			for (var x = this.str2blks_MD5(str), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, i = 0; i <
				x.length; i += 16) {
				var olda = a,
					oldb = b,
					oldc = c,
					oldd = d;
				a = this.ff(a, b, c, d, x[i + 0], 7, -680876936), d = this.ff(d, a, b, c, x[i + 1], 12, -389564586), c = this.ff(
						c, d, a, b, x[i + 2], 17, 606105819), b = this.ff(b, c, d, a, x[i + 3], 22, -1044525330), a = this.ff(a, b, c,
						d, x[i + 4], 7, -176418897), d = this.ff(d, a, b, c, x[i + 5], 12, 1200080426), c = this.ff(c, d, a, b, x[i +
						6], 17, -1473231341), b = this.ff(b, c, d, a, x[i + 7], 22, -45705983), a = this.ff(a, b, c, d, x[i + 8], 7,
						1770035416), d = this.ff(d, a, b, c, x[i + 9], 12, -1958414417), c = this.ff(c, d, a, b, x[i + 10], 17, -
						42063), b = this.ff(b, c, d, a, x[i + 11], 22, -1990404162), a = this.ff(a, b, c, d, x[i + 12], 7, 1804603682),
					d = this.ff(d, a, b, c, x[i + 13], 12, -40341101), c = this.ff(c, d, a, b, x[i + 14], 17, -1502002290), b =
					this.ff(b, c, d, a, x[i + 15], 22, 1236535329), a = this.gg(a, b, c, d, x[i + 1], 5, -165796510), d = this.gg(
						d, a, b, c, x[i + 6], 9, -1069501632), c = this.gg(c, d, a, b, x[i + 11], 14, 643717713), b = this.gg(b, c, d,
						a, x[i + 0], 20, -373897302), a = this.gg(a, b, c, d, x[i + 5], 5, -701558691), d = this.gg(d, a, b, c, x[i +
						10], 9, 38016083), c = this.gg(c, d, a, b, x[i + 15], 14, -660478335), b = this.gg(b, c, d, a, x[i + 4], 20,
						-405537848), a = this.gg(a, b, c, d, x[i + 9], 5, 568446438), d = this.gg(d, a, b, c, x[i + 14], 9, -
						1019803690), c = this.gg(c, d, a, b, x[i + 3], 14, -187363961), b = this.gg(b, c, d, a, x[i + 8], 20,
						1163531501), a = this.gg(a, b, c, d, x[i + 13], 5, -1444681467), d = this.gg(d, a, b, c, x[i + 2], 9, -
						51403784), c = this.gg(c, d, a, b, x[i + 7], 14, 1735328473), b = this.gg(b, c, d, a, x[i + 12], 20, -
						1926607734), a = this.hh(a, b, c, d, x[i + 5], 4, -378558), d = this.hh(d, a, b, c, x[i + 8], 11, -2022574463),
					c = this.hh(c, d, a, b, x[i + 11], 16, 1839030562), b = this.hh(b, c, d, a, x[i + 14], 23, -35309556), a =
					this.hh(a, b, c, d, x[i + 1], 4, -1530992060), d = this.hh(d, a, b, c, x[i + 4], 11, 1272893353), c = this.hh(
						c, d, a, b, x[i + 7], 16, -155497632), b = this.hh(b, c, d, a, x[i + 10], 23, -1094730640), a = this.hh(a, b,
						c, d, x[i + 13], 4, 681279174), d = this.hh(d, a, b, c, x[i + 0], 11, -358537222), c = this.hh(c, d, a, b, x[
						i + 3], 16, -722521979), b = this.hh(b, c, d, a, x[i + 6], 23, 76029189), a = this.hh(a, b, c, d, x[i + 9], 4,
						-640364487), d = this.hh(d, a, b, c, x[i + 12], 11, -421815835), c = this.hh(c, d, a, b, x[i + 15], 16,
						530742520), b = this.hh(b, c, d, a, x[i + 2], 23, -995338651), a = this.ii(a, b, c, d, x[i + 0], 6, -
						198630844), d = this.ii(d, a, b, c, x[i + 7], 10, 1126891415), c = this.ii(c, d, a, b, x[i + 14], 15, -
						1416354905), b = this.ii(b, c, d, a, x[i + 5], 21, -57434055), a = this.ii(a, b, c, d, x[i + 12], 6,
						1700485571), d = this.ii(d, a, b, c, x[i + 3], 10, -1894986606), c = this.ii(c, d, a, b, x[i + 10], 15, -
						1051523), b = this.ii(b, c, d, a, x[i + 1], 21, -2054922799), a = this.ii(a, b, c, d, x[i + 8], 6, 1873313359),
					d = this.ii(d, a, b, c, x[i + 15], 10, -30611744), c = this.ii(c, d, a, b, x[i + 6], 15, -1560198380), b =
					this.ii(b, c, d, a, x[i + 13], 21, 1309151649), a = this.ii(a, b, c, d, x[i + 4], 6, -145523070), d = this.ii(
						d, a, b, c, x[i + 11], 10, -1120210379), c = this.ii(c, d, a, b, x[i + 2], 15, 718787259), b = this.ii(b, c,
						d, a, x[i + 9], 21, -343485551), a = this.add(a, olda), b = this.add(b, oldb), c = this.add(c, oldc), d =
					this.add(d, oldd)
			}
			return this.rhex(a) + this.rhex(b) + this.rhex(c) + this.rhex(d)
		}
	};
	module.exports = Md5
}, function(module, exports, __webpack_require__) {
	var utility = __webpack_require__(1),
		config = __webpack_require__(4);
	module.exports = {
		getMvs: function(options) {
			var _this = this,
				mvEle = document.getElementById("search_mv"),
				beforePage = document.getElementById("before_page"),
				downlaod = document.getElementById("downlaod"),
				defaults = {
					keyword: "",
					page: 1,
					pagesize: 30,
					userid: -1,
					clientver: "",
					platform: "WebFilter",
					tag: "em",
					filter: 2,
					iscorrection: 1,
					privilege_filter: 0
				};
			config.searchMvLoading = !0;
			var op = $.extend(defaults, options);
			if ("" != op.keyword) {
				var historyData = [];
				"" != localStorage.s_keyword && "undefined" != typeof localStorage.s_keyword && (historyData = localStorage.s_keyword
					.split("|")), historyData = utility.unique(historyData), localStorage.s_keyword = historyData.join("|"), $(
					mvEle).find(".search_key_word").html("搜索到<i>“" + utility.htmlEncode(op.keyword) + "”</i>")
			} else $(mvEle).find(".search_key_word i").html("");
			$(beforePage).show(), $.ajax({
				type: "GET",
				url: "https://mvsearch.kugou.com/mv_search",
				data: op,
				timeout: 3e3,
				crossDomain: !0,
				dataType: "jsonp",
				success: function(res) {
					if (1 == res.status) {
						var total = res.data.total;
						if (total > 0) {
							var listData = res.data.lists;
							if (listData.length > 0 && utility.isArray(listData)) {
								var mvsHtml = _this.getMvsHtml(listData);
								$(mvEle).find(".mv_list ul").html(mvsHtml), config.searchMvLoading = !1
							} else config.searchMvfinish = !0
						} else $(mvEle).find(".search_key_word").html("没有搜索到");
						downlaod.style.cssText = "display:block", $(beforePage).hide()
					}
				},
				error: function(res) {
					return $(beforePage).hide(), config.searchMvLoading = !1, downlaod.style.cssText = "display:block", {
						status: 0
					}
				}
			})
		},
		getMvsHtml: function(Mvs) {
			if (0 != Mvs.length) {
				for (var MvsHtml = "", i = 0, len = Mvs.length; i < len; i++) {
					var mvLink = "https://www.kugou.com/mvweb/html/mv_" + Mvs[i].MvID + ".html",
						imgUrl = "http://imge.kugou.com/mvhdpic/240/" + Mvs[i].Pic.substring(0, 8) + "/" + Mvs[i].Pic,
						titleMvName = Mvs[i].MvName.replace(/<em>|<\/em>/g, ""),
						titleSingerName = Mvs[i].SingerName.replace(/<em>|<\/em>/g, "");
					MvsHtml += ["<li>", '<div class="mv_container">', '<a class="mv_cover"  target="_blank" href="' + mvLink +
						'" hidefocus="true" title="' + titleMvName + '" > ', '<span class="mv_img">',
						'<img width="100%" height="100%" src="' + replaceHttpsImg(imgUrl) + '"  alt=""  class="">', "</span> ",
						'<span class="mv_play"><i class="search_icon"></i></span>', '<span class="mv_shadow"></span>', "</a>",
						'<a class="mv_name" target="_blank"  href="' + mvLink + '" hidefocus="true" data-index="' + i +
						'" data-type="" title="' + titleMvName + '">' + Mvs[i].MvName + "</a> ", '<span class="mv_singer" title="' +
						titleSingerName + '">' + Mvs[i].SingerName + "</span>", "</div>", "</li>"
					].join("")
				}
				return MvsHtml
			}
		}
	}
}, function(module, exports) {
	module.exports = window.$
}, function(module, exports) {
	! function($) {
		var testNode = document.createElement("input"),
			isInputSupported = "oninput" in testNode && (!("documentMode" in document) || document.documentMode > 9),
			hasInputCapabilities = function(elem) {
				return "INPUT" === elem.nodeName && ("text" === elem.type || "password" === elem.type)
			},
			activeElement = null,
			activeElementValue = null,
			activeElementValueProp = null,
			newValueProp = {
				get: function() {
					return activeElementValueProp.get.call(this)
				},
				set: function(val) {
					activeElementValue = val, activeElementValueProp.set.call(this, val)
				}
			},
			startWatching = function(target) {
				activeElement = target, activeElementValue = target.value, activeElementValueProp = Object.getOwnPropertyDescriptor(
						target.constructor.prototype, "value"), Object.defineProperty(activeElement, "value", newValueProp),
					activeElement.attachEvent("onpropertychange", handlePropertyChange)
			},
			stopWatching = function() {
				activeElement && (delete activeElement.value, activeElement.detachEvent("onpropertychange", handlePropertyChange),
					activeElement = null, activeElementValue = null, activeElementValueProp = null)
			},
			handlePropertyChange = function(nativeEvent) {
				if ("value" === nativeEvent.propertyName) {
					var value = nativeEvent.srcElement.value;
					value !== activeElementValue && (activeElementValue = value, $(activeElement).trigger("textchange"))
				}
			};
		isInputSupported ? $(document).on("input", function(e) {
			"TEXTAREA" !== e.target.nodeName && $(e.target).trigger("textchange")
		}) : $(document).on("focusin", function(e) {
			hasInputCapabilities(e.target) && (stopWatching(), startWatching(e.target))
		}).on("focusout", function() {
			stopWatching()
		}).on("selectionchange keyup keydown", function() {
			activeElement && activeElement.value !== activeElementValue && (activeElementValue = activeElement.value, $(
				activeElement).trigger("textchange"))
		})
	}(jQuery)
}, function(module, exports) {
	! function() {
		"use strict";

		function _init() {
			var localStorageReallyWorks = !1;
			if ("localStorage" in window) try {
				window.localStorage.setItem("_tmptest", "tmpval"), localStorageReallyWorks = !0, window.localStorage.removeItem(
					"_tmptest")
			} catch (BogusQuotaExceededErrorOnIos5) {}
			if (localStorageReallyWorks) try {
				window.localStorage && (_storage_service = window.localStorage, _backend = "localStorage", _observer_update =
					_storage_service.jStorage_update)
			} catch (E3) {} else if ("globalStorage" in window) try {
				window.globalStorage && (_storage_service = "localhost" == window.location.hostname ? window.globalStorage[
						"localhost.localdomain"] : window.globalStorage[window.location.hostname], _backend = "globalStorage",
					_observer_update = _storage_service.jStorage_update)
			} catch (E4) {} else {
				if (_storage_elm = document.createElement("link"), !_storage_elm.addBehavior) return void(_storage_elm = null);
				_storage_elm.style.behavior = "url(#default#userData)", document.getElementsByTagName("head")[0].appendChild(
					_storage_elm);
				try {
					_storage_elm.load("jStorage")
				} catch (E) {
					_storage_elm.setAttribute("jStorage", "{}"), _storage_elm.save("jStorage"), _storage_elm.load("jStorage")
				}
				var data = "{}";
				try {
					data = _storage_elm.getAttribute("jStorage")
				} catch (E5) {}
				try {
					_observer_update = _storage_elm.getAttribute("jStorage_update")
				} catch (E6) {}
				_storage_service.jStorage = data, _backend = "userDataBehavior"
			}
			_load_storage(), _handleTTL(), _setupObserver(), _handlePubSub(), "addEventListener" in window && window.addEventListener(
				"pageshow",
				function(event) {
					event.persisted && _storageObserver()
				}, !1)
		}

		function _reloadData() {
			var data = "{}";
			if ("userDataBehavior" == _backend) {
				_storage_elm.load("jStorage");
				try {
					data = _storage_elm.getAttribute("jStorage")
				} catch (E5) {}
				try {
					_observer_update = _storage_elm.getAttribute("jStorage_update")
				} catch (E6) {}
				_storage_service.jStorage = data
			}
			_load_storage(), _handleTTL(), _handlePubSub()
		}

		function _setupObserver() {
			"localStorage" == _backend || "globalStorage" == _backend ? "addEventListener" in window ? window.addEventListener(
					"storage", _storageObserver, !1) : document.attachEvent("onstorage", _storageObserver) : "userDataBehavior" ==
				_backend && setInterval(_storageObserver, 1e3)
		}

		function _storageObserver() {
			var updateTime;
			clearTimeout(_observer_timeout), _observer_timeout = setTimeout(function() {
				if ("localStorage" == _backend || "globalStorage" == _backend) updateTime = _storage_service.jStorage_update;
				else if ("userDataBehavior" == _backend) {
					_storage_elm.load("jStorage");
					try {
						updateTime = _storage_elm.getAttribute("jStorage_update")
					} catch (E5) {}
				}
				updateTime && updateTime != _observer_update && (_observer_update = updateTime, _checkUpdatedKeys())
			}, 25)
		}

		function _checkUpdatedKeys() {
			var newCrc32List, oldCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32));
			_reloadData(), newCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32));
			var key, updated = [],
				removed = [];
			for (key in oldCrc32List)
				if (oldCrc32List.hasOwnProperty(key)) {
					if (!newCrc32List[key]) {
						removed.push(key);
						continue
					}
					oldCrc32List[key] != newCrc32List[key] && "2." == String(oldCrc32List[key]).substr(0, 2) && updated.push(key)
				} for (key in newCrc32List) newCrc32List.hasOwnProperty(key) && (oldCrc32List[key] || updated.push(key));
			_fireObservers(updated, "updated"), _fireObservers(removed, "deleted")
		}

		function _fireObservers(keys, action) {
			keys = [].concat(keys || []);
			var i, j, len, jlen;
			if ("flushed" == action) {
				keys = [];
				for (var key in _observers) _observers.hasOwnProperty(key) && keys.push(key);
				action = "deleted"
			}
			for (i = 0, len = keys.length; i < len; i++) {
				if (_observers[keys[i]])
					for (j = 0, jlen = _observers[keys[i]].length; j < jlen; j++) _observers[keys[i]][j](keys[i], action);
				if (_observers["*"])
					for (j = 0, jlen = _observers["*"].length; j < jlen; j++) _observers["*"][j](keys[i], action)
			}
		}

		function _publishChange() {
			var updateTime = (+new Date).toString();
			if ("localStorage" == _backend || "globalStorage" == _backend) try {
				_storage_service.jStorage_update = updateTime
			} catch (E8) {
				_backend = !1
			} else "userDataBehavior" == _backend && (_storage_elm.setAttribute("jStorage_update", updateTime), _storage_elm.save(
				"jStorage"));
			_storageObserver()
		}

		function _load_storage() {
			if (_storage_service.jStorage) try {
				_storage = JSON.parse(String(_storage_service.jStorage))
			} catch (E6) {
				_storage_service.jStorage = "{}"
			} else _storage_service.jStorage = "{}";
			_storage_size = _storage_service.jStorage ? String(_storage_service.jStorage).length : 0, _storage.__jstorage_meta ||
				(_storage.__jstorage_meta = {}), _storage.__jstorage_meta.CRC32 || (_storage.__jstorage_meta.CRC32 = {})
		}

		function _save() {
			_dropOldEvents();
			try {
				_storage_service.jStorage = JSON.stringify(_storage), _storage_elm && (_storage_elm.setAttribute("jStorage",
					_storage_service.jStorage), _storage_elm.save("jStorage")), _storage_size = _storage_service.jStorage ? String(
					_storage_service.jStorage).length : 0
			} catch (E7) {}
		}

		function _checkKey(key) {
			if ("string" != typeof key && "number" != typeof key) throw new TypeError("Key name must be string or numeric");
			if ("__jstorage_meta" == key) throw new TypeError("Reserved key name");
			return !0
		}

		function _handleTTL() {
			var curtime, i, TTL, CRC32, nextExpire = 1 / 0,
				changed = !1,
				deleted = [];
			if (clearTimeout(_ttl_timeout), _storage.__jstorage_meta && "object" == typeof _storage.__jstorage_meta.TTL) {
				curtime = +new Date, TTL = _storage.__jstorage_meta.TTL, CRC32 = _storage.__jstorage_meta.CRC32;
				for (i in TTL) TTL.hasOwnProperty(i) && (TTL[i] <= curtime ? (delete TTL[i], delete CRC32[i], delete _storage[i],
					changed = !0, deleted.push(i)) : TTL[i] < nextExpire && (nextExpire = TTL[i]));
				nextExpire != 1 / 0 && (_ttl_timeout = setTimeout(_handleTTL, Math.min(nextExpire - curtime, 2147483647))),
					changed && (_save(), _publishChange(), _fireObservers(deleted, "deleted"))
			}
		}

		function _handlePubSub() {
			var i, len;
			if (_storage.__jstorage_meta.PubSub) {
				var pubelm, _pubsubCurrent = _pubsub_last,
					needFired = [];
				for (i = len = _storage.__jstorage_meta.PubSub.length - 1; i >= 0; i--) pubelm = _storage.__jstorage_meta.PubSub[
					i], pubelm[0] > _pubsub_last && (_pubsubCurrent = pubelm[0], needFired.unshift(pubelm));
				for (i = needFired.length - 1; i >= 0; i--) _fireSubscribers(needFired[i][1], needFired[i][2]);
				_pubsub_last = _pubsubCurrent
			}
		}

		function _fireSubscribers(channel, payload) {
			if (_pubsub_observers[channel])
				for (var i = 0, len = _pubsub_observers[channel].length; i < len; i++) try {
					_pubsub_observers[channel][i](channel, JSON.parse(JSON.stringify(payload)))
				} catch (E) {}
		}

		function _dropOldEvents() {
			if (_storage.__jstorage_meta.PubSub) {
				for (var retire = +new Date - 2e3, i = 0, len = _storage.__jstorage_meta.PubSub.length; i < len; i++)
					if (_storage.__jstorage_meta.PubSub[i][0] <= retire) {
						_storage.__jstorage_meta.PubSub.splice(i, _storage.__jstorage_meta.PubSub.length - i);
						break
					} _storage.__jstorage_meta.PubSub.length || delete _storage.__jstorage_meta.PubSub
			}
		}

		function _publish(channel, payload) {
			_storage.__jstorage_meta || (_storage.__jstorage_meta = {}), _storage.__jstorage_meta.PubSub || (_storage.__jstorage_meta
				.PubSub = []), _storage.__jstorage_meta.PubSub.unshift([+new Date, channel, payload]), _save(), _publishChange()
		}

		function murmurhash2_32_gc(str, seed) {
			for (var k, l = str.length, h = seed ^ l, i = 0; l >= 4;) k = 255 & str.charCodeAt(i) | (255 & str.charCodeAt(++i)) <<
				8 | (255 & str.charCodeAt(++i)) << 16 | (255 & str.charCodeAt(++i)) << 24, k = 1540483477 * (65535 & k) + ((
					1540483477 * (k >>> 16) & 65535) << 16), k ^= k >>> 24, k = 1540483477 * (65535 & k) + ((1540483477 * (k >>> 16) &
					65535) << 16), h = 1540483477 * (65535 & h) + ((1540483477 * (h >>> 16) & 65535) << 16) ^ k, l -= 4, ++i;
			switch (l) {
				case 3:
					h ^= (255 & str.charCodeAt(i + 2)) << 16;
				case 2:
					h ^= (255 & str.charCodeAt(i + 1)) << 8;
				case 1:
					h ^= 255 & str.charCodeAt(i), h = 1540483477 * (65535 & h) + ((1540483477 * (h >>> 16) & 65535) << 16)
			}
			return h ^= h >>> 13, h = 1540483477 * (65535 & h) + ((1540483477 * (h >>> 16) & 65535) << 16), h ^= h >>> 15, h >>>
				0
		}
		var _ttl_timeout, JSTORAGE_VERSION = "0.4.12",
			$ = window.jQuery || window.$ || (window.$ = {}),
			JSON = {
				parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function(str) {
					return String(str).evalJSON()
				} || $.parseJSON || $.evalJSON,
				stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || $.toJSON
			},
			_storage = {
				__jstorage_meta: {
					CRC32: {}
				}
			},
			_storage_service = {
				jStorage: "{}"
			},
			_storage_elm = null,
			_storage_size = 0,
			_backend = !1,
			_observers = {},
			_observer_timeout = !1,
			_observer_update = 0,
			_pubsub_observers = {},
			_pubsub_last = +new Date,
			_XMLService = {
				isXML: function(elm) {
					var documentElement = (elm ? elm.ownerDocument || elm : 0).documentElement;
					return !!documentElement && "HTML" !== documentElement.nodeName
				},
				encode: function(xmlNode) {
					if (!this.isXML(xmlNode)) return !1;
					try {
						return (new XMLSerializer).serializeToString(xmlNode)
					} catch (E1) {
						try {
							return xmlNode.xml
						} catch (E2) {}
					}
					return !1
				},
				decode: function(xmlString) {
					var resultXML, dom_parser = "DOMParser" in window && (new DOMParser).parseFromString || window.ActiveXObject &&
						function(_xmlString) {
							var xml_doc = new ActiveXObject("Microsoft.XMLDOM");
							return xml_doc.async = "false", xml_doc.loadXML(_xmlString), xml_doc
						};
					return !!dom_parser && (resultXML = dom_parser.call("DOMParser" in window && new DOMParser || window, xmlString,
						"text/xml"), !!this.isXML(resultXML) && resultXML)
				}
			};
		$.jStorage = {
			version: JSTORAGE_VERSION,
			set: function(key, value, options) {
				if (_checkKey(key), options = options || {}, "undefined" == typeof value) return this.deleteKey(key), value;
				if (_XMLService.isXML(value)) value = {
					_is_xml: !0,
					xml: _XMLService.encode(value)
				};
				else {
					if ("function" == typeof value) return;
					value && "object" == typeof value && (value = JSON.parse(JSON.stringify(value)))
				}
				return _storage[key] = value, _storage.__jstorage_meta.CRC32[key] = "2." + murmurhash2_32_gc(JSON.stringify(
					value), 2538058380), this.setTTL(key, options.TTL || 0), _fireObservers(key, "updated"), value
			},
			get: function(key, def) {
				return _checkKey(key), key in _storage ? _storage[key] && "object" == typeof _storage[key] && _storage[key]._is_xml ?
					_XMLService.decode(_storage[key].xml) : _storage[key] : "undefined" == typeof def ? null : def
			},
			deleteKey: function(key) {
				return _checkKey(key), key in _storage && (delete _storage[key], "object" == typeof _storage.__jstorage_meta.TTL &&
					key in _storage.__jstorage_meta.TTL && delete _storage.__jstorage_meta.TTL[key], delete _storage.__jstorage_meta
					.CRC32[key], _save(), _publishChange(), _fireObservers(key, "deleted"), !0)
			},
			setTTL: function(key, ttl) {
				var curtime = +new Date;
				return _checkKey(key), ttl = Number(ttl) || 0, key in _storage && (_storage.__jstorage_meta.TTL || (_storage.__jstorage_meta
					.TTL = {}), ttl > 0 ? _storage.__jstorage_meta.TTL[key] = curtime + ttl : delete _storage.__jstorage_meta.TTL[
					key], _save(), _handleTTL(), _publishChange(), !0)
			},
			getTTL: function(key) {
				var ttl, curtime = +new Date;
				return _checkKey(key), key in _storage && _storage.__jstorage_meta.TTL && _storage.__jstorage_meta.TTL[key] ? (
					ttl = _storage.__jstorage_meta.TTL[key] - curtime, ttl || 0) : 0
			},
			flush: function() {
				return _storage = {
					__jstorage_meta: {
						CRC32: {}
					}
				}, _save(), _publishChange(), _fireObservers(null, "flushed"), !0
			},
			storageObj: function() {
				function F() {}
				return F.prototype = _storage, new F
			},
			index: function() {
				var i, index = [];
				for (i in _storage) _storage.hasOwnProperty(i) && "__jstorage_meta" != i && index.push(i);
				return index
			},
			storageSize: function() {
				return _storage_size
			},
			currentBackend: function() {
				return _backend
			},
			storageAvailable: function() {
				return !!_backend
			},
			listenKeyChange: function(key, callback) {
				_checkKey(key), _observers[key] || (_observers[key] = []), _observers[key].push(callback)
			},
			stopListening: function(key, callback) {
				if (_checkKey(key), _observers[key]) {
					if (!callback) return void delete _observers[key];
					for (var i = _observers[key].length - 1; i >= 0; i--) _observers[key][i] == callback && _observers[key].splice(
						i, 1)
				}
			},
			subscribe: function(channel, callback) {
				if (channel = (channel || "").toString(), !channel) throw new TypeError("Channel not defined");
				_pubsub_observers[channel] || (_pubsub_observers[channel] = []), _pubsub_observers[channel].push(callback)
			},
			publish: function(channel, payload) {
				if (channel = (channel || "").toString(), !channel) throw new TypeError("Channel not defined");
				_publish(channel, payload)
			},
			reInit: function() {
				_reloadData()
			},
			noConflict: function(saveInGlobal) {
				return delete window.$.jStorage, saveInGlobal && (window.jStorage = this), this
			}
		}, _init()
	}()
}, function(module, exports, __webpack_require__) {
	! function(global) {
		"use strict";
		var buffer, _Base64 = global.Base64,
			version = "2.1.9";
		if ("undefined" != typeof module && module.exports) try {
			buffer = __webpack_require__(12).Buffer
		} catch (err) {}
		var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
			b64tab = function(bin) {
				for (var t = {}, i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
				return t
			}(b64chars),
			fromCharCode = String.fromCharCode,
			cb_utob = function(c) {
				if (c.length < 2) {
					var cc = c.charCodeAt(0);
					return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | 63 & cc) : fromCharCode(224 |
						cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | 63 & cc)
				}
				var cc = 65536 + 1024 * (c.charCodeAt(0) - 55296) + (c.charCodeAt(1) - 56320);
				return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) +
					fromCharCode(128 | 63 & cc)
			},
			re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
			utob = function(u) {
				return u.replace(re_utob, cb_utob)
			},
			cb_encode = function(ccc) {
				var padlen = [0, 2, 1][ccc.length % 3],
					ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(
						2) : 0),
					chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "=" : b64chars.charAt(ord >>>
						6 & 63), padlen >= 1 ? "=" : b64chars.charAt(63 & ord)];
				return chars.join("")
			},
			btoa = global.btoa ? function(b) {
				return global.btoa(b)
			} : function(b) {
				return b.replace(/[\s\S]{1,3}/g, cb_encode)
			},
			_encode = buffer ? function(u) {
				return (u.constructor === buffer.constructor ? u : new buffer(u)).toString("base64")
			} : function(u) {
				return btoa(utob(u))
			},
			encode = function(u, urisafe) {
				return urisafe ? _encode(String(u)).replace(/[+\/]/g, function(m0) {
					return "+" == m0 ? "-" : "_"
				}).replace(/=/g, "") : _encode(String(u))
			},
			encodeURI = function(u) {
				return encode(u, !0)
			},
			re_btou = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
			cb_btou = function(cccc) {
				switch (cccc.length) {
					case 4:
						var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 &
							cccc.charCodeAt(3),
							offset = cp - 65536;
						return fromCharCode((offset >>> 10) + 55296) + fromCharCode((1023 & offset) + 56320);
					case 3:
						return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
					default:
						return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1))
				}
			},
			btou = function(b) {
				return b.replace(re_btou, cb_btou)
			},
			cb_decode = function(cccc) {
				var len = cccc.length,
					padlen = len % 4,
					n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ?
						b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
					chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(255 & n)];
				return chars.length -= [0, 0, 2, 1][padlen], chars.join("")
			},
			atob = global.atob ? function(a) {
				return global.atob(a)
			} : function(a) {
				return a.replace(/[\s\S]{1,4}/g, cb_decode)
			},
			_decode = buffer ? function(a) {
				return (a.constructor === buffer.constructor ? a : new buffer(a, "base64")).toString()
			} : function(a) {
				return btou(atob(a))
			},
			decode = function(a) {
				return _decode(String(a).replace(/[-_]/g, function(m0) {
					return "-" == m0 ? "+" : "/"
				}).replace(/[^A-Za-z0-9\+\/]/g, ""))
			},
			noConflict = function() {
				var Base64 = global.Base64;
				return global.Base64 = _Base64, Base64
			};
		if (global.Base64 = {
				VERSION: version,
				atob: atob,
				btoa: btoa,
				fromBase64: decode,
				toBase64: encode,
				utob: utob,
				encode: encode,
				encodeURI: encodeURI,
				btou: btou,
				decode: decode,
				noConflict: noConflict
			}, "function" == typeof Object.defineProperty) {
			var noEnum = function(v) {
				return {
					value: v,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			};
			global.Base64.extendString = function() {
				Object.defineProperty(String.prototype, "fromBase64", noEnum(function() {
					return decode(this)
				})), Object.defineProperty(String.prototype, "toBase64", noEnum(function(urisafe) {
					return encode(this, urisafe)
				})), Object.defineProperty(String.prototype, "toBase64URI", noEnum(function() {
					return encode(this, !0)
				}))
			}
		}
		global.Meteor && (Base64 = global.Base64)
	}(this)
}, function(module, exports, __webpack_require__) {
	(function(global) {
		/*!
		 * The buffer module from node.js, for the browser.
		 *
		 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
		 * @license  MIT
		 */
		"use strict";

		function typedArraySupport() {
			try {
				var arr = new Uint8Array(1);
				return arr.__proto__ = {
					__proto__: Uint8Array.prototype,
					foo: function() {
						return 42
					}
				}, 42 === arr.foo() && "function" == typeof arr.subarray && 0 === arr.subarray(1, 1).byteLength
			} catch (e) {
				return !1
			}
		}

		function kMaxLength() {
			return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
		}

		function createBuffer(that, length) {
			if (kMaxLength() < length) throw new RangeError("Invalid typed array length");
			return Buffer.TYPED_ARRAY_SUPPORT ? (that = new Uint8Array(length), that.__proto__ = Buffer.prototype) : (null ===
				that && (that = new Buffer(length)), that.length = length), that
		}

		function Buffer(arg, encodingOrOffset, length) {
			if (!(Buffer.TYPED_ARRAY_SUPPORT || this instanceof Buffer)) return new Buffer(arg, encodingOrOffset, length);
			if ("number" == typeof arg) {
				if ("string" == typeof encodingOrOffset) throw new Error(
					"If encoding is specified then the first argument must be a string");
				return allocUnsafe(this, arg)
			}
			return from(this, arg, encodingOrOffset, length)
		}

		function from(that, value, encodingOrOffset, length) {
			if ("number" == typeof value) throw new TypeError('"value" argument must not be a number');
			return "undefined" != typeof ArrayBuffer && value instanceof ArrayBuffer ? fromArrayBuffer(that, value,
				encodingOrOffset, length) : "string" == typeof value ? fromString(that, value, encodingOrOffset) : fromObject(
				that, value)
		}

		function assertSize(size) {
			if ("number" != typeof size) throw new TypeError('"size" argument must be a number');
			if (size < 0) throw new RangeError('"size" argument must not be negative')
		}

		function alloc(that, size, fill, encoding) {
			return assertSize(size), size <= 0 ? createBuffer(that, size) : void 0 !== fill ? "string" == typeof encoding ?
				createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill) : createBuffer(that, size)
		}

		function allocUnsafe(that, size) {
			if (assertSize(size), that = createBuffer(that, size < 0 ? 0 : 0 | checked(size)), !Buffer.TYPED_ARRAY_SUPPORT)
				for (var i = 0; i < size; ++i) that[i] = 0;
			return that
		}

		function fromString(that, string, encoding) {
			if ("string" == typeof encoding && "" !== encoding || (encoding = "utf8"), !Buffer.isEncoding(encoding)) throw new TypeError(
				'"encoding" must be a valid string encoding');
			var length = 0 | byteLength(string, encoding);
			that = createBuffer(that, length);
			var actual = that.write(string, encoding);
			return actual !== length && (that = that.slice(0, actual)), that
		}

		function fromArrayLike(that, array) {
			var length = array.length < 0 ? 0 : 0 | checked(array.length);
			that = createBuffer(that, length);
			for (var i = 0; i < length; i += 1) that[i] = 255 & array[i];
			return that
		}

		function fromArrayBuffer(that, array, byteOffset, length) {
			if (array.byteLength, byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError(
				"'offset' is out of bounds");
			if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("'length' is out of bounds");
			return array = void 0 === byteOffset && void 0 === length ? new Uint8Array(array) : void 0 === length ? new Uint8Array(
				array, byteOffset) : new Uint8Array(array, byteOffset, length), Buffer.TYPED_ARRAY_SUPPORT ? (that = array,
				that.__proto__ = Buffer.prototype) : that = fromArrayLike(that, array), that
		}

		function fromObject(that, obj) {
			if (Buffer.isBuffer(obj)) {
				var len = 0 | checked(obj.length);
				return that = createBuffer(that, len), 0 === that.length ? that : (obj.copy(that, 0, 0, len), that)
			}
			if (obj) {
				if ("undefined" != typeof ArrayBuffer && obj.buffer instanceof ArrayBuffer || "length" in obj) return "number" !=
					typeof obj.length || isnan(obj.length) ? createBuffer(that, 0) : fromArrayLike(that, obj);
				if ("Buffer" === obj.type && isArray(obj.data)) return fromArrayLike(that, obj.data)
			}
			throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
		}

		function checked(length) {
			if (length >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" +
				kMaxLength().toString(16) + " bytes");
			return 0 | length
		}

		function SlowBuffer(length) {
			return +length != length && (length = 0), Buffer.alloc(+length)
		}

		function byteLength(string, encoding) {
			if (Buffer.isBuffer(string)) return string.length;
			if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(string) ||
					string instanceof ArrayBuffer)) return string.byteLength;
			"string" != typeof string && (string = "" + string);
			var len = string.length;
			if (0 === len) return 0;
			for (var loweredCase = !1;;) switch (encoding) {
				case "ascii":
				case "latin1":
				case "binary":
					return len;
				case "utf8":
				case "utf-8":
				case void 0:
					return utf8ToBytes(string).length;
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
					return 2 * len;
				case "hex":
					return len >>> 1;
				case "base64":
					return base64ToBytes(string).length;
				default:
					if (loweredCase) return utf8ToBytes(string).length;
					encoding = ("" + encoding).toLowerCase(), loweredCase = !0
			}
		}

		function slowToString(encoding, start, end) {
			var loweredCase = !1;
			if ((void 0 === start || start < 0) && (start = 0), start > this.length) return "";
			if ((void 0 === end || end > this.length) && (end = this.length), end <= 0) return "";
			if (end >>>= 0, start >>>= 0, end <= start) return "";
			for (encoding || (encoding = "utf8");;) switch (encoding) {
				case "hex":
					return hexSlice(this, start, end);
				case "utf8":
				case "utf-8":
					return utf8Slice(this, start, end);
				case "ascii":
					return asciiSlice(this, start, end);
				case "latin1":
				case "binary":
					return latin1Slice(this, start, end);
				case "base64":
					return base64Slice(this, start, end);
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
					return utf16leSlice(this, start, end);
				default:
					if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
					encoding = (encoding + "").toLowerCase(), loweredCase = !0
			}
		}

		function swap(b, n, m) {
			var i = b[n];
			b[n] = b[m], b[m] = i
		}

		function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
			if (0 === buffer.length) return -1;
			if ("string" == typeof byteOffset ? (encoding = byteOffset, byteOffset = 0) : byteOffset > 2147483647 ?
				byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648), byteOffset = +byteOffset,
				isNaN(byteOffset) && (byteOffset = dir ? 0 : buffer.length - 1), byteOffset < 0 && (byteOffset = buffer.length +
					byteOffset), byteOffset >= buffer.length) {
				if (dir) return -1;
				byteOffset = buffer.length - 1
			} else if (byteOffset < 0) {
				if (!dir) return -1;
				byteOffset = 0
			}
			if ("string" == typeof val && (val = Buffer.from(val, encoding)), Buffer.isBuffer(val)) return 0 === val.length ?
				-1 : arrayIndexOf(buffer, val, byteOffset, encoding, dir);
			if ("number" == typeof val) return val &= 255, Buffer.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype
				.indexOf ? dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(
					buffer, val, byteOffset) : arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
			throw new TypeError("val must be string, number or Buffer")
		}

		function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
			function read(buf, i) {
				return 1 === indexSize ? buf[i] : buf.readUInt16BE(i * indexSize)
			}
			var indexSize = 1,
				arrLength = arr.length,
				valLength = val.length;
			if (void 0 !== encoding && (encoding = String(encoding).toLowerCase(), "ucs2" === encoding || "ucs-2" ===
					encoding || "utf16le" === encoding || "utf-16le" === encoding)) {
				if (arr.length < 2 || val.length < 2) return -1;
				indexSize = 2, arrLength /= 2, valLength /= 2, byteOffset /= 2
			}
			var i;
			if (dir) {
				var foundIndex = -1;
				for (i = byteOffset; i < arrLength; i++)
					if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
						if (foundIndex === -1 && (foundIndex = i), i - foundIndex + 1 === valLength) return foundIndex * indexSize
					} else foundIndex !== -1 && (i -= i - foundIndex), foundIndex = -1
			} else
				for (byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength), i = byteOffset; i >= 0; i--) {
					for (var found = !0, j = 0; j < valLength; j++)
						if (read(arr, i + j) !== read(val, j)) {
							found = !1;
							break
						} if (found) return i
				}
			return -1
		}

		function hexWrite(buf, string, offset, length) {
			offset = Number(offset) || 0;
			var remaining = buf.length - offset;
			length ? (length = Number(length), length > remaining && (length = remaining)) : length = remaining;
			var strLen = string.length;
			if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
			length > strLen / 2 && (length = strLen / 2);
			for (var i = 0; i < length; ++i) {
				var parsed = parseInt(string.substr(2 * i, 2), 16);
				if (isNaN(parsed)) return i;
				buf[offset + i] = parsed
			}
			return i
		}

		function utf8Write(buf, string, offset, length) {
			return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
		}

		function asciiWrite(buf, string, offset, length) {
			return blitBuffer(asciiToBytes(string), buf, offset, length)
		}

		function latin1Write(buf, string, offset, length) {
			return asciiWrite(buf, string, offset, length)
		}

		function base64Write(buf, string, offset, length) {
			return blitBuffer(base64ToBytes(string), buf, offset, length)
		}

		function ucs2Write(buf, string, offset, length) {
			return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
		}

		function base64Slice(buf, start, end) {
			return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end))
		}

		function utf8Slice(buf, start, end) {
			end = Math.min(buf.length, end);
			for (var res = [], i = start; i < end;) {
				var firstByte = buf[i],
					codePoint = null,
					bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
				if (i + bytesPerSequence <= end) {
					var secondByte, thirdByte, fourthByte, tempCodePoint;
					switch (bytesPerSequence) {
						case 1:
							firstByte < 128 && (codePoint = firstByte);
							break;
						case 2:
							secondByte = buf[i + 1], 128 === (192 & secondByte) && (tempCodePoint = (31 & firstByte) << 6 | 63 &
								secondByte, tempCodePoint > 127 && (codePoint = tempCodePoint));
							break;
						case 3:
							secondByte = buf[i + 1], thirdByte = buf[i + 2], 128 === (192 & secondByte) && 128 === (192 & thirdByte) && (
								tempCodePoint = (15 & firstByte) << 12 | (63 & secondByte) << 6 | 63 & thirdByte, tempCodePoint > 2047 && (
									tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint));
							break;
						case 4:
							secondByte = buf[i + 1], thirdByte = buf[i + 2], fourthByte = buf[i + 3], 128 === (192 & secondByte) && 128 ===
								(192 & thirdByte) && 128 === (192 & fourthByte) && (tempCodePoint = (15 & firstByte) << 18 | (63 &
										secondByte) << 12 | (63 & thirdByte) << 6 | 63 & fourthByte, tempCodePoint > 65535 && tempCodePoint <
									1114112 && (codePoint = tempCodePoint))
					}
				}
				null === codePoint ? (codePoint = 65533, bytesPerSequence = 1) : codePoint > 65535 && (codePoint -= 65536, res.push(
						codePoint >>> 10 & 1023 | 55296), codePoint = 56320 | 1023 & codePoint), res.push(codePoint), i +=
					bytesPerSequence
			}
			return decodeCodePointsArray(res)
		}

		function decodeCodePointsArray(codePoints) {
			var len = codePoints.length;
			if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
			for (var res = "", i = 0; i < len;) res += String.fromCharCode.apply(String, codePoints.slice(i, i +=
				MAX_ARGUMENTS_LENGTH));
			return res
		}

		function asciiSlice(buf, start, end) {
			var ret = "";
			end = Math.min(buf.length, end);
			for (var i = start; i < end; ++i) ret += String.fromCharCode(127 & buf[i]);
			return ret
		}

		function latin1Slice(buf, start, end) {
			var ret = "";
			end = Math.min(buf.length, end);
			for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
			return ret
		}

		function hexSlice(buf, start, end) {
			var len = buf.length;
			(!start || start < 0) && (start = 0), (!end || end < 0 || end > len) && (end = len);
			for (var out = "", i = start; i < end; ++i) out += toHex(buf[i]);
			return out
		}

		function utf16leSlice(buf, start, end) {
			for (var bytes = buf.slice(start, end), res = "", i = 0; i < bytes.length; i += 2) res += String.fromCharCode(
				bytes[i] + 256 * bytes[i + 1]);
			return res
		}

		function checkOffset(offset, ext, length) {
			if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
			if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length")
		}

		function checkInt(buf, value, offset, ext, max, min) {
			if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
			if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
			if (offset + ext > buf.length) throw new RangeError("Index out of range")
		}

		function objectWriteUInt16(buf, value, offset, littleEndian) {
			value < 0 && (value = 65535 + value + 1);
			for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) buf[offset + i] = (value & 255 << 8 * (
				littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i)
		}

		function objectWriteUInt32(buf, value, offset, littleEndian) {
			value < 0 && (value = 4294967295 + value + 1);
			for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) buf[offset + i] = value >>> 8 * (littleEndian ?
				i : 3 - i) & 255
		}

		function checkIEEE754(buf, value, offset, ext, max, min) {
			if (offset + ext > buf.length) throw new RangeError("Index out of range");
			if (offset < 0) throw new RangeError("Index out of range")
		}

		function writeFloat(buf, value, offset, littleEndian, noAssert) {
			return noAssert || checkIEEE754(buf, value, offset, 4, 3.4028234663852886e38, -3.4028234663852886e38), ieee754.write(
				buf, value, offset, littleEndian, 23, 4), offset + 4
		}

		function writeDouble(buf, value, offset, littleEndian, noAssert) {
			return noAssert || checkIEEE754(buf, value, offset, 8, 1.7976931348623157e308, -1.7976931348623157e308), ieee754.write(
				buf, value, offset, littleEndian, 52, 8), offset + 8
		}

		function base64clean(str) {
			if (str = stringtrim(str).replace(INVALID_BASE64_RE, ""), str.length < 2) return "";
			for (; str.length % 4 !== 0;) str += "=";
			return str
		}

		function stringtrim(str) {
			return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "")
		}

		function toHex(n) {
			return n < 16 ? "0" + n.toString(16) : n.toString(16)
		}

		function utf8ToBytes(string, units) {
			units = units || 1 / 0;
			for (var codePoint, length = string.length, leadSurrogate = null, bytes = [], i = 0; i < length; ++i) {
				if (codePoint = string.charCodeAt(i), codePoint > 55295 && codePoint < 57344) {
					if (!leadSurrogate) {
						if (codePoint > 56319) {
							(units -= 3) > -1 && bytes.push(239, 191, 189);
							continue
						}
						if (i + 1 === length) {
							(units -= 3) > -1 && bytes.push(239, 191, 189);
							continue
						}
						leadSurrogate = codePoint;
						continue
					}
					if (codePoint < 56320) {
						(units -= 3) > -1 && bytes.push(239, 191, 189), leadSurrogate = codePoint;
						continue
					}
					codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536
				} else leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
				if (leadSurrogate = null, codePoint < 128) {
					if ((units -= 1) < 0) break;
					bytes.push(codePoint)
				} else if (codePoint < 2048) {
					if ((units -= 2) < 0) break;
					bytes.push(codePoint >> 6 | 192, 63 & codePoint | 128)
				} else if (codePoint < 65536) {
					if ((units -= 3) < 0) break;
					bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, 63 & codePoint | 128)
				} else {
					if (!(codePoint < 1114112)) throw new Error("Invalid code point");
					if ((units -= 4) < 0) break;
					bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, 63 & codePoint | 128)
				}
			}
			return bytes
		}

		function asciiToBytes(str) {
			for (var byteArray = [], i = 0; i < str.length; ++i) byteArray.push(255 & str.charCodeAt(i));
			return byteArray
		}

		function utf16leToBytes(str, units) {
			for (var c, hi, lo, byteArray = [], i = 0; i < str.length && !((units -= 2) < 0); ++i) c = str.charCodeAt(i), hi =
				c >> 8, lo = c % 256, byteArray.push(lo), byteArray.push(hi);
			return byteArray
		}

		function base64ToBytes(str) {
			return base64.toByteArray(base64clean(str))
		}

		function blitBuffer(src, dst, offset, length) {
			for (var i = 0; i < length && !(i + offset >= dst.length || i >= src.length); ++i) dst[i + offset] = src[i];
			return i
		}

		function isnan(val) {
			return val !== val
		}
		var base64 = __webpack_require__(13),
			ieee754 = __webpack_require__(14),
			isArray = __webpack_require__(15);
		exports.Buffer = Buffer, exports.SlowBuffer = SlowBuffer, exports.INSPECT_MAX_BYTES = 50, Buffer.TYPED_ARRAY_SUPPORT =
			void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : typedArraySupport(), exports.kMaxLength =
			kMaxLength(), Buffer.poolSize = 8192, Buffer._augment = function(arr) {
				return arr.__proto__ = Buffer.prototype, arr
			}, Buffer.from = function(value, encodingOrOffset, length) {
				return from(null, value, encodingOrOffset, length)
			}, Buffer.TYPED_ARRAY_SUPPORT && (Buffer.prototype.__proto__ = Uint8Array.prototype, Buffer.__proto__ =
				Uint8Array, "undefined" != typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(
					Buffer, Symbol.species, {
						value: null,
						configurable: !0
					})), Buffer.alloc = function(size, fill, encoding) {
				return alloc(null, size, fill, encoding)
			}, Buffer.allocUnsafe = function(size) {
				return allocUnsafe(null, size)
			}, Buffer.allocUnsafeSlow = function(size) {
				return allocUnsafe(null, size)
			}, Buffer.isBuffer = function(b) {
				return !(null == b || !b._isBuffer)
			}, Buffer.compare = function(a, b) {
				if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
				if (a === b) return 0;
				for (var x = a.length, y = b.length, i = 0, len = Math.min(x, y); i < len; ++i)
					if (a[i] !== b[i]) {
						x = a[i], y = b[i];
						break
					} return x < y ? -1 : y < x ? 1 : 0
			}, Buffer.isEncoding = function(encoding) {
				switch (String(encoding).toLowerCase()) {
					case "hex":
					case "utf8":
					case "utf-8":
					case "ascii":
					case "latin1":
					case "binary":
					case "base64":
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return !0;
					default:
						return !1
				}
			}, Buffer.concat = function(list, length) {
				if (!isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
				if (0 === list.length) return Buffer.alloc(0);
				var i;
				if (void 0 === length)
					for (length = 0, i = 0; i < list.length; ++i) length += list[i].length;
				var buffer = Buffer.allocUnsafe(length),
					pos = 0;
				for (i = 0; i < list.length; ++i) {
					var buf = list[i];
					if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
					buf.copy(buffer, pos), pos += buf.length
				}
				return buffer
			}, Buffer.byteLength = byteLength, Buffer.prototype._isBuffer = !0, Buffer.prototype.swap16 = function() {
				var len = this.length;
				if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
				for (var i = 0; i < len; i += 2) swap(this, i, i + 1);
				return this
			}, Buffer.prototype.swap32 = function() {
				var len = this.length;
				if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
				for (var i = 0; i < len; i += 4) swap(this, i, i + 3), swap(this, i + 1, i + 2);
				return this
			}, Buffer.prototype.swap64 = function() {
				var len = this.length;
				if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
				for (var i = 0; i < len; i += 8) swap(this, i, i + 7), swap(this, i + 1, i + 6), swap(this, i + 2, i + 5), swap(
					this, i + 3, i + 4);
				return this
			}, Buffer.prototype.toString = function() {
				var length = 0 | this.length;
				return 0 === length ? "" : 0 === arguments.length ? utf8Slice(this, 0, length) : slowToString.apply(this,
					arguments)
			}, Buffer.prototype.equals = function(b) {
				if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
				return this === b || 0 === Buffer.compare(this, b)
			}, Buffer.prototype.inspect = function() {
				var str = "",
					max = exports.INSPECT_MAX_BYTES;
				return this.length > 0 && (str = this.toString("hex", 0, max).match(/.{2}/g).join(" "), this.length > max && (
					str += " ... ")), "<Buffer " + str + ">"
			}, Buffer.prototype.compare = function(target, start, end, thisStart, thisEnd) {
				if (!Buffer.isBuffer(target)) throw new TypeError("Argument must be a Buffer");
				if (void 0 === start && (start = 0), void 0 === end && (end = target ? target.length : 0), void 0 === thisStart &&
					(thisStart = 0), void 0 === thisEnd && (thisEnd = this.length), start < 0 || end > target.length || thisStart <
					0 || thisEnd > this.length) throw new RangeError("out of range index");
				if (thisStart >= thisEnd && start >= end) return 0;
				if (thisStart >= thisEnd) return -1;
				if (start >= end) return 1;
				if (start >>>= 0, end >>>= 0, thisStart >>>= 0, thisEnd >>>= 0, this === target) return 0;
				for (var x = thisEnd - thisStart, y = end - start, len = Math.min(x, y), thisCopy = this.slice(thisStart,
						thisEnd), targetCopy = target.slice(start, end), i = 0; i < len; ++i)
					if (thisCopy[i] !== targetCopy[i]) {
						x = thisCopy[i], y = targetCopy[i];
						break
					} return x < y ? -1 : y < x ? 1 : 0
			}, Buffer.prototype.includes = function(val, byteOffset, encoding) {
				return this.indexOf(val, byteOffset, encoding) !== -1
			}, Buffer.prototype.indexOf = function(val, byteOffset, encoding) {
				return bidirectionalIndexOf(this, val, byteOffset, encoding, !0)
			}, Buffer.prototype.lastIndexOf = function(val, byteOffset, encoding) {
				return bidirectionalIndexOf(this, val, byteOffset, encoding, !1)
			}, Buffer.prototype.write = function(string, offset, length, encoding) {
				if (void 0 === offset) encoding = "utf8", length = this.length, offset = 0;
				else if (void 0 === length && "string" == typeof offset) encoding = offset, length = this.length, offset = 0;
				else {
					if (!isFinite(offset)) throw new Error(
						"Buffer.write(string, encoding, offset[, length]) is no longer supported");
					offset |= 0, isFinite(length) ? (length |= 0, void 0 === encoding && (encoding = "utf8")) : (encoding = length,
						length = void 0)
				}
				var remaining = this.length - offset;
				if ((void 0 === length || length > remaining) && (length = remaining), string.length > 0 && (length < 0 ||
						offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
				encoding || (encoding = "utf8");
				for (var loweredCase = !1;;) switch (encoding) {
					case "hex":
						return hexWrite(this, string, offset, length);
					case "utf8":
					case "utf-8":
						return utf8Write(this, string, offset, length);
					case "ascii":
						return asciiWrite(this, string, offset, length);
					case "latin1":
					case "binary":
						return latin1Write(this, string, offset, length);
					case "base64":
						return base64Write(this, string, offset, length);
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return ucs2Write(this, string, offset, length);
					default:
						if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
						encoding = ("" + encoding).toLowerCase(), loweredCase = !0
				}
			}, Buffer.prototype.toJSON = function() {
				return {
					type: "Buffer",
					data: Array.prototype.slice.call(this._arr || this, 0)
				}
			};
		var MAX_ARGUMENTS_LENGTH = 4096;
		Buffer.prototype.slice = function(start, end) {
			var len = this.length;
			start = ~~start, end = void 0 === end ? len : ~~end, start < 0 ? (start += len, start < 0 && (start = 0)) :
				start > len && (start = len), end < 0 ? (end += len, end < 0 && (end = 0)) : end > len && (end = len), end <
				start && (end = start);
			var newBuf;
			if (Buffer.TYPED_ARRAY_SUPPORT) newBuf = this.subarray(start, end), newBuf.__proto__ = Buffer.prototype;
			else {
				var sliceLen = end - start;
				newBuf = new Buffer(sliceLen, void 0);
				for (var i = 0; i < sliceLen; ++i) newBuf[i] = this[i + start]
			}
			return newBuf
		}, Buffer.prototype.readUIntLE = function(offset, byteLength, noAssert) {
			offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
			for (var val = this[offset], mul = 1, i = 0; ++i < byteLength && (mul *= 256);) val += this[offset + i] * mul;
			return val
		}, Buffer.prototype.readUIntBE = function(offset, byteLength, noAssert) {
			offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
			for (var val = this[offset + --byteLength], mul = 1; byteLength > 0 && (mul *= 256);) val += this[offset + --
				byteLength] * mul;
			return val
		}, Buffer.prototype.readUInt8 = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 1, this.length), this[offset]
		}, Buffer.prototype.readUInt16LE = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 2, this.length), this[offset] | this[offset + 1] << 8
		}, Buffer.prototype.readUInt16BE = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 2, this.length), this[offset] << 8 | this[offset + 1]
		}, Buffer.prototype.readUInt32LE = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 4, this.length), (this[offset] | this[offset + 1] << 8 | this[offset + 2] <<
				16) + 16777216 * this[offset + 3]
		}, Buffer.prototype.readUInt32BE = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 4, this.length), 16777216 * this[offset] + (this[offset + 1] << 16 | this[
				offset + 2] << 8 | this[offset + 3])
		}, Buffer.prototype.readIntLE = function(offset, byteLength, noAssert) {
			offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
			for (var val = this[offset], mul = 1, i = 0; ++i < byteLength && (mul *= 256);) val += this[offset + i] * mul;
			return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength)), val
		}, Buffer.prototype.readIntBE = function(offset, byteLength, noAssert) {
			offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
			for (var i = byteLength, mul = 1, val = this[offset + --i]; i > 0 && (mul *= 256);) val += this[offset + --i] *
				mul;
			return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength)), val
		}, Buffer.prototype.readInt8 = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 1, this.length), 128 & this[offset] ? (255 - this[offset] + 1) * -1 :
				this[offset]
		}, Buffer.prototype.readInt16LE = function(offset, noAssert) {
			noAssert || checkOffset(offset, 2, this.length);
			var val = this[offset] | this[offset + 1] << 8;
			return 32768 & val ? 4294901760 | val : val
		}, Buffer.prototype.readInt16BE = function(offset, noAssert) {
			noAssert || checkOffset(offset, 2, this.length);
			var val = this[offset + 1] | this[offset] << 8;
			return 32768 & val ? 4294901760 | val : val
		}, Buffer.prototype.readInt32LE = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 4, this.length), this[offset] | this[offset + 1] << 8 | this[offset + 2] <<
				16 | this[offset + 3] << 24
		}, Buffer.prototype.readInt32BE = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 4, this.length), this[offset] << 24 | this[offset + 1] << 16 | this[
				offset + 2] << 8 | this[offset + 3]
		}, Buffer.prototype.readFloatLE = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 4, this.length), ieee754.read(this, offset, !0, 23, 4)
		}, Buffer.prototype.readFloatBE = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 4, this.length), ieee754.read(this, offset, !1, 23, 4)
		}, Buffer.prototype.readDoubleLE = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 8, this.length), ieee754.read(this, offset, !0, 52, 8)
		}, Buffer.prototype.readDoubleBE = function(offset, noAssert) {
			return noAssert || checkOffset(offset, 8, this.length), ieee754.read(this, offset, !1, 52, 8)
		}, Buffer.prototype.writeUIntLE = function(value, offset, byteLength, noAssert) {
			if (value = +value, offset |= 0, byteLength |= 0, !noAssert) {
				var maxBytes = Math.pow(2, 8 * byteLength) - 1;
				checkInt(this, value, offset, byteLength, maxBytes, 0)
			}
			var mul = 1,
				i = 0;
			for (this[offset] = 255 & value; ++i < byteLength && (mul *= 256);) this[offset + i] = value / mul & 255;
			return offset + byteLength
		}, Buffer.prototype.writeUIntBE = function(value, offset, byteLength, noAssert) {
			if (value = +value, offset |= 0, byteLength |= 0, !noAssert) {
				var maxBytes = Math.pow(2, 8 * byteLength) - 1;
				checkInt(this, value, offset, byteLength, maxBytes, 0)
			}
			var i = byteLength - 1,
				mul = 1;
			for (this[offset + i] = 255 & value; --i >= 0 && (mul *= 256);) this[offset + i] = value / mul & 255;
			return offset + byteLength
		}, Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
			return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 1, 255, 0), Buffer.TYPED_ARRAY_SUPPORT ||
				(value = Math.floor(value)), this[offset] = 255 & value, offset + 1
		}, Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
			return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ?
				(this[offset] = 255 & value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0),
				offset + 2
		}, Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
			return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ?
				(this[offset] = value >>> 8, this[offset + 1] = 255 & value) : objectWriteUInt16(this, value, offset, !1),
				offset + 2
		}, Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
			return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ?
				(this[offset + 3] = value >>> 24, this[offset + 2] = value >>> 16, this[offset + 1] = value >>> 8, this[offset] =
					255 & value) : objectWriteUInt32(this, value, offset, !0), offset + 4
		}, Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
			return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ?
				(this[offset] = value >>> 24, this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] =
					255 & value) : objectWriteUInt32(this, value, offset, !1), offset + 4
		}, Buffer.prototype.writeIntLE = function(value, offset, byteLength, noAssert) {
			if (value = +value, offset |= 0, !noAssert) {
				var limit = Math.pow(2, 8 * byteLength - 1);
				checkInt(this, value, offset, byteLength, limit - 1, -limit)
			}
			var i = 0,
				mul = 1,
				sub = 0;
			for (this[offset] = 255 & value; ++i < byteLength && (mul *= 256);) value < 0 && 0 === sub && 0 !== this[offset +
				i - 1] && (sub = 1), this[offset + i] = (value / mul >> 0) - sub & 255;
			return offset + byteLength
		}, Buffer.prototype.writeIntBE = function(value, offset, byteLength, noAssert) {
			if (value = +value, offset |= 0, !noAssert) {
				var limit = Math.pow(2, 8 * byteLength - 1);
				checkInt(this, value, offset, byteLength, limit - 1, -limit)
			}
			var i = byteLength - 1,
				mul = 1,
				sub = 0;
			for (this[offset + i] = 255 & value; --i >= 0 && (mul *= 256);) value < 0 && 0 === sub && 0 !== this[offset + i +
				1] && (sub = 1), this[offset + i] = (value / mul >> 0) - sub & 255;
			return offset + byteLength
		}, Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
			return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 1, 127, -128), Buffer.TYPED_ARRAY_SUPPORT ||
				(value = Math.floor(value)), value < 0 && (value = 255 + value + 1), this[offset] = 255 & value, offset + 1
		}, Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
			return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ?
				(this[offset] = 255 & value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0),
				offset + 2
		}, Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
			return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ?
				(this[offset] = value >>> 8, this[offset + 1] = 255 & value) : objectWriteUInt16(this, value, offset, !1),
				offset + 2
		}, Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
			return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648),
				Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8, this[offset + 2] =
					value >>> 16, this[offset + 3] = value >>> 24) : objectWriteUInt32(this, value, offset, !0), offset + 4
		}, Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
			return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), value <
				0 && (value = 4294967295 + value + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset +
					1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = 255 & value) : objectWriteUInt32(this,
					value, offset, !1), offset + 4
		}, Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
			return writeFloat(this, value, offset, !0, noAssert)
		}, Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
			return writeFloat(this, value, offset, !1, noAssert)
		}, Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
			return writeDouble(this, value, offset, !0, noAssert)
		}, Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
			return writeDouble(this, value, offset, !1, noAssert)
		}, Buffer.prototype.copy = function(target, targetStart, start, end) {
			if (start || (start = 0), end || 0 === end || (end = this.length), targetStart >= target.length && (targetStart =
					target.length), targetStart || (targetStart = 0), end > 0 && end < start && (end = start), end === start)
				return 0;
			if (0 === target.length || 0 === this.length) return 0;
			if (targetStart < 0) throw new RangeError("targetStart out of bounds");
			if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
			if (end < 0) throw new RangeError("sourceEnd out of bounds");
			end > this.length && (end = this.length), target.length - targetStart < end - start && (end = target.length -
				targetStart + start);
			var i, len = end - start;
			if (this === target && start < targetStart && targetStart < end)
				for (i = len - 1; i >= 0; --i) target[i + targetStart] = this[i + start];
			else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT)
				for (i = 0; i < len; ++i) target[i + targetStart] = this[i + start];
			else Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
			return len
		}, Buffer.prototype.fill = function(val, start, end, encoding) {
			if ("string" == typeof val) {
				if ("string" == typeof start ? (encoding = start, start = 0, end = this.length) : "string" == typeof end && (
						encoding = end, end = this.length), 1 === val.length) {
					var code = val.charCodeAt(0);
					code < 256 && (val = code)
				}
				if (void 0 !== encoding && "string" != typeof encoding) throw new TypeError("encoding must be a string");
				if ("string" == typeof encoding && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " +
					encoding)
			} else "number" == typeof val && (val &= 255);
			if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
			if (end <= start) return this;
			start >>>= 0, end = void 0 === end ? this.length : end >>> 0, val || (val = 0);
			var i;
			if ("number" == typeof val)
				for (i = start; i < end; ++i) this[i] = val;
			else {
				var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString()),
					len = bytes.length;
				for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len]
			}
			return this
		};
		var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	}).call(exports, function() {
		return this
	}())
}, function(module, exports) {
	"use strict";

	function getLens(b64) {
		var len = b64.length;
		if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
		var validLen = b64.indexOf("=");
		validLen === -1 && (validLen = len);
		var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
		return [validLen, placeHoldersLen]
	}

	function byteLength(b64) {
		var lens = getLens(b64),
			validLen = lens[0],
			placeHoldersLen = lens[1];
		return 3 * (validLen + placeHoldersLen) / 4 - placeHoldersLen
	}

	function _byteLength(b64, validLen, placeHoldersLen) {
		return 3 * (validLen + placeHoldersLen) / 4 - placeHoldersLen
	}

	function toByteArray(b64) {
		for (var tmp, lens = getLens(b64), validLen = lens[0], placeHoldersLen = lens[1], arr = new Arr(_byteLength(b64,
				validLen, placeHoldersLen)), curByte = 0, len = placeHoldersLen > 0 ? validLen - 4 : validLen, i = 0; i < len; i +=
			4) tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i +
				2)] << 6 | revLookup[b64.charCodeAt(i + 3)], arr[curByte++] = tmp >> 16 & 255, arr[curByte++] = tmp >> 8 & 255,
			arr[curByte++] = 255 & tmp;
		return 2 === placeHoldersLen && (tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4,
			arr[curByte++] = 255 & tmp), 1 === placeHoldersLen && (tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(
				i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2, arr[curByte++] = tmp >> 8 & 255, arr[curByte++] = 255 &
			tmp), arr
	}

	function tripletToBase64(num) {
		return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[63 & num]
	}

	function encodeChunk(uint8, start, end) {
		for (var tmp, output = [], i = start; i < end; i += 3) tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 &
			65280) + (255 & uint8[i + 2]), output.push(tripletToBase64(tmp));
		return output.join("")
	}

	function fromByteArray(uint8) {
		for (var tmp, len = uint8.length, extraBytes = len % 3, parts = [], maxChunkLength = 16383, i = 0, len2 = len -
				extraBytes; i < len2; i += maxChunkLength) parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i +
			maxChunkLength));
		return 1 === extraBytes ? (tmp = uint8[len - 1], parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==")) : 2 ===
			extraBytes && (tmp = (uint8[len - 2] << 8) + uint8[len - 1], parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] +
				lookup[tmp << 2 & 63] + "=")), parts.join("")
	}
	exports.byteLength = byteLength, exports.toByteArray = toByteArray, exports.fromByteArray = fromByteArray;
	for (var lookup = [], revLookup = [], Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array, code =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i) lookup[
		i] = code[i], revLookup[code.charCodeAt(i)] = i;
	revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63
}, function(module, exports) {
	exports.read = function(buffer, offset, isLE, mLen, nBytes) {
		var e, m, eLen = 8 * nBytes - mLen - 1,
			eMax = (1 << eLen) - 1,
			eBias = eMax >> 1,
			nBits = -7,
			i = isLE ? nBytes - 1 : 0,
			d = isLE ? -1 : 1,
			s = buffer[offset + i];
		for (i += d, e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = 256 * e + buffer[offset + i],
			i += d, nBits -= 8);
		for (m = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m = 256 * m + buffer[offset + i], i += d,
			nBits -= 8);
		if (0 === e) e = 1 - eBias;
		else {
			if (e === eMax) return m ? NaN : (s ? -1 : 1) * (1 / 0);
			m += Math.pow(2, mLen), e -= eBias
		}
		return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}, exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
		var e, m, c, eLen = 8 * nBytes - mLen - 1,
			eMax = (1 << eLen) - 1,
			eBias = eMax >> 1,
			rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
			i = isLE ? 0 : nBytes - 1,
			d = isLE ? 1 : -1,
			s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
		for (value = Math.abs(value), isNaN(value) || value === 1 / 0 ? (m = isNaN(value) ? 1 : 0, e = eMax) : (e = Math.floor(
					Math.log(value) / Math.LN2), value * (c = Math.pow(2, -e)) < 1 && (e--, c *= 2), value += e + eBias >= 1 ? rt /
				c : rt * Math.pow(2, 1 - eBias), value * c >= 2 && (e++, c /= 2), e + eBias >= eMax ? (m = 0, e = eMax) : e +
				eBias >= 1 ? (m = (value * c - 1) * Math.pow(2, mLen), e += eBias) : (m = value * Math.pow(2, eBias - 1) * Math.pow(
					2, mLen), e = 0)); mLen >= 8; buffer[offset + i] = 255 & m, i += d, m /= 256, mLen -= 8);
		for (e = e << mLen | m, eLen += mLen; eLen > 0; buffer[offset + i] = 255 & e, i += d, e /= 256, eLen -= 8);
		buffer[offset + i - d] |= 128 * s
	}
}, function(module, exports) {
	var toString = {}.toString;
	module.exports = Array.isArray || function(arr) {
		return "[object Array]" == toString.call(arr)
	}
}]);
