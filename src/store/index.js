import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const layout = {
    state: {
        isCollapse: false,
        tabsItem: [],
        include: ['index']
    },
    mutations: {
        setCollapse(state, collapse) {
            state.isCollapse = collapse
        },
        //增加tabs导航
        addTabs(state, route) {
            if (route.meta && route.meta.title) {
                let tab = {
                    to: route.fullPath,
                    name: route.name,
                    title: route.meta.title
                }
                if (tab.to === '/index') {
                    return
                }
                let is = true;
                let item = state.tabsItem.filter(item => {
                    if (item.to === tab.to) {
                        return true
                    } else {
                        if (tab.to.replace(/\?.*/, "") === item.to.replace(/\?.*/, "")) {
                            item.to = tab.to;
                            is = false;
                        }
                        return false
                    }
                });
                if (!item.length && is) {
                    state.tabsItem.push(tab)
                }
                if (tab.name) {
                    let item = state.include.filter(item => item === tab.name);
                    if (!item.length) {
                        state.include.push(tab.name)
                    }
                }
            }
        },
        //删除tabs
        delTabs(state, route) {
            if (route.to === '/index' || route.to === '/') {
                return
            }
            state.tabsItem = state.tabsItem.filter(item => item.to !== route.to);
            if (route.name) {
                state.include = state.include.filter(item => item !== route.name);
            }
        },
        //删除其他
        closeOthers(state, route) {
            if (route.path === '/index' || route.path === '/') {
                state.tabsItem = [];
                state.include = ['index'];
            } else {
                state.tabsItem = [route]
                if (route.name) {
                    state.include = ['index', route.name];
                } else {
                    state.include = ['index'];
                }
            }
        },
        //删除所有
        closeAll(state) {
            state.tabsItem = [];
            state.include = ['index'];
        },
        //替换，用于拖动排序
        replace(state, value) {
            state.tabsItem = value
        },
        //添加缓存
        addInclude(state, name) {
            if (name) {
                let item = state.include.filter(item => item === name);
                if (!item.length) {
                    state.include.push(name)
                }
            }
        },
        //删除缓存
        delInclude(state, name) {
            if (name) {
                state.include = state.include.filter(item => item !== name);
            }
        }
    }
}

const store = new Vuex.Store({
    modules: {
        layout
    }
})

export default store