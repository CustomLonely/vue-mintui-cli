<template>
    <ul>
        <router-link to="" tag="li" class="carditem" v-for="(item,index) in shopList" :key="index">
            <div class="cardleft">
                <div class="imgbox">
                    <img :src="item.image_path | url(imgBaseUrl)" alt="" class="cardimg">
                </div>
                <div class="cardleftinfo">
                    <p>{{item.name}}</p>
                    <p class="ratinginfo"><Star class="ct" :rating="item.rating"></Star><span>{{item.rating}}</span></p>
                    <p></p>
                </div>
            </div>
            <div class="cardright">
                <p></p>
                <p></p>
                <p></p>
            </div>
        </router-link>
    </ul>
</template>
<script>
import { Star } from "@/components";

import { restaurants } from "@/ports";
export default {
  data() {
    return {
      shopList: [],
      params: {},
      imgBaseUrl: Api.Config.imgBaseUrl
    };
  },
  props: [],
  beforeMount() {
    let arr = Api.getData("geohash").split(",");
    this.params.latitude = arr[0];
    this.params.longitude = arr[1];
    this.params.limit = 0;
  },
  mounted() {
    this.getNearbyShop(this.params);
  },
  methods: {
    //商家列表
    async getNearbyShop(params) {
      let res = await restaurants(params);
      this.shopList = res;
      console.log(res);
    }
  },
  components: {
    Star
  }
};
</script>
<style lang="less">
.carditem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .cardleft {
    display: flex;
    .cardleftinfo {
      margin-left: 10px;
      .ratinginfo {
        position: relative;
        display: flex;
        height: 30px;
        line-height: 30px;
        span {
          margin-left: 10px;
        }
      }
    }
    .cardimg {
      width: 63px;
      height: 63px;
    }
  }
}
</style>


