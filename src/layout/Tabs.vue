<template>
  <div class="tabs">
    <router-link class="tabs-item" to="/index">首页</router-link>
    <draggable
      v-model="tabsItem"
      v-bind="options"
      group="people"
      @start="drag=true"
      @end="drag=false"
    >
      <transition-group type="transition" name="flip-list">
        <router-link
          v-for="(item,index) in tabsItem"
          :key="item.to"
          class="tabs-item"
          :to="item.to"
        >
          {{item.title}}
          <i class="el-icon-close" @click.prevent.stop="delTabs(index)"></i>
        </router-link>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import store from "./store";
export default {
  components: {
    draggable
  },
  data() {
    return {
      tabsItem: store.tabsItem,
      options: {
        animation: 300, //拖动过程中的延时动画
        forceFallback: false, //是否显示原生的html5的拖放
        ghostClass: "ghost-class", //拖动项的类名
        scroll: true, //当排序的容器是个可滚动的区域，拖放可以引起区域滚动
        scrollSensitivity: 50, //就是鼠标靠近边缘多远开始滚动默认30
        scrollSpeed: 500 //滚动速度，单位应该是:像素/秒
      }
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
    },
    //删除tabs
    delTabs(index) {
      var path = this.path;
      store.delTabs(index, path);
    }
  },
  computed: {
    path() {
      return this.$route.path;
    }
  },
  watch: {
    //draggable组件导致的tabsItem改变不会作用到store里，所有手动改变，不然会有bug
    tabsItem: function() {
      store.tabsItem = this.tabsItem;
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
  display: inline-block;
  height: 24px;
  line-height: 24px;
  margin-right: 5px;
  padding: 0 8px;
  border: 1px solid #dcdfe6;
  cursor: pointer;
}
.tabs .tabs-item:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.tabs .tabs-item i {
  margin-left: 5px;
}

.tabs .router-link-active {
  background-color: #409eff;
  color: #fff;
  border-color: #409eff;
}
.tabs .router-link-active:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
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
.ghost-class {
  opacity: 0;
}
/*因为有过渡动画，导致在删除tabs时会有延迟，不太好看，暂时隐藏掉*/
/* .flip-list-move {
  transition: transform 0.5s;
} */
.el-icon-close {
  border-radius: 50%;
  font-size: 12px;
}
.el-icon-close:hover {
  background-color: #c0c4cc;
  color: #fff;
}
</style>