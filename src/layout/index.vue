<template>
  <el-container class="admin-index">
    <SideMenu />
    <el-container>
      <el-header height="84px">
        <Navbar />
        <Tabs />
      </el-header>
      <el-main>
        <div class="app-main">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="include">
              <router-view :key="key" />
            </keep-alive>
          </transition>
        </div>
      </el-main>
    </el-container>
    <el-backtop target="main">
      <el-tooltip effect="dark" content="回到顶部" placement="top">
        <div class="el-backtop" style="right: 40px; bottom: 40px;">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-tooltip>
    </el-backtop>
  </el-container>
</template>

<script>
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
export default {
  components: {
    SideMenu,
    Navbar,
    Tabs
  },
  computed: {
    key() {
      return this.$route.path;
    },
    include() {
      return this.$store.state.layout.include;
    }
  },
  created() {
    //初始化枚举
    this.$store.dispatch("init");
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