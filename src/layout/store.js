import Vue from 'vue'
import router from '@/router'

//注意：修改data的数据时，不能出现改变引用地址的操作
export default new Vue({
    data() {
        return {
            isCollapse: false,
            tabsItem: [],
            include: ['index']
        }
    },
    methods: {
        setCollapse(collapse) {
            this.isCollapse = collapse
        },
        addTabs(route) {
            if (route.meta && route.meta.title) {
                let tab = {
                    to: route.path,
                    name: route.name,
                    title: route.meta.title
                }
                if (tab.to === '/index') {
                    return
                }
                let len = this.tabsItem.length;
                for (let i = 0; i < len; i++) {
                    if (tab.to === this.tabsItem[i].to) {
                        return
                    }
                }
                this.tabsItem.push(tab);
                if (tab.name) {
                    this.addInclude(tab.name)
                }
            }
        },
        delTabs(index, path) {
            var self = this;
            if (self.tabsItem[index].to === path) {
                if (self.tabsItem[index].name) {
                    self.dalInclude(self.tabsItem[index].name)
                }
                self.tabsItem.splice(index, 1);

                if (self.tabsItem[index]) {
                    router.push({ path: self.tabsItem[index].to });
                } else if (self.tabsItem[index - 1]) {
                    router.push({ path: self.tabsItem[index - 1].to });
                } else {
                    router.push({ path: '/index' });
                }
            } else {
                if (self.tabsItem[index].name) {
                    self.dalInclude(self.tabsItem[index].name)
                }
                self.tabsItem.splice(index, 1);
            }
        },
        addInclude(name) {
            var len = this.include.length;
            for (let i = 0; i < len; i++) {
                if (this.include[i] === name) {
                    return
                }
            }
            this.include.push(name)
        },
        dalInclude(name) {
            var len = this.include.length;
            for (let i = 0; i < len;) {
                if (this.include[i] === name) {
                    this.include.splice(i, 1)
                } else {
                    i++
                }
            }
        }
    }
})