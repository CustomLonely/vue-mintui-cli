<template>
  <div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="selected">
        <mt-tab-container-item id="外卖">
          <div class="foodinfo">
      
            <Header 
            :mytitle="addressName" 
            :search="$store.state.search==true"
           
            :login="$store.state.isload==false" 
            :user="$store.state.isload==true">
            
            </Header>
            <mt-swipe :auto="0" class="navbar">
              <mt-swipe-item v-for="(item,index) in menulist" :key="index">
                <ul class="foodmenu">
                  <li v-for="(v,i) in item[0]" :key="i">
                    <img :src="v.image_url|url">
                    <span>{{v.title}}</span>
                  </li>
                </ul>
              </mt-swipe-item>
            </mt-swipe>
            <div class="nearBymerchants">
              <mt-cell title="附近商家">
                <img slot="icon" src="../../assets/foodshop.svg" height="25" width="25" alt="">
              </mt-cell>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="订单">
          订单
        </mt-tab-container-item>
        <mt-tab-container-item id="发现">
          发现
        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
          我的
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item v-for="(item,index) in tabBarList" :key="index" :id="item.id">
        <img :src="selected==item.id?item.activeurl:item.url" alt="" width="20" height="20">
       <p> {{item.id}}</p>
      </mt-tab-item>
     
    </mt-tabbar>
  </div>
</template>
<script>
import { Header } from "@/components";

import { getFoodEntry, restaurants } from "@/ports";

export default {
  name: "page-tab-container",
  data() {
    return {
      menulist: [], //菜单

      geohash: "",
      search: true,
      params: {},
      addressName: "",
      selected: "外卖",
      tabBarList: [
        {
          id: "外卖",
          url: require("../../assets/images/tabbar/food.png"),
          activeurl: require("../../assets/images/tabbar/food_active.png")
        },
        {
          id: "订单",
          url: require("../../assets/images/tabbar/order.png"),
          activeurl: require("../../assets/images/tabbar/order_active.png")
        },
        {
          id: "发现",
          url: require("../../assets/images/tabbar/search.png"),
          activeurl: require("../../assets/images/tabbar/search_active.png")
        },
        {
          id: "我的",
          url: require("../../assets/images/tabbar/user.png"),
          activeurl: require("../../assets/images/tabbar/user_active.png")
        }
      ]
    };
  },
  created() {
    this.geohash = Api.isRouteData("geohash", this.$route.params.geohash);
    this.addressName = Api.isRouteData("address", this.$route.params.address);
  },
  beforeMount() {
    let arr = this.geohash.split(",");
    this.params.latitude = arr[0];
    this.params.longitude = arr[1];
    this.params.limit = 40;
  },
  mounted() {
    this.getMenulist();
    this.getNearbyShop(this.params);
  },
  components: {
    Header
  },
  methods: {
    //navbar菜单
    async getMenulist() {
      let res = await getFoodEntry(this.geohash);
      let newMenulist = [];
      for (let i = 0; i < res.length; i += 8) {
        let result = [];
        result.push(res.slice(i, i + 8));
        newMenulist.push(result);
      }
      this.menulist = newMenulist;
    },
    //商家列表
    async getNearbyShop(params) {
      let res = await restaurants(params);
      console.log(res);
    }
  },
  computed: {
    sortMenulist() {}
  }
};
</script>
<style lang="less">
@import "../../style/basic.less";
.foodinfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: extract(@whiteColor, 4);
  .navbar,
  .foodmenu {
    width: 100%;
    background: extract(@whiteColor, 1);
  }
  .mint-swipe {
    height: 76vw;
    border-bottom: 1px solid extract(@whiteColor, 5);
    .mint-swipe-indicator.is-active {
      background: extract(@blueColor, 1);
    }
  }
  .foodmenu {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    li {
      width: 25vw;
      text-align: center; // border: 1px solid extract(@blackColor, 4);
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 10px;
      font-size: 17px;
      color: extract(@blackColor, 5);
      img {
        height: 25vw;
        width: 25vw;
      }
      span {
        line-height: 28px;
      }
    }
  }
  .nearBymerchants {
    margin-top: 10px;
    background: extract(@whiteColor, 1);
  }
}
.mint-tab-item {
  outline: none;
  .icon {
    color: extract(@blackColor, 3);
  }
  .mint-tab-item-label {
    color: extract(@blackColor, 3);
    text-decoration: none !important;
  }
}
.is-selected {
  outline: none;

  p {
    color: extract(@blueColor, 1);
    text-decoration: none !important;
  }
}
img[lazy="loading"] {
  height: 25vw;
  width: 25vw;
  background: url("../../assets/images/tabbar/food.svg") no-repeat fixed center;
}
</style>


