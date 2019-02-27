<template>
  <div class="app-container">
    <section class = "mycolumnupload">
      <div class = "header">
        <span>专栏介绍</span>
        <div class="editor-btn"> 
          <span style="cursor:pointer;margin-right:20px;" @click="back"><i class="iconfont">&#xe60a;</i>返回</span>
          <el-button class="borderThem" v-if="pageDate.onStatus === 1" @click="changeStatus">下架</el-button>
        </div>
      </div>

      <div class="content_box">
        <el-tabs v-model="activeName">
          <el-tab-pane label="专栏信息" name="first">
              <div class="column_box">
                  <div class="header">基本信息</div>
                  <div>
                    <div class="img_box">
                        <img :src="pageDate.columnUrl" alt="图片">
                        <div class="right_box">
                            <div class="title">
                              <span>{{pageDate.columnName}}</span>
                              <span style="margin-left:10px;" v-if="pageDate.onStatus === 1">已上架</span>
                              <span style="margin-left:10px;background-color:#E6E6E6;" v-if="pageDate.onStatus === 0">未上架</span>
                            </div>
                            <div class="new_box">
                              <span class="autor">作者 | <span>{{pageDate.userName}}</span></span>
                              <span class="price">价格 | <span>{{pageDate.price}}元</span></span>
                            </div>
                            <div class="line"></div>
                            <div class = "see">
                                <button style="cursor:pointer;" @click="handleLook(pageDate.id)">查看</button>
                                <div class="pl20">
                                  <div class="update-time">
                                    <span>更新进度</span>
                                    <span>上次更新时间：{{pageDate.modifyDate}}</span>
                                  </div>
                                  <div class="progress">
                                    <div class="percent">
                                      <el-progress :show-text="false" :text-inside="true" :percentage="pageDate.percent"></el-progress>
                                      <span>{{pageDate.articleUpdateNumber}}/{{pageDate.articleNumber}}</span>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                    <div class="text-introduction">
                      <h3>专栏简介</h3>
                      <div class="introduction-content" v-html="pageDate.introduction" style="margin-top:20px;min-height:226px;">
                        {{pageDate.introduction}}
                      </div>
                    </div>
                  </div>
              </div>
          </el-tab-pane>

          <el-tab-pane label="发刊词" name="second">
            <div class="fkc_box_two">
              <div class="audio_info">
                <h3>音频</h3>
                <div class="audio_style">
                  <MusicPlayer :name="introductionDate.fileName" :url="introductionDate.columnUrl" :size="introductionDate.fileSize"></MusicPlayer>
                </div>
              </div>
              <div class="col_intro">
                <h3>图文内容</h3>
                <div class="introductContent" v-html="introductionDate.context" style="min-height:410px;">
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>
  </div>
</template>
<script>
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer'
export default {
  name:'ColumnIntroduce',
  data(){
    return {
      pageDate:{},
      introductionDate:{},
      activeName: 'first',
      status:1,
      percent:''
    }
  },
  created(){
    this.init()
  },

  components:{
    MusicPlayer
  },
  
  methods:{
    init(){
      this.getColumnDetail()
      this.getColumnIntroduceDetail()
    },
    // 获取专栏信息
    getColumnDetail(){
      let self = this
      self.$store
        .dispatch('getColumnDetail', {
          id:this.$route.query.id
        })
        .then(res => {
          if (res.success) {
            if(res.data.articleNumber !== 0){
              res.data.percent = res.data.articleUpdateNumber / res.data.articleNumber * 100

              if(res.data.percent > 100){
                res.data.percent = 100
              }
            }else{
              res.data.percent = 0
            }
            if(res.data.modifyDate){
              res.data.modifyDate = res.data.modifyDate.substr(0,10)
            }
            res.data.columnUrl = res.data.resDomain + res.data.columnUrl
            this.pageDate = res.data
          }
        })
    },

    // 获取发刊词信息
    getColumnIntroduceDetail(){
      let self = this
      self.$store
        .dispatch('getColumnIntroduceDetail', {
          columnId:this.$route.query.id
        })
        .then(res => {
          if (res.success) {
            res.data.columnUrl = res.data.resDomain + res.data.columnUrl 
            this.introductionDate = res.data
          }
        })
    },

    // 查看内容
    handleLook(valueId){
      this.$router.push({
        name:"Columncontent",
        query:{
          id:valueId
        }
      })
    },

    // 改变上下架
    changeStatus(){
      let self = this
      self.$store
        .dispatch('changeStatus', {
          id:this.$route.query.id,
          status:this.status
        })
        .then(res => {
          if (res.success) {
            this.init()
            this.$message.success("专栏下架成功")
          }else{
            this.$message.info(res.message)
          }
       })
    },

    back(){
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.bgThem {
  background: #00B4B9 !important;
  color: #ffffff !important;
}
.borderThem {
  color: #ffffff !important;
}
section  {
  width: 100%;
  position: relative;
  font-size: 14px;
  color: #4A4A4A;
  >>>.el-alert--info {
    background: #e6f8f7 !important;
  }
  >>>.icon-tongzhi--:before {
    top: 1px;
    left: 6px;
    color: #00B4B9;
  }
  >>>.el-tabs__content {
    overflow: inherit;
  }
  >>>.el-alert__title.is-bold {
    font-weight: 400;
    color: #666666;
  }
  .content_box {
    position: relative;
    margin-bottom: 0;
    background: #ffffff;
  }
  .editor-btn {
    // position: absolute;
    // top: 0;
    // right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 110;
    .el-button  {
      padding: 0 !important;
      width: 82px;
      height: 40px;
      border-radius: 4px;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #9B9B9B;
    font-size: 20px;
    margin-bottom: 14px;
    height: 40px;
    .editor-btn {
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .el-button  {
        border: none !important;
        padding: 0 !important;
      }
    }
  }
  .prompt {
    height: 32px;
    line-height: 32px;
    background-color: #FFAA00;
  }
  >>>.el-tabs__header {
    height: 60px;
    line-height: 60px;
  }
  >>>.el-tabs__content {
    padding-bottom: 30px;
    background-color: #ffffff;
  }
  .text-introduction {
    margin-top: 49px;
    .introduction-content {
      width: 100%;
      margin-top: 20px;
      min-height: 240px;
      padding-bottom: 20px;
      padding-left: 21px;
      p {
        line-height: 28px;
      }
      img {
        margin-top: 20px;
        height: auto;
      }
    }
    h3 {
      padding-left: 21px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #F9FAF9;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }
    // p {
    //   width: 100%;
    //   margin-top: 20px;
    //   font-size: 14px;
    //   font-weight: 400;
    //   color: rgba(74, 74, 74, 1);
    //   line-height: 20px;
    // }
    // img  {
    //   margin: 14px 0 110px 0;
    // }
  }
  .introduction {
    width: 720px;
    margin: 38px auto;
  }
  >>>.el-tabs__header {
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #666666;
    margin: 0 !important;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .column_box {
    position: relative;
    margin: 30px auto;
    padding: 0 20px;
    font-size: 14px;
    .header {
      box-sizing: border-box;
      padding-left: 21px;
      width: 100%;
      font-size: 14px;
      height: 40px;
      line-height: 30px;
      color: #999999;
      margin-bottom: 20px;
      background-color: #F9FAF9;
    }
    .img_box {
      display: flex;
      padding: 0 20px;
      img {
        width: 288px;
        height: 180px;
      }
      .right_box {
        width: calc(100% - 240px);
        padding-left: 20px;
        box-sizing: border-box;
        .title {
          align-items: flex-end;
          font-weight: 600;
          color: #4A4A4A;
          display: flex;
          flex-flow: row nowrap;
          color: #4A4A4A;
          height: 42px;
          line-height: 42px;
          span:nth-child(1) {
            font-size: 30px;
          }
          >span:nth-child(2) {
            font-weight: 400;
            background-color: #00B4B9;
            color: #fff;
            font-size: 12px;
            width: 45px;
            border-radius: 2px;
            text-align: center;
            margin-bottom: 3px;
            width: 45px;
            height: 20px;
            line-height: 20px;
          }
        }
        .new_box {
          .new {
            font-size: 14px;
            height: 22px;
            font-weight: 400;
            color: #00B4B9;
            margin: 8px 0 11px 0;
            line-height: 22px;
          }
          .autor {
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(155, 155, 155, 1);
            line-height: 20px;
            span  {
              color: #666666;
            }
          }
          .price {
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            margin-left: 20px;
            color: rgba(155, 155, 155, 1);
            line-height: 20px;
            span  {
              color: #666666;
            }
          }
        }
        .line {
          height: 1px;
          background-color: #E6E6E6;
          width: calc(100% - 54px);
          margin-top: 11px;
        }
        .see {
          margin-top: 17px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          height: 32px;
          .update-time {
            height: 17px;
            line-height: 17px;
            span:nth-child(2) {
              color: #666666;
            }
          }
          button  {
            width: 100px;
            height: 32px;
            border: none;
            margin-right: 20px;
            background: #00B4B9;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 18px;
          }
          span  {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 17px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(155, 155, 155, 1);
            line-height: 17px;
          }
          .percent {
            span  {
              margin-left: 10px;
            }
          }
        }
      }
    }
    .progress {
      width: 100%;
      span  {
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 17px;
      }
      .percent {
        margin-top:5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .el-progress {
        display: flex;
        align-items: center;
        margin-left: 0;
        width: 500px;
      }
    }
  }
  .colInfoList, .fkc_box_two {

    padding: 0 20px;
    margin: 20px auto 0;
    .audio_style {
      margin: 20px 0 0 20px;
    }
    .audio_info, .base_info, .col_intro {
      h3 {
        color: #999999;
        background: #F9FAF9;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        padding-left: 22px;
      }
    }
    .base_info {
      min-width: 500px;
      .info {
        margin-top: 20px;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        img {
          width: 240px;
          height: 1.500px;
        }
        .box_info {
          margin-left: 20px;
          font-size: 14px;
          width: calc(100% - 260px);
          .info_title {
            height: 22px;
            line-height: 22px;
            margin-bottom: 20px;
            .title {
              color: #4A4A4A;
              font-weight: bold;
              font-size: 16px;
              height: 22px;
              line-height: 22px;
              margin: 0 !important;
            }
            .sjzt {
              font-size: 12px;
              color: #FFFFFF;
              height: 18px;
              line-height: 18px;
              background: #00B4B9;
              margin-left: 10px;
              position: relative;
              bottom: 1px;
              padding: 0.00500px 0.04500px;
            }
            .wsj {
              background: #E6E6E6;
              color: #9B9B9B;
            }
          }
          .up_time {
            height: 20px;
            line-height: 20px;
            color: #00B4B9;
            margin-bottom: 0.0500px;
            font-size: 14px;
          }
          .price_num {
            height: 30px;
            border-bottom: 1px solid #E6E6E6;
            span {
              color: #9B9B9B;
            }
            .cl {
              color: #666666;
            }
            .fh {
              width: 1px;
              height: 10px;
              background: #9B9B9B;
              line-height: 10px;
              margin: 0 0.0500px;
            }
          }
          .btn_check {
            background: #00B4B9;
            width: 1rem;
            color: #FFFFFF;
            font-size: 12px;
            height: 32px;
            line-height: 32px;
            border-radius: 4px;
            cursor: pointer;
          }
          .zt {
            color: #9B9B9B;
            font-size: 12px;
            margin-left: 0.1500px;
          }
        }
      }
      .progress {
        width: 100%;
        margin-top: 24px;
        h4 {
          color: #9B9B9B;
          font-size: 12px;
          margin-bottom: 10px;
        }
        .progboxss {
          height: 20px;
          display: flex;
          justify-content: space-between;
          width: 100%;
          line-height: 20px;
          span {
            height: 20px;
            line-height: 20px;
            color: #9B9B9B;
            font-size: 14px;
          }
          .progbox {
            margin: 0;
            width: 83.5%;
          }
          >>> .el-progress-bar__outer {
            height: 10px !important;
          }
        
          >>> .el-progress-bar__innerText {
            font-size: 6px !important;
            position: relative;
            bottom: 3px;
          }
        }
      }
    }
    .col_intro {
      margin-top: 40px;
      color: #4A4A4A;
      font-size: 14px;
      >>>.introduction-content {
        padding-left: 20px;
        p {
          line-height: 28px;
        }
        img  {
          margin-top: 20px;
        }
      }
      .introductContent {
        width: calc(100% - 71px);
        padding-left: 20px;
        >>>img {
          height: auto;
          line-height: 28px;
          margin: 23px 0 31px 0;
        }
        p{
          line-height: 28px;
        }
      }
      h3 {
        margin-bottom: 20px;
      }
    }
  }
}

</style>
<style lang="scss">
  .el-tabs__header {
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #666666;
    margin: 0 !important;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .el-progress-bar__inner{
    background-color:#00B4B9 !important;
  }
</style>


