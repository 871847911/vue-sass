<template>
  <div class="app-container">
    <tit></tit>
    <div class="tabBox">
        <el-tabs v-model="activeName" @tab-click="handleClickItem">
            <el-tab-pane label="结算汇总" name="first"></el-tab-pane>
            <el-tab-pane label="转账申请" name="second"></el-tab-pane>
            <el-tab-pane label="转账记录" name="third"></el-tab-pane>
        </el-tabs>
    </div>
    <div class="pushDetails">
        <div class="detailsBottom" v-if="detailsBottom">
            <dl class="bdr">
                <dt>{{returnMoney(detailsBottom.transferMoney)}}</dt>
                <dd>转账申请</dd>
            </dl>
            <dl class="bdr">
                <dt>{{detailsBottom.transferCount}}笔</dt>
                <dd>申请笔数</dd>
            </dl>
        </div>
    </div>
    <div class="zucheng">
      <div class="titleBox">申请列表</div>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="申请时间">
          <template slot-scope="scope">
            {{getTime(scope.row.applyDate)}}
          </template>
        </el-table-column>
        <el-table-column label="转账金额">
          <template slot-scope="scope">
            {{returnMoney(scope.row.transferMoney)}}
          </template>
        </el-table-column>
        <el-table-column label="申请公司">
          <template slot-scope="scope">
            {{scope.row.applyCompany}}
          </template>
        </el-table-column>
        <el-table-column label="开户银行">
          <template slot-scope="scope">
            {{scope.row.bank}}
          </template>
        </el-table-column>
        <el-table-column label="对公账号">
          <template slot-scope="scope">
            {{scope.row.bankAccount}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <div class="green" @click="handleClickTrue(scope.row)">确认转账</div>
              <div class="green refuse" @click="handleClickFalse(scope.row)">拒绝</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize" layout="prev, pager, next,sizes,jumper" :total="total" background>
      </el-pagination>
    </div>
    <el-dialog
        title="转账确认"
        :visible.sync="dialogVisible"
        :show-close="false"
        width="40%"
        :before-close="handleClose">
        <span>
            <i class="iconfont t1">&#xe659;</i>
            <p class="t2">请在线下转账成功后，再进行转账完成的操作</p>
            <p class="t3">确认后，对方的账户金额会发生变动</p>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="cancel">取 消</el-button>
            <el-button type="primary" @click="quedingzhuanzhang">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="拒绝原因"
        :visible.sync="dialogVisible2"
        :show-close="false"
        width="40%"
        :before-close="handleClose">
        <span>
            <el-input
            type="textarea"
            :rows="10"
            placeholder="请填写拒绝原因"
            v-model="textarea">
            </el-input>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="cancel">取 消</el-button>
            <el-button type="primary" @click="jujuezhuanzhang">确 定</el-button>
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
      total: null,
      pageSize: 10,
      name: "", //课程名称
      loading: false,
      activeName: 'second',
      formData:"",
      dialogVisible:false, //同意弹窗
      dialogVisible2:false,  //拒绝弹窗
      textarea:'', //拒绝内容
      xuanzhongId:'',
      detailsBottom:'',
    };
  },
  created() {
    this.getCatalogPage(1);
    this.getDetails();
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
        userType:2,
        withdrawStatus:'0',
        pageNum: page || self.page,
        pageSize: pageSize || self.pageSize,
      };
      self.loading = true;
      api.transferApplyList(data).then(res => {
        console.log(res)
        self.loading = false;
        if (res.serviceCode=="E000000000") {
          self.total = res.data.total;
          self.page = res.data.page;
        //   self.pageSize = res.data.pageSize;
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
        userId : this.roles.userId,
        userType : 1,
      };
      
      api.earNing(data).then(res => {
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
    handleClickItem(tab, event) {
        console.log(tab.name);
        if(tab.name=="first"){
            this.$router.push({ name: "merchantSettlement" });
        }else if(tab.name=="third"){
            this.$router.push({ name: "transferRecord" });
        }
    },
    //确认转账
    handleClickTrue(val) {
        this.xuanzhongId = val.transferId
        this.dialogVisible = true;
    },
    quedingzhuanzhang(){
        let data = {
            withdrawStatus:1,
            id: this.xuanzhongId,
        };
        api.transferConfirmOrRefuse(data).then(res => {
            if (res.serviceCode=="E000000000") {
                this.getCatalogPage(1)
                this.getDetails()
                this.$message({
                    type: "success",
                    message: "确认成功"
                });
                this.xuanzhongId = ''
                this.dialogVisible = false;
                this.dialogVisible2 = false;
            } else {
                this.$message({
                    type: "error",
                    message: res.message
                });
            }
        });
    },
    jujuezhuanzhang(){
        let data = {
            withdrawStatus:2,
            reason:this.textarea,
            id: this.xuanzhongId,
        };
        api.transferConfirmOrRefuse(data).then(res => {
            if (res.serviceCode=="E000000000") {
                this.getCatalogPage(1)
                this.getDetails()
                this.$message({
                    type: "success",
                    message: "提交成功"
                });
                this.textarea = ''
                this.xuanzhongId = ''
                this.dialogVisible = false;
                this.dialogVisible2 = false;
            } else {
                this.$message({
                    type: "error",
                    message: res.message
                });
            }
        });
    },
    //拒绝
    handleClickFalse(val) {
        this.xuanzhongId = val.transferId
        this.dialogVisible2 = true;
    },
    //关闭弹窗
    cancel(){
        this.textarea = ''
        this.xuanzhongId = ''
        this.dialogVisible = false;
        this.dialogVisible2 = false;
    },
    handleClose(){

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
  display: inline-block;
}
.refuse{
    margin-left: 20px;
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
.el-dialog__footer {
    padding: 10px 20px !important;
    background: rgba(250, 250, 250, 1);
}
.el-button {
    padding: 12px 40px;
}
.cancel {
  background: #ffffff !important;
  font-size: 14px;
  font-weight: 400;
  color: #00b4b9 !important;
  border: 1px solid #00b4b9 !important;
}
.cancel:hover {
  background-color: #ffffff !important;
  color: #00b4b9 !important;
}
.t1{
    text-align: center;
    font-size: 124px;
    color: #FF6767;
    display: block;
}
.t2{
    text-align: center;
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(74,74,74,1);
    padding-top: 20px;
}
.t3{
    text-align: center;
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(155,155,155,1);
    padding-top: 10px;
}
</style>