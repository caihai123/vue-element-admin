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
    }
}

export default store