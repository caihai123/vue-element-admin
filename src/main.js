import Vue from 'vue'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/theme/index.css';
import Fragment from 'vue-fragment'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import App from '@/App.vue'
import router from '@/router'
import { concat } from "lodash";
import getters from "@/permission.js"
import store from "@/store"

Vue.use(Fragment.Plugin)
Vue.use(ElementUI);
Vue.config.productionTip = false

var roles = [];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (Object.keys(to.query).length !== 0) {
    window.console.warn('不能使用query传递参数')
  }
  if (to.path !== '/login') {
    if (roles.length === 0) {
      roles = await getters.getRouters();
      router.addRoutes(roles);
      router.options.routes = concat(
        router.options.routes,
        roles
      );
      next({ ...to, replace: true })//为确保addRoutes已完成，从新进入此路由，replace设置为true之后浏览器不会有多余的历史记录
    } else {
      if (Object.keys(to.params).length !== 0) {
        //如果有参数则删除缓存再进入
        await store.commit("delInclude", to.name);
      }
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to) => {
  if (to.path.slice(0, 9) !== '/redirect') {
    NProgress.done();
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')