<template>
  <div class="navbar">
    <div style="display: flex;">
      <div class="hamburger" style="padding: 0 15px" @click="setCollapse(!store.isCollapse)">
        <i :class="{'el-icon-s-unfold':store.isCollapse,'el-icon-s-fold':!store.isCollapse}"></i>
      </div>
      <Breadcrumb />
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
            <el-dropdown-item divided>退出登陆</el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
import store from "./../store";
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      store: store
    };
  },
  methods: {
    setCollapse(collapse) {
      this.store.isCollapse = collapse;
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