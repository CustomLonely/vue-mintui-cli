
// 程序版本
const bundleVersion = '20180609';
/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */


// 数据接口
// http://192.168.1.2:8089/index.php/v1/
let apiUrl = {

  imgBaseUrl: '',
  baseUrl: ''
};

const hd = 'px';

let routerMode = 'hash';



if (process.env.NODE_ENV == 'development') {
  apiUrl['imgBaseUrl'] = '//elm.cangdu.org/img/';
  apiUrl['baseUrl'] = '//elm.cangdu.org:8001';

} else if (process.env.NODE_ENV == 'production') {
  apiUrl['baseUrl'] = '//elm.cangdu.org:8001';
  apiUrl['imgBaseUrl'] = '//elm.cangdu.org/img/';
}

const Config = {
  bundleVersion,

  url: apiUrl['baseUrl'],
  hd,
  imgBaseUrl: apiUrl['imgBaseUrl'],
  navimgUrl: 'https://fuss10.elemecdn.com',
  routerMode
};

module.exports = Config;
