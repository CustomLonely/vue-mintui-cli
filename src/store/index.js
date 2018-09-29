// 1 导入vue
import Vue from 'vue'

// 导入 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  latitude: '',// 纬度
  longitude: '',// 经度
  cartList: {},//加入购物车的商品列表
  shopDetail: null,//商家详情信息
  userInfo: null,//用户详情
  isload: false,
  search: true

}

const store = new Vuex.Store({
  // 数据：

  state,

  mutations: {

  },

  getters: {

  },

})

export default store
