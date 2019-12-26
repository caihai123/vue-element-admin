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
            <router-view :key="key" />
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
    return {};
  },
  computed: {
    key() {
      return this.$route.path;
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