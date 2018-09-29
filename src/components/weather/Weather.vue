<template>
    <div>
        <i class="icon icon-tianqi-baoxue" v-if="baoxue=='暴雪'"></i>
        <i class="icon icon-tianqi-zhongyu" v-if="zhongyu=='中雨'"></i>
        <i class="icon icon-tianqi-baoyu" v-if="baoyu=='暴雨'"></i>
        <i class="icon icon-tianqi-qing" v-if="qing='晴'"></i>
        <i class="icon icon-tianqi-wu"  v-if="wu=='雾'"></i>
        <i class="icon icon-tianqi-daxue1" v-if="daxue=='大雪'"></i>
        <i class="icon icon-xiaoyu" v-if="xiaoyu='小雨'"></i>
    </div>
</template>
<script>
export default {
  props: ["baoxue", "zhongyu", "baoyu", "daxue", "wu", "qing", "xiaoyu"]
};
</script>
<style lang="less" scoped>
</style>


