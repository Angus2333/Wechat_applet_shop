// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    myInfo:[
      {
        num:49,
        title:'我的提问'
      },
      {
        num:22,
        title:'关注的人'
      },
      {
        num:42,
        title:'收藏'
      },
      {
        num:232,
        title:'浏览历史'
      }
    ],
    blogData:[
      {num:153,title:'提问新增浏览量'},
      {num:153,title:'提问新增点赞'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let userinfo=wx.getStorageSync('userinfo')
    this.setData({
      userinfo
    })
  },
  getUserInfo(e){
    const {userInfo}=e.detail;
    wx.setStorageSync('userinfo', userInfo)

  }
})