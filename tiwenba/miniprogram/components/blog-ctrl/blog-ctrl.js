// components/blog-ctrl/blog-ctrl.js
const db=wx.cloud.database()
let userInfo = {}
Component({
    /**
     * 组件的属性列表
     */
    properties: {
       blogId:String
    },

    /**
     * 组件的初始数据
     */
    data: {
        loginShow: false,
        //底部弹出层是否显示
        bottomModalShow: false,
        content: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onComment() {
            //判断用户是否授权
            wx.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success: (res) => {
                                // success
                                userInfo = res.userInfo,
                                    //显示评论的弹出层
                                    this.setData({
                                        bottomModalShow: true
                                    })
                            }
                        })
                    } else {
                        this.setData({
                            loginShow: true
                        })
                    }
                }
            });

        },

        onLoginsucess(event) {
            // console.log(event);
            userInfo=event.detail
            //授权框消失，评论框显示
            this.setData({
                loginShow: false,

            }, () => {
                this.setData({
                    bottomModalShow: true
                })
            })
        },
        onLoginfail() {
            wx.showModal({
                title: '授权用户才能进行评价'
            });
        },
        onInput(event){
          this.setData({
              content:event.detail.value
          })
        }
        ,
        onSend(event){
            //评论的信息，插入数据库
            let formId=event.detail.formId
            let content=event.detail.value.content
            if(content.trim()===''){
                wx.showModal({
                    title:'输入的内容不能为空'
                })
                return
            }
            wx.showLoading({
               title:'评价中',
               mask:true
            })
            db.collection('blog-comment').add({
                data:{
                    content,
                    createTime:db.serverDate(),
                    blogId:this.properties.blogId,
                    nickName:userInfo.nickName,
                    avatarUrl:userInfo.avatarUrl
                }
            }).then(res=>{
                wx.hideLoading();
                wx.showToast({
                  title: '评论成功'
                });
                this.setData({
                    bottomModalShow:false,
                    content:''
                })
                //刷新父元素
                this.triggerEvent('refreshCommentList')
            })
            //推送模板消息
            // wx.cloud.callFunction({
            //     name:'sendMessage',
            //     data:{
            //         content,
            //         formId,
            //         blogId:this.properties.blogId
            //     }
            // }).then(res=>{
            //     // console.log(res);
            // })
            // wx.requestSubscribeMessage({
            //     tmplIds: ['tO1EresUVXU_WUhTtzSIOMesFa-J9hzpIUXaZYApcY'],
            //     success (res) {
            //         console.log(res);
            //      }
            //   })
        }
    },
    onShareAppMessage(){
        
    }
})