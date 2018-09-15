<template>
    <div>
        <Header :addressinfo="addressInfo" cityaddress="true"></Header>
        <mt-cell :title="addressInfo" class="addressinfo">
            <span>{{weather}}℃
                            <img slot="icon" src="../../assets/images/24280.jpg" width="24" height="24">
                        </span>
            <img slot="icon" src="../../assets/images/24213.jpg" width="24" height="24">
        </mt-cell>
        <mt-cell class="positoncity" title="当前定位城市" value="定位不准时，请在城市列表中选择"></mt-cell>
        <mt-cell class="defaultcity" :title="address"  :to="{path:'/city/'+addressId,query:{name:address}}" is-link>
           
        </mt-cell>
          <mt-cell title="热门城市"></mt-cell>
        <ul class="hotcity" >
            <router-link :to="{path:'/city/'+item.id,query:{name:item.name}}"
             tag="li" v-for="(item,index) in hotCity" :key="index" class="hotname">
             {{item.name}}
             </router-link>
        </ul>
         <mt-cell title="全部城市"></mt-cell>
         <div class="citywrapper" style="{height:fixBottom+'px'}">
            <mt-index-list >
            <mt-index-section  v-for="(item,key) in sortCitys" :key="key" :index="key">
              
             <ul class="hotcity" >
            <router-link :to="{path:'/city/'+v.id,query:{name:v.name}}" tag="li" v-for="(v,i) in item" :key="i">{{v.name}}</router-link>
           </ul>
            </mt-index-section>

          </mt-index-list>
         </div>
        
    
    </div>
</template>
<script>
import { Header } from "@/components";
import {
  getDefaultCity,
  getWeather,
  getAddressInfo,
  getHotCity,
  getTotalCity
} from "@/ports";
export default {
  data() {
    return {
      addressInfo: "", //当前城市详细地址
      weather: "", //天气温度
      address: "", //当前城市
      addressId: "", //当前城市id
      hotCity: [], //热门城市
      totalCity: [], //全部城市
      fixBottom: "" //全部城市高度
    };
  },
  watch: {
    totalCityHeight() {
      const height = document
        .getElementsByClassName("citywrapper")[0]
        .getBoundingClientRect().height;
      this.fixBottom = this.sortCitys.length > 0 ? height : 0;
      console.log(this.fixBottom);
    }
  },
  mounted() {
    //定位城市
    getDefaultCity
      .then(
        res => {
          console.log(res);
          this.addressId = res.id;
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
    //热门城市
    getHotCity.then(
      res => {
        this.hotCity = res;
        console.log(this.hotCity);
      },
      err => {
        console.log(err);
      }
    );
    //全部城市
    getTotalCity.then(res => {
      this.totalCity = res;
      console.log(this.totalCity);
    });
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
  methods: {},
  components: {
    Header
  }
};
</script>
<style lang="less">
@import "../../style/basic.less";
.addressinfo {
  background-color: extract(@blueColor, 8);
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
      color: #fff;
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
  li {
    width: 25%;
    text-align: center;
    border: 1px solid extract(@blackColor, 4);
    height: 30px;
    font-size: 17px;
    line-height: 30px;
    color: extract(@blackColor, 5);
    overflow: hidden;
    text-overflow: ellipsis; //文本溢出显示省略号
    white-space: nowrap; //文本不会换行（单行文本溢出）
    &.hotname {
      color: extract(@blueColor, 1);
    }
  }
}
.mint-indexlist-content {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
</style>


