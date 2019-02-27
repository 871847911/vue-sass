import {
    POST,
    Get
  } from '@/utils/http'

  import request from '@/utils/request'
  var api = '/api'
  var leap = '/leap'
  if (process.env.NODE_ENV == 'production') {
    api = ''
    leap = ''
  }
  
  export default {
    getPeddleGoodsList(params) {//分销商品四tabs列表
      return POST(`${api}/goods/peddleGoods/getPeddleGoodsList`, params, {
        'Content-Type': 'application/json'
      })
    },
    
    getPeddleGoodsDetail(params) {//商品详情
      return POST(`${api}/goods/peddleGoods/getPeddleGoodsDetail`, params, {
        'Content-Type': 'application/json'
      })
    },

    getGoodsSub(params) {//目录内容内小列表
      return POST(`${api}/goods/peddleGoods/getGoodsSub`, params, {
        'Content-Type': 'application/json'
      })
    },

    getSubContext(params) {//内容详情富文本数据
      return POST(`${api}/goods/peddleGoods/getSubContext`, params, {
        'Content-Type': 'application/json',
      })
    },

    getSubDetail(params) {//音频视频资源
      return POST(`${api}/goods/peddleGoods/getSubDetail`, params, {
        'Content-Type': 'application/json'
      })
    },
    
    
    addViolationPeddleGoods(params) {//提交违规处理的原因 M
      return POST(`${api}/promote/peddleGoods/addViolationPeddleGoods`, params, {
        'Content-Type': 'application/json'
      })
    },

    checkPeddleGoods(params) {//商品审核状态改变 M
      return POST(`${api}/promote/peddleGoods/checkPeddleGoods`, params, {
        'Content-Type': 'application/json'
      })
    },

    delViolationPeddleGoods(params) {//移除违规商品 M
      return POST(`${api}/promote/peddleGoods/delViolationPeddleGoods`, params, {
        'Content-Type': 'application/json'
      })
    },

    delIndexPeddleGoods(params) {//移除首页推荐 M
      return POST(`${api}/promote/peddleGoods/delIndexPeddleGoods`, params, {
        'Content-Type': 'application/json'
      })
    },


    // 内容
    indexGoodsChoice(params) {//首页推荐内部列表
      return POST(`${api}/goods/peddleGoods/indexGoodsChoice`, params, {
        'Content-Type': 'application/json'
      })
    },

    addIndexPeddleGoods(params) {//添加首页推荐 M
      return POST(`${api}/promote/peddleGoods/addIndexPeddleGoods`, params, {
        'Content-Type': 'application/json'
      })
    },
    

    // getIndexPeddleGoodsList(params) {//首页推荐列表
    //   return POST(`${api}/goods/peddleGoods/getIndexPeddleGoodsList`, params, {
    //     'Content-Type': 'application/json'
    //   })
    // },

    testApi(params) {//首页推荐列表
      return Get(`${leap}/index/get`, params, {
        'Content-Type': 'application/json'
      })
    },



  }
  