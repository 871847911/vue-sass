import request from '@/utils/request'
var api = '/api'
if(process.env.NODE_ENV == 'production'){
	api = ''
} 
export function uploadToken(params) {
  return request({
    url: `${api}/platform/qiniu/cloud/uploadToken`,
    method: 'get',
    params
  })
}