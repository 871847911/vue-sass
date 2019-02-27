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
          >添加一级分类</el-button>
        </div>

        <el-tabs v-model="activeName" @tab-click="handleClick" class="hz_ele_tabs">
          <el-tab-pane label="一级分类" name="first"></el-tab-pane>

          <el-tab-pane label="二级分类" name="second"></el-tab-pane>

          <div class="table_box hz_el_table">
            <div class="list">
              <div class="list_data">
                <el-table :data="tableData" stripe style="width: 100%">
                  <el-table-column label="分类图标" align="center" min-width="150">
                    <template slot-scope="scope">
                      <div class="scope-icon">
                        <!-- <img :src="scope.row.catalogUrl.indexOf('resource') != -1?roles.tempDomain + 'temp' + scope.row.catalogUrl.slice(8):roles.tempDomain + scope.row.catalogUrl" alt> -->
                        <img :src="roles.resDomain + scope.row.catalogUrl" alt="">
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="一级分类名称" align="center" min-width="150">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                  </el-table-column>
                  <el-table-column label="包含二级分类" align="center" min-width="150">
                    <template slot-scope="scope">{{scope.row.classificationSize}}</template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" min-width="150">
                    <template slot-scope="scope">
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

    <!-- 添加分类弹出层 -->
    <div class="hz_el_dialog">
      <el-dialog title="添加一级分类" :visible.sync="dialogState" width="30%">
          <div class="dialog_body">
            <div class="dialog_item">
              <div class="label_item">分类图片</div>
              <upload :img.sync="imgUpload" :resDomain="roles.resDomain"></upload>
            </div>
            <div class="dialog_item">
              <div class="label_item">分类名称</div>
              <el-input v-model="formData.name" auto-complete="off" placeholder="请输入分类名称" maxlength=15></el-input>
            </div>
          </div>
        <!-- </el-form> -->
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
      activeName: "first",
      tableData: [],
      currentPage: 1,
      pageSize: 10, //公共页面默认显示条数
      total: null, 
      dialogState: false,//弹出框控制
      formData: {
        //添加一级分类
        id: "",
        name: "",
        catalogUrl: ""
      },
      confirmType: true, //true 添加 false 编辑
      imgUpload: "" //获取的图片路径
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
        catalogType: 2, //一级2 二级4
        page: that.currentPage,
        pageSize: that.pageSize
      };
      api.queryCourseCatalogPage(params).then(res => {
        console.log("一级分类列表", res);
        that.tableData = res.pageInfo.list;
        that.total = res.pageInfo.total;
      });
    },
    addCatalogEvent() {
      //添加分类接口
      let that = this;
      let params = {
        name: this.formData.name, //一级分类名称
        catalogUrl: this.formData.catalogUrl, //一级分类图片
        catalogType: 2,
        parentId: null //查询一级分类列表参数 //必传
      };
      api.createCourseCatalog(params).then(res => {
        console.log("添加分类", res);
        if (res.success) {
          that.$message({
            type: "success",
            message: "一级分类添加成功!"
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
    modifyCourseCatalog() {
      //编辑分类接口
      let that = this;
      let params = that.formData;
      api.modifyCourseCatalog(params).then(res => {
        console.log("编辑接口", res);
        if (res.success) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          that.dialogState = false;
          that.queryCourseCatalogPage();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    editEvent(val) {
      //编辑 调用弹窗
      console.log("编辑按钮传入值==>", this.formData);
      this.confirmType = false;
      this.dialogState = true;
      this.formData.id = val.id;
      this.formData.name = val.name;
      this.formData.catalogUrl = val.catalogUrl;
      this.imgUpload = val.catalogUrl;
      // if(val.catalogUrl.indexOf('resource') != -1){
      //   // resource/image/png/2058/15459827514171545982585206.png   后端返回resource永久图片存储改为temp临时存储
      //   this.imgUpload = 'temp' + val.catalogUrl.slice(8)
      // }else{
      //   this.imgUpload = val.catalogUrl;
      // }
      
    },
    addCatalog() {
      //添加 调用弹窗
      this.confirmType = true;
      this.dialogState = true;
      this.imgUpload = "";
      this.formData.name = "";
    },
    confirmEvent() {
      //确认 请求函数
      if (this.formData.name == "") {
        this.$message({
          type: "error",
          message: "分类名称必填!"
        });
        return;
      }
      if (this.imgUpload == "") {
        this.$message({
          type: "error",
          message: "分类图片必传!"
        });
        return;
      } else {
        console.log("into====>", this.imgUpload);
        this.formData.catalogUrl = this.imgUpload.split("?")[0];
      }
      if (this.confirmType) {
        this.addCatalogEvent();
      } else {
        this.modifyCourseCatalog();
      }
    },
    handleClick(tab, event) {
      // console.log("切换列表", this.activeName);
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
      // console.log(`组件内部、每页显示 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.queryCourseCatalogPage();
    },
    handleCurrentChange(val) {
      // console.log(`组件内部 分页页面跳转时间、当前页: ${val}`);
      this.currentPage = val;
      this.queryCourseCatalogPage();
    }
  },
  created() {
    this.queryCourseCatalogPage();
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
.dialog_body{
  padding:0 30px 30px;
  font-size:14px;
  .dialog_item{
    .label_item{
      color:#4A4A4A;
      padding-bottom:5px;
    }
  }
}
</style>