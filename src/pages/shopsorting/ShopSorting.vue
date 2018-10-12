<template>
    <div>
         <Header :mytitle="sortname" goback="true"></Header>
         <Sortmenu></Sortmenu>
         <Card class="sortshoplist"></Card>
    </div>
</template>
<script>
import { Header, Card, Sortmenu } from "@/components";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: null
    };
  },
  created() {},
  computed: {
    ...mapGetters(["sortname"])
  },
  components: {
    Header,
    Card,
    Sortmenu
  }
};
</script>

<style lang="less" scoped>
.sortshoplist {
  margin-top: 40px;
}
</style>

