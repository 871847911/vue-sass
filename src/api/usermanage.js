import request from '@/utils/request'
var api = '/api'
if (process.env.NODE_ENV == 'production') {
  api = ''
}

export function searchByPage(params) { // 查询列表
  return request({
    url: `${api}/platform/website/author/searchByPage`,
    method: 'get',
    params
  })
}

export function deleteAuthor(params) { // 删除
  return request({
    url: `${api}/platform/website/author/deleteAuthor`,
    method: 'get',
    params
  })
}

export function addAuthor(params) { // 添加
  return request({
    url: `${api}/platform/website/author/addAuthor`,
    method: 'post',
    data: params
  })
}

export function getAuthor(params) { // 查询
  return request({
    url: `${api}/platform/website/author/getAuthor`,
    method: 'get',
    params
  })
}

export function modifyAuthor(params) { // 修改
  return request({
    url: `${api}/platform/website/author/modifyAuthor`,
    method: 'post',
    data: params
  })
}
