<template>
    <div class="rating_container">
        <section class="star_container">
            <i class="icon icon-ic_collectfull- grey_fill" v-for="num in 5" :key="num"></i>
        </section>
        <div class="star_overflow" :style="'width:' + (rating/5)*60 + 'px'">
            <section class="star_container">
                <i class="icon icon-ic_collectfull- orange_fill" v-for="num in 5" :key="num"></i>
            </section>
        </div>
    </div>
</template>
<script>
export default {
  props: ["rating"]
};
</script>
<style lang="less" scoped>
@import "../../style/basic";
.rating_container {
  position: relative;
  top: 0.2rem;
  .wh(60px, 18px);
  .star_overflow {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  .star_container {
    position: absolute;
    display: flex;
    width: 60px;
    height: 18px;

    .grey_fill {
      color: #d1d1d1;
    }
    .orange_fill {
      color: #ff9a0d;
    }
  }
}
</style>


