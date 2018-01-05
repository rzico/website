const config = {
  logo:'./static/logo.png',
  siteName:'芸店',
  appUrl:'http://a.app.qq.com/o/simple.jsp?pkgname=com.rzico.assistant',
  title:"芸店",
  link:"http://weixin.rzico.com",
  desc:'超强图文小视频分享社区,中国版Facebook.',
  baseURL:"http://weixin.rzico.com/",
  wxAppid:"wx88a1ec3b5c3bc9c3"
}

let utilsFunc = {
    getConfig () {
        return config
    },
    setConfig (conf) {
      config.title =conf.title;
      config.link =conf.link;
      config.desc =conf.desc;
    },
    //获取URL参数
    getUrlParameter(name) {
        let url = window.location.href;
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = url.slice(url.indexOf('?')+1).match(reg);
        if (r != null) {
            try {
                return decodeURIComponent(r[2]);
            } catch (_e) {
                return "";
            }
        }
        return "";
    },
    message (_type,_content,_data) {
        return {
            type:_type,
            content:_content,
            data:_data
        }
    },
    isNull (value) {
        if (value == null || value == undefined || value == '' || value == 'null' || value == '<null>') {
            return true
        } else {
            return false
        }
    },
    thumbnail(url,w,h) {
        if(this.isNull(url)){
           return;
        }
        if (url.substring(0,11) == "http://cdnx") {
            return url+"?x-oss-process=image/resize,w_"+w+",h_"+h+"/quality,q_90";
        } else
        if (url.substring(0,10) == "http://cdn") {
            return url+"@"+w+"w_"+h+"h_1e_1c_100Q";
        } else {
            return url;
        }
    },
    thumbnail_cover(url,w) {
        if (w>1080) {
          w = 1080
        }
        if (url.substring(0,11) == "http://cdnx") {
           return url+"?x-oss-process=image/resize,w_"+w+"/quality,q_90";
        } else
        if (url.substring(0,10) == "http://cdn") {
           return url+"@"+w+"w_1e_1c_100Q";
        } else {
           return url;
        }
    },
  // 返回处理后的值 00:00
  timefmt(value) {
    value = value + '';
    if(value.length == 10){
      value = parseInt(value) * 1000;
    }else{
      value = parseInt(value);
    }
    let    date = new Date(value);
    let    tody = new Date();
    let    w = tody.getDay()-date.getDay();
    if (w<1) {
      let    h = date.getHours();
      let    i = date.getMinutes();
      if (h < 10) {
        h = '0' + h;
      }
      if (i < 10) {
        i = '0' + i;
      }
      return h +":"+i ;
    }
    if (w<2) {
      return "1天内";
    }
    if (w<3) {
      return "3天内";
    }
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '  ' +date.getDay();
    },
    // 返回处理后的值 2017-01-01
      timeDatefmt(value) {
      value = value + '';
      if(value.length == 10){
        value = parseInt(value) * 1000;
      }else{
        value = parseInt(value);
      }
        let    date = new Date(value);
        let    m = date.getMonth()+1;
        let    d = date.getDate();
        if (m < 10) {
           m = '0' + m;
        }
        if (d < 10) {
           d = '0' + d;}
        let t = date.getFullYear()+'-'+ m + '-' + d ;
        return t;
    },
  // 返回处理后的值 2017-01-01 00:00:00
    datetimefmt(value) {
    value = value + '';
    if(value.length == 10){
      value = parseInt(value) * 1000;
    }else{
      value = parseInt(value);
    }
    let    date = new Date(value);
    let    m = date.getMonth()+1;
    let    d = date.getDate();
    let    H = date.getHours();
    let    i = date.getMinutes();
    if (m < 10) {
      m = '0' + m;
    }
    if (d < 10) {
      d = '0' + d;}
    if (H < 10) {
      H = '0' + H;
    }
    if (i < 10) {
      i = '0' + i;
    }
    let t = date.getFullYear()+'-'+ m + '-' + d + '  ' + H + ':' + i ;
    return t;
  },
  //时间格式化 今天 近三天 近七天  七天前
  dayfmt:function (value) {
    let res = this.resolvetimefmt(value);
    let tds = this.resolvetimefmt(Math.round(new Date().getTime()));

    let span = Math.abs(Math.round(new Date().getTime())-value);
    let daySub = Math.floor(span / (24 * 3600 * 1000));
    if (daySub<1) {
      return "今天"
    }
    if (daySub<3) {
      return "近三天"
    }
    if (daySub<7) {
      return "近七天"
    }
    return "七天前"
  },
  //时间格式化 返回 03:07
  hitimefmt:function (value) {
    let res = this.resolvetimefmt(value);
    return res.h + ':' + res.i ;
  },
  //金额保留两位小数点
  currencyfmt:function(value) {
    if (value == '' || value == null || value == undefined) {
      return value;
    }
    // 返回处理后的值
    if (value != null) {
      if (value == 0) {
        return value;
      } else {
        var price = (Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
        return price;
      }
    }
  },
  resolvetimefmt:function (value) {
//value 传进来是个整数型，要判断是10位还是13位需要转成字符串。这边的方法是检测13位的时间戳 所以要*1000；并且转回整型。安卓下，时间早了8个小时
    if(value.toString().length == 10){
      value = parseInt(value) * 1000;
    }else{
      value = parseInt(value);
    }
// 返回处理后的值
    var    date = new Date(value);

    var    d2 = Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),date.getUTCHours(),date.getUTCMinutes(),date.getUTCSeconds());

    date = new Date(d2+28800000);

    var    y = date.getUTCFullYear();
    var    m = date.getUTCMonth() + 1;
    var    d = date.getUTCDate();
    var    h = date.getUTCHours();
    var    i = date.getUTCMinutes();
    var    s = date.getUTCSeconds();
    if (m < 10) {
      m = '0' + m;
    }
    if (d < 10) {
      d = '0' + d;
    }
    if (h < 10) {
      h = '0' + h;
    }
    if (i < 10) {
      i = '0' + i;
    }
    if (s < 10) {
      s = '0' + s;
    }
    let timeObj = {
      y:y,
      m:m,
      d:d,
      h:h,
      i:i,
      s:s
    }
    return timeObj;
  },
    //RSA
    encrypt(str,key) {
      var rsaKey = new RSAKey();
      rsaKey.setPublic(b64tohex(key.modulus), b64tohex(key.exponent));
      return hex2b64(rsaKey.encrypt(str));
    },
  isweixin() {
    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true;
    } else {
      return false;
    }
  },
  isweex() {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/Weex/i) == 'weex'){
      return true;
    } else {
      return false;
    }
  },
  isalipay() {
    const ua = window.navigator.userAgent.toLowerCase();
    if((ua.match(/Alipay/i)=="alipay")){
      return true;
    } else {
      return false;
    }
  },
  router(url) {
    var vars = {}, hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars[hash[0]] = hash[1];
    }
    let surl = url.slice(7,url.length);
    var len = surl.indexOf('?');
    if (len<0) {
        len = surl.length;
    }
    let m = surl.slice(surl.indexOf('/')+1,len);
    if (m.indexOf('/')>0) {
      m = m.slice(1,m.indexOf('/'))
    }
    return {name:m,query:vars};
  },
  screenWidth() {
    return window.devicePixelRatio*document.documentElement.clientWidth;
  },
  screenHeight() {
    return window.devicePixelRatio*document.documentElement.clientHeight;
  }
};

export default utilsFunc;
