<template>
  <div class="app-container">
    <tit></tit>
    <div class="dis-flex mb-30">
      <el-row :gutter="20" class="flex-1">
        <el-col :span="6">
          <el-input v-model="code" placeholder="姓名" class="mr-10"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="success" @click="getCatalogPage(page)">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" class="theme-bg-color theme-bd-color" @click="addCourseCatalog(0)">
        <!-- <i class="el-icon-plus el-icon--right mr-10"></i>-->添加大咖</el-button> 
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="姓名" >
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="职业" >
          <template slot-scope="scope">
            {{scope.row.job}}
          </template>
        </el-table-column>
        <el-table-column label="个人简介" >
          <template slot-scope="scope">
            {{scope.row.introduce}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <ul class="btns dis-flex">
              <li class="btn flex-1 btn-1" @click="goRouter('showcelebrity',scope.row.id)">查看</li>
              <li class="btn flex-1 btn-2" @click="goRouter('editcelebrity',scope.row.id)">编辑</li>
              <li class="btn flex-1 btn-3" @click="deleteAuthor(scope.row.id)">删除</li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
        layout="prev, pager, next,sizes,jumper" :total="total" background>
      </el-pagination>
    </div>
    <el-dialog title="分类名称" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <upload :form.sync="form"></upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourseCatalog(1)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分类名称" :visible.sync="dialogFormVisible2" width="30%">
      <el-form :model="handleClickObject">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="handleClickObject.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <upload :form.sync="handleClickObject"></upload>
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
  import tit from '@/components/Htitle'
  import upload from '@/components/Upload3'
  export default {
    methods: {

    },
    components: {
      tit,
      upload
    },
    data() {
      return {
        code: '',//课程编号
        page: 1,
        tableData: null,
        total: null,
        pageSize: 10,
        loading: false,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        formLabelWidth: '80px',
        form: { //添加上传
          name: '',
          catalogUrl: ''
        },
        handleClickObject: '',
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
          name: self.code,
          page: page || self.page,
          pageSize: pageSize || self.pageSize
        }
        self.loading = true
        this.$store.dispatch('searchByPage', data).then(res => {
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
          this.$router.push({name:'Editcelebrity'})
        } else {
          this.$store.dispatch('createCourseCatalog', this.form).then(res => {
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
        this.$store.dispatch('modifyCourseCatalog', this.handleClickObject).then(res => {
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
      },
      goRouter(dir, id) {
        this.$router.push({ 'path': `${dir}`, query: { id: id } })
      },
      deleteAuthor(id) {
        this.$confirm('确认删除？').then(() => {
          this.$store.dispatch('deleteAuthor', { id: id }).then(res => {
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
              this.getCatalogPage(this.page)
            }
          })
        }).catch(()=> { });
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
    margin: auto;
    background: #e0e0e0;
    overflow: hidden;
  }
</style>