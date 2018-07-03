const config = {
  logo:'./static/mopian.png',
  siteName:'魔篇',
  appUrl:'http://a.app.qq.com/o/simple.jsp?pkgname=com.yixiang.mopian&fromcase=40003',
  title:"魔篇",
  link:"https://mopian.1xx.me",
  // link:"https://dev.1xx.me",··
  thumbnail:'./static/mopian.png',
  desc:'超强图文小视频分享社区,中国版Facebook.',
  baseURL:"https://mopian.1xx.me/",
  // baseURL:"https://dev.1xx.me/",
  // wxAppid:"wx88a1ec3b5c3bc9c3"
  　　  　　//mp app id
  wxAppid:"wx28aae2ea21682949"
}
//伪链接主体。  mopian  或 yundian
const dummyHost = 'mopian';

let utilsFunc = {
    //跳转的伪链接路径
    setDummyUrl(page,id){
      return dummyHost + '://'+ page +'?id=' + id;
    },
    getConfig () {
      //5.26 kzj 区分ios跟安卓系统，以此来兼容ios的旧版本。
      // if(this.isIos()){
      //   config.link = "http://mopian.1xx.me";
      //   config.baseURL = "http://mopian.1xx.e/";
      // }
      return config
    },
    setConfig (conf) {
      //把http转成https
      if(conf.link.indexOf('https') == -1){
        // conf.link = conf.link.substring(0,conf.link.indexOf('p:')) + 'ps:' + conf.link.substring(conf.link.indexOf('p:') + 2);
        conf.link = conf.link.replace(/http:/,"https:")
      }

      config.title =conf.title;
      config.link =conf.link;
      config.thumbnail =conf.thumbnail;
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
        }else{
          //当url里有2个 ？时的参数获取
          if(this.isNull(url.split('?')[2])){
            return ""
          }
          let r2 = url.split('?')[2].match(reg);
          if (r2 != null) {
            try {
              //这边会返回r2[2]的原因是因为 会match出一个数组，数组里第3个为我们需要的参数值;
              return decodeURIComponent(r2[2]);
            } catch (_e) {
              return "";
            }
          }
          return "";
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
    //把缩略图过滤为原图
    filterThumbnail(url){
      if(url.indexOf('?x-oss-') != -1){
        url = url.substring(0,url.indexOf('?x-oss-'));
      }
      return url;
    },
    thumbnail(url,w,h) {
        if(this.isNull(url)){
           return ;
        }
        h = Math.round(h);
        w = Math.round(w);
        if (url.substring(0,11) == "http://cdnx") {
            return url+"?x-oss-process=image/resize,m_fill,w_"+w+",h_"+h+"/quality,q_90";
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
        w = Math.round(w);
        if (url.substring(0,11) == "http://cdnx") {
           return url+"?x-oss-process=image/resize,w_"+w+"/quality,q_90";
        } else
        if (url.substring(0,10) == "http://cdn") {
           return url+"@"+w+"w_1e_1c_100Q";
        } else {
           return url;
        }
    },
  //时间格式化 返回 09-30 03:07周日 2017-09-30 03:07周日
  dateweektimefmt:function (value) {
  let res = this.resolvetimefmt(value);
  let tds = this.resolvetimefmt(Math.round(new Date().getTime()));
// 返回处理后的值
  var    date = new Date(value);
  var    d2 = Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),date.getUTCHours(),date.getUTCMinutes(),date.getUTCSeconds());
  date = new Date(d2+28800000);
  var    day = date.getUTCDay();
  switch(day){
    case 0:
      day = "周日";
      break;
    case 1:
      day = "周一";
      break;
    case 2:
      day = "周二";
      break;
    case 3:
      day = "周三";
      break;
    case 4:
      day = "周四";
      break;
    case 5:
      day = "周五";
      break;
    case 6:
      day = "周六";
      break;
  }


  //如果是今年 就不返回年份
  if(res.y == tds.y){
    return res.m + '-' + res.d + '  ' + res.h + ':' + res.i + day;
  }else{
    return  res.y + '-' + res.m + '-' + res.d + '  ' + res.h + ':' + res.i + day;
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


  // /*
    // 返回处理后的值 2017-01-01 00:00:00
    datetimehms(value) {
      if(value == '' || value == null || value == undefined){
        return value;
      }
      let timeObj = this.resolvetimefmt(value);
      return timeObj.y +'-'+ timeObj.m + '-' + timeObj.d + '  ' + timeObj.h + ':' + timeObj.i + ':' + timeObj.s ;
  },
  // /*
  // 返回处理后的值 2017/01/01 或者 2017.01.01
  datetimeslash(value,interval) {
    if(value == '' || value == null || value == undefined){
      return value;
    }
    let timeObj = this.resolvetimefmt(value);
    if(interval){
      return timeObj.y +'.'+ timeObj.m + '.' + timeObj.d;
    }

    return timeObj.y +'/'+ timeObj.m + '/' + timeObj.d;
  },
  // 返回处理后的值 2017年01月01日 00:00
  datedayhms(value) {
    if(value == '' || value == null || value == undefined){
      return value;
    }
    let timeObj = this.resolvetimefmt(value);
    return timeObj.y +'年'+ timeObj.m + '月' + timeObj.d + '日' + '  ' + timeObj.h + ':' + timeObj.i + ':' + timeObj.s ;
  },
  // * */


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
    //  过滤掉因为分享微信出去而增加的'？from=singlemessage'字段
    if(url.indexOf('/#/') == -1){
      url = url.substring(0,url.indexOf('?')) + url.substring(url.indexOf('#/'));
    }
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
    let m = surl.slice(surl.indexOf('#')+2,len);
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
  },
  //判断是否是ios系统
  isIos(){
    var u = navigator.userAgent;
    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // alert('是否是Android：'+isAndroid);
    return isiOS;
  }
};

export default utilsFunc;
