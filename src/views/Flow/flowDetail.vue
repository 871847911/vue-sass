<template>
<div class="app-container">
  <div class="short-info">
    <p>商户账号：<span>{{storeData.storeNumber}}</span></p>
    <p>七牛云Bucket：<span>{{storeData.bucketName}}</span></p>
    <p>
      状态：
      <span v-if="storeData.bucketState === 1">正常</span>
      <span v-else-if="storeData.bucketState === 2">预警</span>
      <span v-else>欠费</span>
    </p>
  </div>

  <div class="flow-panel">
    <div>
      <h3>{{storeData.amount}}<span>元</span></h3>
      <p>流量账户余额</p>
    </div>
    <div>
      <h3>{{storeData.moonOutFlow}}<span>GB</span></h3>
      <p>本月外网流出量</p>
    </div>
    <div>
      <h3>{{storeData.storageSpace}}<span>GB</span></h3>
      <p>本月储存空间量</p>
    </div>
  </div>

  <div class="flow-list">
    <h3 class="head-label">流量明细</h3>

    <div class="list-panel">
      <el-tabs v-model="onName" @tab-click="handleTab">
        <el-tab-pane label="储存空间量" name="space">
          <DateSearch @onSearch="handleSearch" />
          <StorageSpace :list="spaceList"/>
        </el-tab-pane>

        <el-tab-pane label="外网流出量" name="flow">
          <DateSearch @onSearch="handleSearch" />
          <Outflow :list="flowList"/>
        </el-tab-pane>
      </el-tabs>

      <div class="pagination">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[5, 10, 15, 25]"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import StorageSpace from "./storageSpace";
import Outflow from "./outflow";
import DateSearch from "./dateSearch";

export default {
  name: "FlowDetail",
  data() {
    return {
      storeData: {},
      dateValue: [],
      onName: "space",
      flowList: [],
      spaceList: [],
      currentPage: 1, // 第几页
      pageSize: 10, // 每页条数
      total: 0 // 总条数
    };
  },
  components: {
    StorageSpace,
    Outflow,
    DateSearch
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store
        .dispatch("getStoreDetail", {
          storeId: this.$route.query.storeId
        })
        .then(res => {
          if (res.success) {
            this.storeData = res.data;
          } else {
            this.$message.error(res.message);
          }
        });

      this.initSpaceList();
    },

    // 存储
    initSpaceList() {
      const dateTime = this.isHaveDate();

      this.$store
        .dispatch("pageSpaceDetail", {
          ...dateTime,
          page: this.currentPage,
          pageSize: this.pageSize,
          storeId: this.$route.query.storeId
        })
        .then(res => {
          if (res.success) {
            if (res.pageInfo.list.length > 0) {
              res.pageInfo.list.forEach(item => {
                item.createTime = item.createTime.substr(0, 7);
              });
            }

            this.spaceList = res.pageInfo.list;
            this.total = res.pageInfo.total;
          } else {
            this.$message.error(res.message);
          }
        });
    },

    // 外网
    initFlowList() {
      const dateTime = this.isHaveDate();

      this.$store
        .dispatch("pageFlowDetail", {
          ...dateTime,
          page: this.currentPage,
          pageSize: this.pageSize,
          storeId: this.$route.query.storeId
        })
        .then(res => {
          if (res.success) {
            if (res.pageInfo.list.length > 0) {
              res.pageInfo.list.forEach(item => {
                item.createTime = item.createTime.substr(0, 10);
              });
            }

            this.flowList = res.pageInfo.list;
            this.total = res.pageInfo.total;
          } else {
            this.$message.error(res.message);
          }
        });
    },

    // 是否选中日期
    isHaveDate() {
      let startTime = "";
      let endTime = "";

      if (this.dateValue.length > 0) {
        startTime = this.dateValue[0];
        endTime = this.dateValue[1];
      }

      return { startTime, endTime };
    },

    // 判断面板请求
    currentPanelRequest(name) {
      if (name === "space") {
        this.initSpaceList();
      } else {
        this.initFlowList();
      }
    },

    // 切换tab
    handleTab({ paneName }, evt) {
      this.currentPage = 1;
      this.dateValue = [];
      this.currentPanelRequest(paneName);
    },

    // 查询
    handleSearch(val) {
      this.dateValue = val;
      this.currentPanelRequest(this.onName);
    },

    // 改变每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPanelRequest(this.onName);
    },

    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.currentPanelRequest(this.onName);
    }
  }
};
</script>

<style lang="scss" scoped>
.short-info {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 25px 0;
  p {
    margin-right: 45px;
    color: #9b9b9b;
    span {
      color: #4a4a4a;
    }
  }
}
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
.flow-list {
  width: 100%;
  .head-label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 20px;
    color: #4a4a4a;
    margin-bottom: 20px;
  }
  .list-panel {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #ffffff;
    .pagination {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 20px;
      margin-bottom: 27px;
    }
  }
}
</style>
