<template>
  <div class="app-container apply-container">
    <h1 class="title">申请列表</h1>
    <div class="dis-flex mb-30">
      <el-select v-model="dealStatus" placeholder="状态" class="state">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="phone" placeholder="手机号码" class="input-header"></el-input>
      <el-button type="success" class="theme-bg-color theme-bd-color" @click="handleQuery">搜索</el-button>
    </div>

    <div class="table">
      <el-table :data="tableList" v-loading="loading" stripe>
        <el-table-column prop="name" align="center" label="申请人"></el-table-column>
        <el-table-column align="center" label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.gender == 0">先生</span>
            <span v-if="scope.row.gender == 1">女士</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" align="center" label="联系方式"></el-table-column>
        <el-table-column prop="createDate" align="center" label="申请时间"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <i
              class="iconfont icon-zitikuicon-"
              v-if="scope.row.dealStatus == 0"
              style="color:#F42C21;"
            ></i>
            <i
              class="iconfont icon-zitikuicon-"
              v-if="scope.row.dealStatus == 1"
              style="color:#6cddc7;"
            ></i>
            <i
              class="iconfont icon-zitikuicon-"
              v-if="scope.row.dealStatus == 2"
              style="color:#6cddc7;"
            ></i>
            <i
              class="iconfont icon-zitikuicon-"
              v-if="scope.row.dealStatus == 3"
              style="color:#6cddc7;"
            ></i>
            <span v-if="scope.row.dealStatus === 0">待处理</span>
            <span v-if="scope.row.dealStatus === 1">处理中</span>
            <span v-if="scope.row.dealStatus === 2">已处理</span>
            <span v-if="scope.row.dealStatus === 3">已关闭</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div class="btn-flex">
              <div class="right_btn" @click="handleLook(scope.row)">查看</div>
              <div
                class="right_btn"
                @click="handleDetail(scope.row)"
                v-if="scope.row.dealStatus ==0"
              >跟进</div>
              <div
                class="right_btn"
                @click="handleModify(scope.row)"
                v-if="scope.row.dealStatus == 1"
              >修改</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 跟进 -->
      <el-dialog :showClose="true" :visible.sync="lookVisible" width="840px">
        <h1>跟进详情
          <el-popover placement="top" width="260" v-model="visible2">
            <p>多次尝试均未联系到申请人，是否要关闭跟进记录？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleClose">确定</el-button>
            </div>
            <span slot="reference">没联系到申请人？</span>
          </el-popover>
        </h1>
        <h3>申请信息</h3>
        <div class="column-box">
          <div class="left-box">
            <span>消息编号</span>
            <span>{{dialogData.id}}</span>
          </div>
          <div class="right-box">
            <span>申请人</span>
            <span>{{dialogData.name}}</span>
          </div>
        </div>
        <div class="column-box">
          <div class="left-box">
            <span>性别</span>
            <span>{{dialogData.gender == 0 ? '先生' : '女士'}}</span>
          </div>
          <div class="right-box">
            <span>联系方式</span>
            <span>{{dialogData.phone}}</span>
          </div>
        </div>
        <div class="column-box">
          <div class="left-box">
            <span>申请时间</span>
            <span>{{dialogData.createDate}}</span>
          </div>
          <div class="right-box">
            <span>状态</span>
            <span v-if="dialogData.dealStatus == 0">待处理</span>
            <span v-if="dialogData.dealStatus == 1">处理中</span>
            <span v-if="dialogData.dealStatus == 2">已处理</span>
            <span v-if="dialogData.dealStatus == 3">已关闭</span>
          </div>
        </div>
        <div style="text-align:center;margin-top:60px;">
          <el-button @click="colseDialog">确定</el-button>
        </div>
      </el-dialog>
      <!-- 待处理跟进 -->
      <el-dialog :showClose="true" :visible.sync="entryVisible" width="600px">
        <h1>录入处理信息</h1>
        <div class="entryBox">
          <div class="flex">
            <div class="text">处理日期：</div>
            <div class="wd300">
              <el-date-picker
                v-model="entryData.dealDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </div>
          <div class="flex">
            <div class="text">试用版：</div>
            <div class="wd300">
              <el-radio v-model="entryData.useTrial" label="true">已开通</el-radio>
              <el-radio v-model="entryData.useTrial" label="false">未开通</el-radio>
            </div>
          </div>
          <div class="flex">
            <div class="text">是否签约：</div>
            <div class="wd300">
              <el-radio v-model="entryData.signStatus" label="1" @change="signStyle">是</el-radio>
              <el-radio v-model="entryData.signStatus" label="0" @change="signStyle">否</el-radio>
              <el-radio v-model="entryData.signStatus" label="2" @change="signStyle">待定</el-radio>
            </div>
          </div>
          <div class="flex" style="align-items:flex-start;margin-top:12px;">
            <div class="text" style="white-space:nowrap;">签约方式：</div>
            <div class="wd300">
              <el-input class="wd300" v-model="entryData.signDetail" :disabled="sign" @focus="isShow = true"></el-input>
              <div class="tableSwitch" v-if="isShow">
                <div class="left-box">
                  <ul>
                    <li>
                      <div>
                        <div
                          class="version"
                          :class="activeId == item.id ? 'active' : ''"
                          v-for="item in versionList"
                          :key="item.id"
                          @click="handleActive(item)"
                        >{{item.value}}</div>
                      </div>
                      <div style="height:160px;position:absolute;top:0;left:72px;">
                        <ul>
                          <li v-for="item in wayList" :key="item.id" class="child" :class="activeChildId == item.id ? 'childActive' : ''" @click="handleChild(item)">{{item.value}}</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div style="text-align:center;">
            <el-button style="width:120px;height:40px;color:#ffffff;" @click="entryConfirm">确定</el-button>
          </div>
        </div>
      </el-dialog>
      <!-- 未开通查看,处理中修改 -->
      <el-dialog :showClose="true" :visible.sync="dealVisible" width="840px">
        <h1>处理详情</h1>
        <h3>申请信息</h3>
        <div class="column-box">
          <div class="left-box">
            <span>消息编号</span>
            <span>{{dialogData.id}}</span>
          </div>
          <div class="right-box">
            <span>申请人</span>
            <span>{{dialogData.name}}</span>
          </div>
        </div>
        <div class="column-box">
          <div class="left-box">
            <span>性别</span>
            <span>{{dialogData.gender == 0 ? '先生' : '女士'}}</span>
          </div>
          <div class="right-box">
            <span>联系方式</span>
            <span>{{dialogData.phone}}</span>
          </div>
        </div>
        <div class="column-box">
          <div class="left-box">
            <span>申请时间</span>
            <span>{{dialogData.createDate}}</span>
          </div>
          <div class="right-box">
            <span>状态</span>
            <span v-if="dialogData.dealStatus == 0">待处理</span>
            <span v-if="dialogData.dealStatus == 1">处理中</span>
            <span v-if="dialogData.dealStatus == 2">已处理</span>
            <span v-if="dialogData.dealStatus == 3">已关闭</span>
          </div>
        </div>
        <div class="column-box">
          <div class="left-box">
            <span>处理日期</span>
            <span>{{dialogData.dealDate}}</span>
          </div>
        </div>
        <h3>签约信息</h3>
        <div class="column-box">
          <div class="left-box">
            <span>试用版</span>
            <span>{{dialogData.useTrial == true ? '已开通' : '未开通'}}</span>
          </div>
          <div class="left-box" style="height:40px;line-height:40px;border:none;">
            <span>是否签约</span>
            <div>
              <el-radio v-model="entryData.signStatus" label="1">是</el-radio>
              <el-radio v-model="entryData.signStatus" label="0">否</el-radio>
              <el-radio v-model="entryData.signStatus" label="2">待定</el-radio>
            </div>
          </div>
        </div>
        <div class="column-box">
          <div class="left-box" style="height:40px;line-height:40px;border:none;border-bottom:none;">
            <span>签约方式</span>
            <div class="wd300" style="width:300px;">
              <el-input v-model="entryData.signDetail" :disabled="sign" @focus="isShow = true"></el-input>
              <div class="tableSwitch" v-if="isShow" style="position:absolute;bottom:-38px;left:100px;">
                <div class="left-box" style="height:auto;border-bottom:none;">
                  <ul>
                    <li style="height:auto;">
                      <div>
                        <div
                          class="version"
                          :class="activeId == item.id ? 'active' : ''"
                          v-for="item in versionList"
                          :key="item.id"
                          @click="handleActiveSecond(item)"
                        >{{item.value}}</div>
                      </div>
                      <div style="height:160px;position:absolute;top:0;left:72px;">
                        <ul>
                          <li v-for="item in wayList" :key="item.id" class="child" :class="activeChildId == item.id ? 'childActive' : ''" @click="handleChildSecond(item)">{{item.value}}</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin-top:60px;">
          <el-button @click="confirmModify">确定</el-button>
        </div>
      </el-dialog>
      <!-- 已开通是,签约方式已开通待定 -->
      <el-dialog :showClose="true" :visible.sync="openedVisible" width="840px">
        <h1>处理详情</h1>
        <h3>申请信息</h3>
        <div class="column-box">
          <div class="left-box">
            <span>消息编号</span>
            <span>{{dialogData.id}}</span>
          </div>
          <div class="right-box">
            <span>申请人</span>
            <span>{{dialogData.name}}</span>
          </div>
        </div>
        <div class="column-box">
          <div class="left-box">
            <span>性别</span>
            <span>{{dialogData.gender == 0 ? '先生' : '女士'}}</span>
          </div>
          <div class="right-box">
            <span>联系方式</span>
            <span>{{dialogData.phone}}</span>
          </div>
        </div>
        <div class="column-box">
          <div class="left-box">
            <span>申请时间</span>
            <span>{{dialogData.createDate}}</span>
          </div>
          <div class="right-box">
            <span>状态</span>
            <span v-if="dialogData.dealStatus == 0">待处理</span>
            <span v-if="dialogData.dealStatus == 1">处理中</span>
            <span v-if="dialogData.dealStatus == 2">已处理</span>
            <span v-if="dialogData.dealStatus == 3">已关闭</span>
          </div>
        </div>
        <div class="column-box">
          <div class="left-box">
            <span>处理日期</span>
            <span>{{dialogData.dealDate}}</span>
          </div>
        </div>
        <h3>签约信息</h3>
        <div class="column-box">
          <div class="left-box">
            <span>试用版</span>
            <span>{{dialogData.useTrial == true ? '已开通' : '未开通'}}</span>
          </div>
          <div class="left-box">
            <span>是否签约</span>
            <span v-if="dialogData.signStatus == 1">是</span>
            <span v-if="dialogData.signStatus == 0">否</span>
            <span v-if="dialogData.signStatus == 2">待定</span>
          </div>
        </div>
        <div class="column-box" v-if="dialogData.signStatus == 1">
          <div class="left-box">
            <span>签约方式</span>
            <span>{{dialogData.signDetail}}</span>
          </div>
        </div>
        <div style="text-align:center;margin-top:60px;">
          <el-button @click="colseDialog">确定</el-button>
        </div>
      </el-dialog>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="prev, pager, next,sizes,jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "Apply",
  data() {
    return {
      statusList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 0,
          label: "待处理"
        },
        {
          value: 1,
          label: "处理中"
        },
        {
          value: 2,
          label: "已处理"
        },
        {
          value: 3,
          label: "已关闭"
        }
      ],
      versionList: [
        {
          value: "标准版",
          id: 0
        },
        {
          value: "专业版",
          id: 1
        },
        {
          value: "高级版",
          id: 2
        },
        {
          value: "豪华版",
          id: 3
        }
      ],
      wayList: [
        {
          value: "30天",
          id: 0
        },
        {
          value: "90天",
          id: 1
        },
        {
          value: "180天",
          id: 2
        },
        {
          value: "360天",
          id: 3
        }
      ],
      phone: "",
      dealStatus: "",
      closeId: "",
      entryData: {
        // 录入参数,处理中修改参数
        id: "",
        dealDate: "",
        useTrial: "",
        signStatus: "",
        signDetail: ""
      },
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      loading: false,
      lookVisible: false,
      visible2: false,
      entryVisible: false,
      dealVisible: false,
      openedVisible: false,
      determined: false,
      dialogData: [],
      versionValue1: "",
      versionValue2: "",
      radio1: "",
      activeId:10,
      activeChildId:10,
      isShow:false,
      sign:false,
      dealForm:{
        dealStyle:'',
        dealDate:''
      },
      dealValue:'',
      // 日期处理
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  created() {
    this.init();
  },

  methods: {
    // 数据初始化
    init() {
      let self = this;
      self.$store
        .dispatch("applyList", {
          size: this.pageSize,
          page: this.currentPage,
          phone: this.phone,
          dealStatus: this.dealStatus
        })
        .then(res => {
          if (res.success) {
            this.tableList = res.pageInfo.list;
            this.total = res.pageInfo.total;
          }
        });
    },

    // 查询
    handleQuery() {
      this.init();
    },

    // 待处理查看
    handleLook(row) {
      console.log(row);
      this.dialogData = row;
      this.closeId = row.id;
      if (row.dealStatus == 0) {
        this.lookVisible = true;
      } else if (row.dealStatus == 1) {
        this.openedVisible = true;
      }else{
        this.openedVisible = true;
      }
    },

    // 待处理跟进详情
    handleDetail(row) {
      this.id = ''
      this.entryData.dealDate = ''
      this.entryData.useTrial = ''
      this.entryData.signStatus = ''
      this.entryData.signDetail = ''
      this.entryData.dealDate = ''
      this.sign = false
      this.entryVisible = true;
      this.entryData.id = row.id
    },

    // 关闭跟进记录
    handleClose() {
      this.$store.dispatch("close", { id: this.closeId }).then(res => {
        if (res.success) {
          this.$message.success("关闭成功");
          this.init();
          this.lookVisible = false;
          this.visible2 = false;
        } else {
          this.$message.error("关闭成功");
        }
      });
    },

    // 录入处理信息
    entryConfirm() {
      if (this.entryData.dealDate == "") {
        this.$message.warning("请选择日期");
      } else if (this.entryData.useTrial == "") {
        this.$message.warning("请选择试用版方式");
      } else if (this.entryData.signStatus == "") {
        this.$message.warning("请选择签约状态");
      } else if (this.entryData.signStatus == 1 && this.entryData.signDetail == "") {
        this.$message.warning("请选择签约方式");
      } else {
        this.$store.dispatch("deal", this.entryData).then(res => {
          if (res.success) {
            this.activeId = ''
            this.activeChildId = ''
            this.$message.success("修改成功");
            this.init();
            this.entryVisible = false;
          } else {
            this.$message.error("修改失败");
          }
        });
      }
    },

    // 处理中修改
    handleModify(row) {
      this.dealVisible = true;
      this.dialogData = row;
      this.entryData.dealDate = row.dealDate;
      this.entryData.signDetail = row.signDetail;
      this.entryData.id = row.id;
      this.entryData.signStatus = row.signStatus;
      this.entryData.useTrial = row.useTrial;
    },

    // 确定修改
    confirmModify() {
      
      this.$store.dispatch("deal", this.entryData).then(res => {
        if (res.success) {
          this.$message.success("修改成功");
          this.init();
          this.dealVisible = false;
        } else {
          this.$message.error("修改失败");
        }
      });
    },

    colseDialog() {
      this.openedVisible = false
      this.lookVisible = false;
    },

    handleActive(row) {
      this.activeId = row.id;
      this.versionValue1 = row.value
    },

    handleChild(row){
      if(this.versionValue1 == '' && this.sign == false){
        this.$message.warning('请选择签约版本')
        return;
      }else{
        this.activeChildId = row.id
        this.entryData.signDetail = this.versionValue1 + '-' +row.value
        this.isShow = false
      }
    },

    handleChildSecond(row){
      // this.dealValue 
      //  dealForm:{
      //   dealStyle:'',
      //   dealDate:''
      // },
      if(this.dealForm.dealStyle == ''){
        this.$message.warning('请选择签约方式')
        this.entryData.signDetail = ''
      }else{
        this.activeChildId = row.id
        this.entryData.signDetail = this.dealForm.dealStyle + '-' + row.value
        this.isShow = false
      }
    },

    handleActiveSecond(row){
      this.dealForm.dealStyle = row.value
      this.activeId = row.id
    },

    // 分页
    handleSizeChange(val) {
      this.tableList = null;
      this.pageSize = val;
      this.init();
    },

    handleCurrentChange(val) {
      this.tableList = null;
      this.currentPage = val;
      this.init();
    },

    signStyle(val){
      if(val == 0 || val == 2){
        this.entryData.signDetail = ""
        this.sign = true
        this.isShow = false
      }else{
        this.sign = false
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.childActive{
  color:#00b4b9 !important;
}
.child {
  width: 229px !important;
  text-align: left !important;
  border: none !important;
  padding-left: 35px !important;
}
.active {
  background-color: #00b4b9;
}
.title {
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(155, 155, 155, 1);
  line-height: 28px;
  margin-bottom: 20px;
}
.btn-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  .right_btn {
    cursor: pointer;
    height: 18px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 180, 185, 1);
    line-height: 18px;
    &:nth-child(1) {
      margin-right: 25px;
    }
  }
  span {
    height: 15px;
    width: 1px;
    margin: 0 5px;
    background-color: #9b9b9b;
  }
}
.table {
  .el-dialog {
    h1 {
      span {
        cursor: pointer;
        padding-left: 10px;
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 20px;
      }
    }
    h3 {
      margin-top: 25px;
      height: 17px;
      font-size: 12px;
      font-weight: 600;
      color: rgba(74, 74, 74, 1);
      line-height: 17px;
    }
    .column-box {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      margin-top: 20px;
      .left-box,
      .right-box {
        width: 370px;
        display: flex;
        justify-content: space-between;
        height: 25px;
        line-height: 25px;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        span {
          &:nth-child(1) {
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(155, 155, 155, 1);
            line-height: 20px;
          }
        }
      }
    }
    .el-button {
      width: 120px;
      height: 40px;
      background: rgba(0, 180, 185, 1);
      border-radius: 4px;
      color: #ffffff;
    }
    .entryBox {
      width: 377px;
      margin: 0 auto;
      margin-top: 40px;
      .flex {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        .text {
          width: 63px;
          margin-right: 17px;
          text-align: right;
          height: 17px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(74, 74, 74, 1);
          line-height: 17px;
        }
        .wd300 {
          width: 300px;
        }
      }
    }
  }
}
.tableSwitch {
  width: 300px;
  height: 160px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #d9d9d9;
  margin-top: 10px;
  border-radius: 4px;
  .left-box {
    ul {
      li {
        cursor: pointer;
        position: relative;
        width: 72px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-family: "MicrosoftYaHeiUI";
        border-right: 1px solid rgba(217, 217, 217, 0.7);
        font-size: 14px;
        color: rgba(0, 0, 0, 1);
        .version {
          border-right: 1px solid rgba(217, 217, 217, 0.7);
        }
      }
    }
  }
}
</style>
<style lang="scss">
.apply-container {
  .state{
    .el-select {
      .el-input__inner {
        width: 157px !important;
      }
    }
  }
 
  .wd300 {
    .el-select {
      .el-input__inner {
        width: 300px !important;
      }
    }
  }
  .input-header {
    width: 300px;
    margin-left: 20px;
    margin-right: 10px;
  }
  .el-dialog__body {
    padding: 0 30px 30px 30px;
  }
}
.el-popover {
  .el-button {
    &:nth-child(1) {
      width: 60px !important;
      height: 28px;
      border-radius: 2px;
      background-color: #fff !important;
      border: 1px solid rgba(0, 185, 180, 1);
    }
  }
}
</style>

