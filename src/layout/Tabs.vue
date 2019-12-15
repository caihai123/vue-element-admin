<template>
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
</template>

<script>
export default {
  data() {
    return {
      tabsItem: [
        { id: "1", label: "首页", to: "/", active: true },
        { id: "2", label: "文档", to: "/", active: false },
        { id: "3", label: "引导页", to: "/", active: false },
        { id: "4", label: "指令权限", to: "/", active: false }
      ]
    };
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

.tabs .is-active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}
.tabs .is-active::before {
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