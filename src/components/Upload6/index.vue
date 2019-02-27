<template>
  <div>
    <div class="show-img mb-30" v-if="img">
      <div class="imgList mr-20 pos-r">
        <i class="el-icon-error pos-a" @click="deleteImg"></i>
        <img :src="img.indexOf('?temp_vd')!=-1?(roles.tempDomain+img):(resDomain+img)" alt="" />
      </div>
    </div>
    <div class="upload pos-r mb-30" v-else>
      <div class="upload-desc pos-a">
        <i class="el-icon-plus "></i>
        <p class="mt-10">上传图片</p>
      </div>
      <input type="file" @change="uploadFileFun" ref="upload" />
    </div>
  </div>
</template>
<script type="text/javascript">
  import uploadFile from "@/utils/upload";
  // import { imgHost, imgHostTemp } from "@/config/config";  //宁波写死了一个图片上传的配置domain 优化从info中取上传用tempDomain 展示用resDomain
  import { mapGetters } from "vuex";
  
  export default {
    props: ['img','resDomain'],
    data() {
      return {
        id: "",
        imgLists: [],
        // imgHostTemp: imgHostTemp,
        // imgHost: imgHost
      };
    },
    computed: {
      ...mapGetters(["roles"])
    },
    created() {
      this.$store.dispatch("uploadToken").then(res => { });
    },
    methods: {
      uploadFileFun(e) {
        let self = this;
        let file = e.target.files[0];
        let filePath = self.$refs.upload.value;
        let uptoken = self.$store.state.upload.upload_Token;
        if ((file && file.size / 1024) > 2048) {
          return this.$message({
            message: '文件大小大于2M',
            type: "error"
          })
        }
        uploadFile(uptoken, file, filePath, (res, state) => {
          self.$refs.upload.value = ''
          if (state.success) {
            self.$emit("update:img", res.key + '?temp_vd');
          } else {
            this.$message({
              message: '文件上传失败',
              type: "error"
            })
          }
        });
      },
      deleteImg(index) {
        let self = this
        self.$emit("update:img", '');
      }
    }
  };
</script>
<style type="text/css" lang="scss" scoped>
  .show-img {
    display: inline-block;
    vertical-align: middle;

    .el-icon-error {
      right: -6px;
      top: -5px;
      font-size: 16px;
      color: #999999;
      cursor: pointer;
    }

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

  .upload {
    width: 120px;
    height: 120px;
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
      top: 54%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>