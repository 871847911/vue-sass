import * as obj from '@/api/usermanage'

const usermanage = {
  actions: {
    searchByPage({ commit, state }, params) { //添加分类
      return new Promise((resolve, reject) => {
        obj.searchByPage(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteAuthor({ commit, state }, params) { //删除
      return new Promise((resolve, reject) => {
        obj.deleteAuthor(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addAuthor({ commit, state }, params) { //添加
      return new Promise((resolve, reject) => {
        obj.addAuthor(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAuthor({ commit, state }, params) { //查询
      return new Promise((resolve, reject) => {
        obj.getAuthor(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    modifyAuthor({ commit, state }, params) { //修改
      return new Promise((resolve, reject) => {
        obj.modifyAuthor(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default usermanage
