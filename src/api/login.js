import request from '@/utils/request'
var api = '/devapi'
if (process.env.NODE_ENV == 'production') {
  api = ''
}
export function login(username, password) {
  const userType = 10 // 管理员
  return request({
    url: `${api}/wechat/login`,
    method: 'post',
    data: {
      username,
      password,
      userType
    },
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function logout() {
  return request({
    url: `${api}/platform/logout`,
    method: 'get'
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  })
}
export function getInfo() {
  return request({
    url: `${api}/platform/index/user/info`,
    method: 'get'
  })
}
export function statsMessage() {
  return request({
    url: `${api}/platform/mgt/platformMessage/countNew`,
    method: 'get'
  })
}

