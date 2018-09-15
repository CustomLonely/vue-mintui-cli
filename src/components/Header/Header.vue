<template>
  <div class="header" @click="goPage()">
    <mt-header :title="mytitle">
      <mt-button @click="$router.go(-1)" slot="left" v-if="goback" icon="back"></mt-button>
      <mt-button slot="right" v-if="changecity" @click="$router.push('home')">切换城市</mt-button>
      <mt-button v-text="addressinfo" v-if="cityaddress" slot="left"></mt-button>
      <slot name="edit"></slot>
    
      <slot name="changeLogin"></slot>
    </mt-header>
  </div>
</template>

<script>
export default {
  props: ["mytitle", "goback", "changecity", "cityaddress", "addressinfo"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    goPage() {
      console.log(123);
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
    color: extract(@whiteColor, 1);
  }
  .mint-header-title {
    font-size: 18px;
    color: extract(@whiteColor, 1);
  }
  .mint-header-button {
    font-size: 16px;
    color: extract(@whiteColor, 1);
  }
}
</style>
