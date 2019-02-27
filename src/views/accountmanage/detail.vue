<template>
  <div class="app-container">
    <tit></tit>
    <div class="template-form dis-flex">
      <div class="template-info-l template-info mr-20">
        <p class="h2">
          基本信息
          <span @click="edit">
            <i class="el-icon-edit"></i>
          </span>
        </p>
        <div class="dis-flex formlist">
          <div class="formlist-tit">客户账号：</div>
          <div class="formlist-desc flex-1">{{userMain.username}}</div>
        </div>
        <div class="dis-flex formlist">
          <div class="formlist-tit">手机号码：</div>
          <div class="formlist-desc flex-1">{{userMain.phone}}</div>
        </div>
        <div class="dis-flex formlist">
          <div class="formlist-tit">身份证号码：</div>
          <div class="formlist-desc flex-1">{{userInfo.idCardNum}}</div>
        </div>
        <div class="dis-flex formlist">
          <div class="formlist-tit">联系人：</div>
          <div class="formlist-desc flex-1">{{userInfo.contact}}</div>
        </div>
        <div class="dis-flex formlist">
          <div class="formlist-tit">所在地区：</div>
          <div
            class="formlist-desc flex-1"
          >{{userInfo.province}}{{userInfo.city}}{{userInfo.district}}</div>
        </div>
        <div class="dis-flex formlist">
          <div class="formlist-tit">有效期：</div>
          <div class="formlist-desc flex-1">{{userMain.buyDateLength}}</div>
        </div>
        <div class="dis-flex formlist">
          <div class="formlist-tit">当前状态：</div>
          <div class="formlist-desc flex-1">
            <div v-if="userMain.isEnabled" class="Jstate Jstate-s">
              <span></span>已激活
            </div>
            <div v-else class="Jstate Jstate-f">
              <span></span>未激活
            </div>
          </div>
        </div>
        <div class="dis-flex formlist">
          <div class="formlist-tit">到期日期：</div>
          <div class="formlist-desc flex-1">{{userMain.enableDate?userMain.enableDate:'/'}}</div>
        </div>
        <div class="dis-flex formlist">
          <div class="formlist-tit">开放平台账号：</div>
          <div class="formlist-desc flex-1">
            <span
              style="color:#409EFF;margin-right:10px;cursor:pointer;"
              @click="lookVisible = true"
            >查看</span>
            {{platform.openId?platform.openId:'/'}}
          </div>
        </div>
      </div>
      <div class="flex-1 template-info-r template-info mr-20">
        <p class="h2">
          身份认证
          <span @click="edit">
            <i class="el-icon-edit"></i>
          </span>
        </p>
        <div class="formlist-l">
          <div class="formlist-tit mb-20">身份证照片：</div>
          <div class="formlist-desc border-btttom-1">
            <div class="formlist-desc-img mr-20">
              <div class="formlist-desc-img-hd">
                <img :src="resDomain+userInfo.idCardFrontUrl" @click.stop="bigImgShow($event)">
              </div>
              <p>正面</p>
            </div>
            <div class="formlist-desc-img">
              <div class="formlist-desc-img-hd">
                <img :src="resDomain+userInfo.idCardBackUrl" @click.stop="bigImgShow($event)">
              </div>
              <p>反面</p>
            </div>
          </div>
          <div class="formlist border-btttom-none">
            <div class="formlist-tit mb-20">详细地址：</div>
            <div class="formlist-desc txt-l">{{userInfo.address}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="img-show-mask" id="img-show-mask" v-show="maskBtn" @click="closeBigImg">
      <img :src="bigImgSrc" class="bigImg" id="bigImg">
    </div>

    <el-dialog title="临时开放平台账号详情" :visible.sync="lookVisible" width="500px">
      <p style="margin-bottom:15px;">
        平台账号：
        <span>{{platform.openId?platform.openId:'/'}}</span>
      </p>
      <p>
        主体信息：
        <span>{{platform.principalName?platform.principalName:'/'}}</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDelete">删除账号</el-button>
        <el-button @click="lookVisible = false" class="cancel-btn">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tit from "@/components/Htitle";
export default {
  data() {
    return {
      id: "",
      userMain: {},
      userInfo: {},
      resDomain: "",
      platform: {},
      maskBtn: false,
      bigImgSrc: "",
      lookVisible: false
    };
  },
  components: {
    tit
  },
  created() {
    let self = this;
    let id = self.$route.query.id;
    self.id = id;
    self.getAccount(id);
  },
  methods: {
    getAccount(id) {
      let self = this;
      self.$store.dispatch("getAccount", { id: id }).then(res => {
        if (res.success) {
          const { userMain, resDomain, platform } = res.data;

          self.userMain = userMain;
          self.userInfo = userMain.userInfo;
          self.resDomain = resDomain;
          self.platform = platform ? platform : {};
        } else {
          self.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },
    bigImgShow: function(e) {
      //打开图片预览
      this.bigImgSrc = e.target.src;
      this.maskBtn = true;
      this.$nextTick(function() {
        var imgShowMask = document.getElementById("img-show-mask");
        var img = document.getElementById("bigImg");
        var w =
          document.documentElement.clientWidth || document.body.clientWidth;
        var h =
          document.documentElement.clientHeight || document.body.clientHeight;
        var offsetY = window.pageYOffset;
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        imgShowMask.style.height = scrollHeight + "px";
        img.style.left = w / 2 - 250 + "px";
        img.style.top = h / 2 - 70 + offsetY + "px";
      });
    },
    closeBigImg: function() {
      //关闭图片预览
      this.maskBtn = false;
    },
    edit() {
      this.$router.push({
        name: "addTable",
        query: { id: this.id }
      });
    },
    handleDelete() {
      let self = this;

      if (!self.platform.id) {
        self.$message.info("未绑定开发平台账号");
        return false;
      }

      self
        .$confirm("是否确认删除临时开放平台账号？", "信息提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          cancelButtonClass: "cancel-btn"
        })
        .then(() => {
          self.$store
            .dispatch("deleteOpenPlatform", { id: self.platform.id })
            .then(res => {
              if (res.success) {
                self.$message.success("删除成功!");
                self.lookVisible = false;
                self.getAccount(self.$route.query.id);
              } else {
                self.$message.error("删除失败！");
              }
            });
        })
        .catch(() => {
          self.$message.info("已取消删除");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.template-form {
  background: none;
}

.template-info {
  background: #ffffff;
  padding: 20px;
  p {
    font-size: 14px;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
    margin-bottom: 30px;
  }
}

.formlist {
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  .formlist-desc {
    text-align: right;
    font-size: 14px;
    color: rgba(74, 74, 74, 1);
    line-height: 20px;
  }
}

.formlist-tit {
  font-size: 14px;
  color: rgba(155, 155, 155, 1);
  line-height: 20px;
}

.template-info-l {
  width: 360px;
}

.Jstate span {
  display: inline-block;
  height: 6px;
  width: 6px;
  margin-right: 10px;
  border-radius: 100%;
  background-color: rgba(26, 169, 123, 1);
  vertical-align: middle;
}

.Jstate-f span {
  background: rgba(155, 155, 155, 1);
}

.Jstate {
  position: relative;
  padding-left: 12px;
}

.formlist-l {
  padding-left: 60px;
  padding-right: 60px;
}

.formlist-desc-img {
  display: inline-block;
  vertical-align: middle;
  width: 190px;
  margin-bottom: 66px;
  .formlist-desc-img-hd {
    width: 100%;
    height: 130px;
    background: rgba(230, 230, 230, 1);
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    text-align: center;
    font-size: 14px;
    color: rgba(74, 74, 74, 1);
    line-height: 20px;
    margin-top: 8px;
  }
}

.border-btttom-1 {
  border-bottom: 1px solid rgba(230, 230, 230, 1);
}

.border-btttom-none {
  border-bottom: 0;
}

.txt-l {
  text-align: left !important;
}

.h2 {
  span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: rgba(238, 242, 243, 1);
    text-align: center;
    cursor: pointer;
    float: right;
    .el-icon-edit {
      font-size: 12px;
      line-height: 20px;
    }
  }
}

.img-show-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3000;
  background: rgba(0, 0, 0, 0.5);
}

.img-show-mask .bigImg {
  width: 500px;
  height: 280px;
  position: absolute;
  z-index: 3100;
  top: 0;
  left: 0;
  margin: auto;
}
</style>