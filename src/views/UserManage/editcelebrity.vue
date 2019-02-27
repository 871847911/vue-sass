<template>
  <div class="app-container">
    <tit></tit>
    <div class="template-form">
      <div class="form">
        <el-form :label-position="labelPosition" label-width="80px" :model="ruleForm" :rules="rules" ref="ValidateForm" >
          <el-form-item label="头像" prop="photoUrl" class="pos-r">
            <span style="magin-top:-10px;" class="mb-20">建议尺寸192*192，大小不超过2M，支持Jpg、Png格式</span>
            <upload :maxNum="1"  :img.sync="ruleForm.photoUrl" :resDomain="roles?roles.resDomain:''" :show_temp.sync="show_temp"></upload>
          </el-form-item>
          <el-form-item label="姓名" style="margin-top:-30px;" prop="name">
            <el-input v-model="ruleForm.name" placeholder="30字以内的中文，数字和英文"></el-input>
          </el-form-item>
          <el-form-item label="职业" prop="job">
            <el-input v-model="ruleForm.job" placeholder="例如私人教练或知名老师"></el-input>
          </el-form-item>
          <el-form-item label="个人简介" prop="introduce">
            <el-input v-model="ruleForm.introduce" placeholder="个人简介不要超过50字" type="textarea"
            :rows="2"></el-input>
          </el-form-item>
          <el-form-item label="详细介绍">
            <umeditor :container.sync="ruleForm.detail"></umeditor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('ValidateForm')" class="center">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import upload from "@/components/Upload4";
import umeditor from "@/components/Editor";
import tit from "@/components/Htitle/index";
import lodash from "lodash";
import { mapGetters } from 'vuex'
String.prototype.trim = function() {
  ///<summary>去掉字符串前后空格</summary>
  return this.replace(/(^\s*)|(\s*$)/g, "");
};
export default {
  data() {
    return {
      editor: null,
      resDomain: "",
      show_temp:false,//传的是有数据
      labelPosition: "top",
      ruleForm: {
        name: "",
        photoUrl: "",
        job: "",
        detail: "",
        introduce: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { max: 50, message: "长度在30以内", trigger: "blur" }
        ],
        job: [{ required: true, message: "请输入职业", trigger: "blur" }],
        introduce: [
          { required: true, message: "请输入个人简介", trigger: "blur" }
        ],
        photoUrl: [{ required: true, message: "请上传图像", trigger: "blur" }]
      }
    };
  },
  computed:{
    ...mapGetters([
      'roles'
    ])
  },
  components: {
    upload,
    tit,
    umeditor
  },
  created() {
    let self = this;
    if (self.$route.query.id) {
      self.show_temp = false
      self.getCelebrity(self.$route.query.id);
    }
  },
  mounted() {
    let self = this;
  },
  methods: {
    editerChange(html) {
      this.ruleForm.detail = html;
    },
    getCelebrity(id) {
      let self = this;
      this.$store
        .dispatch("getAuthor", { id: id })
        .then(res => {
          if (res.success) {
            self.ruleForm = {
              name: res.data.name,
              photoUrl: res.data.photoUrl,
              job: res.data.job,
              detail: res.data.detail,
              introduce: res.data.introduce
            };
            self.editor.setContent(res.data.detail); // 确保UE加载完成后，放入内容。
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        })
        .catch(res => {
          console.log("查询", res);
        });
    },
    addAuthor() {
      let self = this;
      let action 
      let data = self.ruleForm
      if(self.$route.query.id){
        action ='modifyAuthor'
        data['id'] =  self.$route.query.id
      }else{
        action ='addAuthor'
      }
      this.$store
        .dispatch(`${action}`,data)
        .then(res => {
          if (res.success) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$router.push({ name: "Celebrity" });
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        })
        .catch(res => {
          console.log(res, "保存失败");
        });
    },
    onSubmit(formName) {
      let self = this;
      if (!self.ruleForm.photoUrl) {
        this.$message({
          message: "请上传头像",
          type: "warning"
        });
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addAuthor();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.form {
  width: 750px;
}

span {
  display: block;
  font-size: 14px;
  color: rgba(155, 155, 155, 1);
}
.tips {
  bottom: 10px;
  z-index: 98;
  left: 0;
}
</style>