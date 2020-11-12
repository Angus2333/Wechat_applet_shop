// pages/goods_detail/goods_detail.js
import { request } from '../../request/requst.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {}
    },
    //商品对象
    GoodsInfo: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options);
        const { goods_id } = options
        this.getGoodsDetail(goods_id)
            // console.log(goods_id);

    },
    //获取商品的详情数据
    getGoodsDetail(goods_id) {
        request({ url: "/goods/detail", data: { goods_id } })
            .then((res) => {
                this.GoodsInfo = res.data.message
                    // console.log(this.GoodsInfo);
                this.setData({
                        goodsObj: {
                            //只复制要的属性，节约性能
                            goods_name: res.data.message.goods_name,
                            goods_price: res.data.message.goods_price,
                            //iphone不识别webp图片格式 后台不解决就实现前端字符串替换
                            //当然要替换也要确保后台存在这种图片的格式
                            goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
                            pics: res.data.message.pics
                        }
                    })
                    // console.log(this.data.goodsObj);
            })


    },
    //点击轮播图放大预览
    handlePreviewImage(e) {
        // console.log('11');
        //1.先构造要预览的的图片
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
            // console.log(urls);
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current,
            urls
        });

    },
    //加入购车
    handleCartAdd() {
        console.log('cec');
    }
})