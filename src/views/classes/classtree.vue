<template>
  <div class="app-container">
    <tit></tit>
    <div class="dis-flex mb-30">
      <el-row :gutter="20" class="flex-1">
        <el-col :span="3">
          <el-input v-model="code" placeholder="分类编号" class="mr-10"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="name" placeholder="分类名称" class="mr-10"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="success" class="theme-bg-color theme-bd-color" @click="getCatalogPage(page)">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" class="theme-bg-color theme-bd-color" @click="addCourseCatalog(0)">
        <i class="el-icon-plus el-icon--right mr-10"></i>添加分类</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="分类编号">
          <template slot-scope="scope">
            {{scope.row.number}}
          </template>
        </el-table-column>
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="分类图标">
          <template slot-scope="scope">
            <div class="scope-icon">
              <img :src="scope.row.qiniuDomain + scope.row.catalogUrl" width="100%" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" class="preview el-button--text-preview">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize" layout="prev, pager, next,sizes,jumper" :total="total" background>
      </el-pagination>
    </div>
    <el-dialog title="分类名称" :visible.sync="dialogFormVisible" width="30%" v-if="form">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <upload :img.sync="form.catalogUrl" :resDomain='roles.resDomain'></upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourseCatalog(1)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分类名称" :visible.sync="dialogFormVisible2" width="30%" v-if="handleClickObject">
      <el-form :model="handleClickObject">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="handleClickObject.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <upload :img.sync="handleClickObject.catalogUrl" :resDomain='roles.resDomain'></upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="handleClickSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import tit from '@/components/Htitle'
  import upload from '@/components/Upload6'
  export default {
    methods: {

    },
    components: {
      tit,
      upload
    },
    computed: {
      ...mapGetters(["roles"])
    },
    data() {
      return {
        code: '',//课程编号
        page: 1,
        tableData: null,
        total: null,
        pageSize: 10,
        name: '', //课程名称
        loading: false,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        formLabelWidth: '80px',
        form: { //添加上传
          name: '',
          catalogUrl: ''
        },
        handleClickObject: {},
      }
    },
    created() {
      this.getCatalogPage(1)
    },
    methods: {
      getCatalogPage(page = 1, pageSize) {
        let self = this
        if (self.loading) {
          return this.$message({
            message: '正在查询中,请勿重复点击查询',
            type: 'error'
          })
        }
        let data = {
          code: self.code,
          name: self.name,
          page: page || self.page,
          pageSize: pageSize || self.pageSize
        }
        self.loading = true
        this.$store.dispatch('queryCourseCatalogPage', data).then(res => {
          self.loading = false
          if (res.success) {
            self.total = res.pageInfo.total
            self.page = res.pageInfo.page
            self.pageSize = res.pageInfo.pageSize
            self.tableData = res.pageInfo.list
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        })
      },
      addCourseCatalog(type) {
        if (!type) {
          this.dialogFormVisible = true
        } else {
          if (!this.form.name) {
            return this.$message({
              type: 'warning',
              message: '请输入分类名称'
            });
          }
          if (!this.form.catalogUrl) {
            return this.$message({
              type: 'warning',
              message: '请上传分类图标'
            });
          }
          let data = {
            name: this.form.name,
            catalogUrl: this.form.catalogUrl.replace(/\?temp_vd/g, '')
          }
          this.$store.dispatch('createCourseCatalog', data).then(res => {
            if (!res.success) {
              this.$message({
                type: 'error',
                message: res.message
              });
            } else {
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              this.dialogFormVisible = false
              this.getCatalogPage(1)
            }
          })
        }
      },
      handleClickSure() {
        let self = this
        self.dialogFormVisible2 = false
        let data = {
          id:this.handleClickObject.id,
          name: this.handleClickObject.name,
          catalogUrl: this.handleClickObject.catalogUrl.replace(/\?temp_vd/g, '')
        }
        this.$store.dispatch('modifyCourseCatalog',data).then(res => {
          if (!res.success) {
            this.$message({
              type: 'error',
              message: res.message
            });
          } else {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.getCatalogPage(1)
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        let self = this;
        self.tableData = null;
        self.getCatalogPage(1, val)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let self = this;
        self.tableData = null;
        self.getCatalogPage(val)
      },
      currentPage(val) {
        console.log(val, 99999999)
      },
      handleClick(val) {
        this.dialogFormVisible2 = true
        this.handleClickObject = val
      }
    }
  }
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
    content: '';
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