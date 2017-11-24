import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import utils from '../assets/utils.js';
Vue.use(Router);
Vue.use(VueResource);


//检查静默授权
export function AUTH(redirectURL,func) {
  var _this = this;
  var scope = "";
  GET("/website/login/isAuthenticated.jhtml").then(
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
            var uxid = utils.getUrlParameter("uxid");
            if (uxid==null) {
              uxid = "";
            }
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + utils.getConfig().wxAppid + "&redirect_uri=" + encodeURIComponent(utils.getConfig().baseURL+"website/login/weixin.jhtml?uxid="+uxid) + "&response_type=code&scope="+scope+"&state="+b64safe(redirectURL)+"#wechat_redirect";
          } else
          if (utils.isalipay()) {
            if (utils.isNull(redirectURL)) {
              scope = "auth_base";
              redirectURL = location.href;
            } else {
              scope = "auth_user";
            }
            var uxid = utils.getUrlParameter("uxid");
            if (uxid==null) {
              uxid = "";
            }
            location.href = "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=" + utils.getConfig().alAppid + "&redirect_uri=" + encodeURIComponent(utils.getConfig().baseURL+"website/login/alipay.jhtml?uxid="+uxid) + "&scope="+scope+"&state="+b64safe(redirectURL)+"";
          } else {
            Vue.$router.push({name:"login",query:{redirectURL:location.href}});
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
          },() => {})
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
      },() => {})
  })
}
