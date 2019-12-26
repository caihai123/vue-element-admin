<template>
  <div class="navbar">
    <div style="display: flex;">
      <div class="hamburger" style="padding: 0 15px" @click="setCollapse(!store.isCollapse)">
        <i :class="{'el-icon-s-unfold':store.isCollapse,'el-icon-s-fold':!store.isCollapse}"></i>
      </div>
      <el-breadcrumb separator="/" style="line-height: 48px;padding-left: 8px;">
        <el-breadcrumb-item :to="{path:'/',query: {t: +new Date()}}">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="item in breadcrumb"
          :to="{path:item.path,query: {t: +new Date()}}"
          :key="item.path"
        >{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="display: flex;margin-right:20px;">
      <div class="hamburger">
        <i class="el-icon-search"></i>
      </div>
      <div class="hamburger">
        <i class="el-icon-rank"></i>
      </div>
      <div class="hamburger">
        <i class="el-icon-message-solid"></i>
      </div>
      <el-dropdown trigger="click" class="hamburger">
        <div style="margin-top:5px">
          <el-avatar shape="square" :size="40" :src="require('../../assets/portrait.gif')"></el-avatar>
          <i style="font-size:14px;" class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </router-link>
          <router-link to="/login">
            <el-dropdown-item divided>登出</el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import store from "./../store";
export default {
  data() {
    return {
      store: store,
      breadcrumb: []
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.breadcrumb = this.$route.matched.filter(
        item =>
          item.meta &&
          item.meta.title &&
          item.path !== "/" &&
          item.path !== "/index"
      );
    },
    setCollapse(collapse) {
      this.store.isCollapse = collapse;
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>

<style scoped>
.navbar {
  height: 50px;
  display: flex;
  justify-content: space-between;
}

.navbar .hamburger {
  height: 48px;
  line-height: 48px;
  padding: 0 8px;
  font-size: 20px;
  color: rgb(0, 0, 0);
  box-sizing: border-box;
  border-radius: 0;
  cursor: pointer;
}

.navbar .hamburger:hover {
  background: rgba(0, 0, 0, 0.025);
}
</style>
<style>
.el-breadcrumb__inner.is-link,
.el-breadcrumb__separator {
  font-weight: 400;
}
</style>