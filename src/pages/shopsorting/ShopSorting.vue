<template>
  <div class="shop_container">
    <Header :mytitle="headTitle" goback="true"></Header>
    <section class="sort_container">
      <!-- 分类 -->
      <div class="sort_item" :class="{choose_type:sortBy == 'food'}">
        <div class="sort_item_container" @click="chooseType('food')">
          <div class="sort_item_border">
            <span :class="{category_title: sortBy == 'food'}">{{foodTitle}}</span>
           <i :class="{'icon-ic_arrowright-': sortBy == 'food'}" class="icon icon-ic_arrowleft-- svg"></i>
          </div>
        </div>
        <transition name="showlist" v-show="category">
          <section v-show="sortBy == 'food'" class="category_container sort_detail_type">
            <section class="category_left">
              <ul>
                <li v-for="(item, index) in category" :key="index" class="category_left_li" :class="{category_active:restaurant_category_id == item.id}" @click="selectCategoryName(item.id, index)">
                  <section>
                   
                    <span>{{item.name}}</span>
                  </section>
                  <section>
                    <span class="category_count">{{item.count}}</span>
                     <i v-if="index" class="icon icon-ic_arrowleft-- category_arrow"></i>
                   
                  </section>
                </li>
              </ul>
            </section>
            <section class="category_right">
              <ul>
                <li v-for="(item, index) in categoryDetail" v-if="index" :key="index" class="category_right_li" @click="getCategoryIds(item.id, item.name)" :class="{category_right_choosed: restaurant_category_ids == item.id || (!restaurant_category_ids)&&index == 0}">
                  <span>{{item.name}}</span>
                  <span>{{item.count}}</span>
                </li>
              </ul>
            </section>
          </section>
        </transition>
      </div>
      <!-- 排序 -->
      <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
        <div class="sort_item_container" @click="chooseType('sort')">
          <div class="sort_item_border">
            <span :class="{category_title: sortBy == 'sort'}">排序</span>
           <i :class="{'icon-ic_arrowright-': sortBy == 'sort'}"  class="icon icon-ic_arrowleft-- svg"></i>
          </div>
        </div>
        <transition name="showlist">
          <section v-show="sortBy == 'sort'" class="sort_detail_type">
            <ul class="sort_list_container" @click="sortList($event)">
              <li class="sort_list_li">
                <svg>
    									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
    								</svg>
                <p data="0" :class="{sort_select: sortByType == 0}">
                  <span>智能排序</span>
                  <svg v-if="sortByType == 0">
    										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
    									</svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
    									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
    								</svg>
                <p data="5" :class="{sort_select: sortByType == 5}">
                  <span>距离最近</span>
                  <svg v-if="sortByType == 5">
    										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
    									</svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
    									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
    								</svg>
                <p data="6" :class="{sort_select: sortByType == 6}">
                  <span>销量最高</span>
                  <svg v-if="sortByType == 6">
    										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
    									</svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
    									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
    								</svg>
                <p data="1" :class="{sort_select: sortByType == 1}">
                  <span>起送价最低</span>
                  <svg v-if="sortByType == 1">
    										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
    									</svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
    									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
    								</svg>
                <p data="2" :class="{sort_select: sortByType == 2}">
                  <span>配送速度最快</span>
                  <svg v-if="sortByType == 2">
    										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
    									</svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
    									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
    								</svg>
                <p data="3" :class="{sort_select: sortByType == 3}">
                  <span>评分最高</span>
                  <svg v-if="sortByType == 3">
    										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
    									</svg>
                </p>
              </li>
            </ul>
          </section>
        </transition>
      </div>
      <!-- 筛选 -->
      <div class="sort_item" :class="{choose_type:sortBy == 'activity'}">
        <div class="sort_item_container" @click="chooseType('activity')">
          <span :class="{category_title: sortBy == 'activity'}">筛选</span>
        <i :class="{'icon-ic_arrowright-': sortBy == 'activity'}"  class="icon icon-ic_arrowleft-- svg"></i>
        </div>
        <transition name="showlist">
          <section v-show="sortBy == 'activity'" class="sort_detail_type filter_container">
            <section style="width: 100%;">
              <header class="filter_header_style">配送方式</header>
              <ul class="filter_ul">
                <li v-for="(item, index) in Delivery" :key="index" class="filter_li" @click="selectDeliveryMode(item.id)">
                  <svg :style="{opacity: (item.id == 0)&&(delivery_mode !== 0)? 0: 1}">
    										<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="delivery_mode == item.id? '#selected':'#fengniao'"></use>
    									</svg>
                  <span :class="{selected_filter: delivery_mode == item.id}">{{item.text}}</span>
                </li>
              </ul>
            </section>
            <section style="width: 100%;">
              <header class="filter_header_style">商家属性（可以多选）</header>
              <ul class="filter_ul" style="paddingBottom: .5rem;">
                <li v-for="(item,index) in Activity" :key="index" class="filter_li" @click="selectSupportIds(index, item.id)">
                  <svg v-show="support_ids[index].status" class="activity_svg">
    										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
    									</svg>
                  <span class="filter_icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}" v-show="!support_ids[index].status">{{item.icon_name}}</span>
                  <span :class="{selected_filter: support_ids[index].status}">{{item.name}}</span>
                </li>
              </ul>
            </section>
            <footer class="confirm_filter">
              <div class="clear_all filter_button_style" @click="clearSelect">清空</div>
              <div class="confirm_select filter_button_style" @click="confirmSelectFun">确定<span v-show="filterNum">({{filterNum}})</span></div>
            </footer>
          </section>
        </transition>
      </div>
    </section>
    <transition name="showcover">
      <div class="back_cover" v-show="sortBy"></div>
    </transition>
    <section class="shop_list_container">
        <Card :geohash="geohash" 
      :restaurantCategoryId="restaurant_category_id" 
      :restaurantCategoryIds="restaurant_category_ids" 
      :order_by='sortByType' 
      :deliveryMode="delivery_mode" 
      :confirmSelect="confirmStatus" 
      :supportIds="support_ids" 
      v-if="latitude"></Card>
    </section>
   
  </div>
</template>
<script>
import { Header, Card } from "@/components";
import { mapGetters, mapMutations } from "vuex";
import {
  getAddressBygeohash,
  getAllShops,
  getDelivery,
  foodActivity
} from "@/ports";
export default {
  data() {
    return {
      geohash: "", // city页面传递过来的地址geohash
      headTitle: "", // msiet页面头部标题
      foodTitle: "", // 排序左侧头部标题
      restaurant_category_id: "", // 食品类型id值
      restaurant_category_ids: "", //筛选类型的id
      sortBy: "", // 筛选的条件
      category: null, // category分类左侧数据
      categoryDetail: null, // category分类右侧的详细数据
      sortByType: null, // 根据何种方式排序
      Delivery: null, // 配送方式数据
      Activity: null, // 商家支持活动数据
      delivery_mode: null, // 选中的配送方式
      support_ids: [], // 选中的商铺活动列表
      filterNum: 0, // 所选中的所有样式的集合
      confirmStatus: false, // 确认选择,
      imgBaseUrl: this.Api.Config.imgBaseUrl
    };
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapGetters(["latitude", "longitude"])
  },
  methods: {
    ...mapMutations(["RECORD_ADDRESS"]),
    async initData() {
      this.headTitle = this.$route.query.title;
      this.restaurant_category_id = this.$route.query.restaurant_category_id;
      this.geohash = this.$route.query.geohash;
      this.foodTitle = this.headTitle;
      //防止刷新页面时，vuex状态丢失，经度纬度需要重新获取，并存入vuex
      if (!this.latitude || !this.latitude) {
        let res = await getAddressBygeohash(this.geohash);
        console.log(res);
        //// 记录当前经度纬度进入vuex
        this.RECORD_ADDRESS(res);
      }
      //获取category分类左侧数据
      this.category = await getAllShops(this.latitude, this.longitude);
      //初始化时定位当前category分类左侧默认选择项，在右侧展示出其sub_categories列表
      this.category.forEach((item, index) => {
        if (this.restaurant_category_id == item.id) {
          this.categoryDetail = item.sub_categories;
        }
      });
      //获取筛选列表的配送方式
      this.Delivery = await getDelivery(this.latitude, this.longitude);
      //获取筛选列表的商铺活动
      this.Activity = await foodActivity(this.latitude, this.longitude);
      //记录support_ids的状态，默认不选中，点击状态取反，status为true时为选中状态
      this.Activity.forEach((item, index) => {
        this.support_ids[index] = {
          status: false,
          id: item.id
        };
      });
    },
    // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
    async chooseType(type) {
      if (this.sortBy !== type) {
        this.sortBy = type;
        //food选项中头部标题发生改变，需要特殊处理
        if (type == "food") {
          this.foodTitle = "分类";
        } else {
          //将foodTitle 和 headTitle 进行同步
          this.foodTitle = this.headTitle;
        }
      } else {
        //再次点击相同选项时收回列表
        this.sortBy = "";
        if (type == "food") {
          //将foodTitle 和 headTitle 进行同步
          this.foodTitle = this.headTitle;
        }
      }
    },
    //选中Category左侧列表的某个选项时，右侧渲染相应的sub_categories列表
    selectCategoryName(id, index) {
      //第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
      if (index === 0) {
        this.restaurant_category_ids = null;
        this.sortBy = "";
        //不是第一个选项时，右侧展示其子级sub_categories的列表
      } else {
        this.restaurant_category_id = id;
        this.categoryDetail = this.category[index].sub_categories;
      }
    },
    //选中Category右侧列表的某个选项时，进行筛选，重新获取数据并渲染
    getCategoryIds(id, name) {
      console.log(id, name);
      this.restaurant_category_ids = id;
      this.sortBy = "";
      this.foodTitle = this.headTitle = name;
    },
    //点击某个排序方式，获取事件对象的data值，并根据获取的值重新获取数据渲染
    sortList(event) {
      let node;
      // 如果点击的是 span 中的文字，则需要获取到 span 的父标签 p
      if (event.target.nodeName.toUpperCase() !== "P") {
        node = event.target.parentNode;
      } else {
        node = event.target;
      }
      this.sortByType = node.getAttribute("data");
      this.sortBy = "";
    },
    //筛选选项中的配送方式选择
    selectDeliveryMode(id) {
      //delivery_mode为空时，选中当前项，并且filterNum加一
      if (this.delivery_mode == null) {
        this.filterNum++;
        this.delivery_mode = id;
        //delivery_mode为当前已有值时，清空所选项，并且filterNum减一
      } else if (this.delivery_mode == id) {
        this.filterNum--;
        this.delivery_mode = null;
        //delivery_mode已有值且不等于当前选择值，则赋值delivery_mode为当前所选id
      } else {
        this.delivery_mode = id;
      }
    },
    //点击商家活动，状态取反
    selectSupportIds(index, id) {
      //数组替换新的值
      this.support_ids.splice(index, 1, {
        status: !this.support_ids[index].status,
        id
      });
      //重新计算filterNum的个数
      this.filterNum = this.delivery_mode == null ? 0 : 1;
      this.support_ids.forEach(item => {
        if (item.status) {
          this.filterNum++;
        }
      });
    },
    //只有点击清空按钮才清空数据，否则一直保持原有状态
    clearSelect() {
      this.support_ids.map(item => (item.status = false));
      this.filterNum = 0;
      this.delivery_mode = null;
    },
    //点击确认时，将需要筛选的id值传递给子组件，并且收回列表
    confirmSelectFun() {
      //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
      this.confirmStatus = !this.confirmStatus;
      this.sortBy = "";
    }
  },
  components: {
    Header,
    Card
  }
};
</script>

<style lang="less" scoped>
@import "../../style/basic.less";

.sort_container {
  background-color: #fff;
  border-bottom: 0.025rem solid extract(@whiteColor, 6);
  position: fixed;
  top: 35px;
  right: 0;
  width: 100%;
  display: flex;
  z-index: 13;
  box-sizing: border-box;
  .sort_item {
    .sc(16px, #444);
    .wh(33.3%, 35px);
    text-align: center;
    line-height: 35px;
    .sort_item_container {
      .wh(100%, 100%);
      position: relative;
      z-index: 14;
      background-color: #fff;
      box-sizing: border-box;
      .sort_item_border {
        height: 35px;
        border-right: 1px solid extract(@whiteColor, 5);
      }
    }
    .sort_icon {
      vertical-align: middle;
      transition: all 0.3s;
      fill: #666;
    }
  }
  .choose_type {
    .sort_item_container {
      .category_title {
        color: extract(@blueColor, 4);
      }
      .sort_icon {
        transform: rotate(180deg);
        fill: extract(@blueColor, 4);
      }
    }
  }
  .showlist-enter-active,
  .showlist-leave-active {
    transition: all 0.3s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
  .sort_detail_type {
    width: 100%;
    position: absolute;
    display: flex;

    left: 0;
    border-top: 0.025rem solid extract(@whiteColor, 5);
    background-color: extract(@whiteColor, 1);
  }
  .category_container {
    .category_left {
      flex: 1;
      background-color: extract(@whiteColor, 6);
      height: 16rem;
      overflow-y: auto;
      span {
        .sc(14px, #666);
        line-height: 1.8rem;
      }
      .category_left_li {
        .fj;
        padding: 0 12px;
        .category_icon {
          .wh(100%, 35px);
          vertical-align: middle;
          margin-right: 0.2rem;
        }
        .category_count {
          background-color: #ccc;
          .sc(0.4rem, extract(@whiteColor, 1));
          padding: 0 0.1rem;
          border: 0.025rem solid #ccc;
          border-radius: 0.8rem;
          vertical-align: middle;
          margin-right: 0.25rem;
        }
        .category_arrow {
          vertical-align: middle;
        }
      }
      .category_active {
        background-color: extract(@whiteColor, 1);
      }
    }
    .category_right {
      flex: 1;
      background-color: extract(@whiteColor, 1);
      padding-left: 0.5rem;
      height: 16rem;
      overflow-y: auto;
      .category_right_li {
        .fj;
        height: 1.8rem;
        line-height: 1.8rem;
        padding-right: 0.5rem;
        border-bottom: 0.025rem solid extract(@whiteColor, 6);
        span {
          color: #666;
        }
      }
      .category_right_choosed {
        span {
          color: extract(@blueColor, 4);
        }
      }
    }
  }
  .sort_list_container {
    width: 100%;
    .sort_list_li {
      height: 2.5rem;
      display: flex;
      align-items: center;
      .svg {
        font-size: 14px;
        margin: 0 0.3rem 0 0.8rem;
      }
      p {
        line-height: 2.5rem;
        flex: auto;
        text-align: left;
        text-indent: 0.25rem;
        border-bottom: 0.025rem solid extract(@whiteColor, 6);
        .fj;
        align-items: center;
        span {
          color: #666;
        }
      }
      .sort_select {
        span {
          color: extract(@blueColor, 5);
        }
      }
    }
  }
  .filter_container {
    flex-direction: column;
    align-items: flex-start;
    min-height: 10.6rem;
    background-color: extract(@whiteColor, 5);
    .filter_header_style {
      .sc(0.4rem, #333);
      line-height: 1.5rem;
      height: 1.5rem;
      text-align: left;
      padding-left: 0.5rem;
      background-color: extract(@whiteColor, 1);
    }
    .filter_ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 0.5rem;
      background-color: extract(@whiteColor, 1);
      .filter_li {
        display: flex;
        align-items: center;
        border: 0.025rem solid #eee;
        .wh(4.7rem, 1.4rem);
        margin-right: 0.25rem;
        border-radius: 0.125rem;
        padding: 0 0.25rem;
        margin-bottom: 0.25rem;
        .svg {
          font-size: 14px;
          margin-right: 0.125rem;
        }
        span {
          .sc(0.4rem, #333);
        }
        .filter_icon {
          .wh(0.8rem, 0.8rem);
          font-size: 0.5rem;
          border: 0.025rem solid extract(@whiteColor, 6);
          border-radius: 0.15rem;
          margin-right: 0.25rem;
          line-height: 0.8rem;
          text-align: center;
        }
        .activity_svg {
          margin-right: 0.25rem;
        }
        .selected_filter {
          color: extract(@blueColor, 4);
        }
      }
    }
    .confirm_filter {
      display: flex;
      background-color: extract(@whiteColor, 6);
      width: 100%;
      padding: 0.3rem 0.2rem;
      .filter_button_style {
        .wh(50%, 1.8rem);
        font-size: 0.8rem;
        line-height: 1.8rem;
        border-radius: 0.2rem;
      }
      .clear_all {
        background-color: extract(@whiteColor, 1);
        margin-right: 0.5rem;
        border: 0.025rem solid extract(@whiteColor, 1);
      }
      .confirm_select {
        background-color: #56d176;
        color: extract(@whiteColor, 1);
        border: 0.025rem solid #56d176;
        span {
          color: extract(@whiteColor, 1);
        }
      }
    }
  }
}
.showcover-enter-active,
.showcover-leave-active {
  transition: opacity 0.3s;
}
.showcover-enter,
.showcover-leave-active {
  opacity: 0;
}
.back_cover {
  position: fixed;
  .wh(100%, 100%);
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}
.shop_list_container {
  margin-top: 65px;
}
</style>

