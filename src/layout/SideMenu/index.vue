<template>
  <div class="side-menu">
    <div v-if="isDiminutive&&!isCollapse" @click="setCollapse(!isCollapse)" class="drawer-bg"></div>
    <el-scrollbar
      wrap-class="scrollbar-wrapper"
      :style="{marginLeft:isDiminutive && isCollapse ? '-210px' : '0',position:isDiminutive?'fixed':'relative'}"
    >
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        background-color="#304156"
        text-color="rgb(191, 203, 217)"
        unique-opened
        :collapse="!isDiminutive&&isCollapse"
      >
        <side-bar v-for="(route,index) in routes" :key="index" :item="route"></side-bar>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import sideBar from "./sideBar";
var { debounce } = require("lodash");
export default {
  components: {
    sideBar
  },
  data() {
    return {
      isDiminutive: false, //是否小屏
      routes: []
    };
  },
  created() {
    var self = this;
    self.routes = this.$router.options.routes;
    self.onResize();
    window.addEventListener("resize", debounce(self.onResize, 100), false);
  },
  methods: {
    //窗口大小改变时执行
    onResize() {
      if (document.body.offsetWidth < 1200) {
        if (!this.isDiminutive) {
          this.isDiminutive = true;
          this.$store.commit("setCollapse", true);
        }
      } else {
        if (this.isDiminutive) {
          this.isDiminutive = false;
          this.$store.commit("setCollapse", false);
        }
      }
    },
    setCollapse(collapse) {
      this.$store.commit("setCollapse", collapse);
    }
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    isCollapse() {
      return this.$store.state.layout.isCollapse;
    }
  },
  watch: {
    $route() {
      //在小屏下路由改变时隐藏侧边栏
      if (this.isDiminutive == true) {
        this.$store.commit("setCollapse", true);
      }
    }
  }
};
</script>

<style>
.side-menu .el-menu-vertical:not(.el-menu--collapse) {
  width: 210px;
}
.side-menu .scrollbar-wrapper {
  overflow-x: hidden !important;
}
.side-menu .el-scrollbar {
  height: 100%;
  transition: margin-left 0.28s;
  background-color: #304156;
  z-index: 2002;
}
.side-menu .el-menu {
  border-right: none;
}
</style>
<style scoped>
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 1002;
}
</style>