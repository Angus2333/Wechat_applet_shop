Component({
    data: {},
    properties: {
        modelShow: Boolean
    },
    methods: {
        onGotUserInfo(event) {
            // console.log(event);
            const userInfo = event.detail.userInfo
                //允许授权
            if (userInfo) {
                this.setData({
                        modelShow: false
                    })
                    //给父组件传递用户信息
                this.triggerEvent('loginsuccess', userInfo)
            } else {
                this.triggerEvent('loginfail', userInfo)

            }
        }
    }
})