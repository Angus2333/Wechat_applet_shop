// pages/index/index.js
import { request } from '../../request/requst.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //轮播图数据
        swiperList: [
            { src: 'https://img.alicdn.com/tfs/TB1ZkoLukCWBuNjy0FaXXXUlXXa-966-644.jpg_620x10000q100.jpg_.webp' },
            { src: 'https://img.alicdn.com/tps/i4/TB1grssmlr0gK0jSZFnSuvRRXXa.jpg_620x10000q100.jpg_.webp' },
            { src: 'https://aecpm.alicdn.com/simba/img/TB1W4nPJFXXXXbSXpXXSutbFXXX.jpg' },
            { src: 'https://aecpm.alicdn.com/simba/img/TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg' }
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