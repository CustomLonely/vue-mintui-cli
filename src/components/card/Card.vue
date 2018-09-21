<template>
    <div class="carditem">
        <div class="cardleft">
            <div class="imgbox">
                <img :src="imgurl" alt="" class="cardimg">
            </div>
            <div>
                <p>{{shopname}}</p>
                <p>{{count}}</p>
                <p></p>
            </div>
        </div>
        <div class="cardright">
            <p></p>
            <p></p>
            <p></p>
        </div>
    </div>
</template>
<script>
export default {
  props: ["imgurl", "shopname", "count"],
  data() {
    return {};
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


