<template>
  <div class="app-container">
    <div class="dis-flex mb-30 justify-b">
      <div class="go-back" @click="goBack">
        <i class="iconfont icon-fanhui mr-5"></i>返回</div>
      <el-button type="primary" class="theme-bg-color theme-bd-color" @click="downCourse(id)">
        下架</el-button>
    </div>
    <div class="template-info dis-flex">
      <div class="template-info-l template-info mr-20 flex-1">
        <div class="h2">课程详情</div>
        <div class="template-info-l-hd dis-flex">
          <div class="hd-l mr-20">
            <div class="sliders">
              <el-carousel indicator-position="outside" height="200px" arrow="never">
                <el-carousel-item v-for="item in formData.detail.courseUrlList" :key="item" >
                  <img :src="formData.resDomain + item" style="width:100%;height:100%;" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="hd-r">
            <h2 class="mb-10">{{formData.detail.courseName}}</h2>
            <p>{{formData.detail.storeName}}</p>
            <p class="price mt-20">¥{{formData.detail.price}}</p>
            <p class="person mt-20">主讲人:{{formData.detail.createUser}} </p>
            <p class="look"></p>
          </div>
        </div>
        <div class="h3 mt-30 mt-20">课程简介</div>
        <div class="context mt-20" v-html="formData.detail.introduction"></div>
      </div>
      <div class="template-info-r template-info">
        <div class="h2" style="margin-bottom:10px;">课程正文</div>
        <div class="detail">
          <div class="detail-one">
            <course-main
              v-if="courseFlag"
              :courseType="courseType"
              :subType="subType"
              :courseContent="courseContent"
              :imageHead="imageHead">
            </course-main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CourseMain from '@/views/classes/courseMain'
  export default {
    data() {
      return {
        id: '',
        formData: null,
        maskBtn: false,
        bigImgSrc: '',
        courseFlag: false, // 父组件有数据时再渲染子组件
        courseContent: '', // 课程正文信息
        courseType: '', // 课程结构 1--非结构 2--结构
        subType: '', // 正文内容 1--图文 2--音频 2--视频
        imageHead: '' // 域名前缀
      }
    },
    components: {
      CourseMain
    },
    created() {
      let self = this
      let id = self.$route.query.id
      self.id = id
      self.getCourseInfo(id)
    },
    methods: {
      getCourseInfo(id) {
        let self = this
        self.$store.dispatch('getCourseInfo', { id: id }).then(res => {
          if (res.success) {
            self.formData = res.data
            self.courseContent = res.data.detail.courseSubList
            self.courseType = res.data.detail.courseType
            self.imageHead = res.data.resDomain
            if (self.courseContent.length > 0) {
              self.subType = self.courseContent[0].subType
            } else {
              self.subType = 1
            }
            self.courseFlag = true
          } else {
            self.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      },
      goBack() {
        this.$router.back(-1)
      },
      downCourse(id){
        let self = this
        self.$store.dispatch('downCourse', { id: id }).then(res => {
          if (res.success) {
            self.$router.push({name:'Review'})
          } else {
            self.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .template-form {
    background: none;
  }

  .template-info {
    .template-info-l {
      background: #ffffff;
      padding: 20px;
      .template-info-l-hd {
        padding-top: 20px;
      }
      .sliders {
        width: 320px;
        height: 200px;
      }
      .hd-r {
        h2 {
          font-size: 28px;
          color: rgba(74, 74, 74, 1);
          line-height: 40px;
        }
        p {
          font-size: 16px;
          color: rgba(155, 155, 155, 1);
          line-height: 22px;
        }
        .price {
          font-size: 24px;
          color: rgba(245, 166, 35, 1);
          line-height: 33px;
        }
        .person {
          font-size: 18px;
          color: rgba(74, 74, 74, 1);
          line-height: 25px;
        }
      }
    }
    .template-info-r {
      background: #ffffff;
      width: 374px;
      padding: 20px;
    }
    .h2 {
      font-size: 16px;
      color: rgba(155, 155, 155, 1);
      line-height: 22px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
    }
  }
  .h3{
    font-size:16px;
    color:rgba(74,74,74,1);
    line-height:22px;
  }
  .context{
    
  }
  .iconfont {
    display: inline-block;
    vertical-align: middle;
    margin-top: -3px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>