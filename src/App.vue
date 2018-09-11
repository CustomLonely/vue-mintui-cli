<template>
  <div id="app">
<<<<<<< HEAD
 
    <Login v-if='$store.state.isload'></Login>
      <mt-tabbar  v-else>
      <mt-tab-item id="tab1" name='food'>
        <img slot="icon" src="./assets/images/burger.png">
        tab1
      </mt-tab-item>
      <mt-tab-item id="tab2"  name='order'>
        <img slot="icon" src="./assets/images/burger.png">
        tab2
      </mt-tab-item>
      <mt-tab-item id="tab3" name='search'>
        <img slot="icon" src="./assets/images/burger.png">
        tab3
      </mt-tab-item>
      <mt-tab-item id="tab4" name='user'>
        <img slot="icon" src="./assets/images/burger.png">
        tab4
      </mt-tab-item>
    </mt-tabbar>
=======
    <Header :mytitle="content"></Header>
    <Login></Login>
>>>>>>> f3bf9c5cb26d9f378ff5c3205bdeda7aad488254
  </div>
</template>

<script>
<<<<<<< HEAD
import Login from "./pages/other/Login.vue";

export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$store.state.isload);
  },
  components: { Login }
=======
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
>>>>>>> f3bf9c5cb26d9f378ff5c3205bdeda7aad488254
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
