<template>
    <div class="foodinfo">
      <Header :mytitle="addressName" search="true" user="true"></Header>
        <mt-swipe :auto="0" class="navbar">

                <mt-swipe-item v-for="(item,index) in menulist" :key="index">
                    <ul class="foodmenu">
                        <li v-for="(v,i) in item[0]" :key="i">
                            <img :src="imgUrl+v.image_url" >
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
</template>
<script>
import { Header } from "@/components";
import { getFoodEntry, restaurants } from "@/ports";
export default {
  data() {
    return {
      menulist: [], //菜单
      imgUrl: Api.Config.imgUrl, //图片服务器

      params: {},
      addressName: ""
    };
  },
  created() {
    this.params.latitude = this.$route.query.latitude;
    this.params.longitude = this.$route.query.longitude;
    this.params.limit = 40;
    this.addressName = this.$route.query.address;
  },
  mounted() {
    this.getMenulist();

    this.getNearbyShop(this.params);
  },
  components: {
    Header
  },
  methods: {
    async getMenulist() {
      let res = await getFoodEntry(this.geohash);

      let newMenulist = [];

      for (let i = 0; i < res.length; i += 8) {
        let result = [];
        result.push(res.slice(i, i + 8));
        newMenulist.push(result);
      }
      this.menulist = newMenulist;
      console.log(this.menulist);
    },
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
      text-align: center;
      // border: 1px solid extract(@blackColor, 4);
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
</style>


