<template>
  <div class="app-container">
    <tit></tit>
    <div class="tabBox">
        <el-tabs v-model="activeName" @tab-click="handleClickItem">
            <el-tab-pane label="结算汇总" name="first"></el-tab-pane>
            <el-tab-pane label="转账申请" name="second"></el-tab-pane>
            <el-tab-pane label="转账记录" name="third"></el-tab-pane>
        </el-tabs>
        <div class="dis-flex mb-20">
            <el-row :gutter="20" class="flex-1">
                <el-col :span="20">
                    <el-date-picker
                        v-model="dataValue"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp"
                        :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                    <el-button type="success" class="theme-bg-color theme-bd-color" @click="handleQuery">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="table">
            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column label="转账完成时间">
                <template slot-scope="scope">
                    {{getTime(scope.row.date)}}
                </template>
                </el-table-column>
                <el-table-column label="转账金额">
                <template slot-scope="scope">
                    {{returnMoney(scope.row.money)}}
                </template>
                </el-table-column>
                <el-table-column label="申请公司">
                <template slot-scope="scope">
                    {{scope.row.company}}
                </template>
                </el-table-column>
                <el-table-column label="开户银行">
                <template slot-scope="scope">
                    {{scope.row.bank}}
                </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <div class="green" @click="handleClick(scope.row)">详情</div>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize" layout="prev, pager, next,sizes,jumper" :total="total" background>
            </el-pagination>
        </div>
    </div>
    <el-dialog
        v-if="tableDataDetails"
        title="记录详情"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <span>
            <div class="flexBox">
                <div class="flexBoxItem">流水号<span>{{tableDataDetails.tradingNo}}</span></div>
                <div class="flexBoxItem">申请时间<span>{{getTime(tableDataDetails.applyDate)}}</span></div>
            </div>
            <div class="flexBox">
                <div class="flexBoxItem">完成时间<span>{{getTime(tableDataDetails.completeDate)}}</span></div>
                <div class="flexBoxItem">转账金额<span>{{returnMoney(tableDataDetails.transferMoney)}}</span></div>
            </div>
            <p class="titleSmall">转账账户</p>
            <div class="flexBox">
                <div class="flexBoxItem">公司<span>{{tableDataDetails.company}}</span></div>
                <div class="flexBoxItem">对公账号<span>{{tableDataDetails.bankAccount}}</span></div>
            </div>
            <div class="flexBox">
                <div class="flexBoxItem">开户银行<span>{{tableDataDetails.bank}}</span></div>
            </div>
        </span>
    </el-dialog>
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
      tableDataDetails:null,
      total: null,
      pageSize: 10,
      name: "", //课程名称
      loading: false,
      activeName: 'third',
      formData:"",
      dataValue:[],
      dialogVisible:false,
      startDate:null,
      endDate:null
    };
  },
  created() {
    this.dataValue[1] = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime() + 86400000 -1;
    this.dataValue[0] = this.dataValue[1] - 604800000 + 1;
    this.getCatalogPage(1);
  },
  mounted(){
  },
  methods: {
    //过万时换算
        returnMoney(e){
            if((e/10000)>1){
                e = (e/10000).toFixed(2) + "万"
            }else{
                e = e + "元"
            }
            return e
        },
    //时间戳转换
	  getTime(time){
		  let date = new Date(time);
		  let year = date.getFullYear();
		  let month = date.getMonth()<10?"0"+(date.getMonth()+1):(date.getMonth()+1);
		  let weekArray = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
		  let weeks = weekArray[date.getDay()];
		  let day = date.getDate()<10?"0"+date.getDate():date.getDate();
		  let h = date.getHours()<10?"0"+date.getHours():date.getHours();
		  let m = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
		  return year+"-"+month+"-"+day+" "+h+":"+m;
	  },
    handleQuery(){
      this.getCatalogPage(1)
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
        userId:this.roles.userId,
        pageNum: page || self.page,
        pageSize: pageSize || self.pageSize,
        startDate:this.dataValue[0],
        endDate:this.dataValue[1]
      };
      self.loading = true;
      api.transferRecordList(data).then(res => {
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
    handleClickItem(tab, event) {
        console.log(tab.name);
        if(tab.name=="first"){
            this.$router.push({ name: "merchantSettlement" });
        }else if(tab.name=="second"){
            this.$router.push({ name: "transferApplication" });
        }
    },
    //详情
    handleClick(val) {
    console.log(val.id)
    let self = this;
      if (self.loading) {
        return this.$message({
          message: "正在查询中,请勿重复点击查询",
          type: "error"
        });
      }
      let data = {
        transferId:val.id
      };
      self.loading = true;
      api.transferRecordDetail(data).then(res => {
        console.log(res)
        self.loading = false;
        if (res.serviceCode=="E000000000") {
            self.dialogVisible = true;
            self.tableDataDetails = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    //关闭
    handleClose(){
        this.dialogVisible = false
    }
  }
};
</script>
<style lang="scss">
.flexBox{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .flexBoxItem{
        width: 45%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(230,230,230,1); 
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(155,155,155,1);
        span{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(74,74,74,1);
        }
    }
}
.titleSmall{
    font-size:12px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(74,74,74,1);
    padding:10px 0 20px 0;
}
.tabBox{
    background: #ffffff;
    padding: 10px 20px;
    .theme-bd-color{
        display: inline-block;
        margin-left: 20px;
    }
    .el-tabs__item{
        line-height: 30px;
    }
}

.green{
  color: #00B4B9;
  cursor: pointer;
}
.line {
  text-align: center;
}
.zucheng{
    font-size: 16px;
    color: #9B9B9B;
    padding: 30px 0 20px 0;
    overflow: hidden;
    .titleBox{
      float: left;
      height: 40px;
      line-height: 40px;
    }
    .inputBox{
      width: 30%;
      float: right;
    }
    .bottonBox{
      margin-left: 30px;
      float: right;
    }
}
.pushDetails{
    background: #fff;
    padding: 30px 40px 50px 40px;
    
}
.table {
  background-color: #ffffff;
  padding: 0 0 40px 0;
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