<template>
  <div id="app">
    <Header :mytitle="content"></Header>
    <Login></Login>
  </div>
</template>

<script>
import { Header } from "./components/index.js";
import Login from "./pages/other/Login.vue";
export default {
  data() {
    return {
      content: "密码登录",
      isload: false
    };
  },
  components: { Header, Login }
};
</script>

<style>
#app {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
}
</style>
