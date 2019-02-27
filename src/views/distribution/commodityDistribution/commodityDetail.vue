<template>
  <div class="app-container">
    <div class="title_btn dis-flex justify-b">
      <div>{{h1.title}}</div>
      <div class="title_r dis-flex">
        <div class="part_l" @click="backEvent">
          <i class="iconfont icon-fanhui mr-5"></i>返回
        </div>
        <div class="part_r" v-if="listInfo.checkState == 0">
          <span @click="stateEvent(2)">拒绝</span>
          <span @click="stateEvent(1)">通过</span>
        </div>
      </div>
    </div>

    <!-- 提示的tip -->
    <div class="el-hz-alert remind_tip">
      <!-- <div>
        后台checkState
        0 未审核
        1 通过
        2 未通过
        3 违规
      </div>
      <div>
        后台openState
        1 上架
        0 下架
      </div>
      <div>======================</div>
      <div>后台返回审核状态：{{listInfo.checkState}}</div>
      <div>后台返回上下架状态：{{listInfo.openState}}</div> -->
      <!-- <div
        v-if="listInfo.checkState == 1"
      >未通过的原因:{{listInfo.checkState == 1?listInfo.applyAuditNote:"后台返回空或者 缺少字段applyAuditNote"}}</div>
      <div
        v-if="listInfo.checkState == 3"
      >违规的原因:{{listInfo.checkState == 3?listInfo.illegalNote:"后台返回空 或者 缺少字段illegalNote"}}</div> -->
      <!-- 
        后台checkState
        0 未审核
        1 通过
        2 未通过
        3 违规 
      -->
      <el-alert
        :title="`${listInfo.goodsName} 未审核`"
        type="warning"
        show-icon
        v-if="listInfo.checkState == 0"
      ></el-alert>
      <el-alert
        :title="`${listInfo.goodsName} 审核通过`"
        type="success"
        show-icon
        v-if="listInfo.checkState == 1"
      ></el-alert>
      <el-alert
        :title="`${listInfo.goodsName} 未通过, 原因：${listInfo.applyAuditNote}`"
        type="warning"
        show-icon
        v-if="listInfo.checkState == 2"
      ></el-alert>
      <el-alert
        :title="`${listInfo.goodsName} 违规 , 原因：${listInfo.illegalNote}`"
        type="error"
        show-icon
        v-if="listInfo.checkState == 3"
      ></el-alert>
    </div>

    <div class="components_box">
      <!-- Tabs -->
      <el-tabs v-model="activeName" @tab-click="handleClick" class="hz_ele_tabs">
        <!-- 分销商品 -->
        <el-tab-pane label="商品详情" name="first"></el-tab-pane>

        <!-- 商品审核 -->
        <el-tab-pane label="目录内容" name="second"></el-tab-pane>
      </el-tabs>

      <div class="commodity_detail">
        <div class="part_item">
          <div class="h3">商品信息</div>
          <div class="commodity_info dis-flex justify-b">
            <div class="left dis-flex">
              <img :src="listInfo.imageUrl" alt>
              <div class="text_info">
                <h2>
                  <span class="ellipsis limit">{{listInfo.goodsName}}</span>
                  <span
                    class="commodity_state"
                    :style="{background:listInfo.openState == 0?'#F5A623':'#27BDC1'}"
                  >{{listInfo.openState == 0?"未上架":"已上架"}}</span>
                </h2>
                <div class="auth_info">
                  <div class="item_info">
                    作者 I
                    <span>{{listInfo.authorName ?listInfo.authorName:"null"}}</span>
                  </div>
                  <div class="item_info">
                    价格 I
                    <span>{{listInfo.price ?`${listInfo.price}元`:"null"}}</span>
                  </div>
                </div>

                <div class="title_column">【专栏】【{{listInfo.categoryName}}/{{listInfo.typeName}}】</div>

                <div class="plat_info">
                  <div class="item_plat">
                    平台抽成：
                    <span>{{listInfo.platformProfitRatio ?listInfo.platformProfitRatio + "%":"null"}}</span>
                  </div>
                  <div class="item_plat">
                    推客佣金：
                    <span>{{listInfo.promoterProfitRatio ?listInfo.promoterProfitRatio + "%":"null"}}</span>
                  </div>
                </div>

                <div class="title_column ellipsis">
                  推广链接：
                  <span>{{listInfo.articleLink?listInfo.articleLink:"null"}}</span>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="box_pic">
                <img :src="listInfo.storeLogUrl" alt>
                <div class="shop_name">{{listInfo.storeName}}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 商品简介 图文内容 -->
        <div class="part_item">
          <div class="h3">商品简介</div>
          <div class="commodity_intr">
            <p v-html="listInfo.goodsIntroduction"></p>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加分类弹出层 -->
    <div class="hz_el_dialog">
      <el-dialog title="处理原因" :visible.sync="dialogState" width="50%">
        <el-form :model="formDialog" class="hz_el_form">
          <el-form-item>
            <el-input
              placeholder="请填写拒绝原因"
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 8}"
              resize="none"
              v-model="formDialog.text"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogState = false">取 消</el-button>
          <el-button type="primary" @click="confirmEvent()">确 定</el-button>
        </span>-->
        <div class="layout_flex flex_r btn_box dialog_btn">
          <span @click="dialogState = false">取消</span>
          <span @click="confirmEvent()">确定</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tit from "@/components/Htitle";
import api from "@/api/commodity";
export default {
  name: "commodityCatolog",
  data() {
    return {
      msg: "商品详情",
      apply_state: false,
      activeName: "first",
      listInfo: {},
      dialogState: false,
      formDialog: {
        text: ""
      },
      openState: null,
      checkstate: null

      // tip:{
      //   text:"提示信息",
      //   type:"success"
      // }
    };
  },
  components: {
    tit
  },
  computed: {
    h1() {
      return this.$route.meta;
    }
  },
  methods: {
    getPeddleGoodsDetail() {
      let that = this;
      let params = {
        peddleGoodsId: that.$route.query.id
      };
      api.getPeddleGoodsDetail(params).then(res => {
        console.log("商品详情=>", res);
        if (res.serviceCode == "E000000000") {
          that.listInfo = res.data;
          that.total = res.data.total;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    handleClick(tab, event) {
      switch (this.activeName) {
        case "first":
          this.$router.push({
            name: "commodityDetail",
            query: { id: this.$route.query.id, openState: this.openState }
          });
          break;
        case "second":
          this.$router.push({
            name: "contentCatolog",
            query: { id: this.$route.query.id, openState: this.openState }
          });
          break;
        default:
          break;
      }
    },
    backEvent() {
      this.$router.back(-1);
    },
    stateEvent(type) {
      this.checkstate = type;
      if (type == 1) {
        this.changeStateEvent(type);
      } else {
        this.dialogState = true;
      }
    },
    changeStateEvent() {
      let that = this;
      let params = {
        peddleGoodsId: that.$route.query.id,
        status: that.checkstate,
        note: that.formDialog.text,
      };
      api.checkPeddleGoods(params).then(res => {
        console.log("审核状态改变", res);
        that.dialogState = false;
        that.openState = 1;
        if (res.serviceCode == "E000000000") {
          this.$message({
            type: "success",
            message: "审核提交成功!"
            // onClose() {

            // }
          });
          that.$router.push({ name: "checkGoods" });
        } else {
          this.$message({
            type: "error",
            message: "请求失败"
          });
        }
      });
    },
    confirmEvent() {
      if (this.formDialog.text) {
        this.changeStateEvent();
      } else {
        this.$message({
          type: "error",
          message: "拒绝的原因不能为空!"
        });
      }
    }
  },
  created() {
    // this.openState = this.$route.query.openState;
    this.getPeddleGoodsDetail();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.app-container {
  font-family: "PingFangSC";
  font-size: 14px;
  // 头部title
  .title_btn {
    color: #9b9b9b;
    font-size: 20px;
    line-height: 40px;
    height: 40px;
    margin-bottom: 10px;
    .title_r {
      cursor: pointer;
      .part_r {
        margin-left: 20px;
        box-sizing: border-box;
        span {
          display: inline-block;
          text-align: center;
          width: 80px;
          height: 40px;
          border-radius: 4px;
          font-size: 14px;
          border: 1px solid #00b4b9;
          &:nth-child(1) {
            background: #ffffff;
            margin-right: 10px;
            color: #27bdc1;
          }
          &:nth-child(2) {
            background: #00b4b9;
            color: #ffffff;
          }
        }
      }
    }
  }

  // 提示语
  .remind_tip {
    padding-bottom: 10px;
  }

  .components_box {
    padding: 30px 20px;
    background: #ffffff;
    .commodity_detail {
      margin-bottom: 40px;
      .part_item {
        .h3 {
          background: #f9faf9;
          font-size: 14px;
          color: #9b9b9b;
          padding: 10px 0 10px 10px;
          margin-bottom: 20px;
        }
        // 商品信息
        .commodity_info {
          margin-bottom: 40px;
          align-items: center;
          .left {
            padding: 0 120px 0 20px;
            width: 100%;
            img {
              width: 288px;
              height: 180px;
              margin-right: 20px;
            }
            .text_info {
              padding: 5px 0;
              font-size: 14px;
              width: 100%;
              h2 {
                font-weight: 600;
                color: #4a4a4a;
                font-size: 16px;
                padding-bottom: 10px;
                display: flex;
                align-items: center;
                .commodity_state {
                  color: #ffffff;
                  font-size: 12px;
                  font-weight: normal;
                  margin-left: 10px;
                  height: 20px;
                  line-height: 20px;
                  width: 45px;
                  text-align: center;
                }
                .limit {
                  max-width: 300px;
                }
              }
              .style_change {
                padding-bottom: 60px;
                border-bottom: 1px solid #e6e6e6;
                margin-bottom: 30px;
              }
              .auth_info {
                display: flex;
                align-items: center;
                color: #9b9b9b;
                padding-bottom: 20px;
                margin-bottom: 30px;
                border-bottom: 1px solid #e6e6e6;
                .item_info {
                  margin-right: 20px;
                  span {
                    color: #666666;
                  }
                }
              }
              .title_column {
                padding-bottom: 8px;
              }

              .plat_info {
                display: flex;
                align-items: center;
                padding-bottom: 8px;
                .item_plat {
                  margin-right: 20px;
                  span {
                    color: #666666;
                  }
                }
              }

              .course_info {
                display: flex;
                .box_l {
                  padding-right: 40px;
                  border-right: 1px solid #e6e6e6;
                }
                .box_r {
                  padding-left: 40px;
                }
                .t_title {
                  padding-bottom: 10px;
                  color: #9b9b9b;
                }
                .value {
                  color: #4a4a4a;
                }
              }
            }
          }
          .right {
            height: 160px;

            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-left: 1px solid #e6e6e6;
            .box_pic {
              width: 280px;
              img {
                width: 60px;
                height: 60px;
              }
              .shop_name {
                padding-top: 10px;
                color: #666666;
                font-size: 14px;
              }
            }
          }
        }

        .commodity_intr {
          padding: 0 80px 0 20px;

          p {
            padding: 0;
            margin: 0;
            color: #4a4a4a;
            line-height: 20px;
            padding-bottom: 20px;
          }
          img {
            width: 404px;
            height: 240px;
          }
        }
      }
    }
  }
}

.layout_flex {
  display: flex;
}
.flex_r {
  justify-content: flex-end;
}

.btn_box {
  span {
    cursor: pointer;
    color: #00b4b9;
    margin-right: 20px;
    &:nth-last-child(1) {
      margin: 0;
    }
  }
}
.dialog_btn {
  background: #fafafa;
  padding: 15px 30px;
  span {
    padding: 0 30px;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    border-radius: 4px;
    &:nth-child(1) {
      background: #ffffff;
      border: 1px solid #00b4b9;
    }
    &:nth-last-child(1) {
      background: #00b4b9;
      color: #ffffff;
    }
  }
}
</style>