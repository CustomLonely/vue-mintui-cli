<template>
    <div class="foodinfo">
        <mt-swipe :auto="0" class="navbar">
                <mt-swipe-item v-for="(item,index) in menulist" :key="index">
                    <ul class="foodmenu">
                        <li v-for="(v,i) in item" :key="i">
                            <img :src="imgUrl+'/'+v.image_url" >
                            <span>{{v.title}}</span>
                        </li>
                    </ul>
                </mt-swipe-item>
            </mt-swipe>
    </div>
</template>
<script>
import { Header } from "@/components";
import { getFoodEntry } from "@/ports";
export default {
  data() {
    return {
      menulist: [], //菜单
      imgUrl: Api.Config.imgUrl, //图片服务器
      geohash: "" //经纬度
    };
  },
  created() {
    this.geohash = `${this.$route.params.latitude},${
      this.$route.params.longitude
    }`;
  },
  mounted() {
    this.getMenulist();
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
  .navbar,
  .foodmenu {
    width: 100%;
  }
  .foodmenu {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    li {
      width: 25vw;
      height: 25vw;
      text-align: center;
      border: 1px solid extract(@blackColor, 4);
      display: flex;
      flex-direction: column;
      justify-content: center;

      font-size: 17px;

      color: extract(@blackColor, 5);
      img {
        width: 90%;
        height: 90%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>


