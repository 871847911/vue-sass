<template>
  <div class="app-container">
    <tit></tit>
    <div class="fffMain">
        <div class="mainBox">
            <div class="sub-title">微信支付商户号</div>
            <el-input v-model="formPay.mchId" placeholder="商户号"></el-input>
        </div>
        <div class="mainBox">
            <div class="sub-title">支付API密钥</div>
            <el-input v-model="formPay.payKey" placeholder="支付密钥"></el-input>
        </div>
        <div class="mainBox">
            <div class="sub-title">支付证书</div>
            <div>
                <el-upload
                class="upload-demo"
                action="8888"
                :show-file-list="false"
                :headers="getReqHeader()"
                :with-credentials="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :limit="1"
                >
                <el-button size="small" type="primary">点击上传</el-button>
                    <span v-if="fileName" style="color:#6cddc7;">已上传文件：{{fileName}}</span>
                </el-upload>
                <div slot="tip" class="el-upload__tip">只能上传.p12文件，且大小不超过500k</div>
            </div>
        </div>
        <div class="btnBox">
            <el-button type="primary" @click="submit">保存设置</el-button>
        </div>
    </div>
    
  </div>
</template>
<script>
import api from "@/api/distribution";
import { mapGetters } from "vuex";
import tit from "@/components/Htitle";
export default {
  methods: {},
  components: {
    tit
  },
  computed: {
    ...mapGetters(["roles","token"])
  },
  data() {
    return {
        shanghuhao:'', //商户号
        fileUrl:"",
        fileName:'',
        formPay:{
            certName: [],
            mchId: null,
            payKey: null,
        }
    };
  },
  created() {
    this.getCatalogPage(1);
  },
  mounted() {},
  methods: {
    handleQuery() {},
    getCatalogPage() {
        api.selectPayConfig().then(res => {
        console.log(res)
        if (res.serviceCode=="E000000000") {
            this.formPay = res.data
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },

    //详情
    handleClick(val) {},
    //关闭
    handleClose() {
      this.dialogVisible = false;
      this.authorizationList = false;
    },
    handleAvatarSuccess(res, file) {
        this.$message.success('添加成功');
        this.fileUrl = URL.createObjectURL(file.raw);
        console.log(this.fileUrl)
    },
    getReqHeader() {
      return {
        "X-Auth-Token": this.token,
      };
    },
    beforeAvatarUpload(file) {
        console.log(file)
        const isP12 = file.type === 'application/x-pkcs12';
        const isLt2M = file.size / 1024 / 1024 < 0.5;

        if (!isP12) {
          this.$message.error("上传证书只能是 P12 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传证书大小不能超过 500KB!");
        }
        if (isP12 && isLt2M) {
        let fd = new FormData();

        fd.append("apiclientCertFile", file);
        api.savePayCert(fd).then(res => {
          if (res.serviceCode=="E000000000") {
              this.fileName = file.name
            this.$message.success("上传证书成功");
          } else {
            this.$message.error("上传证书失败");
          }
        });
      }
        return isP12 && isLt2M;
      },
      submit(){
          if(this.formPay.mchId==null){
              this.$message({
                        type: "error",
                        message: "微信支付商户号"
                    });
          }else if(this.formPay.payKey==null){
              this.$message({
                        type: "error",
                        message: "请输入支付API密钥"
                    });
          }else{
            let data = {
                mchId:this.formPay.mchId,
                payKey:this.formPay.payKey,
                user:this.roles.username
            }
            api.savaOrUpdatePay(data).then(res => {
                console.log(res)
                if (res.serviceCode=="E000000000") {
                    this.$message({
                        type: "success",
                        message: "保存成功"
                    }); 
                    this.$router.push({ name: "configuration"});
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
    .fffMain{
        background: #fff;
        padding: 60px 20px 220px 20px;
        .mainBox{
            width: 400px;
            margin: 0 auto;
            .sub-title{
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(74,74,74,1);
                padding-bottom: 10px;
            }
            .el-input{
                margin-bottom: 20px;
            }
            .upload-demo{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .el-button{
                    background-color:rgba(226,248,248,1)!important;
                    border-color: rgba(226,248,248,1)!important;
                    border-radius:4px;
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(39,189,193,1);
                }
                
            }
            .el-upload__tip{
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(155,155,155,1);
                    margin: 0;
                    padding-top: 15px;
                }
        }
        .btnBox{
            text-align: center;
            margin-top: 70px;
            .el-button{
                padding: 15px 50px;
            }
        }
    }
</style>