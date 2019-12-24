var store = {
    isCollapse: false,
    tabsItem: [
        { title: "首页", to: "/index", fixation: true }
    ],
    setCollapse(collapse) {
        this.isCollapse = collapse
    },
    addTabs(tab) {
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