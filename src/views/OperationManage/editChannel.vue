<template>
  <div class="app-container">
    <tit></tit>
    <div class="template-form">
      <div class="form">
        <el-form :label-position="labelPosition" label-width="80px" :model="ruleForm" :rules="rules" ref="ValidateForm">
          <el-form-item label="渠道类型" style="margin-top:-30px;" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq"  v-if="ruleForm.type == 2">
            <el-input v-model="ruleForm.qq" placeholder="请输入QQ号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="ruleForm.mail" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="所在行业" prop="industry">
            <el-input v-model="ruleForm.industry" placeholder="请输入所在行业"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="company" v-if="ruleForm.type == 1">
            <el-input v-model="ruleForm.company" placeholder="请输入公司名称"></el-input>
          </el-form-item>
          <el-form-item label="所在地区">
            <VDistpicker :province="ruleForm.province" :city="ruleForm.city" :area="ruleForm.district" @province="onChangeProvince" @city="onChangeCity"
              @area="onChangeArea"></VDistpicker>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
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
  import tit from "@/components/Htitle/index";
  import lodash from "lodash";
  import { mapGetters } from "vuex";
  import VDistpicker from "v-distpicker";
  String.prototype.trim = function () {
    ///<summary>去掉字符串前后空格</summary>
    return this.replace(/(^\s*)|(\s*$)/g, "");
  };
  export default {
    data() {
      var checkphone = (rule, value, callback) => {
        if (!(/^[1][3,4,5,7,8][0-9]{9}$/).test(value)) {
          callback(new Error('请输入正确手机号'));
        }else{
          callback()
        }
      };
      return {
        labelPosition: "top",
        ruleForm: {
          type: "",
          name: "",
          phone: "",
          qq: "",
          industry: "", //所在行业
          company: "", //公司名称
          address: '',
          province: '',
          city: '',
          district: ''
        },
        rules: {
          type: [
            { required: true, message: "请选择渠道类型", trigger: "change" }
          ],
          name: [
            { required: true, message: "请输入联系人", trigger: "blur" },
            { max: 30, message: "长度在30以内", trigger: "blur" }
          ],
          mail: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
          ],
          phone: [{ required: true, trigger: "blur", validator: checkphone }],
        },
        options: [
          {
            value: 1,
            label: "机构"
          },
          {
            value: 2,
            label: "个人"
          }
        ]
      };
    },
    computed: {
      ...mapGetters(["roles"])
    },
    components: {
      upload,
      tit,
      VDistpicker
    },
    created() {
      let self = this;
    },
    mounted() { },
    methods: {
      createChannel() {
        let self = this;
        let action;
        let data = self.ruleForm;
        action = "createChannel";
        this.$store
          .dispatch(`${action}`, data)
          .then(res => {
            if (res.success) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.$router.push({ name: "Channel" });
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
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.createChannel();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      onChangeProvince(data) {
        console.log(data);
        this.ruleForm.province = data.value;
      },
      onChangeCity(data) {
        this.ruleForm.city = data.value;
      },
      onChangeArea(data) {
        this.ruleForm.area = data.value;
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