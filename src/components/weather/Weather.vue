<template>
    <div>
        <i class="icon icon-tianqi-baoxue" v-if="qihou=='暴雪'"></i>
        <i class="icon icon-tianqi-zhongyu" v-if="qihou=='中雨'"></i>
        <i class="icon icon-tianqi-baoyu" v-if="qihou=='暴雨'"></i>
        <i class="icon icon-tianqi-qing" v-if="qihou=='晴'"></i>
        <i class="icon icon-tianqi-wu"  v-if="qihou=='雾'"></i>
        <i class="icon icon-tianqi-daxue1" v-if="qihou=='大雪'"></i>
        <i class="icon icon-xiaoyu" v-if="qihou=='小雨'"></i>
    </div>
</template>
<script>
export default {
  props: ["qihou"]
};
</script>
<style lang="less" scoped>
</style>


