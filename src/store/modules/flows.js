import * as obj from '@/api/flow'

const flows = {
  actions: {
    getPlatformDetail({
      commit,
      state
    }, params) { // 流量账户平台信息
      return new Promise((resolve, reject) => {
        obj.getPlatformDetail(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRule({
      commit,
      state
    }, params) { // 获取七牛云计费规则
      return new Promise((resolve, reject) => {
        obj.getRule(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getStoreDetail({
      commit,
      state
    }, params) { // 流量账户店铺信息
      return new Promise((resolve, reject) => {
        obj.getStoreDetail(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    pageFlowDetail({
      commit,
      state
    }, params) { // 流量明细-分页空间
      return new Promise((resolve, reject) => {
        obj.pageFlowDetail(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    pageSpaceDetail({
      commit,
      state
    }, params) { // 流量明细-分页流量
      return new Promise((resolve, reject) => {
        obj.pageSpaceDetail(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    pageStoreBalance({
      commit,
      state
    }, params) { // 分页店铺余额记录
      return new Promise((resolve, reject) => {
        obj.pageStoreBalance(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateRule({
      commit,
      state
    }, params) { // 修改计费规则
      return new Promise((resolve, reject) => {
        obj.updateRule(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default flows
