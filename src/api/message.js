import request from '@/utils/request'
var api = '/api'
if (process.env.NODE_ENV == 'production') {
  api = ''
}

export function platformMessage(params) { // 消息中心
  return request({
    url: `${api}/platform/mgt/platformMessage/page`,
    method: 'get',
    params
  })
}

export function countNew(params) { // 统计新消息
  return request({
    url: `${api}/platform/mgt/platformMessage/countNew`,
    method: 'get',
    params
  })
}

export function read(params) { // 阅读消息
  return request({
    url: `${api}/platform/mgt/platformMessage/read`,
    method: 'get',
    params
  })
}

