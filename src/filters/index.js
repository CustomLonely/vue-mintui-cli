//全局过滤器
import Vue from 'vue';

import Config from '../config/Config'

//拼接图片服务器url
Vue.filter('url', (input, format = Config.imgUrl) => {
    return input = format + input;
})