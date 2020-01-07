import Vue from 'vue'

// 注册一个全局自定义指令 `v-waves`
import waves from '@/directive/waves/index.js'
Vue.directive('waves', waves)