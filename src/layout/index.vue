<template>
  <el-container class="admin-index">
    <div v-if="isDiminutive&&!isCollapse" @click="isCollapse=!isCollapse" class="drawer-bg"></div>

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
        router
      >
        <side-bar v-for="route in routes" :key="route.path" :item="route"></side-bar>
      </el-menu>
    </el-scrollbar>

    <el-container>
      <el-header height="84px">
        <div class="navbar">
          <div style="display: flex;">
            <div class="hamburger" style="padding: 0 15px" @click="isCollapse=!isCollapse">
              <i :class="{'el-icon-s-unfold':isCollapse,'el-icon-s-fold':!isCollapse}"></i>
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
          <div style="display: flex;">
            <div class="hamburger">
              <i class="el-icon-search"></i>
            </div>
            <div class="hamburger">
              <i class="el-icon-rank"></i>
            </div>
            <div class="hamburger">
              <i class="el-icon-message-solid"></i>
            </div>
            <el-dropdown trigger="click" @command="handleCommand">
              <div class="hamburger" style="padding:4px 8px;margin-right:20px;cursor: pointer;">
                <el-avatar
                  shape="square"
                  :size="40"
                  src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                ></el-avatar>
                <i class="el-icon-caret-bottom" style="font-size: 14px"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-s-home" command="/">首页</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-custom" command="/menu3/menu3-2/menu3-2-1">个人中心</el-dropdown-item>
                <el-dropdown-item divided icon="el-icon-back" command="/login">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="tabs">
          <div
            v-for="item in tabsItem"
            :key="item.id"
            class="tabs-item"
            :class="{'is-active':item.active}"
          >
            {{item.label}}
            <i class="el-icon-close"></i>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import sideBar from "./sideBar";
var _ = require("lodash");
export default {
  name: "index",
  components: {
    sideBar
  },
  data: function() {
    return {
      isCollapse: false,
      isDiminutive: false, //是否小屏
      routes: [],
      breadcrumb: [],
      tabsItem: [
        { id: "1", label: "首页", to: "/", active: true },
        { id: "2", label: "文档", to: "/", active: false },
        { id: "3", label: "引导页", to: "/", active: false },
        { id: "4", label: "指令权限", to: "/", active: false }
      ]
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    var self = this;
    self.routes = this.$router.options.routes;
    self.getBreadcrumb();
    self.onResize();
    window.addEventListener("resize", _.debounce(self.onResize, 100), false);
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
    handleCommand(path) {
      this.$router.push({
        path,
        query: {
          t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      });
    },
    //窗口大小改变时执行
    onResize() {
      if (document.body.offsetWidth < 1200) {
        if (!this.isDiminutive) {
          this.isDiminutive = true;
          this.isCollapse = true;
        }
      } else {
        if (this.isDiminutive) {
          this.isDiminutive = false;
          this.isCollapse = false;
        }
      }
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
    }
  }
};
</script>

<style>
.admin-index {
  height: 100%;
}
.admin-index .el-header {
  padding: 0;
}

.admin-index .el-breadcrumb__inner.is-link,
.el-breadcrumb__separator {
  font-weight: 400;
}

.admin-index .el-menu-vertical:not(.el-menu--collapse) {
  width: 210px;
}

.admin-index .scrollbar-wrapper {
  overflow-x: hidden !important;
}
.admin-index .el-scrollbar {
  height: 100%;
  transition: margin-left 0.28s;
  background-color: #304156;
  z-index: 1002;
}

.admin-index .navbar {
  height: 50px;
  display: flex;
  justify-content: space-between;
}

.admin-index .navbar .hamburger {
  height: 48px;
  line-height: 48px;
  padding: 0 8px;
  font-size: 20px;
  color: rgb(0, 0, 0);
  box-sizing: border-box;
  border-radius: 0;
  cursor: pointer;
}

.admin-index .navbar .hamburger:hover {
  background: rgba(0, 0, 0, 0.025);
}

.admin-index .tabs {
  height: 34px;
  display: flex;
  padding: 4px 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  font-size: 12px;
}

.admin-index .tabs .tabs-item {
  height: 24px;
  line-height: 24px;
  margin-right: 5px;
  padding: 0 8px;
  border: 1px solid #d8dce5;
  cursor: pointer;
}

.admin-index .tabs .tabs-item i {
  margin-left: 5px;
}

.admin-index .tabs .is-active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}

.admin-index .tabs .is-active::before {
  content: "";
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}
.admin-index .drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.admin-index .el-menu {
  border-right: none;
}
</style>
