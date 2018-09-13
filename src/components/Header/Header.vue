<template>
 <div class="header">
    <mt-header :title="mytitle">    
    <mt-button  @click="goPage()" icon="back" slot="left"></mt-button>
    <mt-button slot="right" ></mt-button>
     <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <slot name="changecity"></slot>
        <slot name="changeLogin"></slot>
  </mt-header>
 </div>
</template>

<script>
export default {
  props: ["mytitle"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    goPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import "../../style/basic.less";
.header {
  min-height: 40px;

  .mint-header {
    background-color: extract(@blueColor, 8);
  }
  .mintui-back {
    color: #fff;
  }
  .mint-header-title {
    font-size: 18px;
    color: #fff;
  }
}
</style>
