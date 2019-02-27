import request from '@/utils/request'
var api = '/api'
if(process.env.NODE_ENV == 'production'){
  api = ''
} 
export function createTemplate(params) { //创建模板
  return request({
    url: `${api}/platform/app/template/createTemplate`,
    method: 'post',
    data:params
  })
}

export function queryAppCodeTemplateList(params) { //获取库里的模板列表
  return request({
    url: `${api}/platform/app/template/queryAppCodeTemplateList`,
    method: 'post',
    params
  })
}

export function queryTemplateFuncList(params) { //模板结构
  return request({
    url: `${api}/platform/app/template/queryTemplateFuncList`,
    method: 'post',
    params
  })
}

export function queryTemplate(params){ //获取模板列表
  return request({
    url: `${api}/platform/app/template/queryTemplate`,
    method: 'post',
    params
  })
}

export function getTemplate(params){ //查询模板详情
  return request({
    url: `${api}/platform/app/template/getTemplate`,
    method: 'post',
    params
  })
}
export function modifyAppTemplate(params){ //修改模板
  return request({
    url: `${api}/platform/app/template/modifyAppTemplate`,
    method: 'post',
    data:params
  })
}
export function modifyAppTemplateEnable(params){ //修改模板是否启用
  return request({
    url: `${api}/platform/app/template/modifyAppTemplateEnable`,
    method: 'post',
    params
  })
}

export function modifyAppTemplateDefault(params){ //修改模板是否默认
  return request({
    url: `${api}/platform/app/template/modifyAppTemplateDefault`,
    method: 'post',
    data:params
  })
}



//192.168.31.115:9999/auth/login