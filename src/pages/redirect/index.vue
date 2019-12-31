//用于路由刷新，将会重定向到指定路由
<script>
import store from "@/layout/store";
export default {
  beforeCreate() {
    const { params, query } = this.$route;
    const { path } = params;
    store.tabsItem.forEach(item => {
      if (item.to === "/" + path && item.name) {
        store.addInclude(item.name);
      }
    });
    this.$router.replace({ path: "/" + path, query });
  },
  render: function(h) {
    return h(); // 避免警告信息
  }
};
</script>