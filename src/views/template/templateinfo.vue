<template>
  <div class="app-container">
    <tit></tit> 
    <div class="template-form dis-flex">
      <div class="flex-1 template-info-l template-info mr-20">
        <div class="dis-flex">
          <div class="img-tpl">
            <el-carousel indicator-position="outside" height="432px" arrow="never">
              <el-carousel-item v-for="item in tplData.coverList" :key="item">
                <img :src="tplData.resDomain + item" style="width:100%;height:100%;" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="desc-tpl flex-1 mr-20">
            <h2>{{tplData.detail.name}}</h2>
            <div class="desc-list mb-20 dis-flex">
              <div class="desc-hd mr-20">模板版本</div>
              <div class="desc-bd flex-1">{{tplData.detail.version}}</div>
            </div>
            <div class="desc-list mb-20 dis-flex">
              <div class="desc-hd mr-20">使用要求</div>
              <div class="desc-bd">{{tplData.detail.remark}}</div>
            </div>
            <div class="desc-list mb-20 dis-flex">
              <div class="desc-hd mr-20">模板价格</div>
              <div class="desc-bd">{{tplData.detail.price}}</div>
            </div>
            <el-button type="success" class="edit-tpl" @click="editTpl(tplData.detail.id)" size="medium">编辑模板</el-button>
          </div>
        </div>
      </div>
      <div style="width:30px;"></div>
      <div class="flex-1 template-info-l template-info">
        <h2 class="mb-20">页面列表及功能</h2>
        <div class="module-list mb-20" v-for="(item,index) in tplData.funcList">
          <el-tag type="success">{{item.name}}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tit from  '@/components/Htitle';
export default {
  data() {
    return {
      id:'',
      tplData:null
    };
  },
  components: {
    tit
  },
  created() {
    let self = this;
    let id = this.$route.params.id
    self.id = id
    self.$store.dispatch('getTemplate',{id:id}).then(res=>{
      if(res.success){
        self.tplData = res.data 
      }else{
        self.$message({
          message:res.message,
          type:'error'
        })
      }
    })
  },
  methods: {
    editTpl(id) {
      this.$router.push({ name: "addtemplate",query:{id:id}});
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}

.h1 {
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  color: rgba(155, 155, 155, 1);
  line-height: 28px;
}

.template-form {
  width: 100%;
  height: 500px;
  background:none;
  .template-info {
    background-color: #ffffff;
    border-radius: 5px;
  }
  .template-info-l {
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    .img-tpl {
      width: 200px;
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
      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
    .desc-tpl {
      margin-left: 60px;
      h2 {
        font-size: 16px;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
        margin-bottom: 42px;
      }
      .desc-list {
        font-size: 14px;
        line-height: 20px;
        .desc-hd {
          color: rgba(155, 155, 155, 1);
        }
        .desc-bd {
          color: rgba(74, 74, 74, 1);
        }
      }
      .edit-tpl {
        margin-top: 40px;
      }
    }
  }
  .template-info-l {
    padding: 30px;
    h2 {
      font-size: 14px;
      color: rgba(155, 155, 155, 1);
      line-height: 20px;
    }
  }
}
</style>