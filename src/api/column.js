import request from '@/utils/request'
var api = '/api'
if (process.env.NODE_ENV == 'production') {
  api = ''
}

// 专栏列表
export function columnList(params) {
  return request({
    url: `${api}/platform/mgt/storeColumn/findOperatingStoreColumn`,
    method: 'get',
    params
  })
}

// 获取专栏信息
export function getColumnDetail(params) {
  return request({
    url: `${api}/platform/mgt/storeColumn/getStoreColumnInfo`,
    method: 'get',
    params
  })
}

// 获取发刊词信息
export function getColumnIntroduceDetail(params) {
  return request({
    url: `${api}/platform/mgt/storeColumn/getColumnIntroductionInfo`,
    method: 'get',
    params
  })
}

// 更改专栏状态
export function changeStatus(params) {
  return request({
    url: `${api}/platform/mgt/storeColumn/downStoreColumn`,
    method: 'get',
    params
  })
}

// 专栏内容列表
export function columnContentList(params) {
  return request({
    url: `${api}/platform/mgt/columnContent/findColumnContent`,
    method: 'get',
    params
  })
}

// 获取专栏名称和进度
export function getColumnInfo(params) {
  return request({
    url: `${api}/platform/mgt/columnContent/getColumnInfo`,
    method: 'get',
    params
  })
}

// 图文信息
export function columnContentListDetail(params) {
  return request({
    url: `${api}/platform/mgt/columnContent/getColumnContentInfo`,
    method: 'get',
    params
  })
}

// 专栏内容下架
export function changeContentStatus(params) {
  return request({
    url: `${api}/platform/mgt/columnContent/downColumnContent`,
    method: 'get',
    params
  })
}
