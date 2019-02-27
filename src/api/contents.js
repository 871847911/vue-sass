import request from '@/utils/request'
var api = '/api'
if (process.env.NODE_ENV == 'production') {
  api = ''
}

// 这跟 class.js 中冲突  内容管理
// 内容分类 queryCourseCatalogPage
// 一级分类 modifyCourseCatalog
// 二级分类 createCourseCatalog

// export function queryCourseCatalogPage(params) {
//   return request({
//     url: `${api}//frontapi/app/course/queryCourseCatalogPage`,
//     method: 'get',
//     params
//   })
// }


// 分销商品
export function getPeddleGoodsList(params) { //分销商品列表
  return request({
    url: `${api}/peddleGoods/getPeddleGoodsList`,
    method: 'get',
    params
  })
}

export function goodsSub(params) { //目录内容
  return request({
    url: `${api}/wyl/goodsSub`,
    method: 'get',
    params
  })
}

export function addViolationPeddleGoods(params) { //提交违规处理
  return request({
    url: `${api}/peddleGoods/addViolationPeddleGoods`,
    method: 'post',
    params
  })
}

export function getPeddleGoodsList(params) { //商品审核列表
    return request({
      url: `${api}/peddleGoods/getPeddleGoodsList`,
      method: 'post',
      params
    })
}

export function getPeddleGoodsDetail(params) { //商品审核详情
    return request({
      url: `${api}/peddleGoods/getPeddleGoodsDetail`,
      method: 'post',
      params
    })
}

export function getPeddleGoodsDetail(params) { //违规商品列表
    return request({
      url: `${api}/peddleGoods/getPeddleGoodsDetail`,
      method: 'post',
      params
    })
}



export function goodsSub(params) {
  return request({
    url: `${api}/wyl/goodsSub`,
    method: 'get',
    params
  })
}
