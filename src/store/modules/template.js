import * as obj from '@/api/template'

const template = {
  actions: {
    createTemplate({ commit, state }, params) { //创建模板
      return new Promise((resolve, reject) => {
        obj.createTemplate(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryAppCodeTemplateList({ commit, state }, params) {  //查询小程序代码模板列表
      return new Promise((resolve, reject) => {
        obj.queryAppCodeTemplateList(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryTemplateFuncList({ commit, state }, params) { //小程序模板功能列表获取
      return new Promise((resolve, reject) => {
        obj.queryTemplateFuncList(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryTemplate({ commit, state }, params) { // 获取模板列表
      return new Promise((resolve, reject) => {
        obj.queryTemplate(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    templateEnable({ commit, state }, params) { // 修改模板是否启用
      return new Promise((resolve, reject) => {
        obj.modifyAppTemplateEnable(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTemplate({ commit, state }, params) { // 查询模板详情
      return new Promise((resolve, reject) => {
        obj.getTemplate(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    modifyAppTemplate({ commit, state }, params) { // 修改模板
      return new Promise((resolve, reject) => {
        obj.modifyAppTemplate(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default template