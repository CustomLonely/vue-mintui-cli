<template>
  <div class="main">
    <mt-field label="用户名" placeholder="请输入用户名"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password">
      <mt-switch :value.sync="value" name="c..."></mt-switch>
    </mt-field>
    <mt-field label="验证码" class="security_code">
      <img src="../../assets/images/timg.jpg" class="security_code_img">

    </mt-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
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
}
</style>
