<template>
  <div class="main">
     <Header :mytitle="content" ref='header' @click="goPage"></Header>
    <mt-field label="用户名" placeholder="请输入用户名" disableClear></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" disableClear>
      <mt-switch :value.sync="value" name="c..."></mt-switch>
    </mt-field>
    <mt-field label="验证码" class="security_code" disableClear>
      <img :src="imgUrl" class="security_code_img">
    </mt-field>
     <mt-button class="login_button" type="primary">登录</mt-button>
  </div>
</template>

<script>
import { Header } from "../../components/index.js";
import { postCaptchas } from "../../ports";
export default {
  data() {
    return {
      value: "",
      content: "密码登录",
      imgUrl: ""
    };
  },
  created() {
    this.getSecurityCode();
  },
  methods: {
    getSecurityCode() {
      postCaptchas.then(
        res => {
          console.log(res);
          this.imgUrl = res.code;
        },
        err => {
          console.log(err);
        }
      );
    },
    postCaptchas() {},
    goPage() {
      this.$router.back(-1);
      console.log(this.$router);
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less">
.main {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .mint-cell {
    border-bottom: 1px solid #eee;
    .mint-cell-wrapper {
      .mint-cell-title {
        width: 60px;
      }
    }
  }
  .security_code {
    display: flex;
    max-height: 48px;
    align-items: center;
    justify-content: space-between;
    .security_code_img {
      max-width: 48px;
      width: auto;
    }
    .btns {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .login_button {
    margin: 0 12px;
  }
}
</style>
