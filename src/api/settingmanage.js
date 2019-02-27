import request from '@/utils/request'
var api = '/api'
if (process.env.NODE_ENV == 'production') {
  api = ''
}

export function findList(params) {  //查询列表
  return request({
    url: `${api}/platform/website/banner/findList`,
    method: 'get',
    params
  })
}


export function deleteBanner(params) {  //删除轮播
  return request({
    url: `${api}/platform/website/banner/delete`,
    method: 'get',
    params
  })
}

//POST /website/banner/create
export function createBanner(params) {  //创建轮播
  return request({
    url: `${api}/platform/website/banner/create`,
    method: 'post',
    data:params
  })
}


export function updateBanner(params) {  //更新轮播
  return request({
    url: `${api}/platform/website/banner/update`,
    method: 'post',
    data:params
  })
}