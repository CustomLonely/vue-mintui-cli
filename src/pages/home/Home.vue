<template>
    <div>
        <mt-cell :title="addressInfo" class="addressinfo">
            <span>{{weather}}℃
                            <img slot="icon" src="../../assets/images/24280.jpg" width="24" height="24">
                        </span>
            <img slot="icon" src="../../assets/images/24213.jpg" width="24" height="24">
        </mt-cell>
        <mt-cell class="positoncity" title="当前定位城市" value="定位不准时，请在城市列表中选择"></mt-cell>
        <mt-cell class="defaultcity" :title="address">
            <img src="../../assets/images/arrowright.svg" width="16" height="16">
        </mt-cell>
        <ul class="hotcity" >
            <!-- <li v-for="item in hotCity">{{item}}</li> -->
        </ul>
    </div>
</template>
<script>
import { Header } from "../../components";
import { getDefaultCity, getWeather, getAddressInfo } from "../../ports";
export default {
  data() {
    return {
      addressInfo: "",
      weather: "",
      address: "",
      hotCity: []
    };
  },
  created() {
    this.getLocationCity();
  },
  methods: {
    getLocationCity() {
      getDefaultCity
        .then(
          res => {
            return res;
          },
          err => {
            console.log(err);
          }
        )
        .then(res => {
          let position = `${res.latitude},${res.longitude}`;
          getAddressInfo(position).then(res => {
            this.addressInfo = res.name;
            console.log(res);
          });
          this.address = res.name;
          return res.name;
        })
        .then(res => {
          getWeather(res).then(res => {
            let wendu = res.data.data.wendu;
            this.weather = wendu;
          });
        });
    }
  }
};
</script>
<style lang="less">
@import "../../style/basic.less";
.addressinfo {
  background-color: #3190e8;
  .mint-cell-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 40%;
    .mint-cell-text {
      color: extract(@whiteColor, 1);
      font-size: 17px;
    }
  }
  .mint-cell-value {
    span {
      color: #fff;
      font-size: 17px;
    }
  }
}
.positoncity {
  .mint-cell-title {
    span {
      font-size: 12px;
      color: extract(@blackColor, 5);
    }
  }
  .mint-cell-value {
    span {
      font-size: 12px;
      color: extract(@blackColor, 5);
      font-weight: 600;
    }
  }
}
.defaultcity {
  border-top: 1px solid extract(@whiteColor, 4);
  border-bottom: 1px solid extract(@whiteColor, 4);
}
</style>


