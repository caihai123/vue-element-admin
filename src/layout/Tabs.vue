<template>
  <div class="tabs">
    <router-link v-for="item in tabsItem" :key="item.to" class="tabs-item" :to="item.to">
      {{item.title}}
      <i v-if="!item.fixation" class="el-icon-close"></i>
    </router-link>
  </div>
</template>

<script>
import store from "./store";
export default {
  data() {
    return {
      tabsItem: store.tabsItem
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      const router = this.$route;
      store.addTabs({
        to: router.path,
        title: router.meta.title
      });
    }
  }
};
</script>

<style scoped>
.tabs {
  height: 34px;
  display: flex;
  padding: 4px 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  font-size: 12px;
}

.tabs .tabs-item {
  height: 24px;
  line-height: 24px;
  margin-right: 5px;
  padding: 0 8px;
  border: 1px solid #d8dce5;
  cursor: pointer;
}

.tabs .tabs-item i {
  margin-left: 5px;
}

.tabs .router-link-active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}
.tabs .router-link-active::before {
  content: "";
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}
</style>