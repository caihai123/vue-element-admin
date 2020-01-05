<template>
  <div class="container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        class="tabs-item"
        to="/index"
        @contextmenu.prevent.native="openMenu('/index',$event)"
      >首页</router-link>
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
            v-for="item in tabsItem"
            :key="item.to"
            ref="tag"
            class="tabs-item"
            :to="item.to"
            @contextmenu.prevent.native="openMenu(item,$event)"
          >
            {{item.title}}
            <i class="el-icon-close" @click.prevent.stop="delTabs(item)"></i>
          </router-link>
        </transition-group>
      </draggable>
    </scroll-pane>
    <ul
      v-show="contextmenu.visible"
      :style="{left:contextmenu.actuallyLeft+'px'}"
      class="contextmenu"
    >
      <li @click="refresh(contextmenu.item)">刷新</li>
      <li v-if="contextmenu.item !=='/index'" @click="delTabs(contextmenu.item)">关闭</li>
      <li @click="closeOthers(contextmenu.item)">关闭其他</li>
      <li @click="closeAll(contextmenu.item)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ScrollPane from "./ScrollPane";
// import throttle from "throttle-debounce/throttle";
//可以检测dom元素改变的插件
var elementResizeDetectorMaker = require("element-resize-detector");
export default {
  components: {
    draggable,
    ScrollPane
  },
  data() {
    return {
      options: {
        animation: 300, //拖动过程中的延时动画
        forceFallback: false, //是否显示原生的html5的拖放
        ghostClass: "ghost-class", //拖动项的类名
        scroll: true, //当排序的容器是个可滚动的区域，拖放可以引起区域滚动
        scrollSensitivity: 100, //就是鼠标靠近边缘多远开始滚动默认30
        scrollSpeed: 500 //滚动速度，单位应该是:像素/秒
      },
      contextmenu: {
        visible: false,
        item: null, //当前操作的tabs
        theoryLeft: 0, //理论上的left
        actuallyLeft: 0 //实际上的left
      },
      erdUltraFast: elementResizeDetectorMaker({
        strategy: "scroll" //<- For ultra performance.
      })
    };
  },
  mounted() {
    this.$store.commit("addTabs", this.$route);
  },
  methods: {
    moveToCurrentTag() {
      this.$nextTick(() => {
        if (this.$route.path === "/index") {
          this.$refs.scrollPane.moveCenter({
            to: "/index"
          });
        } else {
          const tags = this.$refs.tag;
          for (const tag of tags) {
            if (tag.to === this.$route.path) {
              this.$refs.scrollPane.moveCenter(tag);
              break;
            }
          }
        }
      });
    },
    //tabs点击右键执行的函数
    openMenu(item, event) {
      this.contextmenu.item = item;
      this.contextmenu.theoryLeft =
        event.toElement.offsetLeft + event.toElement.offsetWidth / 2 + 15;
      this.onResize();
      this.contextmenu.visible = true;
    },
    //关闭右键菜单
    closeMenu() {
      this.contextmenu.visible = false;
    },
    //计算右键菜单的实际位置，在浏览器窗口改变时会执行
    onResize() {
      if (this.contextmenu.theoryLeft + 80 > this.$el.clientWidth) {
        this.contextmenu.actuallyLeft = this.$el.clientWidth - 80;
      } else {
        this.contextmenu.actuallyLeft = this.contextmenu.theoryLeft;
      }
    },
    //刷新
    async refresh(item) {
      this.$store.commit("delInclude", item.name);
      await this.$router.replace({
        path: "/redirect" + item.to
      });
      this.$store.commit("addInclude", item.name);
    },
    //删除tabs
    delTabs(item) {
      const { fullPath } = this.$route;
      if (fullPath === item.to) {
        let tabsItem = this.$store.state.layout.tabsItem;
        let len = tabsItem.length;
        for (let i = 0; i < len; i++) {
          if (tabsItem[i].to === fullPath) {
            if (tabsItem[i + 1]) {
              this.$router.push(tabsItem[i + 1].to);
            } else if (i === len - 1 && len > 1) {
              this.$router.push(tabsItem[i - 1].to);
            } else {
              this.$router.push("/index");
            }
          }
        }
      }
      this.$store.commit("delTabs", item);
    },
    //关闭其他
    closeOthers(item) {
      const { fullPath } = this.$route;
      if (fullPath === "/index" || fullPath === "/") {
        this.$router.push({ path: "/index" });
      } else {
        this.$router.push({ path: item.to });
      }
      this.$store.commit("closeOthers", item);
    },
    //关闭所有
    closeAll() {
      this.$store.commit("closeAll");
      this.$router.push({ path: "/index" });
    }
  },
  computed: {
    path() {
      return this.$route.path;
    },
    tabsItem: {
      get() {
        return this.$store.state.layout.tabsItem;
      },
      set(value) {
        this.$store.commit("replace", value);
      }
    }
  },
  watch: {
    $route() {
      //这样操作之后用任意方式打开的页面均会生成tabs页面，考虑到后期很多页面是不需要打开tabs的，后期应该在路由表中添加是否在tabs中打开的标识
      this.$store.commit("addTabs", this.$route);
      this.moveToCurrentTag();
    },
    "contextmenu.visible": function(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
        this.erdUltraFast.listenTo(this.$el, this.onResize);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
        this.erdUltraFast.removeListener(this.$el, this.onResize);
      }
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
}
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
.contextmenu {
  width: 80px;
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  top: 30px;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}

.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
.contextmenu li:hover {
  background: #eee;
}
</style>