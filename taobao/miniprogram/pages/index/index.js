// pages/index/index.js
import { request } from '../../request/requst.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //轮播图数据
        swiperList: [
            { src: 'https://ae04.alicdn.com/kf/Haeb59b8ffa354424bdc28790e7dc4af5r.jpg' },
            { src: 'https://sc03.alicdn.com/kf/H08711de0d7554f1da08e03652a23e132X.jpg' },
            { src: 'https://ae02.alicdn.com/kf/H810d161ff5594b868dfe9242b6efbd6bi.jpg' },
            { src: 'https://ae02.alicdn.com/kf/H7509df3c443d49e3a2e411db181f3800y.jpg' }
        ],
        //楼层数据
        floorList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getFloorList()
    },
    //获取楼层数据
    getFloorList() {
        request({ url: '/home/floordata' })
            .then(result => {
                // console.log(result);
                this.setData({
                    floorList: result.data.message
                })
            })
    }

})