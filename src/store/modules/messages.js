import * as obj from '@/api/message'

const messages = {
  actions: {
    platformMessage({
      commit,
      state
    }, params) { // 消息中心
      return new Promise((resolve, reject) => {
        obj.platformMessage(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    countNew({
      commit,
      state
    }, params) { // 统计新消息
      return new Promise((resolve, reject) => {
        obj.countNew(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    read({
      commit,
      state
    }, params) { // 阅读消息
      return new Promise((resolve, reject) => {
        obj.read(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default messages
