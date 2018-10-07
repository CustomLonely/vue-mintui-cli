<template>
 <div class="header">
    <mt-header  :title="mytitle">
    <mt-button  slot="left" v-if="logo">ele.me</mt-button>    
    <mt-button  @click="goPage" icon="back" slot="left" v-if="goback"></mt-button>
    <mt-button slot="right"  v-if="changecity" @click="$router.push('/home')">切换城市</mt-button>
    <mt-button  slot="left" v-show="search" @click="$router.push('/search')"><i class="icon icon-magnifier"></i></mt-button>   
    <mt-button  slot="right"  v-if="login" @click="$router.push('/login')">登陆|注册</mt-button>
    <mt-button  slot="right"  v-if="user">
      <i class="icon icon-tab_icon3"></i>
    </mt-button>
  
  </mt-header>
 </div>
</template>

<script>
export default {
  props: ["mytitle", "goback", "changecity", "logo", "login", "search", "user"],
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .mint-header {
    background-color: extract(@blueColor, 8);
  }
  .mintui-back,
  .mint-button-text {
    color: #fff;
  }
  .mint-header-title {
    font-size: 18px;
    color: #fff;
  }
}
</style>
