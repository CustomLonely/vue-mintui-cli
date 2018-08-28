// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Es6Promise from 'es6-promise'
import 'lib-flexible/flexible.js'
Es6Promise.polyfill()

import Vue from 'vue'

// 导入 vuex
import store from './store'

import App from './App'

import router from './router'

import Config from './config/Config.js'

import { Header, Button, Field, Switch } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
Vue.component(Switch.name, Switch)

import '../static/base.css'
//导入网络请求模块
import { post, get, patch, put } from './untils/http'


//定义全局变量

Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

window.App = {
  Config
}

//使用实例:
// this.$get('/api/v2/movie/top250')
// .then(res => {
//   console.log(res)
// },
//     err=>{
//    console.log(err)
//     }
// )
Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
