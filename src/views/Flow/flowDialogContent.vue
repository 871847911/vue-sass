<template>
  <div class="dialog-content">
    <h2>账号详情</h2>
    <div class="info">
      <div>商户账号<span>{{data.storeNumber}}</span></div>
      <div>联系人<span>{{data.realName ? data.realName : '/'}}</span></div>
      <div>手机号码<span>{{data.phone ? data.phone : '/'}}</span></div>
      <div>账号有效期<span>{{data.buyDateLength ? data.buyDateLength : 0}}天</span></div>
      <div>账号激活日期<span>{{data.enableDate ? data.enableDate : '/'}}</span></div>
      <div>账号到期日期<span>{{data.endDate ? data.endDate : '/'}}</span></div>
    </div>

    <h4>流量信息</h4>
    <div class="info">
      <div>七牛云Bucket<span>{{data.bucketName}}</span></div>
      <div>
        状态
        <span v-if="data.bucketState === 1">正常</span>
        <span v-else-if="data.bucketState === 2">预警</span>
        <span v-else>欠费</span>
      </div>
      <div>流量账号余额<span>{{data.amount ? data.amount : 0}}元</span></div>
      <div>本月外网流出量<span>{{data.moonOutFlow ? data.moonOutFlow : 0}}GB</span></div>
      <div>本月储存空间量<span>{{data.storageSpace ? data.storageSpace : 0}}GB</span></div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "FlowDialogContent",
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    console.log(this.data);
  }
};
</script>

<style lang="scss" scoped>
.dialog-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  h2,
  h4 {
    display: flex;
    color: #4a4a4a;
    font-weight: 600;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 18px;
  }
  h4 {
    font-size: 12px;
    margin-top: 40px;
  }
  .info {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    > div {
      width: 47%;
      color: #9b9b9b;
      padding: 5px 0;
      margin-bottom: 30px;
      border-bottom: 1px solid #e6e6e6;
      box-sizing: border-box;
      span {
        float: right;
        color: #4a4a4a;
      }
    }
  }
}
</style>
