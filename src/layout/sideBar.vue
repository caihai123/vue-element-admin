// 递归组件，用于渲染导航菜单
<template>
  <fragment v-if="!item.hidden">
    <el-submenu v-if="item.children&&item.children.length>1" :index="item.path">
      <template slot="title">
        <Item :icon="item.meta.icon" :title="item.meta.title"></Item>
      </template>
      <side-bar v-for="route in item.children" :key="route.path" :item="route"></side-bar>
    </el-submenu>

    <router-link
      class="router-link"
      v-else-if="item.children&&item.children.length==1"
      :to="item.children[0].path"
    >
      <el-menu-item :index="item.children[0].path">
        <Item :icon="item.children[0].meta.icon" :title="item.children[0].meta.title"></Item>
      </el-menu-item>
    </router-link>

    <router-link class="router-link" v-else :to="item.path">
      <el-menu-item :index="item.path">
        <Item :icon="item.meta.icon" :title="item.meta.title"></Item>
      </el-menu-item>
    </router-link>
  </fragment>
</template>

<script>
import Item from "./Item";
export default {
  components: { Item },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  name: "side-bar",
  methods: {}
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