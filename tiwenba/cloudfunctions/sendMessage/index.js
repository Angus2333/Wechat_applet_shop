// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const {OPENID}=cloud.getWXContext()
  // const result=await cloud.openapi.templateMessage.send({
  //   touser:OPENID,
  //   page:`/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
  //   data:{
  //     thing2:{
  //       value:event.content
  //     },
  //     thing1:{
  //       value:'评价完成'
  //     }
  //   },
  //   templateId:'tO1EresUVXU_WUhTtzSIOMesFa-J9hzpIUXaZYApcY',
  //   formId:event.formId
  // })

  // return result
}