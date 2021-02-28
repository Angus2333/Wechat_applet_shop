// pages/search/search.js
let keyword = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        modelShow: false,
        blogList: [],
        keyword: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this._loadBlogList()
    },
    //加载博客列表
    _loadBlogList(start = 0) {
        wx.showLoading({
            title: '拼命加载中', // 内容
        });
        wx.cloud.callFunction({
                name: 'blog',
                data: {
                    keyword,
                    start,
                    count: 10,
                    $url: 'list'
                }
            })
            .then(res => {
                // console.log(res);
                this.setData({
                    blogList: this.data.blogList.concat(res.result)
                })
                wx.hideLoading();
                wx.stopPullDownRefresh()
            })

    },
    onPublish() {
        //判断用户是否授权
        wx.getSetting({
            success: (res) => {
                // console.log(res);
                if (res.authSetting['scope.userInfo']) {
                    //拿到用户信息
                    wx.getUserInfo({
                            success: (res) => {
                                // success
                                // console.log(res);
                                this.onLoginSuccess({
                                    detail: res.userInfo
                                })
                            }
                        })
                        // wx.navigateTo({
                        //     url: '/pages/blog-edit/blog-edit',

                    // })
                } else {
                    this.setData({
                        modelShow: true
                    })
                }
            }
        });

    },
    onLoginSuccess(event) {
        // console.log(event);
        const detail = event.detail
        wx.navigateTo({
            url: `../blog-edit/blog-edit?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`
        })

    },
    onLoginFail() {
        wx.showModal({
            title: '授权用户才能发布提问'
        });
    },
    onReachBottom() {
        this._loadBlogList(this.data.blogList.length)
    },
    onPullDownRefresh() {
        this.setData({
            blogList: []
        })
        this._loadBlogList(0)
    },
    goComment(event) {
        // console.log(event);
        wx.navigateTo({
            url: `../blog-comment/blog-comment?blogId=${event.target.dataset.blogid}`
        })
    },
    onSearch(event) {
        // console.log(event.detail.keyword);
        this.setData({
            blogList: []
        })
        keyword = event.detail.keyword
        this._loadBlogList()
    }
})