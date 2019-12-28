<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item key="/index">
        <router-link to="/index">首页</router-link>
      </el-breadcrumb-item>

      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        <router-link :to="{path:item.path}">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: []
    };
  },
  mounted() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.levelList = this.$route.matched.filter(
        item =>
          item.meta &&
          item.meta.title &&
          item.path !== "/" &&
          item.path !== "/index"
      );
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>

<style>
.app-breadcrumb {
  line-height: 48px;
  padding-left: 8px;
  font-size: 14px;
}
.app-breadcrumb .el-breadcrumb__inner a {
  font-weight: 400;
}
.app-breadcrumb
  .el-breadcrumb__item
  .el-breadcrumb__inner
  .router-link-exact-active {
  color: #97a8be;
}
.app-breadcrumb
  .el-breadcrumb__item
  .el-breadcrumb__inner
  .router-link-exact-active:hover {
  color: #97a8be;
}
</style>