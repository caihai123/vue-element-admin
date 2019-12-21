import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Fragment from 'vue-fragment'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import App from './App.vue'
import router from './router'

Vue.use(Fragment.Plugin)
Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start();
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to) => {
  if (to.path.slice(0, 9) !== '/redirect') {
    NProgress.done();
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')