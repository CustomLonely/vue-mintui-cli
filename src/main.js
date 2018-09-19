// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Es6Promise from 'es6-promise'
import 'lib-flexible/flexible.js'
Es6Promise.polyfill()

import Vue from 'vue'

// 导入 vuex
import store from '@/store'

import App from './App'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from '@/router'
const router = new VueRouter({
  routes,

})

import Config from '@/config/Config.js'


import {
  Header,
  Button,
  Field,
  Switch,
  Tabbar,
  TabItem,
  Cell,
  IndexList,
  IndexSection,
  Search,
  Swipe,
  SwipeItem,
  Loadmore,
  Lazyload
} from 'mint-ui';


Vue.component(Loadmore.name, Loadmore);
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
Vue.component(Switch.name, Switch)
Vue.component(Cell.name, Cell);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Search.name, Search);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Lazyload);
//导入网络请求模块
import { post, get, patch, put } from '@/untils/http'


//定义全局变量

Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;


window.Api = {
  Config,
  post,
  get,
  patch,
  put
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
  router,
  store,
}).$mount('#app')