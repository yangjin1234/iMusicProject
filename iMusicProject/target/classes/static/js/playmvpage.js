/**
 *  creat by  czl 20190313
 * @param {void} $ 
 */
function sdnClick($) {
    setTimeout(function () {
        (new Image()).src = "http://sdn.kugou.com/link.aspx?id=" + $ + "&url=&t=" + Math.random()
    }, 0);
}
//flash加载时返回hash,
function flashinit() {
    var flash = Kg.flash.getObj("webmvplayer");
    if (parseInt(canPlay) == 1) {
        flash.hashload(play_hash);
    } else if (parseInt(canPlay) == 666666) {
        var unshare = dialog({
            width: 300,
            height: 50,
            title: '提示',
            skin: 'unshare',
            fixed:true,
            cancel: false,
            content: "抱歉，您所在的国家或地区暂无法提供mv服务"
        }).showModal();
    } else {
        var unshare = dialog({
            width: 300,
            height: 50,
            title: '提示',
            fixed:true,
            skin: 'unshare',
            content: "该mv已经下架"
        }).show();
    }
}
sdnClick(12190);
sdnClick(12191);
sdnClick(12992);
var playMvPage = {
    /**
     * hitplus
     * */
    hitplus: function () {
        //hit++
        var url = "<?php echo U('Index/mvhit');?>";
        url += '&mv={$mv.id}&' + Date.parse(new Date()) + Math.random();
        $.get(url, function (result) {
            $('.times em').html(parseInt(result));
        });
    },
    /**
     * getMvlike
     * */
    getMvlike: function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "//www.kugou.com/mvweb/app/index.php?m=Index&a=likemvs&mv=" + mv_audio_id + "$id=" + mv_id,
            success: function (res) {
                var obj = res
                var ul = $('ul.clearfix');
                for (var i = 0; i < 5; i++) {
                    ul.append('<li><a onclick="sdnClick(12192);" href="/mvweb/html/mv_' + obj[i]['id'] + '.html"><img src="' + obj[i]['pic'] + '" width="140" height="78" title='+ obj[i]['name'] + ' /><em></em><i></i></a><span>' + obj[i]['name'] + '</span></li>');
                }
                ul.append('<li class="nom"><a onclick="sdnClick(12192);" href="/mvweb/html/mv_' + obj[i]['id'] + '.html"><img src="' + obj[i]['pic'] + '" width="140" height="78"  title='+ obj[i]['name'] + '/><em></em><i></i></a><span>' + obj[i]['name'] + '</span></li>');
            },
            error: function () {
                var getData = dialog({
                    width: 200,
                    height: 50,
                    title: '不支持分享',
                    skin: 'unshare',
                    fixed:true,
                    content: "获取数据失败"
                }).show();
                setTimeout(function () {
                    getData.close().remove();
                }, 2000);
            }
        })
    },
    shared: null,
    downloadd: null,
    /*单曲二维码*/
    hashQueryShortUrl: function (option, callback) {
        var _this = this;
        /*读取客户端获取的参数*/
        var url = option.url,
            hash = option.Hash;
        md5Str = hash != "" ? Md5.md5('kgclientshare' + hash) : Md5.md5('kgclientshare' + Md5.md5('url')),
            from = option.chl == "weixin" ? 'webCode' : "";

        var dataObj = {
            cmid: 5,
            url: url,
            hash: hash,
            is_short: 1,
            md5: md5Str,
            chl: option.chl || 'weixin',
            codes: 1,
            from: from
        };
        $.ajax({
            type: 'get',
            url: 'https://tservice.kugou.com/app/',
            timeout: 5000,
            dataType: 'jsonp',
            jsonp: 'callback',
            data: dataObj,
            success: function (res) {
                if (res) {
                    if (res.status) {
                        /*将二维码添加到页面上*/
                        $('.qrcode').find('img').attr('src', res.codes_url);
                        callback && callback(res)
                    } else if (res.err_code == 31001) {
                        /*no storage file 错误处理*/
                        setTimeout(function () {
                            _this.shareIsCanClick = true;
                        }, 1000);
                        $('.qrcode').find('img').attr('src', 'http://www2.kugou.kugou.com/apps/kucodeAndShare/static/images/no_share.jpg');
                        callback && callback("")

                    }
                }
            },
            error: function (xhr, type) {
                callback && callback("")
            }

        });
    },
    download: function (data) {
        var _this = this;
        if (_this.downloadd) {
            return
        }
        _this.downloadd = dialog({
            title: '下載歌曲',
            skin: 'download_popup',
            fixed:true,
            content: [
                ' <div class="dialogContent clearfix">',
                '<div class="contetText">',
                '<p><span class="warn_icon"></span>下载MV需要在酷狗音乐客户端操作</p></div>',
                '<div class="dialogFooter clearfix">',
                '<a href="#" class="btnDl" onclick="_hmt.push([\'_trackEvent\', \'mvdown2\', \'mvdownclick2\', \'kgmv\']);">下载客户端</a>',
                '</div>',
                ' </div>',
            ].join(""),
            onshow: function () {
                $(".btnDl").off("click").on("click", function (e) {
                    e.preventDefault();
                    var win = window.open(window.downloadLink);
                    _this.downloadd.close().remove();
                })

            },
            onclose: function () {
                _this.downloadd = null;
            }

        });
        _this.downloadd.show();
    },
    getBrowser:function (){
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ?  Sys={"v":s[1],"type":"ie"}:
        (s = ua.match(/msie ([\d.]+)/)) ?  Sys={"v":s[1],"type":"ie"} :
        (s = ua.match(/firefox\/([\d.]+)/)) ?  Sys={"v":s[1],"type":"firefox"} :
        (s = ua.match(/chrome\/([\d.]+)/)) ?  Sys={"v":s[1],"type":"chrome"} :
        (s = ua.match(/opera.([\d.]+)/)) ?  Sys={"v":s[1],"type":"opera"} :
        (s = ua.match(/version\/([\d.]+).*safari/)) ?   Sys={"v":s[1],"type":"safari"} : 0;
        return Sys
    },
    htmlTitleDecode : function(str) {
        var s = "";
        if (str.length == 0) return s;
        s = str.replace(/&lt;/g, "<");
        s = s.replace(/&#60;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&#62;/g, ">");
        s = s.replace(/&amp;/g, "&");
        s = s.replace(/&#38;/g, "&");
        s = s.replace(/&#63;/g, "\?");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#160;/g, " ");
        s = s.replace(/&apos;/g, "\'");
        s = s.replace(/&#039;/g, "\'");
        s = s.replace(/&#42;/g, "\*");
        s = s.replace(/&#47;/g, "\/");
        s = s.replace(/&#92;/g, "\\");
        s = s.replace(/&#58;/g, "\:");
        s = s.replace(/&#124;/g, "\|");
        s = s.replace(/\"/g, "&quot;");
        return s;
    },
    share: function (data) {
        var _this = this,
            shareTitle = _this.htmlTitleDecode(data["FileName"]) ,
            shareIntro = '我在酷狗常看的《' + shareTitle + '》，你也来看看吧！（来自 web 酷狗音乐）',
            sharePic = mv_pic || "https://www.kugou.com/yy/static/images/share-cover.png";

        if (_this.shared) {
            return
        }
        _this.shared = dialog({
            title: '分享歌曲',
            skin: 'share_popup',
            content: [
                "<div id='share_list'>",
                " <dl>",
                "<dt class='share_weixin'></dt>",
                "<dd class='qrcode'><img src='' /></dd>",
                "<dd>微信</dd>",
                "</dl>",
                "<dl>",
                "<dt class='share_friend'></dt>",
                "<dd>QQ好友</dd>",
                "</dl>",
                "<dl>",
                "<dt class='share_qzone'></dt>",
                "<dd>QQ空间</dd>",
                "</dl>",
                "<dl>",
                "<dt class='share_weibo'></dt>",
                "<dd>新浪微博</dd>",
                "</dl>",
                "</div>"
            ].join(""),
            onshow: function () {
                data["chl"] = "weixin";
                _this.hashQueryShortUrl(data, function (res) {
                    var shareShortUrl = res.data;
                    /*用哈希去获取 分享所需的图片*/
                    $(".share_weixin").mouseover(function () {
                        $(".qrcode").show()
                    }).mouseout(function () {
                        $(".qrcode").hide()
                    })
                    if (shareShortUrl == "" || res.err_code == 31001) {
                        _this.upSupportShare("微信")
                    }
                });

                $(".share_friend").on("click", function () {
                    var newWin = window.open('');
                    data["chl"] = "qq";
                    _this.hashQueryShortUrl(data, function (res) {
                        var shareShortUrl = res.data;
                        /*用哈希去获取 分享所需的图片*/
                        if (shareShortUrl == "" || res.err_code == 31001) {
                            _this.upSupportShare("QQ")
                        } else {
                            newWin.location = 'http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(shareShortUrl) + '&desc=&title=' + encodeURIComponent(shareTitle) + '&summary=' + encodeURIComponent(shareIntro) + '&pics=' + sharePic + '&flash=&site=www.kugou.com';
                        }
                    });
                    _this.shared.close().remove();


                })
                $(".share_qzone").on("click", function () {
                    var newWin = window.open('');
                    data["chl"] = "qzone";
                    _this.hashQueryShortUrl(data, function (res) {
                        var shareShortUrl = res.data;
                        /*用哈希去获取 分享所需的图片*/
                        if (shareShortUrl == "" || res.err_code == 31001) {
                            _this.upSupportShare("QQ空间")
                        } else {
                            newWin.location = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(shareShortUrl) + '&title=' + encodeURIComponent(shareTitle) + '&pics=' + sharePic + '&summary=' + encodeURIComponent(shareIntro);
                        }
                    });
                    _this.shared.close().remove();
                })
                $(".share_weibo").on("click", function () {
                    var weiboShareIntro;
                    weiboShareIntro = shareIntro.replace('#', '%23');   // 微博特殊处理 # 字符
                    weiboShareIntro = weiboShareIntro.replace('（来自 PC 酷狗音乐）', '（ 来自 @酷狗音乐 web版 ）');
                    weiboShareIntro = encodeURIComponent(weiboShareIntro);
                    var newWin = window.open('');
                    data["chl"] = "weibo";
                    _this.hashQueryShortUrl(data, function (res) {
                        var shareShortUrl = res.data;
                        /*用哈希去获取 分享所需的图片*/
                        if (shareShortUrl == "" || res.err_code == 31001) {
                            _this.upSupportShare("微博")
                        } else {
                            newWin.location = 'http://v.t.sina.com.cn/share/share.php?appkey=340086183&pic=' + sharePic + '&url=' + encodeURIComponent(shareShortUrl) + '&title=' + weiboShareIntro;
                        }
                    });
                    _this.shared.close().remove();
                })

            },
            onclose: function () {
                _this.shared = null;
            }

        });
        _this.shared.show();
    },
    upSupportShare: function (msg) {
        var unshare = dialog({
            width: 200,
            height: 50,
            title: '不支持分享',
            skin: 'unshare',
            fixed:true,
            content: "该歌曲不支持" + msg + "分享"
        }).show();
        setTimeout(function () {
            unshare.close().remove();
        }, 2000);
    },
    callExe: function (option) {
        var _this = this,
            songData = option.song_info,
            FileName = songData["FileName"],
            songWord = FileName.length > 58 ? FileName.substring(0, 58) + "..." : FileName,
            controlData = '{"Files":[{"filename":"' + songWord + '.mp3","hash":"' + songData["Hash"] + '","size":"' + songData["size"] || "" + '","duration":"' + songData["timeLen"] * 1000 || "" + '","bitrate":"128","isfilehead":"100","privilege":"' + songData["privilege"] || "" + '","album_id":"' + songData["album_id"] || "" + '"}]}';
        // 唤起客户端
        var url = 'kugou://download?p=' + Base64.encode(controlData);
        if (_this.isIE(6) || _this.isIE(7) || _this.isIE(8)) {
            window.open(url)
        } else {
            $("body").append(" <iframe style='display:none' src='" + url + "'></iframe>")
        }

    },
    isIE: function (ver) {
        var b = document.createElement('b')
        b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
        return b.getElementsByTagName('i').length === 1
    },
    checkArea: function () {
        $.ajax({
            type: 'GET',
            url: 'https://mips.kugou.com/check/iscn?&format=jsonp',
            dataType: "jsonp",
            timeout: 3000,
            success: function (res) {
                if (res["status"]) {
                    if (res["flag"] == 0) {
                        canPlay = 666666;
                    }
                }
            },
            error: function (xhr, type) {
            }
        });
    },
    init: function () {
        var _this = this;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                var locationFrom = location.href,
                mvId;
            try{
                var handle = locationFrom.match(/mv\_(.*).html/);
                if( typeof handle != "undefined" && handle != null && handle[1]){
                    mvId = handle[1]
                }else{
                    mvId = parseInt(locationFrom.match(/mv\/(.*).html/));
                }
            }catch(ex){}
                var mvhashLength = 32;// hash 固定长度
                if (mvId.length == mvhashLength) {
                    window.location = "http://m.kugou.com/mv/?hash=" + mvId + location.search
                } else {
                    window.location = "http://m.kugou.com/mv/" + mv_id + ".html" + location.search
                }
        }
        _this.checkArea
        // 同步点击数
        // _this.hitplus();
        _this.getMvlike();
        var reffer = "",
            hrefStr = location.href;
        if (hrefStr.indexOf("frombaidu") != -1) {
            window.downloadLink = "http://xiazai.kugou.com/Corp/kugou7_3762.exe";
            hrefStr = "?frombaidu"
        } else if (hrefStr.indexOf("from_bdvideo") != -1) {
            window.downloadLink = "http://xiazai.kugou.com/Corp/kugou7_3787.exe";
            hrefStr = "?from_bdvideo"
        } else if (hrefStr.indexOf("from_sogou") != -1) {
            window.downloadLink = "http://xiazai.kugou.com/Corp/kugou7_3814.exe";
            hrefStr = "?from_sogou"
        } else if (hrefStr.indexOf("from_360") != -1) {
            window.downloadLink = "http://xiazai.kugou.com/Corp/kugou7_3500.exe";
            hrefStr = "?from_360"
        } else {
            window.downloadLink = "http://download.kugou.com/download/kugou_pc"
            hrefStr = ""
        }
        if (_this.isIE(8)) {
            $('.qrcodeForMobile').qrcode({ render: "table", width: 120, height: 120, text: "http://m.kugou.com.com/mv/" + mv_id + ".html" + hrefStr });
        } else {
            $('.qrcodeForMobile').qrcode({ width: 120, height: 120, text: "http://m.kugou.com/mv/" + mv_id + ".html" + hrefStr });
        }
        $(".shareBtn").on("click", function (e) {
            e.preventDefault();
            var shareData = {
                FileName: mv_name,
                url: "https://www.kugou.com/mvweb/html/mv_" + mv_id + ".html",
                Hash: mv_hash
            }
            _this.share(shareData)
        })
        $(".downloadBtn").on("click", function (e) {
            e.preventDefault();
            var downloadData = {
                FileName: mv_name,
                Hash: mv_hash
            }
            _this.download(downloadData)
        })

        var showT = null,
            mobileShare = $(".mobileShare"),
            mobileShareQrcode = $(".mobileShareQrcode");
        mobileShare.mouseover(function (e) {
            e.preventDefault();
            e.stopPropagation()
            mobileShareQrcode.show();
        }).mouseout(function (e) {
            e.preventDefault();
            e.stopPropagation()
            showT = setTimeout(function () {
                mobileShareQrcode.hide();
            }, 1000)
        }).mousemove(function (e) {
            e.preventDefault();
            e.stopPropagation()
            mobileShareQrcode.show();
        })

        mobileShareQrcode.mouseover(function () {
            $(this).show();
        }).mouseout(function () {
            $(this).hide();
        }).mousemove(function (e) {
            $(this).show();
        })

        $(".mobileShare").click(function (e) {
            e.preventDefault();
            mobileShareQrcode.show();
        })
    }
};

window.apmtjfun=function(res){
    try {
        var res = JSON.parse(res)
        var EStr = "E1"
        var biDate = {
                typeId:10006,
                hash:res.hash,
                transaction:res.transaction,
                timelength:res.timelength
            };
            try{
                biDate["ua"] = JSON.stringify(playMvPage.getBrowser());
            }catch(ex){}
    
        if(res["state"]==1){
            biDate["state"]=1
        }else{
            biDate["state"]= 0
            biDate["fs"] = res.fs;
            if(res.fs== 994){
                EStr = "E2"
            }else if(res.fs==995){
                EStr = "E2"
            }else if(res.fs==996){
                EStr = "E1"
            }else if(res.fs==997){
                EStr = "E3"
            }else if(res.fs==998){
                EStr = "E2"
            }else if(res.fs==999){
                EStr = "E2"
            }
            biDate["te"] = EStr;
            biDate["position"] = res.position;
        }
        
        var interfacedata = [12, biDate, null, 1];
        apmCollectData.push(interfacedata);
        newLogCount();
    } catch (ex) {
        console.log(ex)
    }

}
$(document).ready(function () {
    playMvPage.init();
});