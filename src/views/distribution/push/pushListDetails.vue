<template>
  <div class="app-container">
    <tit></tit>
    <div class="pushDetails">
      <div class="detailsTop">
        <img :src="fromData.headUrl">
        <div class="detailsRight">
          <div class="textBox">
            <span class="name">{{fromData.nickName}}</span>
            <span class="dengji">{{fromData.levelName}}</span>
            <span class="date">有效期至{{fromData.expireDate}}</span>
          </div>
          <p>有效期内累计收益{{fromData.currentIncome}}元</p>
          <div class="jinduBox">
            <div
              class="jindu"
              ref="jindut"
            >
              <div class="yuan"></div>
            </div>
          </div>
          <div class="level">
            <span>{{fromData.levelName}}</span>
            <span>{{fromData.nextLevelName}}</span>
          </div>
        </div>
      </div>
      <div
        class="detailsBottom"
        v-if="detailsBottom"
      >
        <dl class="bdr">
          <dt>¥{{detailsBottom.totalEarnings}}</dt>
          <dd>总收益</dd>
        </dl>
        <dl class="bdr">
          <dt>¥{{detailsBottom.totalSettlement}}</dt>
          <dd>累计已结算</dd>
        </dl>
        <dl>
          <dt>{{detailsBottom.totalCount}}</dt>
          <dd>分销数量</dd>
        </dl>
      </div>
    </div>
    <div class="zucheng">收入组成</div>
    <div class="list">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="商品" align="center">
          <template slot-scope="scope">
            <div class="scope-icon">
              <img :src="scope.row.imageUrl" />
              <span>{{scope.row.peddleGoodsName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商户" align="center">
          <template slot-scope="scope">
            {{scope.row.systemUserName}}
          </template>
        </el-table-column>
        <el-table-column label="分类" align="center">
          <template slot-scope="scope">
            {{scope.row.categoryName}}/{{scope.row.typeName}}
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            课程
          </template>
        </el-table-column>
        <el-table-column label="收入" align="center">
          <template slot-scope="scope">
            {{scope.row.income}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="prev, pager, next,sizes,jumper"
        :total="total"
        background
      >
      </el-pagination>
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
    ...mapGetters(["roles"])
  },
  data() {
    return {
      code: "", //课程编号
      page: 1,
      tableData: null,
      total: null,
      pageSize: 10,
      name: "", //课程名称
      loading: false,
      fromData: "",
      detailsBottom: ""
    };
  },
  created() {
    this.getCatalogPage(1);
    this.getDetail();
    this.pusherSettlementAndCount();
  },
  mounted() {},
  methods: {
    changejindu() {
      let barWidth =
        Number(this.fromData.currentIncome) /
        Number(this.fromData.nextLevelIncome);
      this.$refs.jindut.style.width = `${barWidth * 100}%`;
    },
    getCatalogPage(page = 1, pageSize) {
      let self = this;
      if (self.loading) {
        return this.$message({
          message: "正在查询中,请勿重复点击查询",
          type: "error"
        });
      }
      let data = {
        pageNum: page || self.page,
        pageSize: pageSize || self.pageSize,
        userId: Number(self.$route.query.id)
      };
      self.loading = true;
      api.pusherEarnings(data).then(res => {
        console.log(res);
        self.loading = false;
        if (res.serviceCode == "E000000000") {
          self.total = res.data.total;
          self.page = res.data.page;
          // self.pageSize = res.data.pageSize;
          self.tableData = res.data.list;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    getDetail() {
      let self = this;
      let data = {
        peddleId: self.$route.query.id
      };
      api.getPeddleUserDetail(data).then(res => {
        if (res.serviceCode == "E000000000") {
          self.fromData = res.data;
          this.changejindu();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    //推客汇总
    pusherSettlementAndCount() {
      let self = this;
      let data = {
        userType: 3,
        userId: self.$route.query.id
      };
      api.pusherSettlementAndCount(data).then(res => {
        if (res.serviceCode == "E000000000") {
          this.detailsBottom = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      let self = this;
      self.tableData = null;
      self.getCatalogPage(1, val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let self = this;
      self.tableData = null;
      self.getCatalogPage(val);
    },
    //详情
    handleClick(val) {}
  }
};
</script>
<style scoped lang="scss">
.green {
  color: #00b4b9;
  cursor: pointer;
}
.line {
  text-align: center;
}
.zucheng {
  font-size: 16px;
  color: #9b9b9b;
  padding: 30px 0 20px 0;
}
.pushDetails {
  background: #fff;
  padding: 30px 40px 50px 40px;
  .detailsTop {
    display: flex;
    justify-content: space-between;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .detailsRight {
      padding-left: 20px;
      flex: 1;
      .textBox {
        display: flex;
        align-items: center;
        .name {
          font-size: 18px;
          color: #4a4a4a;
          margin-right: 20px;
        }
        .dengji {
          display: inline-block;
          padding: 3px 6px;
          background: #e6f6f6;
          font-size: 14px;
          color: #27bdc1;
          margin-right: 10px;
          border-radius: 20px;
        }
        .date {
          display: inline-block;
          padding: 4px 10px;
          background: #f7f7f7;
          font-size: 12px;
          color: #9b9b9b;
          border-radius: 20px;
        }
      }
      p {
        padding-top: 20px;
        font-size: 14px;
        color: #4a4a4a;
      }
      .jinduBox {
        height: 3px;
        background: #eef2f3;
        border-radius: 3px;
        // overflow: hidden;
        position: relative;
        margin-top: 14px;
        .jindu {
          width: 0;
          position: absolute;
          left: 0;
          top: 0;
          height: 3px;
          background: #27bdc1;
          .yuan {
            position: absolute;
            right: -5px;
            top: -4px;
            width: 11px;
            height: 11px;
            background: #fff;
            border: 3px solid #27bdc1;
            border-radius: 50%;
          }
        }
      }
      .level {
        display: flex;
        justify-content: space-between;
        padding-top: 9px;
        span {
          font-size: 14px;
          color: #4a4a4a;
        }
      }
    }
  }
  .detailsBottom {
    display: flex;
    justify-content: space-between;
    padding-top: 47px;
    dl {
      width: 33.2%;
      text-align: center;
      dt {
        font-size: 30px;
        color: #4a4a4a;
        padding-bottom: 10px;
      }
      dd {
        font-size: 14px;
        color: #9b9b9b;
      }
    }
    .bdr {
      border-right: 1px solid rgba(230, 230, 230, 1);
    }
  }
}
.list:after {
  content: "";
  clear: both;
  display: block;
  visibility: hidden;
}
.list {
  .scope-icon {
    display: flex;
    align-items: center;
    padding-left: 20px;
    width: 100%;
    background: none;
    span {
      margin-left: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    img {
      width: 40px;
      height: 40px;
      min-width: 40px;
      min-height: 40px;
    }
  }
}
</style>