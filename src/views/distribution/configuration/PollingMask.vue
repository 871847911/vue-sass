<template>
  <div class="poll-mask">
      <div class="content">
        <!-- <CircleLoader /> -->
        <p>等待授权中...</p>
        <div class="action-bar">
            <el-button class="major-btn" @click="$emit('ok')">授权成功</el-button>
            <el-button class="less-btn btn-b cancel" @click="$emit('close')">授权失败</el-button>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: "PollingMask",
  data(){
    return{}
  },
  components:{
  },
}
</script>

<style lang="stylus" scoped>
.poll-mask
  position fixed
  top 0
  left 0
  bottom 0
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  background-color rgba(0,0,0,0.5)
  z-index 9999
  >div
    position relative
    width 350px
    height 200px
    display flex
    flex-direction column
    align-items center
    justify-content center
    background-color #ffffff
    border-radius 5px
    color #666666
  .action-bar
    display flex
    flex-flow row nowrap
    align-items center
    justify-content center
    margin-top 40px
  p
    font-size 16px
    padding 20px 0 0 0
</style>
<style lang="scss" scoped>
  .content{
    .action-bar{
      .major-btn{
        color: #fff;
      }
      .cancel {
        background: #ffffff !important;
        font-size: 14px;
        font-weight: 400;
        color: #00b4b9 !important;
        border: 1px solid #00b4b9 !important;
      }
      .cancel:hover {
        background-color: #ffffff !important;
        color: #00b4b9 !important;
      }
    }
  }
</style>