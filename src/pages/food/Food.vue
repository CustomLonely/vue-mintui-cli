<template>
  <div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container"  v-model="selected">
       
        <mt-tab-container-item id="外卖">
          <div class="foodinfo">
                 <Header 
            :mytitle="addressName" 
            :search="search"
            :islogin="$store.getters.login"
            @tosearch='toSearch'
            @touser='toUser'
            >
            
            </Header>
     
            <Navbar></Navbar>
            <div class="nearBymerchants">
              <mt-cell title="附近商家">
                <img slot="icon" src="../../assets/foodshop.svg" height="25" width="25" alt="">
              </mt-cell>
              <Card v-if="hasGetData"></Card>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="订单">
          订单
        </mt-tab-container-item>
        <mt-tab-container-item id="发现">
        
          <Search></Search>
        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
          我的
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item v-for="(item,index) in tabBarList" :key="index" :id="item.id">
        <img :src="selected==item.id?item.activeurl:item.url" alt="" width="20" height="20">
       <p> {{item.id}}</p>
      </mt-tab-item>
     
    </mt-tabbar>
  </div>
</template>
<script>
import { Header, Navbar, Card } from "@/components";
import { mapMutations } from "vuex";
import { getAddressBygeohash, getDefaultCity } from "@/ports";
import Search from "@/pages/search/Search.vue";
export default {
  name: "page-tab-container",
  data() {
    return {
      search: true,
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
      ],
      geohash: null,
      hasGetData: false //是否已经获取地理位置数据，成功之后再获取商铺列表信息
    };
  },
  async beforeMount() {
    if (!this.$route.params.geohash) {
      const address = await getDefaultCity;
      this.geohash = address.latitude + "," + address.longitude;
    } else {
      this.geohash = this.$route.params.geohash;
    }
    //保存geohash 到vuex
    this.SAVE_GEOHASH(this.geohash);
    //获取位置信息
    let res = await getAddressBygeohash(this.geohash);

    this.msiteTitle = res.name;
    // 记录当前经度纬度
    this.RECORD_ADDRESS(res);
    this.hasGetData = true;
  },
  created() {
    this.addressName = this.Api.isRouteData(
      "address",
      this.$route.params.address
    );
  },

  methods: {
    //切换搜索页
    toSearch() {
      this.selected = "发现";
    },
    //切换个人信息页
    toUser() {
      this.selected = "我的";
    },
    ...mapMutations(["RECORD_ADDRESS", "SAVE_GEOHASH"])
  },

  components: {
    Header,
    Navbar,
    Card,
    Search
  },

  computed: {}
};
</script>

<style lang="less">
@import "../../style/basic.less";
.foodinfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: extract(@whiteColor, 4);
  .navbar {
    margin-top: 45px;
  }
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


