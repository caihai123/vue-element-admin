import router from "../router"
var store = {
    isCollapse: false,
    tabsItem: [

    ],
    setCollapse(collapse) {
        this.isCollapse = collapse
    },
    addTabs(tab) {
        if (tab.to === '/index') {
            return
        }
        let len = this.tabsItem.length;
        for (let i = 0; i < len; i++) {
            if (tab.to === this.tabsItem[i].to) {
                return
            }
        }
        this.tabsItem.push(tab)
    },
    delTabs(index, path) {
        var self = this;
        if (self.tabsItem[index].to === path) {
            self.tabsItem.splice(index, 1);
            if (self.tabsItem[index]) {
                router.push({ path: self.tabsItem[index].to });
            } else if (self.tabsItem[index - 1]) {
                router.push({ path: self.tabsItem[index - 1].to });
            } else {
                router.push({ path: '/index' });
            }
        } else {
            self.tabsItem.splice(index, 1);
        }
    }
}

export default store