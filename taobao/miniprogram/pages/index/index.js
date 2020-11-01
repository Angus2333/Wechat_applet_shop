//Page Object
wx.cloud.init()
Page({
    data: {
        //轮播图数组
        swiperList: []
    },
    //options(Object)
    //页面开始加载就会触发的事件
    onLoad: function(options) {
        wx.cloud.callFunction({
                name: 'name', //home就是云函数的名字
                data: {},
                success(res) {
                    console.log(res);

                },
                fail(err) {

                }
            })
            //1.发送异步请求获取轮播图数据

    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});