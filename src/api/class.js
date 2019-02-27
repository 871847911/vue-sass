import request from '@/utils/request'
// console.log(request)
var api = '/api'
if (process.env.NODE_ENV == 'production') {
  api = ''
}

export function createCourseCatalog(params) { // 添加分类
  return request({
    url: `${api}/platform/mgt/course/createCourseCatalog`,
    method: 'post',
    params
  })
}

export function modifyCourseCatalog(params) { // 修改分类
  return request({
    url: `${api}/platform/mgt/course/modifyCourseCatalog`,
    method: 'post',
    params
  })
}

export function queryCourseCatalogPage(params) { // 课程分类查询
  return request({
    url: `${api}/platform/mgt/course/queryCourseCatalogPage`,
    method: 'post',
    params
  })
}

export function queryCourseMainPage(params) { // 课程查询
  return request({
    url: `${api}/platform/mgt/course/queryCourseMainPage`,
    method: 'post',
    params
  })
}

export function getCourseInfo(params) { // 课程查询
  return request({
    url: `${api}/platform/mgt/course/getCourseInfo`,
    method: 'get',
    params
  })
}

export function downCourse(params) { // 课程下架
  return request({
    url: `${api}/platform/mgt/course/downCourse`,
    method: 'get',
    params
  })
}
