<template>
  <div class="app-container">
    <tit></tit>
    <div class="tabBox">
        <div class="header">
            <div class="tabBoxHeader">推客：<span>{{name}}</span></div>
            <div class="tabBoxHeader">时间：<span>{{getTime(date)}}</span></div>
            <div class="tabBoxHeader">状态：<div v-if="status==0" class="zhuangtai">未结算</div><div v-if="status==1" class="zhuangtai already">已结算</div></div>
        </div>
    </div>
    <div class="pushDetails">
        <div class="detailsBottom" v-if="detailsBottom">
            <dl class="bdr">
                <dt>{{returnMoney(detailsBottom.settlementMoney)}}</dt>
                <dd>结算金额</dd>
            </dl>
            <dl class="bdr">
                <dt>{{returnMoney(detailsBottom.orderMoney)}}</dt>
                <dd>订单交易额</dd>
            </dl>
            <dl class="bdr">
                <dt>{{detailsBottom.countOrder}}</dt>
                <dd>已付款订单数（笔）</dd>
            </dl>
        </div>
    </div>
    <div class="zucheng">当日已付款订单</div>
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
            {{returnMoney(scope.row.orderAmount)}}
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
      date:this.$route.query.date, //时间
      name: this.$route.query.name, //商户名称
      loading: false,
      status:this.$route.query.status,
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
    //时间截取
    getNewDate(s){
      s = s.substring(0,s.length-2)
      return s
    },
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
        let newTime = Number(time)
        let date = new Date(newTime);
        let year = date.getFullYear();
        let month = date.getMonth()<10?"0"+(date.getMonth()+1):(date.getMonth()+1);
        let weekArray = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
        let weeks = weekArray[date.getDay()];
        let day = date.getDate()<10?"0"+date.getDate():date.getDate();
        let h = date.getHours()<10?"0"+date.getHours():date.getHours();
        let m = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
        return year+"-"+month+"-"+day+" "+h+":"+m;
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
        userId:this.$route.query.id,
        pageNum: page || self.page,
        pageSize: pageSize || self.pageSize,
        date : this.$route.query.date,
        userType : 3,
        orderStatus: null,
      };
      self.loading = true;
      api.DistributionOrderList(data).then(res => {
        console.log(res)
        self.loading = false;
        if (res.serviceCode=="E000000000") {
          self.total = res.data.total;
          self.page = res.data.page;
          self.pageSize = res.data.pageSize;
          self.tableData = res.data.list;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    getDetails(){
      let data = {
        userId : this.$route.query.id,
        userType : 3,
        date:this.$route.query.date,
      };
      self.loading = true;
      
      api.settlementDetailEarnings(data).then(res => {
        console.log(res)
        self.loading = false;
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
      this.$router.push({ name: "distributionOrderDetails",query:{id:val.orderNo,productKey:val.productKey} });
    },
  }
};
</script>
<style scoped lang="scss">
.ml-30{
    margin-left: 35px;
}
.tabBox{
    background: #ffffff;
    .header{
        margin: 0 20px;
        display: flex;
        border-bottom: 1px solid rgba(230,230,230,1);
    }
    .tabBoxHeader{
        font-size: 18px;
        color: #9B9B9B;
        padding: 20px 0;
        margin-right: 70px;
        .zhuangtai{
            width:49px;
            height:20px;
            background:rgba(236,75,38,1);
            border-radius:10px;
            font-size:12px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:20px;
            display: inline-block;
            text-align: center;
        }
        .already{
            background: #27BDC1;
        }
        span{
            font-size: 18px;
            color: #4A4A4A;
        }
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
}
.pushDetails{
    background: #fff;
    padding: 40px 40px 50px 40px;
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
            width: 33.3%;
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
  .zhangtai{
      width:49px;
      height:20px;
      background:rgba(236,75,38,1);
      border-radius:10px;
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:19px;
      text-align: center
  }
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