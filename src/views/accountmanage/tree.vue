<template>
  <div class="app-container">
    <tit></tit>
    <div class="dis-flex mb-30">
      <el-row :gutter="20" class="flex-1">
        <el-col :span="3">
          <el-input v-model="account" placeholder="用户名" class="mr-10"></el-input>
        </el-col>

        <el-col :span="2">
          <el-select v-model="isEnabled" placeholder="启用状态">
            <el-option
              v-for="item in lists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="2">
          <el-select v-model="banben" placeholder="全部版本">
            <el-option
              v-for="item in banbenlists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="2">
          <el-select v-model="shixiao" placeholder="全部时效">
            <el-option
              v-for="item in shixiaolists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="2">
          <el-button
            type="success"
            class="theme-bg-color theme-bd-color"
            @click="getQuerySubAccount(page)"
          >查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" class="theme-bg-color theme-bd-color" @click="addUser">
        <i class="el-icon-plus el-icon--right mr-10"></i>添加客户账号
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe v-loading="loading">
        <el-table-column label="子账户编号" width="160">
          <template slot-scope="scope">{{scope.row.code}}</template>
        </el-table-column>
        <el-table-column label="用户账号" width="120">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <!-- <el-table-column label="身份证号码  " width=" 180">
          <template slot-scope="scope">
            {{scope.row.userMain.userInfo.idCardNum}}
          </template>
        </el-table-column>-->
        <el-table-column label="联系人" width="100">
          <template slot-scope="scope">{{scope.row.realName}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="120">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="有效期" width="100">
          <template slot-scope="scope">{{scope.row.buyDateLength}} 天</template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.isEnabled=='true'" class="Jstate Jstate-s">
              <span></span>已激活
            </div>
            <div v-else class="Jstate Jstate-f">
              <span></span>未激活
            </div>
          </template>
        </el-table-column>
        <el-table-column label="账号状态" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.accountStatus"
              active-value="1"
              inactive-value="0"
              @change="switchChange($event,scope.row.id)"
              active-color="rgba(39,189,193,0.15)"
              inactive-color="#C7C7C7"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="激活日期" width="160">
          <template slot-scope="scope">{{scope.row.enableDate!=null?scope.row.enableDate:'/'}}</template>
        </el-table-column>
        <el-table-column label="到期日期" width="160">
          <template slot-scope="scope">{{scope.row.endDate!=null?scope.row.endDate:'/'}}</template>
        </el-table-column>
        <el-table-column label="版本级别" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.versionLevel==1" class="Jstate Jstate-f">试用版</div>
            <div v-if="scope.row.versionLevel==2" class="Jstate Jstate-f">标准版</div>
            <div v-if="scope.row.versionLevel==3" class="Jstate Jstate-f">专业版</div>
            <div v-if="scope.row.versionLevel==4" class="Jstate Jstate-f">高级版</div>
            <div v-if="scope.row.versionLevel==5" class="Jstate Jstate-f">豪华版</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div @click="handleClick(scope.row.id)" class="right_btn">查看</div>
            <div
              @click="Peizhi(scope.row.username,scope.row.versionLevel,scope.row.id,scope.row.additionalDown)"
              class="right_btn"
            >配置</div>
            <div
              @click="xuqi(scope.row.username,scope.row.versionLevel,scope.row.id)"
              class="right_btn"
            >续期</div>
            <div @click="Password(scope.row.id)" class="right_btn">重置密码</div>
            <div @click="H5(scope.row.id)" class="right_btn">H5链接</div>
            <a :href="scope.row.storeUrl" target="_blank" class="right_btn">登录后台</a>
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
      ></el-pagination>
    </div>
    <!-- 配置弹窗 -->
    <el-dialog title="配置客户账号" :visible.sync="dialogPeizhi" width="450px">
      <div class="peizhi">
        <span class="lf">当前帐号</span>
        <span class="ri">{{userName}}</span>
      </div>
      <div class="peizhi">
        <span class="lf">版本级别</span>
        <span class="ri" v-if="currentVersion==1">试用版</span>
        <span class="ri" v-if="currentVersion==2">标准版</span>
        <span class="ri" v-if="currentVersion==3">专业版</span>
        <span class="ri" v-if="currentVersion==4">高级版</span>
        <span class="ri" v-if="currentVersion==5">豪华版</span>
      </div>
      <span class="icon">请选择需要配置的事项</span>
      <div class="boxBtn">
        <el-button @click="Upgrade" type="primary" plain>账号升级</el-button>
        <el-button @click="Zhanghao" type="primary" plain>配置功能</el-button>
        <el-button @click="liuLiang" type="primary" plain>额外流量</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPeizhi = false">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- h5弹窗 -->
    <el-dialog title="H5链接" :visible.sync="dialogh5" width="30%">
      <div style="text-align: center;">{{h5Link}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogh5 = false">好 的</el-button>
      </span>
    </el-dialog>
    <!-- 全功能开放 -->
    <el-dialog title="提示" :visible.sync="dialoghtishi" width="30%">
      <div style="text-align: center;" v-if="currentVersion==3">专业版账号，全功能开放，无法配置</div>
      <div style="text-align: center;" v-if="currentVersion==4">高级版账号，全功能开放，无法配置</div>
      <div style="text-align: center;" v-if="currentVersion==5">豪华版账号，全功能开放，无法配置</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialoghtishi = false">知道了</el-button>
      </span>
    </el-dialog>
    <!-- 密码弹窗 -->
    <el-dialog title="重置密码" :visible.sync="dialogPassword" width="30%">
      <div style="text-align: center;">确认将该账号密码重置为 123456 吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="dialogPassword = false">取 消</el-button>
        <el-button type="primary" @click="dialogChongzhi">重 置</el-button>
      </span>
    </el-dialog>
    <!-- 续期弹窗 -->
    <el-dialog title="续期" :visible.sync="dialogXuqi" width="30%" :before-close="closeSelect">
      <div>
        <div class="peizhi">
          <span class="lf">当前帐号</span>
          <span class="ri">{{userName}}</span>
        </div>
        <div class="peizhi">
          <span class="lf">版本级别</span>
          <span class="ri" v-if="currentVersion==1">试用版</span>
          <span class="ri" v-if="currentVersion==2">标准版</span>
          <span class="ri" v-if="currentVersion==3">专业版</span>
          <span class="ri" v-if="currentVersion==4">高级版</span>
          <span class="ri" v-if="currentVersion==5">豪华版</span>
        </div>
        <div class="icon">续期时常</div>
        <div class="selectBox" v-if="currentVersion==1">
          <el-select v-model="Timevalue" placeholder="请选择续期时常" @change="selectChange($event)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.value!=7"
            ></el-option>
          </el-select>
        </div>
        <div class="selectBox" v-else>
          <el-select v-model="Timevalue" placeholder="请选择续期时常" @change="selectChange($event)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.value==7"
            ></el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="dialogXuqi = false,Timevalue=''">取 消</el-button>
        <el-button type="primary" @click="xuqiBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 额外流量弹窗 -->
    <el-dialog title="额外流量" :visible.sync="dialogLiuliang" width="35%">
      <div class="peizhi">
        <span class="lf">当前帐号</span>
        <span class="ri">{{userName}}</span>
      </div>
      <div class="peizhi">
        <span class="lf">版本级别</span>
        <span class="ri" v-if="currentVersion==1">试用版</span>
        <span class="ri" v-if="currentVersion==2">标准版</span>
        <span class="ri" v-if="currentVersion==3">专业版</span>
        <span class="ri" v-if="currentVersion==4">高级版</span>
        <span class="ri" v-if="currentVersion==5">豪华版</span>
      </div>
      <span class="icon">请设定每月赠送该客户的额外下行流量</span>
      <el-alert
        title="该设置仅影响该账号，保存后下月生效 赠送的额外空间及流量为：账号默认空间及流量+额外空间及流量"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <span class="icon">每月赠送额外下行流量：</span>
      <div class="demo-input-suffix">
        <el-input placeholder @change="liuInputChange($event)" v-model="Liuliang">
          <template slot="append">G</template>
        </el-input>
        <span style="color:rgba(155,155,155,1);">限制0.1-1000数值</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="dialogLiuliang = false">取 消</el-button>
        <el-button type="primary" @click="LiuliangUpdate()">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 账号升级弹窗 -->
    <el-dialog title="账号升级" :visible.sync="dialogUpgrade" width="600px" :before-close="closeShenji">
      <div class="peizhi">
        <span class="lf">当前帐号</span>
        <span class="ri">{{userName}}</span>
      </div>
      <div class="peizhi">
        <span class="lf">版本级别</span>
        <span class="ri" v-if="currentVersion==1">试用版</span>
        <span class="ri" v-if="currentVersion==2">标准版</span>
        <span class="ri" v-if="currentVersion==3">专业版</span>
        <span class="ri" v-if="currentVersion==4">高级版</span>
        <span class="ri" v-if="currentVersion==5">豪华版</span>
      </div>
      <span class="icon">请选择需要升级的版本</span>
      <el-alert title="版本级别只能够提升，不可降低" type="warning" :closable="false" show-icon></el-alert>
      <div class="boxBtn2">
        <el-radio-group v-model="upgrade">
          <el-radio-button
            :disabled="index<currentVersion"
            :label="item"
            v-for="(item,index) in radioLists"
            :key="index"
          >
            <i v-if="upgrade==item" class="el-icon-success color-1"></i>
            {{item.versionName}}
          </el-radio-button>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="dialogUpgrade = false">取 消</el-button>
        <el-button type="primary" @click="UpgradeBtn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 账号配置弹窗 -->
    <el-dialog
      title="配置账号功能"
      :visible.sync="dialogZhanghao"
      width="660px"
      top="5vh"
      :before-close="closePezhi"
    >
      <div class="peizhi">
        <span class="lf">当前帐号</span>
        <span class="ri">{{userName}}</span>
      </div>
      <div class="peizhi">
        <span class="lf">版本级别</span>
        <span class="ri" v-if="currentVersion==1">试用版</span>
        <span class="ri" v-if="currentVersion==2">标准版</span>
        <span class="ri" v-if="currentVersion==3">专业版</span>
        <span class="ri" v-if="currentVersion==4">高级版</span>
        <span class="ri" v-if="currentVersion==5">豪华版</span>
      </div>
      <span class="icon">以下功能在该版本中禁用，并不可启用</span>
      <div class="dialogBOx">
        <div class="midLine"></div>
        <template v-for="(item,index) in Module">
          <div class="dialogLeftBOx" v-if="item.state==1">
            <dl>
              <dt>
                <i class="iconfont color-2">&#xe660;</i>
                {{item.functionName}}
              </dt>
              <dd>{{item.explain}}</dd>
            </dl>
          </div>
        </template>
      </div>
      <span class="icon">以下功能在该版本中禁用，可开启</span>
      <el-alert title="功能一旦开启并保存后，则无法关闭，当前操作只影响该账号 " type="warning" :closable="false" show-icon></el-alert>
      <div class="dialogBOx dialogBOxB">
        <div class="midLine"></div>
        <template v-for="(item,index) in Module">
          <div class="dialogLeftBOx" v-if="item.state!=1">
            <dl>
              <dt v-if="item.state==3">
                <el-checkbox :disabled="item.state==3" v-model="item.state==3">{{item.functionName}}</el-checkbox>
              </dt>
              <dt v-else>
                <el-checkbox
                  v-model="item.checked"
                  @change="checkboxChange($event , item.functionId , item.functionName)"
                >{{item.functionName}}</el-checkbox>
              </dt>
              <dd>{{item.explain}}</dd>
            </dl>
          </div>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          class="cancel"
          @click="dialogZhanghao = false,checkboxList = [],functionNameList = []"
        >取 消</el-button>
        <el-button type="primary" @click="modelSave">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 功能配置弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogFunction" width="500px">
      <div style="text-align: center;">
        确认将
        <span v-for="(item,index) in functionNameList" :key="index">【{{item}}】</span>功能开启吗，如若开启则该账号会启用该功能。
      </div>
      <div class="smallFunction">启用并保存后无法关闭，需谨慎。</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          class="cancel shureOpen"
          @click="dialogFunction = false,checkboxList = [],functionNameList = []"
        >取 消</el-button>
        <el-button class="shureOpen" type="primary" @click="dialogfunction">继续保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tit from "@/components/Htitle";
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      lists: [
        {
          value: "",
          label: "全部状态"
        },
        {
          value: "n",
          label: "未激活"
        },
        {
          value: "y",
          label: "已激活"
        }
      ],
      options: [
        {
          value: "7",
          label: "7天"
        },
        {
          value: "30",
          label: "30天"
        },
        {
          value: "90",
          label: "90天"
        },
        {
          value: "180",
          label: "180天"
        },
        {
          value: "360",
          label: "360天"
        }
      ],
      banben: "",
      shixiao: "",
      banbenlists: [
        {
          value: "",
          label: "全部版本"
        },
        {
          value: "1",
          label: "试用版"
        },
        {
          value: "2",
          label: "标准版"
        },
        {
          value: "3",
          label: "专业版"
        },
        {
          value: "4",
          label: "高级版"
        },
        {
          value: "5",
          label: "豪华版"
        }
      ],
      shixiaolists: [
        {
          value: "",
          label: "全部时效"
        },
        {
          value: "1",
          label: "未过期"
        },
        {
          value: "2",
          label: "已过期"
        }
      ],
      userName: "", //用户名
      currentVersion: "", //当前版本
      checked: "",
      Timevalue: "", //选择时常
      chongzhiId: "", //重置ID
      xuqiId: "", //续期ID
      Liuliang: "",
      upgrade: "", //升级的版本
      isOpen: true,
      isEnabled: "",
      page: "",
      tableData: null,
      total: null,
      pageSize: 10,
      account: "", //用户名
      loading: false,
      dialogPeizhi: false,
      dialogh5: false,
      dialogPassword: false,
      dialogXuqi: false,
      dialogLiuliang: false,
      dialogUpgrade: false,
      dialoghtishi: false,
      dialogZhanghao: false,
      dialogFunction: false,
      radioLists: [],
      Module: [],
      h5Link: "", //h5连接,
      checkboxList: [],
      functionNameList: [],
      LiuliangSave: true
    };
  },

  components: {
    tit
  },

  mounted() {
    this.getQuerySubAccount();
    this.version();
  },
  methods: {
    version() {
      this.$store.dispatch("version").then(res => {
        // self.loading = false;
        if (res.code == 200) {
          this.radioLists = res.data;
        }
      });
    },
    getQuerySubAccount(page = 1, pageSize = 10) {
      let self = this;
      let data = {};
      data.versionLevel = self.banben;
      data.isLate = self.shixiao;
      data.isEnabled = self.isEnabled;
      data.account = self.account;
      data.page = page;
      data.pageSize = pageSize;
      self.loading = true;
      this.$store.dispatch("querySubAccount", data).then(res => {
        self.loading = false;
        if (res.code == 200) {
          self.tableData = res.data.list;
          self.page = res.data.page;
          self.total = res.data.total;
          self.pageSize = res.data.pageSize;
        }
      });
    },
    addUser() {
      this.$router.push({ name: "addTable" });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      let self = this;
      self.tableData = null;
      self.getQuerySubAccount(1, val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let self = this;
      self.tableData = null;
      self.getQuerySubAccount(val);
    },
    currentPage(val) {
      console.log(val);
    },
    //单选钮
    checkboxChange(e, id, name) {
      if (e) {
        this.checkboxList.push(id);
        this.functionNameList.push(name);
      } else {
        for (var i = 0; i < this.functionNameList.length; i++) {
          if (this.functionNameList[i] == name) {
            this.functionNameList.splice(i, 1);
          }
        }
        for (var i = 0; i < this.checkboxList.length; i++) {
          if (this.checkboxList[i] == id) {
            this.checkboxList.splice(i, 1);
          }
        }
      }
    },
    //保存配置
    modelSave() {
      console.log(this.checkboxList, this.xuqiId, this.functionNameList);
      if (this.checkboxList == "") {
        this.dialogZhanghao = false;
      } else {
        this.dialogZhanghao = false;
        this.dialogFunction = true;
      }
    },
    //配置弹窗确认弹窗
    dialogfunction() {
      let zzr = this.checkboxList.join(",");
      this.$store
        .dispatch("userFunctionSave", {
          funs: zzr,
          id: this.xuqiId
        })
        .then(res => {
          console.log("账号功能保存接口", res);
          if (res.code == 200) {
            this.checkboxList = [];
            this.dialogFunction = false;
            this.getQuerySubAccount();
            this.$message({
              message: "功能调整成功",
              type: "success"
            });
          } else {
            this.$message.error(res.message);
          }
        });
      console.log(this.checkboxList);
    },
    //配置弹窗  //additionalDown这是配置里面下行流量后端数据返回新增 防止页面刷新不存vuex里
    Peizhi(name, versionLevel, id, additionalDown) {
      this.userName = name;
      this.currentVersion = versionLevel;
      this.xuqiId = id;
      this.Liuliang = additionalDown;
      this.dialogPeizhi = true;
    },
    //续期下拉
    selectChange(e) {
      this.Timevalue = e;
    },
    //续期
    xuqi(name, versionLevel, id) {
      this.dialogXuqi = true;
      this.userName = name;
      this.currentVersion = versionLevel;
      this.xuqiId = id;
    },
    //确定续期
    xuqiBtn() {
      this.$store
        .dispatch("duration", {
          buyDateLength: this.Timevalue,
          id: this.xuqiId
        })
        .then(res => {
          console.log("续期", res);
          if (res.code == 200) {
            this.dialogXuqi = false;
            this.getQuerySubAccount();
            if (this.Timevalue == "") {
              this.$message({
                message: "成功续期0天",
                type: "success"
              });
            } else {
              this.$message({
                message: "成功续期" + this.Timevalue + "天",
                type: "success"
              });
            }

            this.Timevalue = "";
          } else {
            this.$message.error(res.message);
          }
        });
    },
    //配置功能
    Zhanghao() {
      this.dialogPeizhi = false;
      if (this.currentVersion > 2) {
        this.dialoghtishi = true;
      } else {
        this.dialogPeizhi = false;
        this.dialogZhanghao = true;
        this.$store
          .dispatch("userFunction", {
            versionId: this.currentVersion,
            id: this.xuqiId
          })
          .then(res => {
            this.dialogUpgrade = false;
            console.log("配置账号功能查询接口", res);
            if (res.code == 200) {
              this.Module = res.data.forEach(val => {
                val.checked = false;
              });
              this.Module = res.data;
              console.log(this.Module);
            } else {
              this.$message.error(res.message);
            }
          });
      }
    },
    //额外流量
    liuLiang() {
      this.dialogPeizhi = false;
      this.dialogLiuliang = true;
    },
    //额外赠送流量输入
    liuInputChange(e) {
      console.log("输入", Number(111));
      if (Number(e) || Number(e) == 0) {
        if (e > 1000) {
          this.Liuliang = 1000.0;
        } else if (e < 0.1) {
          this.Liuliang = 0.1;
        } else {
          this.Liuliang = Number(e).toFixed(1);
        }
        this.LiuliangSave = true;
      } else {
        console.log(1111);
        this.Liuliang = "";
        this.LiuliangSave = false;
      }
      console.log("输出", this.Liuliang);
    },
    //额外赠送确定按钮
    LiuliangUpdate() {
      console.log(this.LiuliangSave);
      console.log(this.Liuliang);
      if (this.LiuliangSave && this.Liuliang != 0) {
        this.$store
          .dispatch("flow", {
            additionalDown: this.Liuliang,
            id: this.xuqiId
          })
          .then(res => {
            console.log("额外赠送", res);
            if (res.code == 200) {
              this.dialogLiuliang = false;
              // this.Liuliang = "";
              this.getQuerySubAccount();
              this.$message({
                message: "空间流量数据配置成功",
                type: "success"
              });
            } else {
              this.$message.error(res.message);
            }
          });
      } else {
        // this.$message.error("请输入数字");
        this.$message.error("下行流量限制0.1-1000数值");
      }
    },
    //重置密码弹窗
    Password(e) {
      console.log(e);
      this.dialogPassword = true;
      this.chongzhiId = e;
    },
    //重置密码
    dialogChongzhi() {
      this.$store
        .dispatch("resetPassword", { id: this.chongzhiId })
        .then(res => {
          console.log("重置密码", res);
          if (res.code == 200) {
            this.dialogPassword = false;
            this.$message({
              message: "密码已经重置，请及时通知用户修改密码",
              type: "success"
            });
          } else {
            this.$message.error(res.message);
          }
        });
    },
    //h5连接
    H5(e) {
      this.dialogh5 = true;
      this.$store.dispatch("H5link", { id: e }).then(res => {
        // console.log("重置密码", res);
        if (res.code == 200) {
          this.h5Link = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //账号升级
    Upgrade() {
      this.dialogPeizhi = false;
      this.dialogUpgrade = true;
    },
    //账号升级确定
    UpgradeBtn() {
      this.$store
        .dispatch("Upgrade", {
          versionLevel: this.upgrade.versionId,
          id: this.xuqiId
        })
        .then(res => {
          this.dialogUpgrade = false;
          console.log("账号升级", res);
          if (res.code == 200) {
            this.getQuerySubAccount();
            this.$message({
              message: "账号升级成功",
              type: "success"
            });
          } else {
            this.$message.error(res.message);
          }
        });
    },
    //关闭下拉弹窗
    closeSelect(done) {
      this.dialogXuqi = false;
      this.Timevalue = "";
      // done();
    },
    //关闭升级
    closeShenji(done) {
      this.dialogUpgrade = false;
      this.upgrade = "";
      // done();
    },
    //关闭配置弹窗
    closePezhi() {
      this.dialogUpgrade = false;
      this.dialogFunction = false;
      this.dialogZhanghao = false;
      this.checkboxList = "";
      (this.checkboxList = []), (this.functionNameList = []);
    },
    //查看详情
    handleClick(id) {
      this.$router.push({ name: "Detail", query: { id: id } });
    },
    //按钮开关
    switchChange(e, id) {
      this.$store
        .dispatch("updateStatus", { accountStatus: e, id: id })
        .then(res => {
          // self.loading = false;
          console.log("按钮开关", res);
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
          } else {
            this.$message.error(res.message);
          }
        });
    }
  }
};
</script>

<style lang="scss">
.shureOpen {
  padding: 12px 0 !important;
  width: 135px;
  text-align: center;
}
.smallFunction {
  font-size: 14px;
  font-weight: 400;
  color: rgba(155, 155, 155, 1);
  line-height: 25px;
  text-align: center;
  padding-top: 5px;
}
.color-2 {
  color: #f42c21;
  padding-right: 11px;
}
.el-col-2 {
  width: 150px;
}
.el-col-3 {
  width: 250px;
}
.dialogBOx {
  width: 100%;
  overflow: hidden;
  margin: 20px 0 45px 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  position: relative;
}
.midLine {
  width: 1px;
  height: 100%;
  background: #e6e6e6;
  position: absolute;
  left: 50%;
  top: 0;
}
.dialogLeftBOx {
  width: 45%;
  // border-right: 1px solid rgba(230, 230, 230, 1);
  flex: 0 0 45%;
}
.dialogLeftBOx .el-checkbox__input.is-checked + .el-checkbox__label {
  color: rgba(74, 74, 74, 1);
}
.dialogLeftBOx .el-checkbox__inner:hover {
  border-color: #00b4b9;
}
.dialogLeftBOx .el-checkbox__input.is-checked .el-checkbox__inner,
.dialogLeftBOx .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #00b4b9;
  border-color: #00b4b9;
}
.dialogLeftBOx .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #e6e6e6;
  border-color: #e6e6e6;
}
.dialogLeftBOx
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: #fff;
}
.dialogLeftBOx .el-checkbox__input.is-disabled + span.el-checkbox__label {
  font-size: 16px;
  font-weight: 600;
  color: rgba(74, 74, 74, 1);
  line-height: 22px;
}
.dialogLeftBOx .el-checkbox__label {
  padding-left: 14px;
}
.dialogRightBOx {
  width: 45%;
  // float: left;
}
.dialogRightBOx dl {
  padding-left: 20px;
}
.dialogBOx dl dd {
  padding: 0 0 5px 28px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  line-height: 20px;
}
.dialogBOx dl dt {
  padding: 0 0 5px 0;
  font-size: 16px;
  font-weight: 600;
  color: rgba(74, 74, 74, 1);
}
.dialogBOxB dl dt .el-checkbox__label {
  font-size: 16px;
  font-weight: 600;
  color: rgba(74, 74, 74, 1);
}
.dialogBOxB {
  margin-bottom: 0;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
}
.dialogBOxB dl {
  margin-bottom: 30px;
}
.color-1 {
  color: #27bdc1;
  margin-right: 5px;
}
.line {
  text-align: center;
}
.right_btn {
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 180, 185, 1);
  float: left;
  padding-right: 10px;
  cursor: pointer;
}
.peizhi {
  padding: 0 0 14px 0;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  margin-bottom: 40px;
  overflow: hidden;
  clear: both;
}
.el-alert--warning {
  margin: 10px 0 20px 0;
}
.demo-input-suffix {
  padding-top: 10px;
}
.el-alert__title {
  font-size: 12px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.el-input-group {
  width: 65%;
  margin-right: 10px;
}
.demo-input-suffix {
  display: flex;
  // justify-content: space-around;
  align-items: center;
  // padding: 8px 0 20px 0;
}
.selectBox {
  width: 100%;
  padding: 15px 0 40px 0;
}
.selectBox .el-select {
  width: 100%;
}
.peizhi .lf {
  font-size: 14px;
  font-weight: 400;
  color: rgba(155, 155, 155, 1);
  float: left;
}
.peizhi .ri {
  font-size: 14px;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  float: right;
}
span.icon {
  font-size: 14px;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  padding-bottom: 5px;
}
div.icon {
  font-size: 14px;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  padding-top: 25px;
}
.table {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 26px;
  background-color: #ffffff;
}
.boxBtn {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
}
.boxBtn2 {
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
}

.boxBtn2 .el-radio-button .el-radio-button__inner {
  width: 102px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-shadow: none;
}
.boxBtn2 .el-radio-group {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.boxBtn2 .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: #fff;
  border-color: #00b4b9;
  color: #00b4b9;
}
.cancel {
  background: #ffffff !important;
  font-size: 14px;
  font-weight: 400;
  color: #00b4b9 !important;
  border: 1px solid #00b4b9 !important;
}
.cancel:hover {
  background-color: #00b4b9 !important;
  color: #fff !important;
}
.el-button {
  padding: 12px 40px;
}
.boxBtn .el-button {
  background: #ffffff !important;
  padding: 12px 30px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(74, 74, 74, 1) !important;
  border: 1px solid rgba(230, 230, 230, 1) !important;
}
.boxBtn .active {
  border: 1px solid rgba(39, 189, 193, 1) !important;
  color: #27bdc1 !important;
}
.boxBtn .el-button:focus,
.boxBtn .el-button:hover {
  background-color: #fff !important;
  border: 1px solid rgba(39, 189, 193, 1) !important;
  color: #27bdc1 !important;
}
.table:after {
  content: "";
  width: 0;
  height: 0;
  clear: both;
  display: block;
  visibility: hidden;
}

.Jstate span {
  display: inline-block;
  height: 6px;
  width: 6px;
  margin-right: 10px;
  border-radius: 100%;
  background-color: rgba(26, 169, 123, 1);
  vertical-align: middle;
}

.Jstate-f span {
  background: rgba(155, 155, 155, 1);
}

.Jstate {
  text-align: left;
  position: relative;
  padding-left: 0;
}
.el-switch__core:after {
  background-color: rgba(151, 151, 151, 1);
}
.el-switch__core {
  border: 1px solid rgba(39, 189, 193, 0.15);
}
.el-switch.is-checked .el-switch__core::after {
  background-color: rgba(39, 189, 193, 1);
}
.el-dialog__footer {
  padding: 10px 20px !important;
  background: rgba(250, 250, 250, 1);
}
</style>