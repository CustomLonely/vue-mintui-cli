<template>
       <mt-swipe :auto="0" class="navbar">
              <mt-swipe-item v-for="(item,index) in menulist" :key="index">
                <ul class="foodmenu">
                  <li v-for="(v,i) in item" :key="i">
                     <img :src="v.image_url|url" 
                    >
                   
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
      geohash: ""
    };
  },
  created() {
    this.geohash = Api.isRouteData("geohash", this.$route.params.geohash);
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

      console.log(this.menulist);
    }
  }
};
</script>
<style lang="less">
</style>


