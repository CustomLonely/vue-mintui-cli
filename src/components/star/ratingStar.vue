<template>
    <div class="rating_container">
        <section class="star_container">
            <i class="icon icon-ic_collectfull- grey_fill" v-for="num in 5" :key="num"></i>
        </section>
        <div class="staractive" :style="'width:' + rating*2/5 + 'rem'">
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
  .wh(2rem, 0.4rem);
  .star_overflow {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  .star_container {
    position: absolute;
    display: flex;
    width: 2rem;
    height: 0.4rem;
    top: -0.02rem;
    left: -0.02rem;
    .grey_fill {
      fill: #d1d1d1;
    }
    .orange_fill {
      fill: #ff9a0d;
    }
  }
}
</style>


