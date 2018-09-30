<template>
  <div class="login" >
     <Header :mytitle="content" goback="true" ref='header' @click="goPage"></Header>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username" disableClear></mt-field>
    <mt-field label="密码" :attr='{name:"password"}' placeholder="请输入密码" type="password" v-model="password" disableClear>
      <mt-switch v-model="showPassword" @change="toggleShow"></mt-switch>
    </mt-field>
    <mt-field label="验证码" class="security_code" disableClear v-model="securityCode">
      <img :src="imgUrl" class="security_code_img">
    </mt-field>
     <mt-button class="login_button" @click="login" type="primary">登录</mt-button>
  </div>
</template>

<script>
import { Header } from "../../components/index.js";
import { postCaptchas, login } from "../../ports";
export default {
  data() {
    return {
      showPassword: false,
      content: "密码登录",
      username: "",
      password: "",
      imgUrl: "",
      securityCode: ""
    };
  },
  created() {
    this.getSecurityCode();
  },
  methods: {
    async getSecurityCode() {
      let res = await postCaptchas;
      this.imgUrl = res.code;
    },
    login() {
      console.log(this.username, this.password, this.securityCode);
      login(this.username, this.password, this.securityCode).then(
        res => {
          console.log(res);
          if (res.status == 0) {
            this.getSecurityCode();
          }
        },
        err => {
          console.log(err);
        }
      );
      this.getSecurityCode();
    },
    toggleShow() {},
    goPage() {
      this.$router.back(-1);
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less">
.login {
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
