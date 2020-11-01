// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env:"angus-ph38k"})
const env = 'angus-ph38k'
const db = cloud.database({ env }) //指明云函数生效的环境
    // 云函数入口函数
    //event 前端传过来的参数 context前端上下文
exports.main = async(event, context) => {
    const swiperList = await db.collection('swiperList').where({
      src:dd
    }).get()
    console.log(swiperList);
    console.log('aa');
    
    return swiperList
}