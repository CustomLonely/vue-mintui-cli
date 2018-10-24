<template>
  <div class="login" >
     <Header :mytitle="content" goback="true" ref='header' @click="goPage"></Header>
    <mt-field class="username" label="用户名" placeholder="请输入用户名" v-model="username" disableClear></mt-field>
    <mt-field label="密码" :attr='{name:"password"}' placeholder="请输入密码" :type="showPassword?'text':'password'" v-model="password" disableClear>
      <mt-switch v-model="showPassword" ></mt-switch>
    </mt-field>
    <mt-field label="验证码" class="security_code" disableClear v-model="securityCode">
      <div class="security_code_img" @click="getSecurityCode">
         <img v-show="imgUrl"  :src="imgUrl" >
      </div>
         </mt-field>
     <mt-button class="login_button" @click="acountLogin" type="primary">登录</mt-button>
  </div>
</template>

<script>
import { Header } from "@/components/index.js";
import { postCaptchas, login } from "@/ports";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      showPassword: false,
      content: "密码登录",
      username: "",
      password: "",
      imgUrl: null,
      securityCode: ""
    };
  },
  created() {
    this.getSecurityCode();
  },

  methods: {
    ...mapMutations(["RECORD_USERINFO"]),
    getSecurityCode() {
      postCaptchas().then(res => {
        this.imgUrl = res.code;
      });
    },

    acountLogin() {
      login(this.username, this.password, this.securityCode).then(
        res => {
          console.log(res);
          if (res.status == 0) {
            this.getSecurityCode();
            MessageBox("提示", res.message);
          } else {
            this.RECORD_USERINFO(res);
            this.$router.go(-1);
          }
        },
        err => {
          console.log(err);
        }
      );
    },

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
  .mint-field-core:active {
    text-decoration: none;
  }
  .username {
    margin-top: 40px;
  }
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
      width: 48px;
      height: 17px;
      img {
        width: 100%;
        height: 100%;
      }
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
