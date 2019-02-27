import * as obj from '@/api/class'

const classes = {
  actions: {
    createCourseCatalog({ commit, state }, params) { //添加分类
      return new Promise((resolve, reject) => {
        obj.createCourseCatalog(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    modifyCourseCatalog({ commit, state }, params) { //修改分类
      return new Promise((resolve, reject) => {
        obj.modifyCourseCatalog(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryCourseCatalogPage({ commit, state }, params) { //课程分类查询
      return new Promise((resolve, reject) => {
        obj.queryCourseCatalogPage(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryCourseMainPage({ commit, state }, params) { //客户账号管理-查看客户账号
      return new Promise((resolve, reject) => {
        obj.queryCourseMainPage(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCourseInfo({ commit, state }, params) { //课程查询
      return new Promise((resolve, reject) => {
        obj.getCourseInfo(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    downCourse({ commit, state }, params) { //课程下架
      return new Promise((resolve, reject) => {
        obj.downCourse(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default classes
