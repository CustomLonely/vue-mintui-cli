/**
 * latitude 当前位置纬度
 * @param {*} state 
 */

import { getStore } from '@/untils/untils'
export const latitude = (state) => {
    return state.latitude;
}

/**
 * longitude 当前位置经度
 * @param {*} state 
 */

export const longitude = (state) => {
    return state.longitude
}

/**
 * sortname 食品分类名称
 * @param {*} state 
 */
export const sortname = (state) => {
    getStore('sortname')
    return state.sortname;
}

/**
 * cartList 加入购物车的商品列表
 * @param {*} state 
 */

export const cartList = (state) => {
    return state.cartList
}

/**
 * shopDetail 商家详情信息
 * @param {*} state 
 */


export const shopDetail = (state) => {
    return state.shopDetail
}

/**
 * userInfo 用户信息
 * @param {*} state 
 */

export const userInfo = (state) => {
    return state.userInfo
}

/**
 * shopid 商铺id
 * @param {*} state 
 */

export const shopid = (state) => {
    return state.shopid
}

/**
 * remarkText 可选备注内容
 * @param {*} state 
 */

export const remarkText = (state) => {
    return state.remarkText
}

/**
 * inputText 输入备注内容
 * @param {*} state 
 */

export const inputText = (state) => {
    return state.inputText
}

/**
 * invoice 开发票
 * @param {*} state 
 */

export const invoice = (state) => {
    return state.invoice
}

/**
 * newAddress 确认订单页新的地址
 * @param {*} state 
 */

export const newAddress = (state) => {
    return state.newAddress
}

/**
 * searchAddress 搜索并选择的地址
 * @param {*} state 
 */

export const searchAddress = (state) => {
    return state.searchAddress
}

/**
 * geohash 地址geohash值
 * @param {*} state 
 */

export const geohash = (state) => {
    return state.geohash
}

/**
 * choosedAddress 选择地址
 * @param {*} state 
 */

export const choosedAddress = (state) => {
    return state.choosedAddress
}

/**
 * addressIndex 选择地址的索引值
 * @param {*} state 
 */

export const addressIndex = (state) => {
    return state.addressIndex
}

/**
 * needValidation 确认订单时是否需要验证
 * @param {*} state 
 */

export const needValidation = (state) => {
    return state.needValidation
}


/**
 * cartId 购物车id
 * @param {*} state 
 */

export const cartId = (state) => {
    return state.cartId
}

/**
 * sig 购物车sig
 * @param {*} state 
 */

export const sig = (state) => {
    return state.sig
}

/**
 * orderParam 订单的参数
 * @param {*} state 
 */

export const orderParam = (state) => {
    return state.orderParam
}

/**
 * orderMessage 订单返回的信息
 * @param {*} state 
 */

export const orderMessage = (state) => {
    return state.orderMessage
}

/**
 * login 是否登录
 * @param {*} state 
 */

export const login = (state) => {
    return state.login
}

/**
 * imgPath 头像地址
 * @param {*} state 
 */

export const imgPath = (state) => {
    return state.imgPath
}
/**
 * removeAddress 移除地址
 * @param {*} state 
 */

export const removeAddress = (state) => {
    return state.removeAddress
}
/**
 * addAddress 新增地址
 * @param {*} state 
 */

export const addAddress = (state) => {
    return state.addAddress
}
/**
 * question 问题详情
 * @param {*} state 
 */

export const question = (state) => {
    return state.question
}
/**
 * cartPrice 会员卡价格
 * @param {*} state 
 */

export const cartPrice = (state) => {
    return state.cartPrice
}
