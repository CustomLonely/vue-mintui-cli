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
          <mt-cell title="热门城市"></mt-cell>
        <ul class="hotcity" >
            <li v-for="(item,index) in hotCity" :key="index">{{item.name}}</li>
        </ul>
         <mt-cell title="全部城市"></mt-cell>
        <ul class="totalcity">
          <li  v-for="(item,key) in totalCity" :key="key">
            <h4>{{key}}
             
            </h4>
           
            <ul class="totalinfo">
              <li v-for="(v,i) in item" :key="i">{{v.name}}</li>
            </ul>
          </li>
        </ul>
    </div>
</template>
<script>
import { Header } from "../../components";
import { getDefaultCity, getWeather, 
getAddressInfo,getHotCity,getTotalCity} from "../../ports";
export default {
  data() {
    return {
      addressInfo: "",
      weather: "",
      address: "",
      hotCity: [],
      totalCity:[]
    };
  },
  created() {
    this.getLocationCity();
    this.getHotCitys();
    this.getTotalCitys();
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
    },
    getHotCitys(){
      getHotCity.then(res=>{
        console.log(res);
        this.hotCity=res;
      },err=>{
        console.log(err);
      })
    },
    getTotalCitys(){
      getTotalCity.then(res=>{
        console.log(res);
        this.totalCity=res;
      })
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
  .mint-cell-wrapper{
    .mint-cell-text{
      color: extract(@blueColor, 1);
    }
  }
}
.hotcity,{
 display: flex;
 flex-flow:row wrap;
  li{
    width: 25%;
    text-align: center;
    border: 1px solid extract(@blackColor, 4);
    height: 30px;
    font-size: 17px;
    line-height: 30px;
    color: extract(@blueColor, 1);
  }
}
.totalcity{
  width: 100%;
  li{
  display: flex;
  flex-flow: row wrap;
    h4{
      display: inline-block;
      margin-left: 12px;
      width: 100%;
      height: 40px;
      line-height: 40px;
    }
    ul{
      flex:1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    
      li{
       text-align: center;
        overflow: hidden;
  text-overflow:ellipsis;//文本溢出显示省略号
  white-space:nowrap;//文本不会换行（单行文本溢出）
        width: 25%;
    
    border: 1px solid extract(@blackColor, 4);
    height: 30px;
    font-size: 17px;
    line-height: 30px;
    color: extract(@blueColor, 1);
      }
    }
  }
}
</style>


