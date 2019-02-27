<template>
  <div class="app-container">
    <tit></tit>
    <div class="pushDetails">
        <div class="detailsBottom" v-if="detailsBottom">
            <dl class="bdr">
                <dt>¥{{returnMoney(detailsBottom.staySettlement)}}</dt>
                <dd>待结算</dd>
            </dl>
            <dl class="bdr">
                <dt>¥{{returnMoney(detailsBottom.totalSettlement)}}</dt>
                <dd>累计已结算</dd>
            </dl>
        </div>
    </div>
    <div class="zucheng">
      <div class="titleBox">结算列表</div>
      <div class="bottonBox"><el-button type="success" class="theme-bg-color theme-bd-color" @click="handleQuery">查询</el-button></div>
      <div class="inputBox"><el-input v-model="formData" placeholder="请输入推客"></el-input></div>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="推客">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="累计交易额">
          <template slot-scope="scope">
            {{returnMoney(scope.row.totalDealMoney)}}
          </template>
        </el-table-column>
        <el-table-column label="待结算">
          <template slot-scope="scope">
            {{returnMoney(scope.row.totalStaySettlement)}}
          </template>
        </el-table-column>
        <el-table-column label="累计已结算">
          <template slot-scope="scope">
            {{returnMoney(scope.row.accumulatedSettlement)}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <div class="green" @click="handleClick(scope.row)">结算记录</div>
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
      activeName: 'first',
      formData:null,
      detailsBottom:''
    };
  },
  created() {
    this.getCatalogPage(1);
    this.getDetails()
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
    handleQuery(){
      this.getCatalogPage();
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
        name:this.formData,
      };
      self.loading = true;
      api.settlementTotalListsh(data).then(res => {
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
    //汇总
    getDetails(){
      let data = {
        userId : this.roles.userId,
        userType : 3
      };
      api.sttlementAll(data).then(res => {
        console.log(res)
        if (res.serviceCode=="E000000000") {
          this.detailsBottom = res.data
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
      this.$router.push({ name: "pushRecord",query: { id: val.userId,name:val.name } });
    }
  }
};
</script>
<style lang="scss">
.tabBox{
    background: #ffffff;
    padding: 10px 20px;
}
.el-tabs__item{
    line-height: 30px;
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
    .detailsTop{
        display: flex;
        justify-content: space-between;
        padding-bottom: 40px;
        border-bottom: 1px solid rgba(230,230,230,1);
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        .detailsRight{
            padding-left: 20px;
            flex: 1;
            .textBox{
                display: flex;
                align-items: center;
                .name{
                    font-size: 18px;
                    color: #4A4A4A;
                    margin-right: 20px;
                }
                .dengji{
                    display: inline-block;
                    padding: 3px 6px;
                    background: #E6F6F6;
                    font-size: 14px;
                    color: #27BDC1;
                    margin-right: 10px;
                    border-radius: 20px;
                }
                .date{
                    display: inline-block;
                    padding: 4px 10px;
                    background: #F7F7F7;
                    font-size: 12px;
                    color: #9B9B9B;
                    border-radius: 20px;
                }
            }
            p{
                padding-top: 20px;
                font-size: 14px;
                color: #4A4A4A;
            }
            .jinduBox{
                height: 3px;
                background: #EEF2F3;
                border-radius: 3px;
                // overflow: hidden;
                position: relative;
                margin-top: 14px;
                .jindu{
                    width: 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 3px;
                    background: #27BDC1;
                    .yuan{
                        position: absolute;
                        right: -5px;
                        top: -4px;
                        width: 11px;
                        height:11px;
                        background: #fff;
                        border: 3px solid #27BDC1;
                        border-radius: 50%;
                    }
                }
            }
            .level{
                display: flex;
                justify-content: space-between;
                padding-top: 9px;
                span{
                    font-size: 14px;
                    color: #4A4A4A;
                }
            }
        }
    }
    .detailsBottom{
        display: flex;
        justify-content: space-between;
        // padding-top: 47px;
        dl{
            width: 49.9%;
            text-align: center;
            dt{
                font-size: 30px;
                color: #4A4A4A;
                padding-bottom: 10px;
            }
            dd{
                font-size: 14px;
                color: #9B9B9B;
            }
        }
        .bdr{
            border-right: 1px solid rgba(230,230,230,1);
        }
        .bdr:last-child{
            border: none
        }
    }
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