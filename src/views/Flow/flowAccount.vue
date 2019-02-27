<template>
  <div class="app-container">
    <div class="flow-panel">
      <div>
        <h3>{{platDetail.countAccount}}<span>个</span></h3>
        <p>商户账号</p>
      </div>
      <div>
        <h3>{{platDetail.countWaring}}<span>个</span></h3>
        <p>
          流量预警
          <el-popover
            width="200"
            trigger="hover"
            content="商户流量账户余额低于设置阈值，会进行预警。">
            <span class="el-icon-info" slot="reference"></span>
          </el-popover>
        </p>
      </div>
      <div>
        <h3>{{platDetail.countArrears}}<span>个</span></h3>
        <p>流量欠费</p>
      </div>
    </div>

    <div class="dis-flex mb-30">
      <el-row :gutter="20" class="flex-1">
        <el-col :span="4">
          <el-input v-model="formData.account" placeholder="商户账号" class="mr-10"></el-input>
        </el-col>

        <el-col :span="3">
          <el-select v-model="formData.status" placeholder="状态" @change="handleQuery">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>

        <el-col :span="2">
          <el-button type="success" class="theme-bg-color theme-bd-color" @click="handleQuery">查询</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table 
        :data="tableList" 
        v-loading="loading"
        stripe 
        >
        <el-table-column 
          prop="storeNumber"
          align="center"
          label="商户账号">
        </el-table-column>
        <el-table-column 
          prop="bucketName" 
          align="center"
          label="七牛云Bucket">
        </el-table-column>
        <el-table-column 
          align="center"
          label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.bucketState === 1" style="color:#00CD00">正常</div>
            <div v-if="scope.row.bucketState === 2" style="color:#FFC125">预警</div>
            <div v-if="scope.row.bucketState === 3" style="color:#FF3030">欠费</div>
          </template>
        </el-table-column>
        <el-table-column 
          align="center"
          label="流量账户余额">
          <template slot-scope="scope">
            {{scope.row.amount}}元
          </template>
        </el-table-column>
        <el-table-column 
          align="center"
          label="操作">
          <template slot-scope="scope">
            <span style="cursor: pointer;" @click="handleLook(scope.row)">详情</span>
            <span>&nbsp;|&nbsp;</span>
            <span style="cursor: pointer;" @click="handleDetail(scope.row)">流量明细</span>
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
        background>
      </el-pagination>
    </div>

    <el-dialog
      :visible.sync="dialogVis"
      width="740px">
      <FlowDialogContent :data="dialogData" />
    </el-dialog>
  </div>
</template>

<script>
import FlowDialogContent from "./flowDialogContent";

export default {
  data() {
    return {
      platDetail: {},
      tableList: [],
      dialogData: {},
      formData: {
        account: "",
        status: ""
      },
      statusList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 1,
          label: "正常"
        },
        {
          value: 2,
          label: "预警"
        },
        {
          value: 3,
          label: "欠费"
        }
      ],
      page: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      dialogVis: false
    };
  },

  components: {
    FlowDialogContent
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.$store.dispatch("getPlatformDetail", {}).then(res => {
        if (res.success) {
          this.platDetail = res.data;
        } else {
          this.$message.error(res.message);
        }
      });

      this.initList();
    },
    initList() {
      this.$store
        .dispatch("pageStoreBalance", {
          storeNumber: this.formData.account,
          bucketState: this.formData.status,
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.success) {
            this.tableList = res.pageInfo.list;
            this.total = res.pageInfo.total;
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 详情
    handleLook(row) {
      this.$store
        .dispatch("getStoreDetail", {
          storeId: row.storeId
        })
        .then(res => {
          if (res.success) {
            this.dialogData = res.data;
            this.dialogVis = true;
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 明细
    handleDetail(row) {
      this.$router.push({
        name: "FlowDetail",
        query: {
          storeId: row.storeId
        }
      });
    },
    // 查询
    handleQuery() {
      this.initList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.tableList = null;
      this.initList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.tableList = null;
      this.initList();
    }
  }
};
</script>

<style lang="scss" scoped>
.flow-panel {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  height: 192px;
  background: #ffffff;
  border-radius: 5px;
  margin-bottom: 40px;
  div {
    width: 33.33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    &:first-child::after,
    &:nth-child(2)::after {
      content: "";
      position: absolute;
      top: 46px;
      right: 0;
      width: 1px;
      height: 100px;
      background-color: #e6e6e6;
    }
    h3 {
      font-size: 30px;
      font-weight: 600;
      color: #4a4a4a;
      line-height: 50px;
      span {
        font-size: 16px;
      }
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: #9b9b9b;
    }
  }
}
</style>