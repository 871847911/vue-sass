import * as obj from '@/api/column'

const columns = {
  actions: {
    columnList({ commit, state }, params) { // 专栏列表
      return new Promise((resolve, reject) => {
        obj.columnList(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getColumnDetail({ commit, state }, params) { // 获取专栏信息
      return new Promise((resolve, reject) => {
        obj.getColumnDetail(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getColumnIntroduceDetail({ commit, state }, params) { // 获取发刊词信息
      return new Promise((resolve, reject) => {
        obj.getColumnIntroduceDetail(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    changeStatus({ commit, state }, params) { // 更改上下架状态
      return new Promise((resolve, reject) => {
        obj.changeStatus(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    columnContentList({ commit, state }, params) { // 专栏内容列表
      return new Promise((resolve, reject) => {
        obj.columnContentList(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getColumnInfo({ commit, state }, params) { // 获取专栏名称和进度
      return new Promise((resolve, reject) => {
        obj.getColumnInfo(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    columnContentListDetail({ commit, state }, params) { // 图文信息
      return new Promise((resolve, reject) => {
        obj.columnContentListDetail(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    changeContentStatus({ commit, state }, params) { // 图文信息下架
      return new Promise((resolve, reject) => {
        obj.changeContentStatus(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default columns
