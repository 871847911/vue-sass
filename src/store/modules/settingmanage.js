import * as obj from '@/api/settingmanage'

const settingmanage = {
  actions: {
    findList({ commit, state }, params) { //查询
      return new Promise((resolve, reject) => {
        obj.findList(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteBanner({ commit, state }, params) { //删除轮播
      return new Promise((resolve, reject) => {
        obj.deleteBanner(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    createBanner({ commit, state }, params) { //删除轮播
      return new Promise((resolve, reject) => {
        obj.createBanner(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateBanner({ commit, state }, params) { //删除轮播
      return new Promise((resolve, reject) => {
        obj.updateBanner(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default settingmanage