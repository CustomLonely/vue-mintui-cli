<template>
    <ul>
        <router-link to="" tag="li" class="carditem" v-for="(item,index) in shopList" :key="index">
            <div class="cardleft">
                <div class="imgbox">
                    <img :src="item.image_path|src" alt="" class="cardimg">
                </div>
                <div>
                    <p>{{name}}</p>
                    <p>{{count}}</p>
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
export default {
  data() {
    return {
      shopList: []
    };
  }
};
</script>
<style lang="less">
.carditem {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  .cardleft {
    .cardimg {
      width: 63px;
      height: 63px;
    }
  }
}
</style>


