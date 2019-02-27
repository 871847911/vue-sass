<template>
  <div class="app-container">
    <tit></tit>
    <div class="dis-flex mb-30">
      <el-row :gutter="20" class="flex-1">
        <el-col :span="6">
          <el-input v-model="code" placeholder="标题" class="mr-10"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="success" class="theme-bg-color theme-bd-color" @click="getCatalogPage(page)">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" class="theme-bg-color theme-bd-color" @click="addCourseCatalog(0)">
        添加图文</el-button>
    </div>
    <div class="table">
      <div class="dis-flex justify-b dis-flex-ac hd">
        <el-radio-group v-model="graphicType" style="margin-bottom: 30px;" @change='tabClick'>
          <el-radio-button label="1">课程</el-radio-button>
          <el-radio-button label="2">专栏</el-radio-button>
          <el-radio-button label="3">产品更新</el-radio-button>
          <el-radio-button label="4">使用教程</el-radio-button>
          <el-radio-button label="5">学兽动态</el-radio-button>
          <el-radio-button label="6">学兽观点</el-radio-button>
          <el-radio-button label="7">新闻报道</el-radio-button>
        </el-radio-group>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="主标题">
          <template slot-scope="scope">
            {{scope.row.title||'/'}}
          </template>
        </el-table-column>
        <el-table-column label="副标题" v-if="graphicType==1||graphicType==2">
          <template slot-scope="scope">
            {{scope.row.subTitle||'/'}}
          </template>
        </el-table-column>
        <el-table-column label="上架时间" v-else>
          <template slot-scope="scope">
            {{scope.row.upDate||'/'}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span class="up up1" v-if="!scope.row.isUp">未上架</span>
            <span class="up up2" v-else>已上架</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <ul class="btns dis-flex">
              <li class="btn flex-1 btn-4" v-if="scope.row.isUp">
                <span @click="operation(scope.row.id,0)">下架</span>
              </li>
              <li class="btn flex-1 btn-5" v-else>
                <span @click="operation(scope.row.id,1)">上架</span>
              </li>
              <li class="btn flex-1 btn-1">
                <span @click="handleTpye(scope.row.id,1)">查看</span>
              </li>
              <li class="btn flex-1 btn-2">
                <span v-if="!scope.row.isUp" @click="handleTpye(scope.row.id,2)">编辑</span>
              </li>
              <li class="btn flex-1 btn-3" @click="handleTpye(scope.row.id,3)">删除</li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
        layout="prev, pager, next,sizes,jumper" :total="total" background>
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import tit from "@/components/Htitle";
  import upload from "@/components/Upload3";
  export default {
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
        dialogFormVisible2: false,
        formLabelWidth: "80px",
        form: {
          //添加上传
          name: "",
          catalogUrl: ""
        },
        handleClickObject: "",
        graphicType: 1
      };
    },
    created() {
      let self = this
      if(self.$route.query.graphicType){
        self.graphicType = self.$route.query.graphicType
      }
      this.getCatalogPage(1);
    },
    methods: {
      tabClick(e) {
        this.getCatalogPage(1);
      },
      renderHeader(h, col) {
        console.log(col)
        // return h('span',
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
          title: self.code,
          type: Number(self.graphicType),
          page: page || self.page,
          pageSize: pageSize || self.pageSize
        };
        self.loading = true;
        this.$store.dispatch("searchByPageGraphic", data).then(res => {
          console.log(res.pageInfo)
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
        });
      },
      addCourseCatalog(type) {
        this.$router.push({ name: 'EditGraphic' ,query:{graphicType:this.graphicType}})
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
        self.page = val
        self.tableData = null;
        self.getCatalogPage(val);
      },
      currentPage(val) {
        console.log(val, 99999999);
      },
      handleClick(val) {
        this.dialogFormVisible2 = true;
        this.handleClickObject = val;
      },
      handleTpye(id, type) {
        let self = this
        // console.log(self.page)
        // return
        if (type == 1) { //查看
          this.$router.push({ name: 'ShowGraphic', query: { id: id } })
        } else if (type == 2) {//编辑
          this.$router.push({ name: 'EditGraphic', query: { id: id } })
        } else { //删除
          this.$store.dispatch(`deleteGraphic`, { id: id }).then(res => {
            if (!res.success) {
              this.$message({
                type: "error",
                message: res.message
              });
            } else {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getCatalogPage(self.page);
            }
          })
        }
      },
      operation(id, type) {
        //0下架，1上架
        let action, txt;
        if (type) {
          action = "upGraphic";
          txt = "上架成功";
        } else {
          action = "downGraphic";
          txt = "下架成功";
        }
        this.$store.dispatch(`${action}`, { id: id }).then(res => {
          if (!res.success) {
            this.$message({
              type: "error",
              message: res.message
            });
          } else {
            this.$message({
              type: "success",
              message: txt
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

  .hd {
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    margin-bottom: 20px;
  }
</style>