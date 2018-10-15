
import * as type from './mutation-types';
import { setStore } from '@/untils/untils'
export default {
    //纪录当前经度纬度
    [type.RECORD_ADDRESS](state, {
        latitude,
        longitude
    }) {
        state.latitude = latitude;
        state.longitude = longitude;
    },

    //纪录商家详情信息
    [type.RECORD_SHOPDETAIL](state, detail) {
        state.detail = detail;
    },

    //记录用户信息

    [type.RECORD_USERINFO](state, info) {
        state.userinfo = info;
        state.login = true;
        Api.setStore('user_id', info.user_id);
    },

    //获取用户信息存入vuex
    [type.GET_USERINFO](state, info) {
        if (state.userinfo && (state.userinfo.username != info.username)) {
            return;
        }

        if (!state.login) {
            return;
        }

        if (!info.message) {
            state.userinfo = { ...info };
        } else {
            state.userinfo = null;
        }

    },

    //修改用户名
    [type.RETSET_NAME](state, username) {
        state.userinfo = Object.assign(state.userinfo, { username });
    },

    //保存geohash
    [type.SAVE_GEOHASH](state, geohash) {
        state.geohash = geohash;
    }

}