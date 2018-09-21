<template>
    <div class="homeinfo">
         <Header logo="true" :login="$store.state.isload==false" :user="$store.state.isload==true"></Header>
        <mt-cell :title="addressInfo" class="addressinfo">
           
            <span>{{weather}}℃</span>
           <span slot="icon" > <i class="icon icon-ziyuandoctor_icon5"></i></span>
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
         <div class="citywrapper" >
            <mt-index-list >
            <mt-index-section  v-for="(item,key) in sortCitys" :key="key" :index="key">
              
             <ul class="totalcity" >
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
  getAddressBygeohash,
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

      this.fixBottom = this.sortCitys.length > 0 ? height + 30 : height;
    }
  },
  mounted() {
    console.log(this.fixBottom);
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
          console.log(res);
          this.weather = wendu;
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
@import "../../assets/images/icon.css";
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
.mint-indexlist-content {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
</style>


