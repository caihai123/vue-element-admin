<template>
  <scroll-pane ref="scrollPane" class="tags-view-wrapper">
    <router-link class="tabs-item" to="/index">首页</router-link>
    <draggable
      v-model="tabsItem"
      v-bind="options"
      group="people"
      @start="drag=true"
      @end="drag=false"
      tag="span"
    >
      <transition-group type="transition" name="flip-list">
        <router-link
          v-for="(item,index) in tabsItem"
          :key="item.to"
          ref="tag"
          class="tabs-item"
          :to="item.to"
        >
          {{item.title}}
          <i class="el-icon-close" @click.prevent.stop="delTabs(index)"></i>
        </router-link>
      </transition-group>
    </draggable>
  </scroll-pane>
</template>

<script>
import draggable from "vuedraggable";
import store from "./../store";
import ScrollPane from "./ScrollPane";
export default {
  components: {
    draggable,
    ScrollPane
  },
  data() {
    return {
      tabsItem: store.tabsItem,
      options: {
        animation: 300, //拖动过程中的延时动画
        forceFallback: false, //是否显示原生的html5的拖放
        ghostClass: "ghost-class", //拖动项的类名
        scroll: true, //当排序的容器是个可滚动的区域，拖放可以引起区域滚动
        scrollSensitivity: 100, //就是鼠标靠近边缘多远开始滚动默认30
        scrollSpeed: 500 //滚动速度，单位应该是:像素/秒
      }
    };
  },
  mounted() {
    store.addTabs(this.$route);
  },
  methods: {
    //删除tabs
    delTabs(index) {
      var path = this.path;
      store.delTabs(index, path);
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        if (this.$route.path === "/index") {
          this.$refs.scrollPane.moveCenter({
            to: "/index"
          });
        } else {
          for (const tag of tags) {
            if (tag.to === this.$route.path) {
              this.$refs.scrollPane.moveCenter(tag);
              break;
            }
          }
        }
      });
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
    },
    $route() {
      //这样操作之后用任意方式打开的页面均会生成tabs页面，考虑到后期很多页面是不需要打开tabs的，后期应该在路由表中添加是否在tabs中打开的标识
      store.addTabs(this.$route);
      this.moveToCurrentTag();
    }
  }
};
</script>

<style scoped>
.tabs-item {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  margin-right: 5px;
  padding: 0 8px;
  border: 1px solid #dcdfe6;
  cursor: pointer;
}
.tabs-item:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.tabs-item i {
  margin-left: 5px;
}

.router-link-active {
  background-color: #409eff;
  color: #fff;
  border-color: #409eff;
}
.router-link-active:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
.router-link-active::before {
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