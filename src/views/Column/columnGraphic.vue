<template>
  <section class="my-column-list-detail app-container">
    <div class="header">
      <span class="text">图文信息</span>
      <div class="right-bar">
        <span @click="goback" style="cursor:pointer;margin-right:20px;"><i class="iconfont">&#xe60a;</i>返回</span>
        <div class="editor-btn" v-if="pageData.onStatus === 1"> 
          <el-button class="major-button" @click="changeStatus">下架</el-button>
        </div>
      </div>
    </div>
    <div class="content-box">
      <BasicInfoComponent :content="pageData"></BasicInfoComponent>
      <GraphicContentComponent :content="pageData"></GraphicContentComponent>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :show-close="true" width="650px">
      <div class="form-box">
        <h1>拒绝原因</h1>
        <el-input
          type="textarea"
          :maxlength=50
          autosize
          placeholder="请填写拒绝理由"
          v-model="shelvesReason"
          >
        </el-input>
        <div class="footer">
          <button @click="cancel()">取消</button>
          <button @click="determine()">确定</button>
        </div>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import BasicInfoComponent from './BasicInfoComponent'
import GraphicContentComponent from './GraphicContentComponent'
export default {
  name:'columnGraphicMessage',
  data(){
    return {
      shelvesReason:'',
      dialogFormVisible:false,
      pageData:{}
    }
  },
  components:{
    BasicInfoComponent,
    GraphicContentComponent
  },
  created(){
    this.columnContentListDetail()
  },
  methods:{
    // 获取图文详情
    columnContentListDetail(){
      let self = this
      self.$store
        .dispatch('columnContentListDetail', {
          id:this.$route.query.id
        })
        .then(res => {
          if (res.success) {
            res.data.onDate = res.data.onDate.substr(0,10)
            res.data.audioUrl = res.data.resDomain + res.data.audioUrl
            res.data.contentUrl = res.data.resDomain + res.data.contentUrl
            this.pageData = res.data
            
          }
        })
    },

     // 改变上下架
    changeStatus(){
      this.dialogFormVisible = true
    },

    // 取消
    cancel(){
      this.dialogFormVisible = false
    },

    determine(){// 下架原因
      if(this.shelvesReason === ''){
        this.$message.warning('请输入拒绝原因')
      }else{
        let self = this
        self.$store
          .dispatch('changeContentStatus', {
            id:this.$route.query.id,
            status:this.status
          })
          .then(res => {
            if (res.success) {
              this.dialogFormVisible = false
              this.columnContentListDetail()
              this.$message.success("图文下架成功")
            }else{
              this.$message.info(res.message)
            }
          })
      }
    },

    // 回退
    goback(){
      this.$router.back()
    }
  }
}
</script>
<style scoped lang="scss">
.my-column-list-detail  {
  width:100%;
  position: relative;
  font-size: 14px;
  color: #4A4A4A;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #9B9B9B;
    font-size: 20px;
    margin-bottom: 14px;
    height: 40px;
    .text {
      color: #9B9B9B;
    }
    .right-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      .major-button{
        color:#ffffff;
      }
    }
  }
  .content-box {
    min-height: 700px;
    margin-bottom: 0;
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
    .audio-style {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        bottom: -40px;
        height: 1px;
        width: 980px;
        background-color: #E6E6E6;
      }
    }
    .img-content {
      width: 100%;
      background: #ffffff;
      box-sizing: border-box;
      padding: 30px 0 0 20px;
      .audio-info {
        margin-bottom: 40px;
      }
      .col-intro {
        margin-top: 80px;
        min-height: 223px;
      }
    }
    .info-content {
      width: 6.6rem;
      .audio-info {
        padding-left: 20px;
      }
    }
    .info {
      width: 100%;
      background: #ffffff;
      .info-content {
        padding: 30px 0 40px 20px;
        height: auto;
        display: flex;
        justify-content: center;
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
          display: flex;
          flex-direction: column;
          height: 100%;
          -webkit-box-flex:1;
          -webkit-flex:1;
          -ms-flex:1;
          flex:1;
        }
        .info-right-tp {
          width: 100%;
          min-height: 78px;
          display: flex;
          align-items: baseline;
          justify-content: flex-start;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background-color: rgba(230, 230, 230, 0.5);
          }
          p  {
            display: inline-block;
            line-height: 38px;
            font-size: 30px;
            font-weight: 600;
            margin-right: 15px;
          }
          .up-status {
            color: #ffffff;
            background-color: #9B9B9B;
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
            padding: 0px 3px;
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
              width: 2px;
              height: 560px;
              background-color: rgba(230, 230, 230, 0.5);
            }
          }
          .detail-bottom {
            width: 50%;
            display:flex;
            align-items: center;
            line-height: 23px;
            justify-content: flex-end;
            >div {
              height: 560px;
              margin-left: 40px;
            }
          }
          p {
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
  }
}
.form-box {
  width: 100%;
  h1 {
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    margin-bottom: 40px;
    line-height: 25px;
  }
 
  .footer {
    text-align: center;
    margin: 20px auto;
    margin-bottom: 0;
    height: 40px;
    button {
      border:none;
      width: 120px;
      height: 40px;
      border-radius: 4px;
      box-sizing: border-box;
      text-align: center;
    }
    button:nth-child(1) {
      background-color: #ffffff;
      color: #9B9B9B;
      margin-right: 20px;
      border: 1px solid rgba(230, 230, 230, 1);
    }
    button:nth-child(2) {
      background-color:#00B4B9;
      color: #ffffff;
    }
  }
}
</style>
<style lang="scss">
  .el-textarea,.el-textarea__inner {
    height: 243px !important;
  }

</style>


