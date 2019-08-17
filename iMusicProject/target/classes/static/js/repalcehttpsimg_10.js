"use strict";

// forEach Polyfill
Array.prototype.forEach||(Array.prototype.forEach=function(r){var o,t;if(null==this)throw new TypeError("this is null or not defined");var n=Object(this),e=n.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(1<arguments.length&&(o=arguments[1]),t=0;t<e;){var i;t in n&&(i=n[t],r.call(o,i,t,n)),t++}});

/**
 *
 */
;(function () {
  var sourceUrl = window.location.href;
  function setLog(imgurl, msg) {
    var img = new Image();
    img.src = 'https://statwww2.kugou.com/node/weblog/jsloger?key=img_https_list&sourceUrl=' + sourceUrl + '&imgurl=' + imgurl + '&msg=' + msg;
  }
  function replaceHttpsImg(imgUrl) {
    if (!imgUrl) return 0;
    if (~imgUrl.indexOf('https://')) return imgUrl;
    var httpsUrl = '',
      imgMapHttps = [
        ["https://imgessl.kugou.com", ["http://imge.kugou.com", "http://imgessl.kugou.com", "http://singerimg.kugou.com", "http://c0.kgimg.com", "http://c1.kgimg.com", "http://c2.kgimg.com", "http://c3.kgimg.com", "http://c4.kgimg.com", "http://c5.kgimg.com", "http://c6.kgimg.com", "http://c7.kgimg.com", "http://c8.kgimg.com", "http://c9.kgimg.com"]],
        ["https://webimg.kgimg.com", ["http://webimg.bssdl.kugou.com"]],
        ["https://mobileservicebssdl.kugou.com", ["http://mobileservice.bssdl.kugou.com"]],
        ["https://mwebbssdl.kugou.com", ["http://mweb.bssdl.kugou.com"]],
        ["https://schoolimgbssdl.kugou.com", ["http://schoolimg.bssdl.kugou.com"]],
        ["https://activitybssdl.kugou.com", ["http://activity.bssdl.kugou.com"]],
        ["https://adsfile.kugou.com", ["http://adsfile.bssdlbig.kugou.com"]],
        ["https://imgacsing.kugou.com", ["http://img.acsing.kugou.com"]],
        ["https://s10.fxwork.kugou.com", ["http://s10.fxwork.fanxing.kugou.com","http://s10.fxwork.fanxing.com","http://s10.fxwork.kugou.com"]],
        ["https://p3fx.kgimg.com", ["http://imge.kugou.com","http://s3.fx.kgimg.com"]],
        ["https://s4fx.kgimg.com", ["http://s4fx.kgimg.com"]],
        ["https://m3ws.kugou.com", ["http://m.kugou.com"]],
        ["https://ep.kugou.com", ["http://zhuanjistatic.kugou.com"]],
        ["https://$13fx.kgimg.com", [/^http:\/\/([sp])[1-5]\.fx\.(kgimg)\.com/,/^http:\/\/([sp])[1-5]\.fanxing\.com/]]
      ];
    imgMapHttps.forEach(function (item) {
      var list = item[1],
        replaceHttps = item[0];
      list.forEach(function (it) {
        // httpsUrl = imgUrl.replace(it, replaceHttps)
        if(typeof it==='object' && it.test(imgUrl)){
          httpsUrl = imgUrl.replace(it, replaceHttps)
        }else if(~imgUrl.indexOf(it)){
          httpsUrl = imgUrl.replace(it, replaceHttps);
        }
        return !httpsUrl;
      });
      return !httpsUrl;
    });
    httpsUrl || setLog(imgUrl, '转化https链接失败')
    return httpsUrl || imgUrl;
  };

  if (typeof module != 'undefined' && module.exports) {
    module.exports = replaceHttpsImg;
  }
  else if (typeof define == 'function' && define.amd) {
    define(function () {
      return replaceHttpsImg;
    });
  } else {
    window.replaceHttpsImg = replaceHttpsImg;
  }
})()



