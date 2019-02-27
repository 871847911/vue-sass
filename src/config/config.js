import store from '../store'
const linkUrl = location.href
const reg = /studyanimal\.vdongchina\.com/gi
// console.log(store.getters.roles.resDomain)
let imgHostTemp = store.getters.roles.tempDomain
const imgHost = 'http://kpay.qiniu.vdongchina.com/'

if (!reg.test(linkUrl)) {
  imgHostTemp = store.getters.roles.tempDomain
}

export default {
	imgHostTemp,
	imgHost
}
