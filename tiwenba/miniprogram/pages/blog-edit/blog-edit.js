// pages/blog-edit/blog-edit.js
const MAX_WORDS_NUM = 200 //输入文字最大个数
const MAX_IMG_NUM = 9 //最大上传图片个数
const db = wx.cloud.database()
let content = '' //当前输入的文字内容
let userInfo = {}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //输入的文字数目
        wordsNum: 0,
        footerBottom: 0,
        images: [],
        selectPhoto: true //添加图片的显示与隐藏
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options);
        userInfo = options
    },
    onInput(event) {
        // console.log(event.detail.value);
        let wordsNum = event.detail.value.length
        if (wordsNum >= MAX_WORDS_NUM) {
            wordsNum = `最大字数为${MAX_WORDS_NUM}`
        }
        this.setData({
                wordsNum
            })
            //把输入的文字赋值给content
        content = event.detail.value
    },
    onFocus(event) {
        //模拟器获取的键盘高度为零
        this.setData({
            footerBottom: event.detail.height
        })
    },
    onBlur() {
        this.setData({
            footerBottom: 0
        })
    },
    //选择图片
    onChangeImage() {
        //还能再选几张图片
        let max = MAX_IMG_NUM - this.data.images.length
        wx.chooseImage({
            count: max,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                // console.log(res);
                this.setData({
                        images: this.data.images.concat(res.tempFilePaths)
                    })
                    //选了一次以后还能选几张
                max = MAX_IMG_NUM - this.data.images.length
                this.setData({
                    selectPhoto: max <= 0 ? false : true
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    //删除图片
    onDelImage(event) {
        // console.log(event);
        //注意splice返回的是被删除的元素
        this.data.images.splice(event.target.dataset.index, 1)
        this.setData({
            images: this.data.images
        })
        if (this.data.images.length < MAX_IMG_NUM) {
            this.setData({
                selectPhoto: true
            })
        }
    },
    //点击图片
    onPreviewImage(event) {
        wx.previewImage({
            // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
            urls: this.data.images,
            current: event.target.dataset.imgsrc,
            success: function(res) {
                // success
            }
        })
    },
    send() {
        if (content.trim() === '') {
            wxtt.showModal({
                title: '请输入内容'
            });
            return
        }
        wx.showLoading({
            title: '发布中', // 内容
            mask: true
        });
        //点击发布，把数据存取到云数据库中 非关系型数据库
        //数据库要存储的：文字 图片（存）  fileID 云文件id openid 昵称 头像、时间
        //1.先把图片存到云存储中 图片上传
        //获取文件正则扩展名
        let promiseArr = []
        let fileIds = []
        for (let i = 0, len = this.data.images.length; i < len; i++) {
            let p = new Promise((resolve, reject) => {
                let item = this.data.images[i]
                let suffix = /\.\w+$/.exec(item)[0]
                wx.cloud.uploadFile({ //每次只能上传一张 所以需要for循环
                    cloudPath: 'search/' + Date.now() + '-' + Math.random() * 10000000 + suffix, // 目标地址
                    filePath: item, // 本地文件路径
                    success: (res) => {
                        // console.log(res);
                        fileIds = fileIds.concat(res.fileID)
                        resolve()
                    },
                    fail: (err) => {
                        console.log(err);
                    }
                });
            })
            promiseArr.push(p)
        }
        Promise.all(promiseArr).then((res) => {
            db.collection('blog').add({
                    data: {
                        content: content,
                        img: fileIds,
                        ...userInfo,
                        //取服务端的时间更准确
                        createTime: db.serverDate()
                    }
                }).then(res => {

                    wx.hideLoading();
                    wx.showToast({
                        title: '发布成功'
                    })
                })
                //返回搜索主界面，并且刷新
            wx.navigateBack()
            const pages = getCurrentPages()
            const prevPage = pages[pages.length - 2] //取到上一个界面
            prevPage.onPullDownRefresh()
                // wx.switchTab({
                //     url: '../search/search',
                // })
        }).catch(err => {
            wx.hideLoading()
            wx.showToast({
                title: '发布失败'
            })
        })
    }
})