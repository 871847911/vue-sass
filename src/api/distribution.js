import { POST } from '@/utils/http'
var api = '/api'
// var jiaqi = "/jiaqi"
if (process.env.NODE_ENV == 'production') {
  api = ''
}
import qs from "qs"
export default {
  settlementTotalList(params) { // 商户结算汇总列表
    return POST(`${api}/trading/merchant/settlementTotalList`, params, {
      'Content-Type': 'application/json'
    })
  },
  settlementRecord(params) { //商户结算记录
    return POST(`${api}/trading/merchant/settlementRecord`, params, {
      'Content-Type': 'application/json'
    })
  },
  sttlementAll(params) { //商户结算汇总
    return POST(`${api}/trading/merchant/settlementAll`, params, {
      'Content-Type': 'application/json'
    })
  },
  settlementDetail(params) { //商户结算详情
    return POST(`${api}/trading/merchant/settlementDetail`, params, {
      'Content-Type': 'application/json'
    })
  },
  settlementDetailEarnings(params) { //商户结算详情汇总
    return POST(`${api}/trading/merchant/settlementDetailEarnings`, params, {
      'Content-Type': 'application/json'
    })
  },
  sttlementAllEarnings(params) { //商户结算记录汇总
    return POST(`${api}/trading/merchant/settlementAllEarnings`, params, {
      'Content-Type': 'application/json'
    })
  },
  transferApplyList(params) { //转账申请列表
    return POST(`${api}/trading/transfer/transferApplyList`, params, {
      'Content-Type': 'application/json'
    })
  },
  transferRecordList(params) { //转账记录列表
    return POST(`${api}/trading/transfer/transferRecordList`, params, {
      'Content-Type': 'application/json'
    })
  },
  transferRecordDetail(params) { //转账记录详情
    return POST(`${api}/trading/transfer/transferRecordDetail`, params, {
      'Content-Type': 'application/json'
    })
  },
  DistributionOrderList(params) { //分销订单列表
    return POST(`${api}/order/DistributionOrderList`, params, {
      'Content-Type': 'application/json'
    })
  },
  DistributionOrderDetail(params) { //分销订单列表
    return POST(`${api}/order/DistributionOrderDetail`, params, {
      'Content-Type': 'application/json'
    })
  },
  transferConfirmOrRefuse(params) { //确定转账
    return POST(`${api}/trading/withdraw/withdrawAudit`, params, {
      'Content-Type': 'application/json'
    })
  },
  earNing(params) { //转账汇总
    return POST(`${api}/trading/withdraw/moneyAndCount`, params, {
      'Content-Type': 'application/json'
    })
  },
  settlementTotalListsh(params) { //推客结算汇总列表
    return POST(`${api}/trading/referral/settlementTotalList`, params, {
      'Content-Type': 'application/json'
    })
  },
  settlementRecordsh(params) { //推客结算汇总列表
    return POST(`${api}/trading/referral/settlementRecord`, params, {
      'Content-Type': 'application/json'
    })
  },
  settlementDetailsh(params) { //推客结算汇总列表
    return POST(`${api}/trading/referral/settlementDetail`, params, {
      'Content-Type': 'application/json'
    })
  },
  getPeddleUserPage(params) { //推客列表
    return POST(`${api}/account/peddle/getPeddleUserPage`, params, {
      'Content-Type': 'application/json'
    })
  },
  getPeddleUserDetail(params) { //推客详情
    return POST(`${api}/account/peddle/getPeddleUserDetail`, params, {
      'Content-Type': 'application/json'
    })
  },
  pusherSettlementAndCount(params) { //推客总收益 累计已结算 分销数量
    return POST(`${api}/trading/referral/pusherSettlementAndCount`, params, {
      'Content-Type': 'application/json'
    })
  },
  
  pageIncomeForm(params) { //推客详情
    return POST(`${api}/account/peddle/pageIncomeForm`, params, {
      'Content-Type': 'application/json'
    })
  },
  imageText(params) { //图文查看
    return POST(`${api}/file/imageText/selectImageText`, params, {
      'Content-Type': 'application/json'
    })
  },
  editImageText(params) { //图文编辑
    return POST(`${api}/file/imageText/editImageText`, params, {
      'Content-Type': 'application/json'
    })
  },
  addImageText(params) { //图文新增
    return POST(`${api}/file/imageText/addImageText`, params, {
      'Content-Type': 'application/json'
    })
  },
  selectCustomServices(params) { //二维码查询
    return POST(`${api}/file/customServer/selectCustomServers`, params, {
      'Content-Type': 'application/json'
    })
  },
  addCustomServer(params) { //二维码新增
    return POST(`${api}/file/customServer/addCustomServer`, params, {
      'Content-Type': 'application/json'
    })
  },
  deleteCustomServer(params) { //二维码删除
    return POST(`${api}/file/customServer/deleteCustomServer`, params, {
      'Content-Type': 'application/json'
    })
  },
  editCustomService(params) { //二维码编辑
    return POST(`${api}/file/customServer/editCustomServer`, params, {
      'Content-Type': 'application/json'
    })
  },
  selectBanners(params) { //查询联播图
    return POST(`${api}/file/banner/selectBannerList`, params, {
      'Content-Type': 'application/json'
    })
  },
  rotationGoodsChoice(params) { //查询关联商品
    return POST(`${api}/goods/peddleGoods/rotationGoodsChoice`, params, {
      'Content-Type': 'application/json'
    })
  },
  addBanner(params) { //新增banner
    return POST(`${api}/file/banner/addBanner`, params, {
      'Content-Type': 'application/json'
    })
  },
  deleteBanner(params) { //删除banner
    return POST(`${api}/file/banner/deleteBanner`, params, {
      'Content-Type': 'application/json'
    })
  },
  editBanner(params) { //编辑banner
    return POST(`${api}/file/banner/editBanner`, params, {
      'Content-Type': 'application/json'
    })
  },
  getAuthorizerInfo(params) { //获取授权信息
    return POST(`${api}/wechat/wechatAuthorizerInfo/getAuthorizerInfo`, params, {
      'Content-Type': 'application/json'
    })
  },
  sendVerificationCodeDelAuth(params) { //解绑短信验证码
    return POST(`${api}/wechat/wechatAuthorizerInfo/sendVerificationCodeDelAuth`, qs.stringify(params), {
      'Content-Type': 'application/json'
    })
  },
  selectPayConfig(params) { //查询支付配置
    return POST(`${api}/wechat/wechatAuthorizerInfo/selectPayConfig`, qs.stringify(params), {
      'Content-Type': 'application/json'
    })
  },
  savePayCert(params) { //上传证书
    return POST(`${api}/wechat/wechatAuthorizerInfo/savePayCert`, params, {
      'Content-Type': 'multipart/form-data'
    })
  },
  savaOrUpdatePay(params) { //设置支付配置
    return POST(`${api}/wechat/wechatAuthorizerInfo/savaOrUpdatePay`, params, {
      'Content-Type': 'application/json'
    })
  },
  unbundAuthorizerInfo(params) { //解绑公众号
    return POST(`${api}/wechat/wechatAuthorizerInfo/unbundAuthorizerInfo`, params, {
      'Content-Type': 'application/json'
    })
  },
  pusherEarnings(params) { //推客收入组成
    return POST(`${api}/order/trading/pusherEarnings`, params, {
      'Content-Type': 'application/json'
    })
  },
  //商品ID查商品
  getPeddleGoodsDetail(params){
    return POST(`${api}/goods/peddleGoods/getPeddleGoodsDetail`, params, {
      'Content-Type': 'application/json'
    })
  }
}
