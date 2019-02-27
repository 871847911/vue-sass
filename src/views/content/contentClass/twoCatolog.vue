<template>
  <div class="app-container">
    <tit :showBack="backBtn"></tit>
    <div class="main_box">
      <div class="components_box">
        <div class="btn_right">
          <el-button
            type="primary"
            class="theme-bg-color theme-bd-color"
            @click="addCatalog()"
          >添加二级分类</el-button>
        </div>

        <el-tabs v-model="activeName" @tab-click="handleClick" class="hz_ele_tabs">
          <el-tab-pane label="一级分类" name="first"></el-tab-pane>
          <el-tab-pane label="二级分类" name="second"></el-tab-pane>

          <div class="table_box hz_el_table">
            <div class="list">
              <div class="list_data">
                <el-table :data="tableData" stripe style="width: 100%">
                  <el-table-column label="二级分类名称" align="center"  min-width="150">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                  </el-table-column>
                  <el-table-column label="所属一级分类" align="center"  min-width="150">
                    <template slot-scope="scope">{{scope.row.categoryName ?scope.row.categoryName:"null"}}</template>
                  </el-table-column>
                  <el-table-column label="操作" align="center"  min-width="150">
                    <template slot-scope="scope">
                      <!-- <el-button
                        @click="editEvent(scope.row)"
                        type="text"
                        size="small"
                        class="preview el-button--text-preview"
                      >编辑</el-button> -->

                      <div class="btn_box">
                        <span @click="editEvent(scope.row)">编辑</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="pagination">
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
        </el-tabs>
      </div>
    </div>

    <!-- 添加二级分类 弹出层 -->
    <div class="hz_el_dialog">
      <el-dialog title="添加二级分类" :visible.sync="dialogState" width="30%">
        <el-form :model="formData" class="dialog_body">
          <el-form-item>
            <div class="dialog_title">所属一级分类</div>
            <el-select v-model="formData.one_name" placeholder="请选择" :disabled="selectState">
              <el-option
                v-for="item in optionsData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <div class="dialog_title">二级分类名称</div>
            <el-input v-model="formData.two_name" auto-complete="off" placeholder="请输入分类名称" maxlength=15></el-input>
          </el-form-item>
        </el-form>
        <div class="layout_flex flex_r btn_box dialog_btn">
          <span @click="dialogState = false">取消</span>
          <span @click="confirmEvent()">确定</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tit from "@/components/Htitle";
import { mapGetters } from "vuex";
import upload from "@/components/Upload6";
import api from "@/api/content";
export default {
  name: "contentClass",
  data() {
    return {
      msg: "内容分类",
      backBtn: false,
      activeName: "second",
      tableData: [], //列表数据
      currentPage: 1,
      pageSize: 10, //公共页面默认显示条数
      total: null, //公共页面总数
      dialogState: false,
      formLabelWidth: "120px",
      formData: {
        //添加二级分类
        one_name: "",
        two_name: "",
        id: ""
      },
      optionsData: [], //一级分类下拉框数据
      selectState: false
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  components: {
    tit,
    upload
  },
  methods: {
    queryCourseCatalogPage() {
      //列表数据接口
      let that = this;
      let params = {
        catalogType: 4,
        // code: "",
        // name: "",
        page: that.currentPage,
        pageSize: that.pageSize
      };
      api.queryCourseCatalogPage(params).then(res => {
        console.log("列表接口==>", res);
        that.tableData = res.pageInfo.list;
        that.total = res.pageInfo.total;
      });
    },
    getSaasCourseCatalog() {
      //添加二级分类 获取一级分类列表
      api.getSaasCourseCatalog({}).then(res => {
        console.log("获取一级分类列表数据=>", res.items);
        this.optionsData = res.items;
      });
    },
    editEvent(val) {
      //编辑弹出框
      console.log("编辑按钮传入值==>", val);
      this.dialogState = true;
      this.selectState = true;
      this.formData.one_name = val.categoryName;
      this.formData.two_name = val.name;
      this.formData.id = val.id;
    },
    modifyCourseCatalog() {
      //编辑二级分类
      console.log("编辑二级分类进入=>modifyCourseCatalog");
      let that = this;
      let params = {
        id: that.formData.id,
        name: that.formData.two_name,
        catalogUrl: null
      };
      api.modifyCourseCatalog(params).then(res => {
        console.log("二级分类编辑", res);
        that.dialogState = false;
        if (res.success) {
          that.$message({
            type: "success",
            message: "二级分类修改成功!"
          });
          that.queryCourseCatalogPage();
        } else {
          that.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    addCatalog() {
      //添加一级分类弹出框
      this.dialogState = true;
      this.selectState = false;
      this.formData.one_name = "";
      this.formData.two_name = "";
    },
    addCatalogEvent() {
      //添加二级分类接口
      let that = this;
      let params = {
        name: this.formData.two_name,
        catalogUrl: null,//必传
        catalogType: 4,
        parentId: this.formData.one_name
      };
      api.createCourseCatalog(params).then(res => {
        console.log("添加分类", res);
        if (res.success) {
          that.$message({
            type: "success",
            message: "二级分类添加成功!"
          });
          that.dialogState = false;
          that.queryCourseCatalogPage();
        } else {
          that.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    confirmEvent() {
      //弹出框确认
      if (this.formData.one_name == "") {
        this.$message({
          type: "error",
          message: "一级分类必填!"
        });
        return;
      }
      if (this.formData.two_name == "") {
        this.$message({
          type: "error",
          message: "二级分类名必填!"
        });
        return;
      }

      if (this.selectState) {
        this.modifyCourseCatalog();
      } else {
        this.addCatalogEvent();
      }
    },
    handleClick(tab, event) {
      //tabs切换
      console.log("切换列表", this.activeName);
      switch (this.activeName) {
        case "first":
          this.$router.push({ name: "oneCatolog" });
          break;
        case "second":
          this.$router.push({ name: "twoCatolog" });
        default:
          break;
      }
    },
    handleSizeChange(val) {
      console.log(`组件内部、每页显示 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.queryCourseCatalogPage();
    },
    handleCurrentChange(val) {
      console.log(`组件内部 分页页面跳转时间、当前页: ${val}`);
      this.currentPage = val;
      this.queryCourseCatalogPage();
    }
  },
  watch: {
    // activeName(n, o) {
    //   this.currentPage = 1;
    // }
  },
  created() {
    this.queryCourseCatalogPage();
    this.getSaasCourseCatalog();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.app-container {
  .main_box {
    .components_box {
      padding: 30px 20px;
      background: #ffffff;
      position: relative;
      .btn_right {
        position: absolute;
        right: 20px;
        top: 15px;
        z-index: 999;
      }
      .table_box {
        background: #ffffff;
        .list:after {
          content: "";
          clear: both;
          display: block;
          visibility: hidden;
        }
        .list {
          .list_data {
            //列表数据
            .scope-icon {
              img {
                width: 40px;
                height: 40px;
              }
            }
          }
        }
      }
    }
  }
}

.btn_box {
  span {
    cursor: pointer;
    color: #00b4b9;
    margin-right: 20px;
    &:nth-last-child(1) {
      margin: 0;
    }
  }
}

.dialog_btn {
  background: #fafafa;
  padding: 15px 30px;
  span {
    padding: 0 40px;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    border-radius: 4px;
    &:nth-child(1) {
      background: #ffffff;
      border: 1px solid #00b4b9;
    }
    &:nth-last-child(1) {
      background: #00b4b9;
      color: #ffffff;
    }
  }
}

.layout_flex {
  display: flex;
}
.flex_r {
  justify-content: flex-end;
}
.dialog_body {
  padding: 0 30px 30px;
  .dialog_title{
    font-size: 14px;
    color:#4A4A4A;
    padding-bottom:5px;
  }
  .el-select,.el-input{
    width:100%;
  }
}
</style>