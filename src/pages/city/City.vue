<template>
    <div class="container">
      <div class="head">
        <Header :mytitle="cityName"  changecity="true">   
    </Header>
      </div>
      
    <mt-search
      v-model="keyword"
      :show='true'
      placeholder="输入学校、商务楼、地址"
     >
        <mt-button class="submitbtn" @click="searchAddress(cityId,keyword)" type="primary" >提交</mt-button>
        <mt-cell v-if="isCity" title="搜索历史"></mt-cell>
        <mt-cell class="city-item" v-else v-for="(item,index) in cityList" :key="index" :title="item.address" :label="item.name" is-link 
        :to="{name:'food',params:{latitude:item.latitude,longitude:item.longitude}}"></mt-cell>
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
    console.log(this.$route);
  },

  methods: {
    searchAddress(cityid, keyword) {
      searchCity(cityid, keyword).then(res => {
        console.log(res);
        this.cityList = res;
      });
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
    input[type="search"] {
      text-indent: 10px;
    }
  }
  .mint-search-list {
    margin-top: 50px;
    overflow: hidden;
    overflow-y: scroll;
    height: 100%;
  }

  .submitbtn {
    height: 40px;
    line-height: 40px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
  }
}
.city-item {
  padding: 10px 0;
  border-bottom: 1px solid #e4e4e4;
  .mint-cell-text {
    font-size: 17px;
    line-height: 30px;
    color: #333;
  }
  .mint-cell-label {
    font-size: 15px;
    line-height: 26px;
    color: #999;
  }
}
</style>


