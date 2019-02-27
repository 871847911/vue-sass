<template>
  <div class="app-container">
    <div class="title_btn dis-flex justify-b">
      <div>{{h1.title}}</div>
      <div class="title_r dis-flex">
        <div class="part_l" @click="backEvent">
          <i class="iconfont icon-fanhui mr-5"></i>返回
        </div>
        <div class="part_r" v-if="goodsDetail.checkState == 0">
          <span @click="rejectEvent">拒绝</span>
          <span @click="rejectEvent">通过</span>
        </div>
      </div>
    </div>

    <!-- 提示的tip -->
    <div class="el-hz-alert remind_tip">
      <!-- <el-alert title="成功提示的文案" type="warning" show-icon></el-alert> -->
      <el-alert
        :title="`${goodsDetail.goodsName} 未审核`"
        type="warning"
        show-icon
        v-if="goodsDetail.checkState == 0"
      ></el-alert>
      <el-alert
        :title="`${goodsDetail.goodsName} 审核通过`"
        type="success"
        show-icon
        v-if="goodsDetail.checkState == 1"
      ></el-alert>
      <el-alert
        :title="`${goodsDetail.goodsName} 未通过, 原因：${goodsDetail.applyAuditNote}`"
        type="warning"
        show-icon
        v-if="goodsDetail.checkState == 2"
      ></el-alert>
      <el-alert
        :title="`${goodsDetail.goodsName} 违规 , 原因：${goodsDetail.illegalNote}`"
        type="error"
        show-icon
        v-if="goodsDetail.checkState == 3"
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
              <img :src="goodsDetail.imageUrl" alt>
              <div class="text_info">
                <h2>
                  <span class="ellipsis limit">{{goodsDetail.goodsName}}</span>
                  <span
                    class="commodity_state"
                    :style="{background:goodsDetail.openState == 0?'#F5A623':'#27BDC1'}"
                  >{{goodsDetail.openState == 0?"未上架":"已上架"}}</span>
                </h2>
                <div class="auth_info">
                  <div class="item_info">
                    作者 I
                    <span>{{goodsDetail.authorName}}</span>
                  </div>
                  <div class="item_info">
                    价格 I
                    <span>{{goodsDetail.price}}</span>
                  </div>
                </div>

                <div class="title_column">【专栏】【个人提升/阅读表达】</div>

                <div class="plat_info">
                  <div class="item_plat">
                    平台抽成：
                    <span>{{goodsDetail.platformProfitRatio}}%</span>
                  </div>
                  <div class="item_plat">
                    推客佣金：
                    <span>{{goodsDetail.promoterProfitRatio}}%</span>
                  </div>
                </div>

                <div class="title_column">推广链接：{{goodsDetail.articleLink}}</div>
              </div>
            </div>
            <div class="right">
              <div class="box_pic">
                <img :src="goodsDetail.storeLogUrl" alt>
                <div class="shop_name">{{goodsDetail.storeName}}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 列表 -->
        <div class="list">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column label="序号" align="center" width="300" type="index">
              
            </el-table-column>
            <el-table-column label="标题" align="left" min-width="500">
              <template slot-scope="scope">{{scope.row.subName}}</template>
            </el-table-column>
            <el-table-column label="操作" align="left" width="300">
              <template slot-scope="scope">
                <div class="btn_box">
                  <span @click="detailPage(scope.row.subId,scope.$index)">查看</span>
                  <!-- <span @click="detailPage(scope)">查看</span> -->
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tit from "@/components/Htitle";
import api from "@/api/commodity";
export default {
  name: "contentCatolog",
  data() {
    return {
      msg: "商品详情",
      apply_state: false,
      activeName: "second",
      pageNum: 1,
      pageSize: 10,
      routeData: {},
      goodsDetail: {},
      tableData: [
        // { num: 1, title: "如何与客户谈一场恋爱" },
        // { num: 2, title: "走出越穷越忙的怪圈" },
        // { num: 3, title: "汤臣杰逊【穗宝床垫双十一新视觉作品分享】" },
        // { num: 4, title: "视觉系-宣传品" }
      ]
    };
  },
  components: {
    tit
  },
  computed: {
    h1() {
      return this.$route.meta;
    },
    openState() {
      return this.$route.query.openState;
    }
  },
  methods: {
    init() {
      let that = this;
      let params = {
        peddleGoodsId: that.$route.query.id
      };
      api.getPeddleGoodsDetail(params).then(res => {
        console.log("商品详情", res);
        if (res.serviceCode == "E000000000") {
          that.goodsDetail = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    getList() {
      let that = this;
      let params = {
        page: that.pageNum,
        pageSize: that.pageSize,
        peddleGoodsId: that.$route.query.id
      };
      console.log(params);
      api.getGoodsSub(params).then(res => {
        if (res.serviceCode == "E000000000") {
          that.tableData = res.data.list;
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
      console.log(this.activeName);
      console.log(this.$route.query.id);
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
    rejectEvent() {
      console.log("拒绝");
    },
    passEvent() {
      console.log("通过");
    },
    detailPage(subId,contentIndex) {
      console.log(subId)
      this.$router.push({
        name: "contentDetail",
        query: { subId: subId, id: this.$route.query.id,contentIndex:contentIndex }
      });
    }
  },
  created() {
    this.routeData = this.$route.query.dataInfo;
    this.init();
    this.getList();
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
              // width: 360px;
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
                // background: yellow;
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
            padding: 0 120px 0 100px;
            display: flex;
            align-items: center;
            text-align: center;
            border-left: 1px solid #e6e6e6;
            .box_pic {
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
</style>