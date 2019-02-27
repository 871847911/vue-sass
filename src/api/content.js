import {
  POST,
  Get
} from '@/utils/http'
import qs from "qs"
var api = '/api'
if (process.env.NODE_ENV == 'production') {
  api = ''
}

export default {
  queryCourseCatalogPage(params) {//内容列表
    return POST(`${api}/platform/mgt/course/queryCourseCatalogPage`, qs.stringify(params), {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },

  createCourseCatalog(params) {//添加一级分类
    console.log(qs)
    return POST(`${api}/platform/mgt/course/createCourseCatalog`, qs.stringify(params), {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },

  modifyCourseCatalog(params) {//添加二级分类
    return POST(`${api}/platform/mgt/course/modifyCourseCatalog`, qs.stringify(params), {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },

  getSaasCourseCatalog(params){
    return POST(`${api}/platform/mgt/course/getSaasCourseCatalog`, qs.stringify(params), {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }


}

// http://promote-test.vdongzc.com/platform/mgt/course/createCourseCatalog
// /platform/mgt/course/createCourseCatalog