import * as obj from '@/api/megagame'

const megagame = {
  actions: {
    searchByPageGame({ commit, state }, params) { //查询参赛作品
      return new Promise((resolve, reject) => {
        obj.searchByPageGame(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    searchRankByPage({ commit, state }, params) { //分页查询作品投票排名
      return new Promise((resolve, reject) => {
        obj.searchRankByPage(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    saveConfig({ commit, state }, params) { //修改投票配置
      return new Promise((resolve, reject) => {
        obj.saveConfig(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    removeFromBlacklist({ commit, state }, params) { //黑名单移除
      return new Promise((resolve, reject) => {
        obj.removeFromBlacklist(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getConfigGame({ commit, state }, params) { //获取投票配置
      return new Promise((resolve, reject) => {
        obj.getConfigGame(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addToBlacklist({ commit, state }, params) { //添加到黑名单
      return new Promise((resolve, reject) => {
        obj.addToBlacklist(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default megagame
