<template>
  <el-container class="admin-index">
    <SideMenu :sideShow="isCollapse" @menuSwitch="menuSwitch" />
    <el-container>
      <el-header height="84px">
        <Navbar :sideShow="isCollapse" @menuSwitch="menuSwitch" />
        <Tabs />
      </el-header>
      <el-main>
        <div class="app-main">
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </div>
      </el-main>
    </el-container>
    <el-backtop target="main"></el-backtop>
  </el-container>
</template>

<script>
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
export default {
  name: "index",
  components: {
    SideMenu,
    Navbar,
    Tabs
  },
  data: function() {
    return {
      isCollapse: false
    };
  },
  methods: {
    //这个逻辑有点奇怪，Navbar组件初始化的时候会使此组件执行menuSwitch函数
    menuSwitch(isCollapse) {
      this.isCollapse = isCollapse;
    }
  }
};
</script>

<style scoped>
.admin-index {
  height: 100%;
}
.admin-index .el-header {
  padding: 0;
}

.app-main {
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>