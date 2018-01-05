import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import utils from '../assets/utils.js';
import wx from 'weixin-js-sdk';

Vue.use(Router);
Vue.use(VueResource);


//检查静默授权
export function AUTH(redirectURL,func) {
  var _this = this;
  var scope = "base";
  if (utils.isNull(redirectURL)) {
      scope = "user"
  }
  GET("/website/login/isAuthenticated.jhtml?scope="+scope).then(
    function (data) {
      if (data.type == "success") {
        var logined = false;
        if (data.data.loginStatus && utils.isNull(redirectURL)) {
            logined = true;
        } else
        if (data.data.loginStatus && !utils.isNull(redirectURL) && data.data.authed) {
            logined = true;
        }
        if (logined) {
            func(true);
        }
        else {
          if (utils.isweixin()) {
            if (utils.isNull(redirectURL)) {
              scope = "snsapi_base";
              redirectURL = location.href;
            } else {
              scope = "snsapi_userinfo";
            }
            let state = b64safe(redirectURL);
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + utils.getConfig().wxAppid + "&redirect_uri=" + encodeURIComponent(utils.getConfig().baseURL+"website/login/weixin.jhtml?redirectURL="+state+"&xuid="+utils.getUrlParameter("xuid")) + "&response_type=code&scope="+scope+"&state=state#wechat_redirect";
          } else
          if (utils.isalipay()) {
            if (utils.isNull(redirectURL)) {
              scope = "auth_base";
              redirectURL = location.href;
            } else {
              scope = "auth_user";
            }
            let state = b64safe(redirectURL);
            location.href = "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=" + utils.getConfig().alAppid + "&redirect_uri=" + encodeURIComponent(utils.getConfig().baseURL+"website/login/alipay.jhtml?redirectURL="+state+"&xuid="+utils.getUrlParameter("xuid")) + "&scope="+scope+"&state=state";
          } else {
          }
        }
        func(false);
      }
    },
    function (err) {
      func(false);
    }
  )
}

//检查静默授权
export function SHARE(url) {
  var _this = this;
  if (utils.isweixin()) {
    POST("weixin/get_config.jhtml?url="+encodeURIComponent(url.split('#')[0])).then(
      function (data) {
        if (data.type=="success") {
          wx.config({
            debug: false,
            appId: data.data.appId, // 和获取Ticket的必须一样------必填，公众号的唯一标识
            timestamp:data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
            signature: data.data.signature,// 必填，签名，见附录1
            //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
            jsApiList: [
              'onMenuShareAppMessage','onMenuShareTimeline',
              'onMenuShareQQ','onMenuShareQZone','scanQRCode',
              'chooseWXPay'
            ]
          });

          wx.error(function (res) {
          });

          //处理验证成功的信息
          wx.ready(function () {
            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: utils.getConfig().title, // 分享标题
              link:  utils.getConfig().link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: utils.getConfig().thumbnail, // 分享图标
              success: function (res) {
              },
              cancel: function (res) {
              }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: utils.getConfig().title, // 分享标题
              desc: utils.getConfig().desc, // 分享描述
              link: utils.getConfig().link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: utils.getConfig().thumbnail, // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function (res) {
              },
              cancel: function (res) {
              }
            });
            //分享到QQ
            wx.onMenuShareQQ({
              title: utils.getConfig().title, // 分享标题
              desc: utils.getConfig().desc, // 分享描述
              link: utils.getConfig().link, // 分享链接
              imgUrl: utils.getConfig().thumbnail, // 分享图标
              success: function (res) {
              },
              cancel: function (res) {
              }
            });

            //分享到QQ空间
            wx.onMenuShareQZone({
              title: utils.getConfig().title, // 分享标题
              desc: utils.getConfig().desc, // 分享描述
              link: utils.getConfig().link, // 分享链接
              imgUrl: utils.getConfig().thumbnail, // 分享图标
              success: function (res) {
              },
              cancel: function (res) {
              }
            });
          });
        }
      },
      function (err) {
      }
    )
  }
}
export function POST (path,body) {
  return new Promise((resolve, reject) => {
      Vue.http.post(utils.getConfig().baseURL+path,body).then(
          function (response) {
            if (response.status == 200) {
              resolve(response.data)
            }
            else {
              reject({
                type:"error",
                content:"网络不稳定"
              })
            }
          },() => {
           reject({
             type:"error",
             content:"网络不稳定"
           })
  })
    })
}

export function GET (path) {
  return new Promise((resolve, reject) => {
      Vue.http.get(utils.getConfig().baseURL+path).then(
      function (response) {
        if (response.status == 200) {
          resolve(response.data)
        }
        else {
          reject({
            type:"error",
            content:"网络不稳定"
          })
        }
      },() => {
           reject({
             type:"error",
             content:"网络不稳定"
           })
  })
  })
}
