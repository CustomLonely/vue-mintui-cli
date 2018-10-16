import 'babel-polyfill'

import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

import 'lib-flexible/flexible.js'


import moment from 'moment';
import 'moment/locale/zh-cn' //moment设置中文

import Vue from 'vue'

// 导入 vuex
import store from '@/store'


import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from '@/router'
const router = new VueRouter({
  //去掉地址中的哈希#
  mode: "history",
  routes,

})

// 导入 图片预览插件

import VuePreview from 'vue2-preview'
Vue.use(VuePreview)



import Config from '@/config/Config.js'

//导入全局过滤器

import '@/filters'

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
  Lazyload,
  TabContainer,
  TabContainerItem,
  Popup

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
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Popup.name, Popup);
//导入网络请求模块
import { post, get, patch, put } from '@/untils/http'

//导入存储方法

import {
  setStore,
  getStore,
  removeStore,
  setData,
  getData,
  removeData,
  isRouteData
} from '@/untils/untils'
//定义全局变量

const Api = {
  Config,
  post,
  get,
  patch,
  put,
  moment,
  setStore,
  getStore,
  removeStore,
  setData,
  getData,
  isRouteData,
  removeData
}

Vue.prototype.Api = Api

Vue.config.productionTip = true

/* eslint-disable no-new */

new Vue({
  router,
  store,
}).$mount('#app')