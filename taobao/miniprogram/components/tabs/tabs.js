Component({
    data: {},
    properties: {
        tabs: {
            type: Array,
            value: ''
        }
    },
    methods: {
        //1.获取点击的索引
        handleTabsItemChange(e) {
            // console.log(e);
            const { index } = e.currentTarget.dataset;
            // console.log(index);
            //2.触发父组件的事件
            this.triggerEvent("tabsItemChange", { index })
        }

    }
})