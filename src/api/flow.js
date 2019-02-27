import request from '@/utils/request'
var api = '/api'
if (process.env.NODE_ENV === 'production') {
  api = ''
}

export function getPlatformDetail(params) { // 流量账户平台信息
  return request({
    url: `${api}/platform/qiniu/flow/getPlatformDetail`,
    method: 'get',
    params
  })
}
export function getRule(params) { // 获取七牛云计费规则
  return request({
    url: `${api}/platform/qiniu/flow/getRule`,
    method: 'get',
    params
  })
}
export function getStoreDetail(params) { // 流量账户店铺信息
  return request({
    url: `${api}/platform/qiniu/flow/getStoreDetail`,
    method: 'get',
    params
  })
}
export function pageFlowDetail(params) { // 流量明细-分页空间
  return request({
    url: `${api}/platform/qiniu/flow/pageFlowDetail`,
    method: 'get',
    params
  })
}
export function pageSpaceDetail(params) { // 流量明细-分页流量
  return request({
    url: `${api}/platform/qiniu/flow/pageSpaceDetail`,
    method: 'get',
    params
  })
}
export function pageStoreBalance(params) { // 分页店铺余额记录
  return request({
    url: `${api}/platform/qiniu/flow/pageStoreBalance`,
    method: 'get',
    params
  })
}
export function updateRule(params) { // 修改计费规则
  return request({
    url: `${api}/platform/qiniu/flow/updateRule`,
    method: 'post',
    params
  })
}
