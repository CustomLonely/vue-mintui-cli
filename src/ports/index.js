//导入网络请求模块
import axios from 'axios';

import { post, get, Delete } from '../untils/http'

/***
 * http://wthrcdn.etouch.cn/weather_mini
 * 天气接口
 * @param {string} city 城市名称 city可通过城市中英文名称、ID、IP和经纬度进行查询，经纬度查询格式为：经度,纬度。
 * 例：city=北京，city=beijing，city=CN101010100，city= 60.194.130.1
 *  @param {string} key 用户认证key
 */

export const getWeather = (city) => axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + city, {


})
/**
 * 定位城市
 * 
 */
export const getDefaultCity = get('v1/cities', { type: "guess" });

/**
 * 热门城市
 * 
 */
export const getHotCity = get('v1/cities', { type: "hot" });

/**
 * 全部城市
 * 
 */

export const getTotalCity = get('v1/cities', { type: "group" });

/**
 * 获取当前城市信息
 * 
 */

export const getSelectCity = number => get("v1/cities/" + number);


/**
 * 搜索地址
 * 
 */

export const searchCity = (city_id, keyword, type = 'search') =>
    get("v1/pois", { city_id, keyword, type })


/**
 * 根据经纬度详细定位
 * 
 */

export const getAddressInfo = (string) => get('v2/pois/' + string);

/**
 * 食品分类列表
 * @param {string}  geohash 经纬度
 */
export const getFoodEntry = (geohash) => get('v2/index_entry', {
    geohash,
    group_type: '1',
    'flags[]': 'F'
});

/***
 * 
 * 获取商铺列表
 * @param {string} latitude 纬度
 * @param {string} longitude 经度
 * @param {number} offset 跳过多少条数据，默认0
 * @param {number} limit 请求数据的数量，默认20
 * @param {number} restaurant_category_id 餐馆分类id
 * @param {number} order_by 排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高
 * @param {array} delivery_mode 配送方式id
 * @param {array} support_ids 餐馆支持特权的id
 * @param {array} restaurant_category_ids 餐馆分类id
 */

export const restaurants =
    (latitude, longitude, offset = 0, limit = 20,
        restaurant_category_id, order_by = 4, delivery_mode,
        support_ids, restaurant_category_ids) =>
        get('shopping/restaurants', {
            latitude,
            longitude,
            offset,
            limit,
            restaurant_category_id,
            order_by,
            delivery_mode,
            support_ids,
            restaurant_category_ids
        })

/**
 * 搜索餐馆
 * @param {string}  geohash 经纬度
 * @param {string}  keyword 关键词
 * 
 */

export const searchDiner = (geohash, keyword) => get('v4/restaurants', {
    geohash,
    keyword
})

/***
 * 获取所有商铺分类列表
 * 
 * @param {string}  latitude 纬度
 * @param {string}  longitude 经度
 * 
 */

export const getAllShops = (latitude, longitude) => get('shopping/v2/restaurant/category', {
    latitude,
    longitude
})

/***
 * 获取配送方式
 * 
 * @param {string}  latitude 纬度
 * @param {string}  longitude 经度
 */
export const getDelivery = (latitude, longitude) => get('shopping/v1/restaurants/delivery_modes', {
    latitude,
    longitude
})

/***
 * 商家属性活动列表
 * 
 * @param {string}  latitude 纬度
 * @param {string}  longitude 经度
 */


export const foodActivity = (latitude, longitude) => get('shopping/v1/restaurants/activity_attributes', {
    latitude,
    longitude
})

/***
 * 餐馆详情
 * @param {number}  shopid 餐馆id
 */

export const shopDetails = shopid => get('shopping/restaurant/' + shopid)

/***
 * 上传图片
 * @param {string }  type 图片类型
 */
export const uploadImg = type => post('v1/addimg/' + type)

/***
 * 添加餐馆
 * @param {string }  name                             餐馆名称   
 * @param {string }  address                          餐馆地址   
 * @param {string }  phone                            联系电话   
 * @param {string }  latitude                             纬度   
 * @param {string }  longitude                            经度   
 * @param {string }  category                         食品分类
 * @param {string }  image_path                    店铺图片地址
 * @param {string }  float_delivery_fee                   运费
 * @param {string }  float_minimum_order_amount          起送价
 * @param {string }  description                       餐馆介绍
 * @param {string }  promotion_info                    店铺标语
 * @param {boolean}  is_premium                品牌商铺默认false
 * @param {boolean}  new                     新开店铺，默认false
 * @param {boolean}  bao                     支持保险，默认false 
 * @param {boolean}  delivery_mode          支持蜂鸟专送默认false
 * @param {boolean}  zhun                       准时达，默认false
 * @param {boolean}  piao                       开发票，默认false
 * @param {string}   startTime                       开始营业时间
 * @param {string}   endTime                         停止营业时间
 * @param {string}   business_license_image       营业执照图片地址
 * @param {string}   catering_service_license_image 餐饮服务许可证图片地址
 * @param {string}   activities                      商铺活动：
 * 示例：[{icon_name:'新', name:'新用户立减', description: ''}]
 * 
 */

export const addShop = (name, address, phone,
    latitude, longitude, category, image_path, float_delivery_fee,
    float_minimum_order_amount, description, promotion_info,
    is_premium = false, bao = false, delivery_mode = false,
    zhun = false, piao = false, startTime, endTime,
    business_license_image, catering_service_license_image,
    activities) => {
    let data = {
        name, address, phone,
        latitude, longitude, category, image_path, float_delivery_fee,
        float_minimum_order_amount, description, promotion_info,
        is_premium, bao, delivery_mode,
        zhun, piao, startTime, endTime,
        business_license_image, catering_service_license_image,
        activities,
    }
    return post('shopping/addshop', data);
}

/***
 * 添加食品种类
 * @param {string}   name                       种类
 * @param {string}   description                描述
 * @param {string}   restaurant_id             餐馆id
 */

export const addCategory = (name, description, restaurant_id) =>
    post('shopping/addcategory', {
        name,
        description,
        restaurant_id
    })

/***
 * 添加食品
 * @param {number}   restaurant_id              餐馆ID
 * @param {number}   category_id                分类ID
 * @param {string}   name                       食品名称
 * @param {string}   image_path                 图片地址
 * @param {string}   description                描述
 * @param {array}    specs                      规格：
 * [{specs: '默认',packing_fee: 0,price: 20,}]
 * @param {string}   activity                   活动
 * @param {array}   attributes                  特点：
 * [{value: '新',label: '新品'}]
 */

export const addFood = (restaurant_id, category_id, name, image_path,
    description, specs, activity, attributes) => post('shopping/addfood', {
        restaurant_id,
        category_id,
        name,
        image_path,
        description,
        specs,
        activity,
        attributes
    })

/***
 * 获取食品列表
 * @param {number}   restaurant_id              餐馆ID
 */

export const foodMenu = restaurant_id => get('shopping/v2/menu', {
    restaurant_id
})

/***
 * 获取评价信息
 * @param {number}   restaurant_id              餐馆ID
 * @param {string}   tag_name                   评价类型，默认全部
 * @param {number}   offset                     跳过数据条数
 * @param {number}   limit                      单次获取数据条数
 */

export const getAssess = (restaurant_id, tag_name, offset, limit) =>
    get(`ugc/v2/restaurants/${restaurant_id}/ratings`, {
        tag_name,
        offset,
        limit
    })

/***
 * 获取评价分数
 * @param {number}   restaurant_id              餐馆ID
 */

export const assessScore = restaurant_id =>
    get(`ugc/v2/restaurants/${restaurant_id}/ratings/scores`)

/***
 * 获取评价分类
 * @param {number}   restaurant_id              餐馆ID
 */

export const assessSort = restaurant_id =>
    get(`ugc/v2/restaurants/${restaurant_id}/ratings/tags`);

/***
 * 加入购物车
 * @param {number}   restaurant_id              餐馆ID
 * @param {string}   geohash                    经纬度
 * @param {array}    entities                   购物车数据
 * [{attrs:[],extra:{},id:食品id,name:食品名称,
 * packing_fee:打包费,price:价格,quantity:数量,sku_id:规格id,
 * specs:规格,stock:存量,}]
 */

export const addShopCart = (restaurant_id, geohash, entities) =>
    post('v1/carts/checkout', {
        restaurant_id,
        geohash,
        entities
    })

/***
 * 获取备注信息
 * @param {number}   cart_id                    购物车id
 */

export const getRemarks = cart_id => get(`v1/carts/${cart_id}/remarks`)

/***
 * 获取收货地址列表
 * @param {number}   user_id                    用户id
 */

export const getAddress = user_id => get(`v1/users/${user_id}/addresses`)


/**
 * 获取验证码 
 * 
 */

export const postCaptchas = post('v1/captchas');

/***
 * 获取用户信息
 * 
 */

export const getUserInfo = get('v1/user');

/***
 * 登录
 * @param {string}   username                    用户名
 * @param {string}   password                    密码
 * @param {string}   captcha_code                验证码
 */

export const login = (username, password, captcha_code) =>
    post('v2/login', {
        username,
        password,
        captcha_code
    })

/***
 * 退出
 * 
 */

export const signOut = get('v2/signout');

/***
 * 修改密码
 * @param {string}   username                    用户名
 * @param {string}   oldpassWord                 旧密码
 * @param {string}   newpassword                 新密码
 * @param {string}   confirmpassword             确认密码
 * @param {string}   captcha_code                验证码
 */

export const changePassword = (username,
    oldpassWord, newpassword, confirmpassword, captcha_code) =>
    post('v2/changepassword', {
        username,
        oldpassWord,
        newpassword,
        confirmpassword,
        captcha_code
    })

/***
 * 增加收货地址
 * @param {number}   user_id            用户id
 * @param {string}   address            地址
 * @param {string}   address_detail     地址详情
 * @param {string}   geohash            经纬度
 * @param {string}   name               收货人姓名
 * @param {string}   phone              电话号码
 * @param {string}   tag                标签
 * @param {number}   sex                性别， 1:男，2:女
 * @param {number}   poi_type           类型，默认：0
 * @param {string}   phone_bk           备注电话
 * @param {number}   tag_type           标签类型，2:家，3:学校，4:公司
 */

export const insertAddress = (user_id, address, address_detail,
    geohash, name, phone, tag, sex, poi_type, phone_bk = 0,
    tag_type) => post(`v1/users/${user_id}/addresses`, {
        address,
        address_detail,
        geohash,
        name,
        phone,
        tag, sex,
        poi_type,
        phone_bk,
        tag_type
    })

/***
 * 删除收货地址
 * @param {number}   user_id            用户id
 * @param {number}   address_id         收货地址id
 */

export const delAddress = () =>
    Delete(`v1/users/${user_id}/addresses/${address_id}`);

/***
 * 下单
 * @param {number}   user_id            用户id
 * @param {number}   cart_id            购物车ID
 * @param {number}   address_id          收货地址ID
 * @param {string}   geohash            经纬度
 * @param {number}   restaurant_id       餐馆ID
 * @param {string}   description        备注
 * @param {array}   entities            购物车数据
 * [{attrs:[],extra:{},id:食品id,name:食品名称,
 * packing_fee:打包费,price:价格,quantity:数量,
 * sku_id:规格id,specs:规格,stock:存量,}] 
 * 
 */

export const addOrder = (user_id, cart_id, address_id,
    geohash, restaurant_id, description, entities) =>
    post(`v1/users/${user_id}/carts/${cart_id}/orders`, {
        address_id,
        geohash,
        restaurant_id,
        description,
        entities
    })

/***
 * 订单列表
 * @param {number}   user_id            用户id
 * @param {number}   limit             获取数据数量
 * @param {number}   offset           跳过数据条数
 */

export const orderList = (user_id, limit, offset) =>
    get(`bos/v2/users/${user_id}/orders`, {
        limit,
        offset
    })

/***
 * 订单详情
 * @param {number}   user_id            用户id
 * @param {number}   order_id           订单id
 */

export const orderInfo = (user_id, order_id) =>
    get(`bos/v1/users/${user_id}/orders/${order_id}/snapshot`)

/***
 * 服务中心
 * 
 */

export const serviceCenter = () => get('v3/profile/explain');

/***
 * 可用红包
 * @param {number}   user_id            用户id
 * @param {number}   limit             获取数据数量
 * @param {number}   offset           跳过数据条数
 */

export const hongbaos = (user_id, limit, offset) =>
    get(`promotion/v2/users/${user_id}/hongbaos`, {
        limit,
        offset
    })

/***
 * 过期红包
 * @param {number}   user_id            用户id
 * @param {number}   limit             获取数据数量
 * @param {number}   offset           跳过数据条数
 */

export const expired_hongbaos = (user_id, limit, offset) =>
    get(`promotion/v2/users/${user_id}/expired_hongbaos`, {
        limit,
        offset
    })

/***
 * 兑换红包
 * @param {number}   user_id            用户id
 * @param {number}   exchange_code      兑换码
 * @param {number}   captcha_code       验证码
 */

export const exchange_hongbao = (user_id, exchange_code,
    captcha_code) => post(`v1/users/${user_id}/hongbao/exchange`, {
        exchange_code,
        captcha_code
    })

/***
 * 管理员登录
 * @param {string}   user_name     用户名
 * @param {string}   password      密码
 */

export const adminLogin = (user_name, password) => post('admin/login', {
    user_name,
    password
})

/***
 * 管理员退出登录
 * 
 */

export const adminSignOut = () => get('admin/singout')

/***
 * 管理员信息
 * 
 */

export const adminInfo = () => get('admin/info')