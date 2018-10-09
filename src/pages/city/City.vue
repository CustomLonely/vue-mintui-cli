<template>
  <div class="container">
      <Header :mytitle="cityName" :changecity="true" :goback="true">
      </Header>
    <form v-on:submit.prevent class="searchaddress">
      <mt-search v-model="keyword" :show='true' placeholder="输入学校、商务楼、地址" @keyup.enter="searchAddress">
        <mt-button class="submitbtn" @click="searchAddress(cityId,keyword)" type="primary">提交</mt-button>
        <mt-cell v-if="historytitle" title="搜索历史"></mt-cell>
        <div class="city-item"  @click="nextPage(index,item.geohash, item.name)"   v-for="(item,index) in cityList" 
        :key="index" >
           <mt-cell 
          :title="item.name" 
            :label="item.address" 
            >
        </mt-cell>
        
        </div>
        <div v-if="isHistory" class="search_none_place" @click="clearAll">清空历史纪录</div>
        <div v-if="isCity" class="search_none_place">很抱歉！无搜索结果</div>
      </mt-search>
    </form>
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
      cityList: [],
      keyword: "", //搜索关键词
      isCity: false, // 搜索无结果，显示提示信息
      historyList: [], // 历史搜索记录
      historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏,
      isHistory: false
    };
  },

  created() {
    this.cityId = Api.isRouteData("cityid", this.$route.params.cityid);
    this.cityName = Api.isRouteData("cityname", this.$route.params.name);
    console.log(this.$route.params);
    this.initData();
  },

  mounted() {},

  methods: {
    initData() {
      if (Api.getStore("placehistory")) {
        this.cityList = JSON.parse(Api.getStore("placehistory"));
        this.isHistory = this.cityList.length > 0 ? true : false;
      } else {
        this.cityList = [];
        this.isCity = false;
      }
    },

    async searchAddress(cityid, keyword) {
      if (this.keyword && this.keyword.length > 0) {
        let res = await searchCity(cityid, keyword);
        this.historytitle = false;
        this.cityList = res;
        this.isHistory = false;
        this.isCity = res.length > 0 ? false : true;
      }
    },

    /**
     * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
     * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
     */
    nextPage(index, geohash, address) {
      let history = Api.getStore("placehistory");
      let selecthistory = this.cityList[index];
      if (history) {
        let checkrepeat = false;
        this.historyList = JSON.parse(history);
        this.historyList.forEach(item => {
          if (item.geohash == geohash) {
            checkrepeat = true;
          }
        });
        if (!checkrepeat) {
          this.historyList.push(selecthistory);
        }
      } else {
        this.isCity = true;
        this.historyList.push(selecthistory);
      }
      Api.setStore("placehistory", this.historyList);
      this.$router.push({
        name: "food",
        params: {
          geohash,
          address
        }
      });
    },
    //清除历史纪录
    clearAll() {
      Api.removeStore("placehistory");
      this.initData();
    }
  },

  components: {
    Header
  }
};
</script>
<style lang="less">
@import "../../style/basic.less";
.searchaddress {
  margin-top: 45px;
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
      overflow-y: auto;
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
    .mint-cell-wrapper {
      border-bottom: 1px solid #e4e4e4;
    }
  }

  .search_none_place {
    margin: 0 auto;
    width: 100%;
    line-height: 28px;
    text-align: center;
    font-size: 16px;
    color: extract(@blueColor, 1);
  }
}
</style>


