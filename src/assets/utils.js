const config = {
  logo:'./static/logo.png',
  siteName:'芸店',
  appUrl:'http://www.baidu.com',
  title:"【芸店】",
  link:"http://weex.1xx.me/website/",
  desc:'超强图文小视频分享社区,中国版Facebook.',
  baseURL:"http://weex.1xx.me/",
  wxAppid:"wx92cd0f12d29b78b9",
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
                return null;
            }
        }
        return null;
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
  // 返回处理后的值 2017-01-01 00:00:00
  timefmt(value) {
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
    return date.getYear() + '-' + date.getMonth() + '  ' +date.getDay();
    },
    // 返回处理后的值 2017-01-01 00:00:00
    datetimefmt(value) {
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
        let t = date.getYear()+'-'+ m + '-' + d + '  ' + H + ':' + i ;
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
      alert(m);
      return {name:m,query:vars};
  }
};

export default utilsFunc;
