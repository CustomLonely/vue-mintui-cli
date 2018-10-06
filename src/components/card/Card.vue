<template>
  <ul class="shoplist">
    <router-link to="" tag="li" class="carditem" v-for="(item,index) in shopList" :key="index">
      <div class="cardleft">
        <div class="imgbox">
          <img @click="$preview.open(index, shopList)" 
          :src="item.image_path | url(imgBaseUrl)"  
          class="cardimg preview-img">
        </div>
      </div>
      <div class="cardright">
        <p class="shopname">
          <span :class="item.is_premium? 'premium': ''">{{item.name}}</span>
          <ul class="shop_detail_ul">
            <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
          </ul>
        </p>
        <p class="ratinginfo">
          <span class="leftinfo">
                                   <Star class="ct starinfo" :rating="item.rating"></Star>
                              <span class="ordersales">{{item.rating}}
                                  月售{{item.recent_order_num}}单</span>
          </span>
          <span class="rightinfo">
                                   <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
          <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
          </span>
        </p>
        <p class="fee">
          <span class="leftinfo">
               ¥{{item.float_minimum_order_amount}}起送
            <span class="segmentation">/</span> {{item.piecewise_agent_fee.tips}}
          </span>
          <span class="rightinfo">
              		<span class="distance" v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
  								<span class="segmentation">/</span>
          </span>
          <span v-else class="distance">{{item.distance}}</span>
          <span class="segmentation">/</span>
          <span class="order_time">{{item.order_lead_time}}</span>
          </span>
        </p>
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
  //restaurant_category_id餐馆分类id
  //order_by 排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高
  //delivery_mode 配送方式id
  //support_ids 餐馆支持特权的id
  //restaurant_category_ids 餐馆分类id
  props: [
    "restaurant_category_id",
    "order_by",
    "delivery_mode",
    "support_ids",
    "restaurant_category_ids"
  ],
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
      if (res.length <= 0) {
        return;
      }
      this.shopList = res;
      this.shopList.forEach((item, index) => {
        item.w = 600;
        item.h = 400;
        item.src = this.imgBaseUrl + item.image_path;
      });
    },
    zhunshi(supports) {
      let zhunStatus;
      if (supports instanceof Array && supports.length) {
        supports.forEach(item => {
          if (item.icon_name === "准") {
            zhunStatus = true;
          }
        });
      } else {
        zhunStatus = false;
      }
      return zhunStatus;
    }
  },
  components: {
    Star
  }
};
</script>
<style lang="less">
@import "../../style/basic";
.shoplist {
  margin-bottom: 45px;
  .carditem {
    width: 100%;
    display: flex;
    padding: 10px;
    .cardleft {
      .cardimg {
        width: 63px;
        height: 63px;
      }
    }
    .cardright {
      flex: 1;
      padding-left: 10px;
      .shopname {
        display: flex;
        justify-content: space-between;
        .shop_detail_ul {
          display: flex;
        }
      }
      .premium::before {
        content: "品牌";
        display: inline-block;
        font-size: 14px;
        line-height: 16px;
        color: extract(@blackColor, 3);
        background-color: #ffd930;
        padding: 0 5px;
        border-radius: 3px;
        margin-right: 5px;
      }
      .ratinginfo {
        position: relative;
        display: flex;
        height: 30px;
        line-height: 30px;
        justify-content: space-between;
        font-size: 12px;
        .leftinfo {
          display: flex;
        }
        .ordersales {
          margin-left: 20px;
        }
        .delivery_style {
          font-size: 12px;
          margin-left: 0;
          border-radius: 3px;
          padding: 0 2px;
          border: 1px;
        }
        .delivery_left {
          color: #fff;
          background-color: extract(@blueColor, 1);
          border: 1px solid extract(@blueColor, 1);
        }
        .delivery_right {
          color: extract(@blueColor, 1);
          border: 1px solid extract(@blueColor, 1);
        }
      }
      .fee {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rightinfo {
          .distance,
          .segmentation,
          .order_time {
            color: extract(@blackColor, 5);
          }
        }
      }
    }
  }
}
</style>