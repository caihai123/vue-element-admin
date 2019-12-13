import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Fragment from 'vue-fragment'
import App from './App.vue'
import router from './router'

Vue.use(Fragment.Plugin)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

router.beforeEach((to, from, next) => {
  // if(to.path === from.path){
  //   next(false)
  // }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})