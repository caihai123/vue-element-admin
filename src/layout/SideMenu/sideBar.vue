// 递归组件，用于渲染导航菜单
<template>
  <fragment v-if="!item.hidden">
    <template v-if="item.children">
      <el-submenu v-if="item.children.length>1" :index="item.path">
        <template slot="title">
          <Item :icon="item.meta.icon" :title="item.meta.title"></Item>
        </template>
        <side-bar v-for="route in item.children" :key="route.path" :item="route"></side-bar>
      </el-submenu>

      <side-bar v-else :key="item.children[0].path" :item="item.children[0]"></side-bar>
    </template>

    <div v-else class="router-link" @click="router(item)">
      <el-menu-item :index="item.path">
        <Item :icon="item.meta.icon" :title="item.meta.title"></Item>
      </el-menu-item>
    </div>
  </fragment>
</template>

<script>
import Item from "./Item";
import store from "@/layout/store";
export default {
  name: "side-bar",
  components: { Item },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    router: function(item) {
      var to = item.redirect || item.path;
      const { fullPath } = this.$route;
      if (fullPath === to) {
        this.$router.replace({
          path: "/redirect" + fullPath
        });
      } else {
        this.$router.push(to);
      }
      store.addTabs({
        to: to,
        name: item.name,
        title: item.meta.title
      });
    }
  }
};
</script>
<style scoped>
.router-link {
  display: inline-block;
  width: 100%;
  overflow: hidden;
}

.router-link-active {
  text-decoration: none;
}
</style>