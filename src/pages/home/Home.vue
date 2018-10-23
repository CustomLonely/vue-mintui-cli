<template>
  <div class="homeinfo">
    <Header logo="true" :islogin="$store.getters.login"></Header>
    <mt-cell :title="addressInfo" class="addressinfo">
      <span class="weatherwrapper">{{weather}}℃ <Weather :qihou='tianqi'></Weather></span>
      <span slot="icon"> <i class="icon icon-ziyuandoctor_icon5"></i></span>
    </mt-cell>
    <mt-cell class="positoncity" title="当前定位城市" value="定位不准时，请在城市列表中选择"></mt-cell>
    <mt-cell class="defaultcity" :title="address" :to="{name:'city',params:{cityid:addressId,name:address}}" is-link>
    </mt-cell>
    <mt-cell title="热门城市"></mt-cell>
    <ul class="hotcity">
      <router-link :to="{name:'city',params:{cityid:item.id,name:item.name}}" tag="li" v-for="(item,index) in hotCity" :key="index" class="hotname">
        {{item.name}}
      </router-link>
    </ul>
    <mt-cell title="全部城市"></mt-cell>
    <div class="citywrapper">
      <mt-index-list>
        <mt-index-section v-for="(item,key) in sortCitys" :key="key" :index="key">
          <ul class="totalcity">
            <router-link :to="{name:'city',params:{cityid:v.id,name:v.name}}" tag="li" v-for="(v,i) in item" :key="i">{{v.name}}</router-link>
          </ul>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>
<script>
import { Header, Weather } from "@/components";
import moment from "moment";
import {
  getDefaultCity,
  getWeather,
  getAddressBygeohash,
  getHotCity,
  getTotalCity
} from "@/ports";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      addressInfo: "", //当前城市详细地址
      weather: "", //天气温度
      address: "", //当前城市
      addressId: "", //当前城市id
      hotCity: [], //热门城市
      totalCity: [], //全部城市
      fixBottom: "", //全部城市高度,
      tianqi: ""
    };
  },

  watch: {
    totalCityHeight() {
      const height = document
        .getElementsByClassName("citywrapper")[0]
        .getBoundingClientRect().height;
      this.fixBottom = this.sortCitys.length > 0 ? height + 30 : height;
    }
  },

  mounted() {
    //定位城市
    getDefaultCity
      .then(
        res => {
          this.addressId = res.id;
          return res;
        },
        err => {
          console.log(err);
        }
      )
      .then(res => {
        let position = `${res.latitude},${res.longitude}`;
        getAddressBygeohash(position).then(res => {
          this.addressInfo = res.name;
        });
        this.address = res.name;
        return res.name;
      })
      .then(res => {
        getWeather(res).then(res => {
          let wendu = res.data.data.wendu;
          let today = moment().format("dddd");
          if (today == "星期日") {
            today = "星期天";
          }

          let todayData = res.data.data.forecast.filter((item, index) => {
            return item.date.indexOf(today) != -1;
          });

          this.weather = wendu;

          if (todayData.length > 0) {
            this.tianqi = todayData[0].type;
          }
          console.log(this.tianqi);
        });
      });
    //热门城市
    getHotCity.then(
      res => {
        this.hotCity = res;
      },
      err => {
        console.log(err);
      }
    );

    //全部城市
    getTotalCity.then(res => {
      this.totalCity = res;
    });

    navigator.geolocation.getCurrentPosition(
      function(position) {
        // 定位成功会调用该方法
        // position.coords.latitude 纬度
        // position.coords.longitude 经度
        // position.coords.accuracy 精度
        // position.coords.altitude 海拔高度
        console.log(position.coords, 1);
      },
      function(error) {
        // 定位失败会调用该方法
        // error 是错误信息
      }
    );
  },

  computed: {
    sortCitys() {
      let sortObj = {};
      for (let i = 65; i <= 90; i++) {
        if (this.totalCity[String.fromCharCode(i)]) {
          sortObj[String.fromCharCode(i)] = this.totalCity[
            String.fromCharCode(i)
          ];
        }
      }
      return sortObj;
    }
  },

  components: {
    Header,
    Weather
  }
};
</script>
<style lang="less">
@import "../../style/basic.less";
@import "../../assets/images/iconfont/icon.css";
.addressinfo {
  background-color: extract(@blueColor, 8);
  margin-top: 38px;
  .mint-cell-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 40%;
    .mint-cell-text {
      color: extract(@whiteColor, 1);
      font-size: 20px;
    }
  }
  .mint-cell-value {
    span {
      color: extract(@whiteColor, 1);
      font-size: 18px;
    }
  }
}
.positoncity {
  .mint-cell-title {
    span {
      font-size: 16px;
      color: extract(@blackColor, 5);
    }
  }
  .mint-cell-value {
    span {
      font-size: 16px;
      color: extract(@blackColor, 5);
      font-weight: 600;
    }
  }
}
.defaultcity {
  border-top: 1px solid extract(@whiteColor, 4);
  border-bottom: 1px solid extract(@whiteColor, 4);
  .mint-cell-wrapper {
    .mint-cell-text {
      color: extract(@blueColor, 1);
    }
  }
}
.hotcity {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 20vw;
  min-height: 80px;
  li {
    width: 25%;
    text-align: center;
    border: 1px solid extract(@blackColor, 4);
    height: 40px;
    font-size: 17px;
    box-sizing: border-box;
    line-height: 40px;
    color: extract(@blackColor, 5);
    overflow: hidden;
    text-overflow: ellipsis; //文本溢出显示省略号
    white-space: nowrap; //文本不会换行（单行文本溢出）
    &.hotname {
      color: extract(@blueColor, 1);
    }
  }
}
.homeinfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  .citywrapper {
    flex: 1;
    .mint-indexlist {
      height: 100%;
      overflow-y: auto;
      .mint-indexlist-content {
        height: 27.9em !important;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
      }
    }
    .mint-indexlist-navlist {
      overflow-y: auto;
    }
    .totalcity {
      display: flex;
      flex-flow: row wrap;
      li {
        width: 25%;
        text-align: center;
        border: 1px solid extract(@blackColor, 4);
        height: 40px;
        line-height: 40px;
        font-size: 17px;
        color: extract(@blackColor, 5);
        overflow: hidden;
        text-overflow: ellipsis; //文本溢出显示省略号
        white-space: nowrap; //文本不会换行（单行文本溢出）
        &.hotname {
          color: extract(@blueColor, 1);
        }
      }
    }
  }
}
</style>


