import * as obj from '@/api/operationmanage'

const operationmanage = {
  actions: {
    searchByPageGraphic({ commit, state }, params) { //查询
      return new Promise((resolve, reject) => {
        obj.searchByPageGraphic(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    upGraphic({ commit, state }, params) { //上架
      return new Promise((resolve, reject) => {
        obj.upGraphic(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    downGraphic({ commit, state }, params) { //下架
      return new Promise((resolve, reject) => {
        obj.downGraphic(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    createGraphic({ commit, state }, params) { //创建
      return new Promise((resolve, reject) => {
        obj.createGraphic(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateGraphic({ commit, state }, params) { //更新
      return new Promise((resolve, reject) => {
        obj.updateGraphic(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteGraphic({ commit, state }, params) { //删除
      return new Promise((resolve, reject) => {
        obj.deleteGraphic(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    findAll({ commit, state }, params) { //查询
      return new Promise((resolve, reject) => {
        obj.findAll(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getGraphic({ commit, state }, params) { //查询
      return new Promise((resolve, reject) => {
        obj.getGraphic(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    createChannelT({ commit, state }, params) { //查询
      return new Promise((resolve, reject) => {
        obj.createChannelT(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    createChannel({ commit, state }, params) { //查询
      return new Promise((resolve, reject) => {
        obj.createChannel(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getChannel({ commit, state }, params) { //查询
      return new Promise((resolve, reject) => {
        obj.getChannel(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    searchChannel({ commit, state }, params) { //查询
      return new Promise((resolve, reject) => {
        obj.searchChannel(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryCourseMainPage2({ commit, state }, params) { //查询
      return new Promise((resolve, reject) => {
        obj.queryCourseMainPage2(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    genCourseQrcode({ commit, state }, params) { //查询
      return new Promise((resolve, reject) => {
        obj.genCourseQrcode(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    genCourseQrcodeFile({ commit, state }, params) { //生成二维码
      return new Promise((resolve, reject) => {
        obj.genCourseQrcodeFile(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default operationmanage