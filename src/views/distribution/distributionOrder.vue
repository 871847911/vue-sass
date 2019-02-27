<template>
  <div class="app-container">
    <tit></tit>
    <div class="dis-flex mb-30">
      <el-row :gutter="20" class="flex-1">
        <el-col :span="4">
          <el-select v-model="shixiao" placeholder="订单状态" @change="reflash">
            <el-option
              v-for="item in shixiaolists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="订单编号">
          <template slot-scope="scope">
            {{scope.row.orderNo}}
          </template>
        </el-table-column>
        <el-table-column label="生成时间">
          <template slot-scope="scope">
            {{getNewDate(scope.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="用户">
          <template slot-scope="scope">
            {{scope.row.buyerWxName}}
          </template>
        </el-table-column>
        <el-table-column label="订单金额">
          <template slot-scope="scope">
            {{scope.row.orderAmount}}
          </template>
        </el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <div v-if="scope.row.orderStatus==1||scope.row.orderStatus==3">待付款</div>
            <div v-if="scope.row.orderStatus==4||scope.row.orderStatus==8||scope.row.orderStatus==9||scope.row.orderStatus==10">已付款</div>
            <div v-if="scope.row.orderStatus==0||scope.row.orderStatus==5||scope.row.orderStatus==6||scope.row.orderStatus==7">已失效</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <div class="green" @click="handleClick(scope.row)">查看</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize" layout="prev, pager, next,sizes,jumper" :total="total" background>
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
    tit,
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
      shixiao:"",
      orderStatus:null,
      shixiaolists: [
        {
          value: "12",
          label: "待付款"
        },
        {
          value: "13",
          label: "已付款"
        },
        {
          value: "11",
          label: "已失效"
        }
      ],
    };
  },
  created() {
    this.getCatalogPage(1);
  },
  methods: {
    //时间截取
    getNewDate(s){
      s = s.substring(0,s.length-2)
      return s
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
        storeId:null,
        orderStatus:this.orderStatus
      };
      self.loading = true;
      
      api.DistributionOrderList(data).then(res => {
        console.log(res)
        self.loading = false;
        if (res.serviceCode=="E000000000") {
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
    reflash(e){
      console.log(e)
      this.orderStatus = e
      this.getCatalogPage(1)
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
    handleClick(val) {
      this.$router.push({ name: "distributionOrderDetails",query:{id:val.orderNo,productKey:val.productKey}});
    }
  }
};
</script>
<style scoped lang="scss">
.line {
  text-align: center;
}
.green{
  color: #00B4B9;
  cursor: pointer;
}
.table {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 26px;
  background-color: #ffffff;
}

.table:after {
  content: "";
  width: 0;
  height: 0;
  clear: both;
  display: block;
  visibility: hidden;
}

.scope-icon {
  width: 40px;
  height: 40px;
  background: #e0e0e0;
  overflow: hidden;
}
</style>