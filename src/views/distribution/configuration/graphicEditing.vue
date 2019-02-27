<template>
  <div class="app-container">
    <tit></tit>
    <div class="graphicEditing">
      <div class="umeditorBox">
        <span>图文内容</span>
        <umeditor :container.sync="ruleForm" ref='umeditor'></umeditor>
      </div>
      <div class="btnBox">
        <el-button @click="save" type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/distribution";
import { mapGetters } from "vuex";
import umeditor from "@/components/Editor";
import tit from "@/components/Htitle";
String.prototype.trim = function() {
  ///<summary>去掉字符串前后空格</summary>
  return this.replace(/(^\s*)|(\s*$)/g, "");
};
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
      activeName: "second",
      ruleForm: {},
      textId:null
    };
  },
  components: {
    tit,
    umeditor
  },
  created() {
    this.getCatalogPage();
  },
  mounted() {},
  methods: {
    getCatalogPage(page = 1, pageSize) {
      let self = this;
      let data = {
        
      };
      api.imageText(data).then(res => {
        console.log(res)
        self.loading = false;
        if (res.serviceCode=="E000000000") {
          self.ruleForm = res.data.text
          self.textId = res.data.id
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
   save(){
     console.log(this.ruleForm)
      let self = this;
      if(self.textId==null){
        let data = {
          text:this.ruleForm,
        };
        api.addImageText(data).then(res => {
          console.log(res)
          self.loading = false;
          if (res.serviceCode=="E000000000") {
            this.$message({
              type: "success",
              message: '保存成功'
            });
            this.getCatalogPage()
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      }else{
        let data = {
          text:this.ruleForm,
          id:self.textId
        };
        api.editImageText(data).then(res => {
          console.log(res)
          self.loading = false;
          if (res.serviceCode=="E000000000") {
            this.$message({
              type: "success",
              message: '保存成功'
            });
            this.getCatalogPage()
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      }
   }
  }
};
</script>
<style lang="scss">
.graphicEditing {
  background: #ffffff;
  padding: 10px 20px 100px 20px;
  span {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
  }
  .umeditorBox {
    width: 720px;
    margin: 0 auto;
    padding-top: 60px;
  }
  .btnBox {
    text-align: center;
    padding-top: 60px;
    .el-button {
      padding: 12px 30px;
      margin: 0 auto;
      span {
        color: #fff;
      }
    }
  }
}
</style>