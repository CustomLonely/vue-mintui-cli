// 程序版本
const bundleVersion = '20180609';

// 环境设定 本地开发、正式环境
let environment = 'local';

// 数据接口
// http://192.168.1.2:8089/index.php/v1/
const apiUrl = {
<<<<<<< HEAD
  local: '//elm.cangdu.org',
=======
  local: 'http://apidemo.shruanping.com',
>>>>>>> f3bf9c5cb26d9f378ff5c3205bdeda7aad488254
  online: 'http://192.168.1.56',
};

const hd = 'px';

const Config = {
  bundleVersion,
  environment,
  url: apiUrl[environment],
  hd,
};

module.exports = Config;
