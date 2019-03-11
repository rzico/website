import Vue from 'vue';
import VueResource from 'vue-resource';
import utils from '../assets/utils.js';
Vue.use(VueResource);
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
