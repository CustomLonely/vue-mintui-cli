<template>
    <div class="sortmenu">
        <ul class="menuname">
            <li>
                分类
            </li>
            <li>
                排序
            </li>
            <li>
                筛选
            </li>
        </ul>
        <mt-popup v-model="popupVisible2" position="top" class="mint-popup-2" :modal="false">
            <p>更新成功</p>
        </mt-popup>
    </div>
</template>

<script>
export default {
  data() {
    return {
      popupVisible2: false
    };
  }
};
</script>

<style lang="less" scoped>
.sortmenu {
  margin-top: 40px;
  width: 100%;
  .menuname {
    display: flex;
    justify-content: space-around;
  }
}
</style>


