<template>
    <div class="container">
      <div class="head"  @click="toChild">
        <Header :mytitle="cityName" ref="header">   
    </Header>
      </div>
      
    <mt-search
      v-model="keyword"
      :show='true'
      placeholder="输入学校、商务楼、地址"
     >
        <mt-button class="submitbtn" @click="searchAddress(cityId,keyword)" type="primary" >提交</mt-button>
        <mt-cell v-if="isCity" title="搜索历史"></mt-cell>
  
    </mt-search>
  
    </div>
</template>
<script>
import { Header } from "@/components";
import { searchCity } from "@/ports";
export default {
  data() {
    return {
      cityId: "",
      cityName: "",
      historyList: [],
      cityList: [],
      keyword: "", //搜索关键词
      isCity: false //// 搜索无结果，显示提示信息
    };
  },
  created() {
    this.cityId = this.$route.params.cityid;
    this.cityName = this.$route.query.name;
  },

  methods: {
    searchAddress(cityid, keyword) {
      searchCity(cityid, keyword).then(res => {
        console.log(res);
        this.cityList = res;
      });
    },
    toChild() {
      debugger;
      console.log("触发了吗");
      this.$ref.header.goPage();
    }
  },
  components: {
    Header
  }
};
</script>
<style lang="less">
@import "../../style/basic.less";

.mint-search {
  background-color: extract(@whiteColor, 1);
  .mint-searchbar {
    background-color: extract(@whiteColor, 1);
    .mint-searchbar-inner {
      border: 1px solid extract(@blackColor, 4);
      height: 30px;
      line-height: 30px;
    }
  }
  .mint-search-list-warp {
    padding: 0 10px;
  }
  .submitbtn {
    height: 40px;
    line-height: 40px;

    width: 100%;
    margin-top: 60px;
  }
}
</style>


