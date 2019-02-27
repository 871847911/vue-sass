<template>
  <div class="main-upload">
    <div class="upload pos-r mb-30 mr-20">
      <div class="upload-desc pos-a" v-if="!subAccount.cardFrontUrl">
        <i class="el-icon-plus "></i>
        <p class="mt-10">上传身份证正面</p>
      </div>
      <img :src="subAccount.cardFrontUrl_temp" class="card-img" v-else/>
      <i class="el-icon-error pos-a" @click="deleteImg('cardFrontUrl')" v-if="!!subAccount.cardFrontUrl"></i>
      <input type="file" @change="uploadFileFun($event,'cardFrontUrl')" ref="cardFrontUrl" />
    </div>
    <div class="upload pos-r mb-30 ">
      <div class="upload-desc pos-a" v-if="!subAccount.cardBackUrl">
        <i class="el-icon-plus "></i>
        <p class="mt-10">上传身份证背面</p>
      </div>
      <img :src="subAccount.cardBackUrl_temp" class="card-img" v-else />
      <i class="el-icon-error pos-a" @click="deleteImg('cardBackUrl')" v-if="!!subAccount.cardBackUrl"></i>
      <input type="file" @change="uploadFileFun($event,'cardBackUrl')" ref="cardBackUrl" />
    </div>
  </div>
</template>
<script type="text/javascript">
  import uploadFile from "@/utils/upload";
  import imgHead from "@/config/config";
  export default {
    props: [
      'subAccount',
      'resDomain'
    ],
    data() {
      return {
        id: "",
        imgHostTemp: imgHead.imgHostTemp,
        imgHost: imgHead.imgHost
      };
    },
    created() {
      this.$store.dispatch("uploadToken").then(res => { });
    },
    watch:{
      subAccount(e){
        console.log(e,99999999999999)
      }
    },
    methods: {
      uploadFileFun(e, refName) {
        let self = this;
        let file = e.target.files[0];
        let filePath = self.$refs[`${refName}.value`];
        let uptoken = self.$store.state.upload.upload_Token;
        if ((file && file.size / 1024) > 2048) {
          return this.$message({
            message: '文件大小大于2M',
            type: "error"
          })
        }
        uploadFile(uptoken, file, filePath, (res, state) => {
          self.$refs[`${refName}.value`] = ''
          if (state.success) {
            self.subAccount[`${refName}`] = res.key
            self.subAccount[`${refName}_temp`] = self.imgHostTemp + res.key
            console.log(self.subAccount)
          } else {
            this.$message({
              message: '文件上传失败',
              type: "error"
            })
          }
        });
      },
      deleteImg(type) {
        let self = this
        self.$refs[`${type}`].value = ''
        self.subAccount[`${type}`] = ''
        self.subAccount[`${type}_temp`] = ''
      }
    }
  };
</script>
<style type="text/css" lang="scss" scoped>
  .show-img {
    display: inline-block;
    vertical-align: middle;
    .imgList {
      width: 120px;
      height: 120px;
      display: inline-block;
      vertical-align: middle;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  .card-img {
    width: 100%;
    height: 100%;
  }

  .upload {
    width: 190px;
    height: 130px;
    display: inline-block;
    vertical-align: middle;
    color: rgba(0, 0, 0, 0.45) !important;
    background: rgba(0, 0, 0, 0.02);
    border: 1px dashed rgba(0, 0, 0, 0.15);
    text-align: center;
    i {
      font-size: 40px;
    }
    .el-icon-plus:before {
      color: rgba(0, 0, 0, 0.45) !important;
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
    }
    .upload-desc {
      width: 100px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .el-icon-error {
    right: -6px;
    top: -5px;
    font-size: 16px !important;
    color: #999999;
    cursor: pointer;
    z-index:999;
  }
</style>
