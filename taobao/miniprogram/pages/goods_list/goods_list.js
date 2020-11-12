// pages/goods_list/goods_list.js
import { request } from '../../request/requst.js'
// import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

    /**
     * 页面的初始数据 
     */
    data: {
        tabs: [{
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            }
        ],
        goodsList: []
    },
    //接口要传递的参数
    QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },
    //总页数
    totalPages: 1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options);
        this.QueryParams.cid = options.cid;
        this.getGoodsList()


    },
    //获取商品列表数据
    getGoodsList() {
        request({ url: '/goods/search', data: this.QueryParams })
            .then(result => {
                // console.log(result);

                // console.log(this.data.goods_list);

                //获取总条数
                const total = result.data.message.total
                this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
                    // console.log(this.totalPages);
                this.setData({
                        //拼接的数组
                        goodsList: [...this.data.goodsList, ...result.data.message.goods]
                    })
                    //关闭下拉刷新的窗口
                wx.stopPullDownRefresh();
            })
    },
    //页面上划 滚动条触底时间
    onReachBottom() {
        console.log('11 ');
        //1。判断还有没有下一页数据
        if (this.QueryParams.pagenum >= this.totalPages) {
            //没有下一页数据了
            // console.log('%c没有下一页数据了', "color:red;font-size:100px");
            wx.showToast({
                title: '没有下一页数据了', // 内容

            });
        } else {
            //还有下一页数据

            this.QueryParams.pagenum++;
            this.getGoodsList()
        }
    },
    handleTabsItemChange(e) {
        // console.log(e);
        //1.获取被点击的标题索引
        const { index } = e.detail
            //2.修改源数组
        let { tabs } = this.data;
        tabs.forEach((v, i) => {
                i === index ? v.isActive = true : v.isActive = false
            })
            //3.赋值到data中
        this.setData({
            tabs
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        //1.重置数组
        this.setData({
                goodsList: []
            })
            //2.重置页码
        this.QueryParams.pagenum = 1
            //3.重新发送请求
        this.getGoodsList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})