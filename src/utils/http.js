import axios from 'axios'
import store from '../store'
import {
  Message,
  Loading
} from 'element-ui'
import {
  getToken,removeToken
} from '@/utils/auth'
// 默认配置

axios.defaults.timeout = 10000
axios.defaults.headers['X-Requested-Page'] = 'json'
axios.defaults.withCredentials = true

// 请求拦截

axios.interceptors.request.use(config => {
  // 设置token
  if (store.getters.token) {
    config.headers['X-Auth-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截

axios.interceptors.response.use(response => {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  if (error.response.status) {
    response => {
      const res = response.data
      if (res.code == 401) {
        Message({
          message: '账户或密码错误',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject('error')
      } else if (res.code == 403) { // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   // store.dispatch('FedLogOut').then(() => {
        //   // 	location.reload() // 为了重新实例化vue-router对象 避免bug
        //   // })
          
        // }).catch(()=>{
          
        // })
        store.commit('SHOW_DIALOG_LOGIN',true)
        return Promise.reject('error')
      } else {
        return response.data
      }
    },
    error => {
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
})

const loadingBg = {
  fullscreen: true,
  background: 'rgba(255,255,255,0.3)'
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function Get(url, params = {}) {
  return new Promise((resolve, reject) => {
    let load = Loading.service(loadingBg)

    axios.get(url, {
      params: params
    }).then(res => {
      load.close()
      resolve(res.data)
    }).catch(err => {
      if (load) {
        load.close()
      }
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function POST(url, data = {}, config) {
  return new Promise((resolve, reject) => {
    let load = Loading.service(loadingBg)

    axios({
      method: 'post',
      url: url,
      data: data,
      ...config
    })
      .then(res => {
        load.close()
        resolve(res.data)
      })
      .catch(err => {
        if (load) {
          load.close()
        }
        reject(err.data)
      })
  })
}

/**
 * put方法，仅此一个想要用正常的自己封装一下  我的那个接口就长这样我也很无奈
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function PutMy(url, params = {}, userId) {
  return new Promise((resolve, reject) => {
    let load = Loading.service(loadingBg)

    axios.put(url + '?loginUserId=' + userId, params)
      .then(res => {
        load.close()
        resolve(res.data)
      })
      .catch(err => {
        if (load) {
          load.close()
        }
        reject(err.data)
      })
  })
}

/**
 * Delete方法，对应Delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function Delete(url, params = {}) {
  return new Promise((resolve, reject) => {
    let load = Loading.service(loadingBg)

    axios.put(url, params)
      .then(res => {
        load.close()
        resolve(res.data)
      })
      .catch(err => {
        if (load) {
          load.close()
        }
        reject(err.data)
      })
  })
}
