import * as obj from '@/api/table'

const usertable = {
  actions: {
    querySubAccount({ commit, state }, params) { // 客户账号管理-分页查询子账户
      return new Promise((resolve, reject) => {
        obj.querySubAccount(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    createAccount({ commit, state }, params) { // 创建模板
      return new Promise((resolve, reject) => {
        obj.createAccount(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateAccount({ commit, state }, params) { // 创建模板
      return new Promise((resolve, reject) => {
        obj.updateAccount(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAccount({ commit, state }, params) { // 客户账号管理-查看客户账号
      return new Promise((resolve, reject) => {
        obj.getAccount(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateStatus({ commit, state }, params) { // //账号状态 开/关
      return new Promise((resolve, reject) => {
        obj.updateStatus(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    H5link({ commit, state }, params) { // H5链接
      return new Promise((resolve, reject) => {
        obj.H5link(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    version({ commit, state }, params) { // 版本查询接口
      return new Promise((resolve, reject) => {
        obj.version(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    resetPassword({ commit, state }, params) { // 客户账号密码重置接口
      return new Promise((resolve, reject) => {
        obj.resetPassword(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    duration({ commit, state }, params) { // 续费
      return new Promise((resolve, reject) => {
        obj.duration(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Upgrade({ commit, state }, params) { // 续费
      return new Promise((resolve, reject) => {
        obj.Upgrade(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    flow({ commit, state }, params) { // 额外流量配置
      return new Promise((resolve, reject) => {
        obj.flow(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    userFunction({ commit, state }, params) { // 配置账号功能查询接口
      return new Promise((resolve, reject) => {
        obj.userFunction(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    userFunctionSave({ commit, state }, params) { // 配置账号功能保存接口
      return new Promise((resolve, reject) => {
        obj.userFunctionSave(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    H5link({ commit, state }, params) { // h5连接
      return new Promise((resolve, reject) => {
        obj.H5link(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    versionFunction({ commit, state }, params) { // 版本管理 功能配置查询
      return new Promise((resolve, reject) => {
        obj.versionFunction(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    versionFunctionSave({ commit, state }, params) { // 版本管理 功能配置查询
      return new Promise((resolve, reject) => {
        obj.versionFunctionSave(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    storageFlow({ commit, state }, params) { // 版本管理 流量配置保存
      return new Promise((resolve, reject) => {
        obj.storageFlow(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteOpenPlatform({ commit, state }, params) { // 版本管理 流量配置保存
      return new Promise((resolve, reject) => {
        obj.deleteOpenPlatform(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    applyList({ commit, state }, params) { // 申请列表
      return new Promise((resolve, reject) => {
        obj.applyList(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    close({ commit, state }, params) { // 关闭跟进
      return new Promise((resolve, reject) => {
        obj.close(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deal({ commit, state }, params) { // 录入信息
      return new Promise((resolve, reject) => {
        obj.deal(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default usertable
