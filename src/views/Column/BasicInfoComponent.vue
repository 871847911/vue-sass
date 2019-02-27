<template>
  <div>
    <p class="part-title">基本信息</p>
    <div class="info">
      <div class="info-content">
        <div class="info-left">
          <img :src="content.contentUrl" alt="图片">
        </div>
        <div class="info-right">
          <div class="info-right-tp">
            <div class="text-top">
              <p>{{content.contentName}}</p>
              <span v-if="content.onStatus === 0" class="down-status">未上架</span>
              <span v-if="content.onStatus === 1" class="up-status">已上架</span>
            </div>
          
            <div class="shelves-time">上架时间：{{content.onDate}}</div>
          </div>

          <div class="info-right-bt">
            <div class="detail-top">
              <p>专栏名称</p>
              <strong v-if="content.storeColumn">{{content.storeColumn.columnName}}</strong>
            </div>
            <div class="detail-bottom">
              <div>
                <p>篇幅</p>
                <strong v-if="content.storeColumn">{{content.storeColumn.articleNumber}}</strong>
              </div>
                <div>
                <p>当前篇幅</p>
                <strong>{{content.currentNo}}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BasicInfo',
  data(){
    return {}
  },
  
  props:{
    content:{
      type:Object,
      default:{}
    }
  }
}
</script>

<style lang="scss" scoped>
.part-title  {
  padding-left: 20px;
  background-color: #F9FAF9;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  color: #999999;
}
.small-part-title  {
  color: #9B9B9B;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  margin-bottom: 30px;
}
.info {
  margin-bottom: 30px;
  width: 100%;
  background: #ffffff;
  .info-content {

    padding: 30px 0 40px 20px;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .info-left {
      flex-shrink: 0;
      width: 240px;
      margin-right: 40px;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info-right {
      width: 380px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 100%;
    }
    .info-right-tp {
      position: relative;
      width: 100%;
      min-height: 78px;
      align-items: baseline;
      justify-content: flex-start;
      position: relative;
      .text-top {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .shelves-time {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #9B9B9B;
        line-height: 20px;
        margin-bottom: 10px;
      }
      &::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: rgba(230, 230, 230, 0.5);
      }
      p  {
        max-width: calc(100% - 65px);
        word-wrap: break-word;
        word-break: keep-all;
        display: inline-block;
        line-height: 38px;
        font-size: 30px;
        font-weight: 600;
        flex-shrink: 0;
        margin: 0 15px 10px 0;
      }
      .up-status {
        flex-shrink: 0;
        color: #ffffff;
        background-color: #6CDDC7;
        border-radius: 2px;
        font-size: 12px;
        padding: 5px;
      }
      .down-status {
        flex-shrink: 0;
        color: #9B9B9B;
        background-color: #E6E6E6;
        border-radius: 2px;
        font-size: 12px;
        padding: 2px 3px;
      }
    }
    .info-right-bt {
      width: 380px;
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      margin-top: 23px;
      .detail-top {
        width: 50%;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          width: 1px;
          height: 56px;
          background-color: rgba(230, 230, 230, 0.5);
        }
      }
      .detail-bottom {
        width: 50%;
        display: flex;
        align-items: center;
        line-height: 23px;
        justify-content: flex-end;
        >div {
          height: 56px;
          margin-left: 40px;
        }
      }
      p {
        line-height: 23px;
        color: #9B9B9B;
        font-size: 14px;
        margin-bottom: 10px;
      }
      strong  {
        color: #4A4A4A;
        font-size: 14px;
      }
    }
  }
}

</style>
