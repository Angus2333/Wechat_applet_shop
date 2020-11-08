// pages/category/category.js
import { request } from '../../request/requst.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //左侧的菜单数据
        leftMenuList: [],
        //右侧的商品数据
        rightContent: [],
        //被点击的左侧的菜单
        currentIndex: 0

    },
    //接口的返回数据
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /* 
        1.判断是否有旧的数据，
        旧数据规定他长这个样子{time:Date.now(),data:[...]}
        2.如果没有，就发送新的请求 ，
        3.有旧数据且未过期，就用存储的旧数据*/
        // 1.获取本地存储的数据   
        const Cates = wx.getStorageSync('cates')
            // 2.判断
        if (!Cates) {
            // 不存在就发送请求获取
            this.getCates();
        } else {
            //有旧的数据 定义过期时间 
            if (Date.now() - Cates.time > 1000 * 10) {
                //超时重新请求
                this.getCates();
            } else {
                console.log('可以使用旧的数据');
                //Cates就是接口返回的数据 Cates.data就是存储的数据
                this.Cates = Cates.data
                let leftMenuList = this.Cates.map(v => v.cat_name)
                    //构造右侧的商品数据
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
    },
    //获取分类数据
    getCates() {
        request({
                url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
            })
            .then(res => {
                // console.log(res);
                this.Cates = res.data.message;
                //把接口的数据存到本地
                wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
                //构造左侧的大菜单数据
                let leftMenuList = this.Cates.map(v => v.cat_name)
                    //构造右侧的商品数据
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            })
    },
    //左侧菜单的点击事件
    handleItemTap(e) {
        // console.log(e);
        //1.获取被点击的标题身上的索引
        //2.给data中的currentIndex赋值
        //3.根据不同的索引来渲染右侧商品的内容
        const { index } = e.currentTarget.dataset;
        let rightContent = this.Cates[index].children
        this.setData({
            currentIndex: index,
            rightContent
        })

    }
})