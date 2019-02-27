<template>
  <div class="app-container">
    <tit></tit>
    <div class="dis-flex mb-30">
      <el-row :gutter="20" class="flex-1">
        <el-col :span="6">
          <el-input v-model="formData" placeholder="推客" class="mr-10"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="success" class="theme-bg-color theme-bd-color" @click="chaxun">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="头像">
          <template slot-scope="scope">
            <div class="scope-icon">
              <img :src="scope.row.headUrl" width="100%" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="微信昵称">
          <template slot-scope="scope">
            {{scope.row.nickName}}
          </template>
        </el-table-column>
        <el-table-column label="等级">
          <template slot-scope="scope">
            {{scope.row.levelName}}
          </template>
        </el-table-column>
        <el-table-column label="总收益">
          <template slot-scope="scope">
            {{scope.row.currentIncome}}
          </template>
        </el-table-column>
         <el-table-column label="累计已结算">
          <template slot-scope="scope">
            {{scope.row.totalSettlement}}
          </template>
        </el-table-column>
        <el-table-column label="分销数量">
          <template slot-scope="scope">
            {{scope.row.peddleNum}}
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
      formData:null
    };
  },
  created() {
    this.getCatalogPage(1);
  },
  methods: {
    getCatalogPage(page = 1, pageSize) {
      let self = this;
      if (self.loading) {
        return this.$message({
          message: "正在查询中,请勿重复点击查询",
          type: "error"
        });
      }
      let data = {
        page: page || self.page,
        pageSize: pageSize || self.pageSize,
        keyword:this.formData?this.formData:null
      };
      self.loading = true;
      api.getPeddleUserPage(data).then(res => {
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
      this.$router.push({ name: "pushListDetails",query:{id:val.id} });
    },
    chaxun(){
      this.getCatalogPage(1);
    }
  }
};
</script>
<style scoped lang="scss">
.green{
  color: #00B4B9;
  cursor: pointer;
}
.line {
  text-align: center;
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