<template>
    <div class="sortmenu">
        <ul class="menuname">
            <li @click="toggle($event)" v-for="(item,index) in menuList" :key="index">
                {{item.menuname}}
                <i :class="down?'icon-ic_arrowright-':'icon-ic_arrowleft--'" class="icon"></i>
            </li>
     
        </ul>
        <mt-popup v-model="popupVisible2" position="top" class="mint-popup-4 dropdownmenu" :modal="false">
               <mt-button @click.native="popupVisible2 = false;down=false" size="large" type="primary">关闭 popup</mt-button>
        </mt-popup>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        { menuname: "分类" },
        { menuname: "排序" },
        { menuname: "筛选" }
      ],
      popupVisible2: false,
      down: false,
      currentIndex: null
    };
  },
  methods: {
    toggle(e) {
      //   this.currentIndex = this.$refs.menuitem.key;
      //   console.log(e.currentTarget);
      this.down = !this.down;
      this.popupVisible2 = !this.popupVisible2;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/basic";
.sortmenu {
  margin-top: 40px;
  width: 100%;
  .icon {
    color: extract(@blackColor, 3);
  }
  .menuname {
    display: flex;
    height: 26px;
    justify-content: center;
    align-items: center;
    li {
      text-align: center;
      flex: 0.33;
      border-right: 1px solid extract(@blackColor, 2);
    }
    li:last-child {
      border: none;
    }
  }

  .dropdownmenu {
    margin-top: 68px;
    width: 100%;
  }
}
</style>


