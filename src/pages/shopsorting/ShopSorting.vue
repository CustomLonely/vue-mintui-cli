<template>
    <div>
         <Header :mytitle="title" goback="true"></Header>
         
    </div>
</template>
<script>
import { Header, Card } from "@/components";
export default {
  data() {
    return {
      title: null
    };
  },
  created() {
    this.title = this.$route.params.title;
  },
  components: {
    Header,
    Card
  }
};
</script>

<style lang="less" scoped>
</style>

