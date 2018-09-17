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
import Login from "./pages/other/Login.vue";
export default {
  data() {
    return {
      content: "密码登录",
      isload: false
    };
  },
  components: { Login }
};
</script>

 <style lang="less">
#app {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
}
.spinner{
  display: none;
}
.container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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

