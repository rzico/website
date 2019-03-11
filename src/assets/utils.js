const config = {
  baseURL:"http://dev.rzico.com/"
}
let utilsFunc = {
    getConfig () {
       return config
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
           return "";
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
