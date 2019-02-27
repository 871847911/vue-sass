<template>
  <div class="app-container">
    <tit></tit>
    <div class="dis-flex mb-30">
      <el-row :gutter="20" class="flex-1">
        <el-col :span="6">
          <el-input v-model="code" placeholder="手机号" class="mr-10"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="success" class="theme-bg-color theme-bd-color" @click="searchChannel">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" class="theme-bg-color theme-bd-color" @click="addCourseCatalog">
        添加渠道</el-button>
    </div>
    <div class="table">
      <div class="dis-flex justify-b dis-flex-ac hd">
        <el-radio-group v-model="channelType" style="margin-bottom: 30px;" @change='tabClick'>
          <el-radio-button label="1">机构</el-radio-button>
          <el-radio-button label="2">个人</el-radio-button>
        </el-radio-group>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="提交时间">
          <template slot-scope="scope">
            {{scope.row.createDate}}
          </template>
        </el-table-column>
        <el-table-column label="联系状态">
          <template slot-scope="scope">
            <span class="up up1" v-if="!scope.row.isContact">未联系</span>
            <span class="up up2" v-else>已联系</span>
          </template>
        </el-table-column>
        <el-table-column label="公司名称" v-if="channelType==1">
          <template slot-scope="scope">
            {{scope.row.company}}
          </template>
        </el-table-column>
        <el-table-column label="联系人">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="联系方式">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <ul class="btns dis-flex">
              <li class="btn flex-1 btn-1">
                <span @click="showChannel(scope.row)">查看</span>
              </li>
              <li class="btn flex-1 btn-3">
                <span @click="editRemark(scope.row)">备注</span>
              </li>
              <li class="btn flex-1 btn-2">
                <span @click="createChannelT(scope.row)" v-if="!scope.row.isContact"></span>
              </li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
        layout="prev, pager, next,sizes,jumper" :total="total" background>
      </el-pagination>
    </div>
    <el-dialog :title="dialog.label" :visible.sync="dialogFormVisible" width="30%" v-if="dialog.data">
      <p class="dis-flex  dis-flex-ac">
        <label class="mr-10">提交时间 : </label>
        <span>{{dialog.data.createDate}}</span>
      </p>
      <p class="dis-flex  dis-flex-ac">
        <label class="mr-10">状态 : </label>
        <span>{{dialog.data.isContact?'未联系':'已联系'}}</span>
      </p>
      <p class="dis-flex  dis-flex-ac">
        <label class="mr-10">联系人 : </label>
        <span>{{dialog.data.name}}</span>
      </p>
      <p class="dis-flex  dis-flex-ac">
        <label class="mr-10">联系方式 : </label>
        <span>{{dialog.data.phone}}</span>
      </p>
      <!-- <p class="dis-flex  dis-flex-ac" v-if="channelType == 2">
        <label class="mr-10">qq : </label>
        <span>{{dialog.data.qq}}</span>
      </p> -->
      <!-- <p class="dis-flex  dis-flex-ac">
        <label class="mr-10">邮箱 : </label>
        <span>{{dialog.data.mail}}</span>
      </p> -->
      <p class="dis-flex  dis-flex-ac">
        <label class="mr-10">所在行业 : </label>
        <span>{{dialog.data.industry}}</span>
      </p>
      <p class="dis-flex  dis-flex-ac" v-if="channelType == 1">
        <label class="mr-10">公司名称 : </label>
        <span>{{dialog.data.company}}</span>
      </p>
      <!-- <p class="dis-flex  dis-flex-ac">
        <label class="mr-10">所在地区 : </label>
        <span>{{dialog.data.province}}{{dialog.data.city}}{{dialog.data.district}}</span>
      </p> -->
      <p class="dis-flex  dis-flex-ac">
        <label class="mr-10">联系地址 : </label>
        <span>{{dialog.data.address}}</span>
      </p>
      <!-- <p class="dis-flex  dis-flex-ac">
        <label class="mr-10">备注详情 : </label>
        <span>{{dialog.data.remark}}</span>
      </p> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑备注" :visible.sync="dialogVisible2">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dialog2.remark">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="editRemark(1)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import tit from "@/components/Htitle";
  import upload from "@/components/Upload3";
  export default {
    methods: {},
    components: {
      tit,
      upload
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
        dialogFormVisible: false,
        dialogVisible2: false,
        formLabelWidth: "80px",
        form: {
          //添加上传
          name: "",
          catalogUrl: ""
        },
        handleClickObject: "",
        channelType: "1",
        dialog: {
          label: '',
          data: null
        },
        dialog2: {
          label: '',
          data: null,
          remark: ''
        }
      };
    },
    created() {
      this.getCatalogPage(1);
    },
    methods: {
      tabClick() {
        this.getCatalogPage(1);
      },
      getCatalogPage(page, pageSize) {
        let self = this;
        if (self.loading) {
          return this.$message({
            message: "正在查询中,请勿重复点击查询",
            type: "error"
          });
        }
        let data = {
          phone: self.code,
          type: self.channelType,
          page: page || self.page,
          pageSize: pageSize || self.pageSize
        };
        self.loading = true;
        this.$store
          .dispatch("searchChannel", data)
          .then(res => {
            self.loading = false;
            if (res.success) {
              self.total = res.pageInfo.total;
              self.pageSize = res.pageInfo.pageSize;
              self.tableData = res.pageInfo.list;
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          })
          .catch(res => {
            self.loading = false;
          });
      },
      searchChannel() {
        if (this.code&&!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.code)) {
          return this.$message({
            type: "error",
            message: "请输入正确手机号"
          });
        }
        this.getCatalogPage(1);
      },
      addCourseCatalog(type) {
        this.$router.push({ name: "EditChannel" });
      },
      handleClickSure() {
        let self = this;
        self.dialogFormVisible2 = false;
        this.$store
          .dispatch("modifyCourseCatalog", this.handleClickObject)
          .then(res => {
            if (!res.success) {
              this.$message({
                type: "error",
                message: res.message
              });
            } else {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.getCatalogPage(1);
            }
          });
      },
      editRemark(obj) {
        let self = this
        if (typeof obj == 'object') {
          self.dialogVisible2 = true
          self.dialog2.data = obj
          self.dialog2.remark = obj.remark
        } else {
          self.dialogVisible2 = false
          this.$store
            .dispatch("createChannelT", { id: self.dialog2.data.id, remark: self.dialog2.remark })
            .then(res => {
              if (!res.success) {
                this.$message({
                  type: "error",
                  message: res.message
                });
              } else {
                this.$message({
                  type: "success",
                  message: "操作成功"
                });
                this.getCatalogPage();
              }
            });
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        let self = this;
        self.tableData = null;
        self.page = val;
        self.getCatalogPage(1, val);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let self = this;
        self.tableData = null;
        self.page = val;
        self.getCatalogPage(val);
      },
      currentPage(val) {
        console.log(val, 99999999);
      },
      showChannel(obj) {
        this.dialog.label = this.channelType == 1 ? '机构详情' : '个人详情';
        this.dialog.data = obj;
        this.dialogFormVisible = true;
      },
      createChannelT(obj) {
        let self = this;
        this.$store
          .dispatch("createChannelT", { id: id,remark:obj.remark})
          .then(res => {
            if (!res.success) {
              this.$message({
                type: "error",
                message: res.message
              });
            } else {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.getCatalogPage(1);
            }
          });
      }
    }
  };
</script>
<style scoped lang="scss">
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
    margin: auto;
    background: #e0e0e0;
    overflow: hidden;
  }

  .hd {
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    margin-bottom: 20px;
  }

  .up:before {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    content: "";
    width: 6px;
    height: 6px;
    background: rgba(155, 155, 155, 1);
    border-radius: 100%;
  }

  .up2:before {
    background: rgba(39, 189, 193, 1);
  }

  p {
    padding: 18px 0;
  }
</style>