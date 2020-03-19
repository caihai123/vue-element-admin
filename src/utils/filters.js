import Vue from "vue"
import store from "@/store/index.js"

Vue.filter('filterCodeToName', function (value, type) {
    if (store.state.dict[type]) {
        let list = store.state.dict[type].filter(item => item.code === value);
        return list[0] ? list[0].name : ''
    } else {
        window.console.error('没有可用的枚举！')
        return value
    }
})