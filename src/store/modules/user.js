import { login, logout, getInfo, statsMessage } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: null,
    show_dialog_login: false,
    message: 0
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    CLEAN_TOKEN: (state, token) => {
      state.token = ''
    },
    SHOW_DIALOG_LOGIN: (state, is_show) => {
      state.show_dialog_login = is_show
    },
    SET_MESSAGE: (state, message) => {
      state.message = message
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data)
          commit('SET_TOKEN', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_ROLES', data)
          // setToken(data,0)
          // commit('SET_NAME', data.nickName)
          // commit('SET_AVATAR', data.avatar)
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          // commit('SET_ROLES', null)
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 统计消息
    statsMessage({ commit, state }) {
      return new Promise((resolve, reject) => {
        statsMessage().then((res) => {
          commit('SET_MESSAGE', res.data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
