<template>
  <div class="container">
   
	<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
           
			</keep-alive>
    	</transition>
      <transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
       
		</transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "密码登录"
    };
  },
  watch: {}
};
</script>

 <style lang="less">
@import "./style/base.less";
@import "./assets/images/iconfont/icon.css";
#app {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.spinner {
  display: none;
}
.icon {
  color: #fff;
}
.container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
  height: 100%;
}
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>

