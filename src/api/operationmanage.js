import request from '@/utils/request'
var api = '/api'
if (process.env.NODE_ENV == 'production') {
  api = ''
}

export function searchByPageGraphic(params) {  //查询列表
  return request({
    url: `${api}/platform/website/graphic/searchByPage`,
    method: 'post',
    params
  })
}

export function upGraphic(params) {  //上架
  return request({
    url: `${api}/platform/website/graphic/up`,
    method: 'get',
    params
  })
}
export function findAll(params) {  //上架
  return request({
    url: `${api}/platform/website/graphic/findAll`,
    method: 'get',
    params
  })
}
export function downGraphic(params) {  //下架
  return request({
    url: `${api}/platform/website/graphic/down`,
    method: 'get',
    params
  })
}

export function createGraphic(params) {  //创建
  return request({
    url: `${api}/platform/website/graphic/create`,
    method: 'post',
    data:params
  })
}

export function updateGraphic(params) {  //更新
  return request({
    url: `${api}/platform/website/graphic/update`,
    method: 'post',
    data:params
  })
}


export function deleteGraphic(params) {  //删除
  return request({
    url: `${api}/platform/website/graphic/delete`,
    method: 'get',
    params
  })
}

export function getGraphic(params) {  //查询详情
  return request({
    url: `${api}/platform/website/graphic/getGraphic`,//GET /website/graphic/getGraphic
    method: 'get',
    params
  })
}
export function createChannel(params) {  //创建渠道
  return request({
    url: `${api}/platform/website/channel/create`,
    method: 'post',
    data:params
  })
}

export function createChannelT(params) {  //已联系
  return request({
    url: `${api}/platform/website/channel/contact`,
    method: 'get',
    params
  })
}
export function getChannel(params) {  //查询详情
  return request({
    url: `${api}/platform/website/graphic/getChannel`,
    method: 'get',
    params
  })
}
export function searchChannel(params) {  //查询详情
  return request({
    url: `${api}/platform/website/channel/searchByPage`,
    method: 'get',
    params
  })
}


export function queryCourseMainPage2(params) {  //查询详情
  return request({
    url: `${api}/platform/website/graphic/queryCourseMainPage`,
    method: 'get',
    params
  })
}


export function genCourseQrcode(params) {  //查询详情
  return request({
    url: `${api}/platform/website/graphic/genCourseQrcode`,
    method: 'get',
    params
  })
}

export function genCourseQrcodeFile(params) {  //查询详情
  return request({
    url: `${api}/platform/website/graphic/genCourseQrcodeFile`,
    method: 'get',
    params
  })
}

