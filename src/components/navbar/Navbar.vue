<template>
  <mt-swipe :auto="0" class="navbar">
    <mt-swipe-item v-for="(item,index) in menulist" :key="index">
      <ul class="foodmenu">
          <li  @click="recordtitle(v.title,geohash,v.link)" tag="li" v-for="(v,i) in item" :key="i">
           <img :src="v.image_url|url">
          <span>{{v.title}}</span>
        </li>
      </ul>
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
import { getFoodEntry } from "@/ports";

export default {
  data() {
    return {
      menulist: [], //菜单
      geohash: null
    };
  },
  created() {
    this.geohash = this.Api.isRouteData("geohash", this.$route.params.geohash);
  },
  mounted() {
    this.getMenulist();
  },
  methods: {
    //navbar菜单
    async getMenulist() {
      let res = await getFoodEntry(this.geohash);
      let newMenulist = [];
      for (let i = 0; i < res.length; i += 8) {
        newMenulist.push(res.slice(i, i + 8));
      }
      this.menulist = newMenulist;
    },
    //对url解析
    recordtitle(title, geohash, link) {
      let query = link.split("?")[1];
      query = decodeURIComponent(query).split("&");
      let newList = [];
      query.forEach(function(part) {
        let result = {};
        let item = part.split("=");
        result[item[0]] = item[1];
        newList.push(result);
      });

      newList[0].filter_key = JSON.parse(newList[0].filter_key);

      this.$router.push({
        name: "shopsorting",
        query: {
          title,
          geohash,
          restaurant_category_id:
            newList[0].filter_key.restaurant_category_id.id
        }
      });
    }
  }
};
</script>
<style lang="less">
</style>


