<template>
 <div class="header">
    <mt-header :title="mytitle">
      <mt-button  slot="left" v-if="logo">ele.me</mt-button>    
    <mt-button  @click="goPage" icon="back" slot="left" v-if="goback"></mt-button>
    <mt-button slot="right" v-show="changecity" @click="$router.push('/home')">切换城市</mt-button>
      <mt-button  slot="left" v-if="search"><i class="icon icon-magnifier"></i></mt-button>   
   
    <mt-button  slot="right"  v-show="login" @click="$router.push('/login')">登陆|注册</mt-button>
    <mt-button  slot="right"  v-show="user">
      <i class="icon icon-tab_icon3"></i>
    </mt-button>
     
     <slot name="edit"></slot>
        <slot name="msite-title"></slot>
       
        <slot name="changeLogin"></slot>
  </mt-header>
 </div>
</template>

<script>
export default {
  props: ["mytitle", "goback", "changecity","logo","login","search","user"],
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
