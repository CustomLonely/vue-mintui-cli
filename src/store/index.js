// 1 导入vue
import Vue from 'vue'

// 导入 vuex
import Vuex from 'vuex'


import state from './state';

import mutations from './mutations';

import * as getters from './getters';

import actions from './actions';

import createLogger from 'vuex/dist/logger'; // 修改日志

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'; // 开发环境中为true，否则为false

const store = new Vuex.Store({
  // 数据：

  state,

  mutations,
  getters,
  actions,
  plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改

})

export default store
