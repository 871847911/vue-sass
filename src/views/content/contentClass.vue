<template>
  <div class="app-container">
    <tit :showBack="backBtn"></tit>
    <div class="main_box">
      <div class="components_box">
        <div class="btn_right">
          <el-button type="primary" class="theme-bg-color theme-bd-color" @click="addCatalog()">
            {{activeName == "first"?"添加一级分类":"添加二级分类"}}
          </el-button>
        </div>

        <el-tabs v-model="activeName" @tab-click="handleClick" class="hz_ele_tabs">
          <el-tab-pane label="一级分类" name="first">
            <div class="table_box hz_el_table">
              <div class="list">
                <div class="list_data">
                  <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
                    <el-table-column label="分类图标" align="center">
                      <template slot-scope="scope">
                        <div class="scope-icon">
                          <img :src="scope.row.img" alt>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="一级分类名称" align="center">
                      <template slot-scope="scope">{{scope.row.oneTitle}}</template>
                    </el-table-column>
                    <el-table-column label="包含二级分类" align="center">
                      <template slot-scope="scope">{{scope.row.oneTitle}}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button
                          @click="editEvent(scope.row)"
                          type="text"
                          size="small"
                          class="preview el-button--text-preview"
                        >编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="二级分类" name="second">
            <div class="table_box hz_el_table">
              <div class="list">
                <div class="list_data">
                  <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
                    <el-table-column label="二级分类名称" align="center">
                      <template slot-scope="scope">{{scope.row.oneTitle}}</template>
                    </el-table-column>
                    <el-table-column label="所属一级分类" align="center">
                      <template slot-scope="scope">{{scope.row.oneTitle}}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button
                          @click="editEvent(scope.row)"
                          type="text"
                          size="small"
                          class="preview el-button--text-preview"
                        >编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-tab-pane>

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
    <el-dialog title="添加一级分类" :visible.sync="dialogFirst" width="30%">
      <el-form :model="formOne">
        <el-form-item label="分类图片" :label-width="formLabelWidth">
          <upload :img.sync="formOne.catalogUrl" :resDomain="roles.resDomain"></upload>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="formOne.name" auto-complete="off" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFirst = false">取 消</el-button>
        <el-button type="primary" @click="confirmEvent()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加二级分类" :visible.sync="dialogSecond" width="30%">
      <el-form :model="formTwo">
        <el-form-item label="所属一级分类" :label-width="formLabelWidth">
          <el-input v-model="formTwo.one_name" auto-complete="off" placeholder="请选择"></el-input>
        </el-form-item>

        <el-form-item label="二级分类名称" :label-width="formLabelWidth">
          <el-input v-model="formTwo.two_name" auto-complete="off" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSecond = false">取 消</el-button>
        <el-button type="primary" @click="confirmEvent()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tit from "@/components/Htitle";
import { mapGetters } from "vuex";
import upload from "@/components/Upload6";
export default {
  name: "contentClass",
  data() {
    return {
      msg: "内容分类",
      backBtn: false,
      activeName: "first",
      loading: false,
      tableData: [
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称1",
          twoTitle: "二级分类名称1"
        },
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称2",
          twoTitle: "二级分类名称2"
        },
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称3",
          twoTitle: "二级分类名称3"
        },
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称4",
          twoTitle: "二级分类名称4"
        },
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称5",
          twoTitle: "二级分类名称5"
        },
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称6",
          twoTitle: "二级分类名称6"
        },
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称7",
          twoTitle: "二级分类名称7"
        },
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称8",
          twoTitle: "二级分类名称8"
        },
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称9",
          twoTitle: "二级分类名称9"
        },
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称10",
          twoTitle: "二级分类名称10"
        },
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称11",
          twoTitle: "二级分类名称11"
        },
        {
          img: "../../../static/images/logo_2.png",
          oneTitle: "一级分类名称12",
          twoTitle: "二级分类名称12"
        }
      ],
      currentPage:1,
      pageSize: 10, //公共页面默认显示条数
      total: 50, //公共页面总数
      dialogFirst: false,
      dialogSecond: false,
      formLabelWidth: "80px",
      formOne: {
        //添加一级分类
        name: "",
        catalogUrl: ""
      },
      formTwo: {
        //添加二级分类
        one_name: "",
        two_name: ""
      }
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
    init() {
      console.log("数据初始化 请求列表接口==>");
    },
    editEvent(val) {
      console.log("编辑按钮传入值==>", val);
      if (this.activeName == "first") {
        console.log("在一级分类", this.activeName);
      } else {
        console.log("在二级分类", this.activeName);
      }
    },
    addCatalog() {
      if (this.activeName == "first") {
        console.log("添加一级分级==>");
        this.dialogFirst = true;
      } else {
        console.log("添加二级分级==>");
        this.dialogSecond = true;
      }
    },
    confirmEvent() {
      console.log("确认按钮==>", this.activeName);
      if (this.activeName == "first") {
        // 1.分类图片 2.分类名称
      } else {
        // 1.所属一级分类 2.二级分类名称
      }
    },
    handleClick(tab, event) {
      console.log("切换列表", this.activeName);
    },
    handleSizeChange(val) {
      console.log(`组件内部、每页显示 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`组件内部 分页页面跳转时间、当前页: ${val}`);
    }
  },
  watch: {
    activeName(n,o){
      this.currentPage = 1
    }
  },
  created() {},
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
</style>