export default {
    //纪录当前经度纬度
    [recordAddress](state, {
        latitude,
        longitude
    }) {
        state.latitude = latitude;
        state.longitude = longitude;
    }
}