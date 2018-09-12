<template>
 <div class="header">
    <mt-header :title="mytitle">
    <slot name='left'></slot>
    <slot name='right'></slot>
    <mt-button @click="goPage()" icon="back" slot="left"></mt-button>
  </mt-header>
 </div>
</template>

<script>
export default {
  props: ["mytitle"],
  data() {
    return {};
  },
  created() {
    console.log(this.mytitle);
  },
  mounted() {
    console.log(this.mytitle);
  },
  methods: {
    goPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
header {
  min-height: 40px;
  background-color: #3190e8;
}
</style>
