const config = {
  logo:'./static/mopian.png',
  siteName:'魔篇',
  appUrl:'http://www.baidu.com',
  title:"【魔篇】",
  link:"http://weex.1xx.me/",
  desc:'超强图文小视频分享社区,中国版Facebook.',
  // baseURL:"http://weex.rzico.com/",
  baseURL:"http://weex.1xx.me/",
  wxAppid:"wx88a1ec3b5c3bc9c3",
}

let utilsFunc = {
    getConfig () {
        return config;
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
        if (value == null || value == undefined || value == '' ) {
            return true
        } else {
            return false
        }
    },
    thumbnail(url,w,h) {
        if (url.substring(0,10) == "http://cdn") {
            return url+"@"+w+"w_"+h+"h_1e_1c_100Q";
        } else {
            return url;
        }
    },
    thumbnail_cover(url,w) {
        if (url.substring(0,10) == "http://cdn") {
           return url+"@"+w+"w_1e_1c_100Q";
        } else {
           return url;
        }
    },
  currencyfmt:function (value) {
    // 返回处理后的值
    if (value != null) {
      if(value == 0){
        return value;
      }else{
        var price = (Math.round(value * Math.pow(10,2)) / Math.pow(10,2)).toFixed(2);
        return price;
      }
    }
  },
  // 返回处理后的值 2017-01-01 00:00:00
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
    return date.getFullYear() + '-' + date.getMonth() + '  ' +date.getDay();
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
        let    m = date.getMonth() + 1;
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
    return ua;
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
    let m = url.slice(url.indexOf('website/')+8,url.indexOf('?'));
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
