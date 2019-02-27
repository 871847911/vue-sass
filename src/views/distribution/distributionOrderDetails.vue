<template>
  <div class="app-container">
    <tit></tit>
    <div class="mainBox top" v-if="tableData">
      <p class="title">基本信息</p>
      <div class="topFlex">
        <div class="chid">订单编号<span>{{tableData.orderNo}}</span></div>
        <div class="chid">生成时间<span>{{getNewDate(tableData.createTime)}}</span></div>
        <div class="chid">订单类型
          <span v-if="tableData.orderType==100"> 分销->推广(推广二维码给用户扫码下单)</span>
          <span v-if="tableData.orderType==101">分销->赠送</span>
          <span v-if="tableData.orderType==102">分销->拼团</span>
          <span v-if="tableData.orderType==103">分销->分享</span>
          <span v-if="tableData.orderType==200">知识付费-常规</span>
          <span v-if="tableData.orderType==201">知识付费-赠送</span>
          <span v-if="tableData.orderType==202">知识付费-拼团</span>
          <span v-if="tableData.orderType==203">知识付费-分享</span>
        </div>
      </div>
      <div class="topFlex">
        <div class="chid">订单金额<span>{{tableData.orderAmount}}元</span></div>
        <div class="chid">订单状态
          <span v-if="tableData.orderStatus==0">订单取消</span>
          <span v-if="tableData.orderStatus==1">预订单</span>
          <span v-if="tableData.orderStatus==2">待付款</span>
          <span v-if="tableData.orderStatus==3">付款中</span>
          <span v-if="tableData.orderStatus==4">已付款</span>
          <span v-if="tableData.orderStatus==5">待退款</span>
          <span v-if="tableData.orderStatus==6">退款中</span>
          <span v-if="tableData.orderStatus==7">已退款</span>
          <span v-if="tableData.orderStatus==8">待结清</span>
          <span v-if="tableData.orderStatus==9">结清中</span>
          <span v-if="tableData.orderStatus==10">已结清</span>
        </div>
        <div class="chid">用户姓名<span>{{tableData.buyerWxName}}</span></div>
      </div>
      <div class="topFlex">
        <div class="chid">手机号码<span></span></div>
      </div>
    </div>
    <div class="mainBox top" v-if="tableData">
      <p class="title">分销信息</p>
      <div class="topFlex">
        <div class="chid">推客微信昵称<span>{{tableData.pusherWxName}}</span></div>
        <div class="chid">推客佣金比例<span>{{tableData.pusherCommissionRate}}%</span></div>
        <div class="chid">推客收益<span>{{tableData.pusherAnticipatedIncomeAmount}}元</span></div>
      </div>
      <div class="topFlex">
        <div class="chid">平台抽成<span>{{tableData.platformExtractionRate}}%</span></div>
        <div class="chid">平台收益<span>{{tableData.platformAnticipatedIncomeAmount}}元</span></div>
      </div>
    </div>
    <div class="mainBox top bottom" v-if="course">
      <p class="title">商品信息</p>
      <div class="topFlex">
        <div class="fst" >
          <img
            :src="course.imageUrl"
          >
          <div class="course">
            <p class="courseTitle">{{course.goodsName}}</p>
            <p class="courseType">{{course.categoryName}}/{{course.typeName}}</p>
          </div>
        </div>
        <div class="child2">
          <dl>
            <dt>¥{{course.price}}</dt>
            <dd>价格</dd>
          </dl>
        </div>
        <div class="child2">
          <dl>
            <dt>{{course.authorName}}</dt>
            <dd>讲师</dd>
          </dl>
        </div>
        <div class="child2">
          <dl>
            <dt>{{course.storeName}}</dt>
            <dd>商户</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/distribution";
import tit from "@/components/Htitle";
import { mapGetters } from "vuex";
export default {
  methods: {},
  components: {
    tit
  },
  computed: {
    ...mapGetters(["roles"])
  },
  data() {
    return {
      tableData:null,
      course:null
    };
  },
  created() {
    this.getCatalogPage();
  },
  methods: {
    //时间截取
    getNewDate(s){
      s = s.substring(0,s.length-2)
      return s
    },
    getCatalogPage() {
      let self = this;
      let data = {
        orderId:this.$route.query.id
      };      
      api.DistributionOrderDetail(data).then(res => {
        console.log(res)
        if (res.serviceCode=="E000000000") {
          self.tableData = res.data;
        let datas = {
          peddleGoodsId:res.data.productKey
        };      
        api.getPeddleGoodsDetail(datas).then(res => {
          console.log(res)
          if (res.serviceCode=="E000000000") {
            this.course = res.data
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
      
    },
  }
};
</script>
<style scoped lang="scss">
.mainBox {
  background: #fff;
  padding: 30px 30px 20px 30px;
}
.top {
  margin-bottom: 30px;
  p.title {
    font-size: 14px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    padding-bottom: 35px;
  }
  .topFlex {
    display: flex;
    .chid {
      width: 33.33%;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      padding-bottom: 20px;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        padding-left: 30px;
      }
    }
    .child2 {
      width: 22%;
      border-left: 1px solid #e6e6e6;
      text-align: center;
      dt {
        font-size: 30px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        padding-top: 12px;
      }
      dd {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        padding-top: 10px;
      }
    }
    .fst {
      flex: 1;
      display: flex;
      img {
        width: 154px;
        height: 96px;
      }
      .course {
        text-align: left;
        padding-left: 20px;
        .courseTitle {
          font-size: 16px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(74, 74, 74, 1);
          padding-bottom: 20px;
        }
        .courseType {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
        }
      }
    }
  }
}
.bottom {
  padding-bottom: 30px;
}
</style>