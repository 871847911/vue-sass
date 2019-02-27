import request from '@/utils/request'
var api = '/api'
if (process.env.NODE_ENV == 'production') {
  api = ''
}

export function searchByPageGame(params) {  //查询参赛作品
  return request({
    url: `${api}/platform/website/game/searchByPage`,
    method: 'get',
    params
  })
}
export function searchRankByPage(params) {  //分页查询作品投票排名
  return request({
    url: `${api}/platform/website/game/searchRankByPage`,
    method: 'get',
    params
  })
}
export function saveConfig(params) { //修改投票配置
  return request({
    url: `${api}/platform/website/game/saveConfig`,
    method: 'post',
    data: params
  })
}
export function removeFromBlacklist(params) {  //黑名单移除
  return request({
    url: `${api}/platform/website/game/removeFromBlacklist`,
    method: 'get',
    params
  })
}

export function getConfigGame(params) {  //获取投票配置
  return request({
    url: `${api}/platform/website/game/getConfig`,
    method: 'get',
    params
  })
}

export function addToBlacklist(params) {  //添加到黑名单
  return request({
    url: `${api}/platform/website/game/addToBlacklist`,
    method: 'get',
    params
  })
}