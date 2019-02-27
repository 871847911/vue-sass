import request from '@/utils/request'
import qs from 'qs'
var api = '/api'
if (process.env.NODE_ENV == 'production') {
  api = ''
}
export function querySubAccount(params) {
  return request({
    url: `${api}/platform/account/mng/querySubAccount`,
    method: 'post',
    params
  })
}
export function createAccount(params) {
  return request({
    url: `${api}/platform/account/mng/createAccount`,
    method: 'post',
    data: params
  })
}
export function updateAccount(params) {
  return request({
    url: `${api}/platform/account/mng/updateAccount`,
    method: 'post',
    data: params
  })
}
export function getAccount(params) {
  return request({
    url: `${api}/platform/account/mng/getAccount`,
    method: 'get',
    params
  })
}
// 客户账号密码重置接口
export function resetPassword(params) {
  return request({
    url: `${api}/platform/account/mng/newResetPassword`,
    method: 'put',
    params
  })
}
// 账号状态 开/关
export function updateStatus(params) {
  return request({
    url: `${api}/platform/account/mng/updateStatus`,
    method: 'POST',
    params
  })
}

// H5链接
export function H5link(params) {
  return request({
    url: `${api}/platform/version/mng/H5link`,
    method: 'get',
    params
  })
}

// 版本查询接口
export function version(params) {
  return request({
    url: `${api}/platform/version/mng/version`,
    method: 'get',
    params
  })
}
// 续费
export function duration(params) {
  return request({
    url: `${api}/platform/version/mng/duration`,
    method: 'PUT',
    params
  })
}
// 升级账号
export function Upgrade(params) {
  return request({
    url: `${api}/platform/version/mng/version`,
    method: 'put',
    params
  })
}
// 额外流量配置
export function flow(params) {
  return request({
    url: `${api}/platform/version/mng/flow`,
    method: 'put',
    params
  })
}
// 配置账号功能查询接口
export function userFunction(params) {
  return request({
    url: `${api}/platform/version/mng/userFunction`,
    method: 'GET',
    params
  })
}
// 账号功能接口保存
export function userFunctionSave(params) {
  return request({
    url: `${api}/platform/version/mng/userFunction`,
    method: 'PUT',
    params
  })
}
// 版本管理 功能配置查询
export function versionFunction(params) {
  return request({
    url: `${api}/platform/version/mng/versionFunction`,
    method: 'GET',
    params
  })
}
// 版本管理 功能配置保存
export function versionFunctionSave(params) {
  return request({
    url: `${api}/platform/version/mng/versionFunction`,
    method: 'put',
    params
  })
}
// 版本管理 流量配置保存
export function storageFlow(params) {
  return request({
    url: `${api}/platform/version/mng/storageFlow`,
    method: 'put',
    params
  })
}
// 版本管理 流量配置保存
export function deleteOpenPlatform(params) {
  return request({
    url: `${api}/platform/account/mng/deleteOpenPlatform`,
    method: 'GET',
    params
  })
}

// 申请列表
export function applyList(params) {
  return request({
    url: `${api}/platform/mgt/accountApply/page`,
    method: 'GET',
    params
  })
}

// 关闭跟进
export function close(params) {
  return request({
    url: `${api}/platform/mgt/accountApply/close`,
    method: 'POST',
    params
  })
}

// 录入信息
export function deal(params) {
  return request({
    url: `${api}/platform/mgt/accountApply/deal`,
    method: 'POST',
    data: qs.stringify(params)
  })
}
