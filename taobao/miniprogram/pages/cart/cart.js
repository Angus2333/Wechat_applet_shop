// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js"
//解决Es7async await 包报错问题
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    async handleChooseAddress() {
        //1.获取权限状态 主要发现一些属性名很怪异的时候 都要用[]形式来获取属性值
        //     wx.getSetting({
        //         success: (result) => {
        //             // console.log(result);
        //             const scopeAddress = result.authSetting["scope.address"];
        //             if (scopeAddress == true || scopeAddress == undefined) {
        //                 wx.chooseAddress({
        //                     success: (result1) => {
        //                         console.log(result1)
        //                     },
        //                     fail: () => {},
        //                     complete: () => {}
        //                 });
        //             } else {
        //                 //3.用户以前拒绝过授予权限 先诱导用户打开授权页面
        //                 wx.openSetting({
        //                     success: (result2) => {
        //                         //4.调用获取收获地址代码
        //                         wx.chooseAddress({
        //                             success: (result3) => {
        //                                 console.log(result3)
        //                             },

        //                         });
        //                     },
        //                     fail: () => {},
        //                     complete: () => {}
        //                 });

        //             }
        //         }
        //     });
        try {
            //1.获取权限状态
            const res1 = await getSetting()
            const scopeAddress = res1.authSetting["scope.address"];
            //2.判断权限状态
            if (scopeAddress == false) {
                //3.诱导用户打开授权页面
                await openSetting()
                console.log(res2);
            }


            //4.调用获取收获地址API
            const address = await chooseAddress()
                // console.log(res2);
                //5.存入到缓存中
            wx.setStorageSync('address', address);
        } catch (error) {
            console.log(error);
        }


    }
})