<template>
  <div class="app-container">
    <tit></tit>
    <div class="dis-flex mb-30">
      <el-row :gutter="20" class="flex-1">
        <el-col :span="3">
          <el-input v-model="courseName" placeholder="课程名称" class="mr-10"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="storeName	" placeholder="店铺名称" class="mr-10"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="success" class="theme-bg-color theme-bd-color" @click="getCourseMainPage(page)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="课程编号">
          <template slot-scope="scope">
            {{scope.row.detail.courseNumber}}
          </template>
        </el-table-column>
        <el-table-column label="课程名称" width="240">
          <template slot-scope="scope">
            <div class="className dis-flex">
              <div class="className-l mr-10">
                <img :src="scope.row.resDomain+scope.row.coverList[0]" alt="" style="width:100%;height:100%;" v-if="scope.row.coverList.length"
                />
              </div>
              <div class="flex-1" style="overflow: hidden;">
                <div class="dis-flex className-r">
                  <p class="ellipsis">{{scope.row.name}}</p>
                  <span v-if="scope.row.detail.isModify">近期修改</span>
                  <div class="create-time">
                    <p class="mb-5">创建时间</p>
                    <p>{{scope.row.detail.createDate}}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="作者">
          <template slot-scope="scope">
            {{scope.row.detail.createUser}}
          </template>
        </el-table-column>
        <el-table-column label="所在店铺">
          <template slot-scope="scope">
            {{scope.row.detail.storeName}}
          </template>
        </el-table-column>
        <el-table-column label="上架时间">
          <template slot-scope="scope">
            {{scope.row.detail.onDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small" class="preview el-button--text-preview">查看</el-button>
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
  import tit from '@/components/Htitle'
  export default {
    methods: {

    },
    components: {
      tit
    },
    data() {
      return {
        courseName: '',//课程名称
        page: 1,
        tableData: null,
        total: null,
        pageSize: 10,
        storeName: '', //店铺名称
        loading: false
      }
    },
    created() {
      this.getCourseMainPage(1)
    },
    methods: {
      getCourseMainPage(page = 1, pageSize) {
        let self = this
        if (self.loading) {
          return this.$message({
            message: '正在查询中,请勿重复点击查询',
            type: 'error'
          })
        }
        let data = {
          courseName: self.courseName,
          storeName: self.storeName,
          page: page || self.page,
          pageSize: pageSize || self.pageSize
        }
        self.loading = true
        this.$store.dispatch('queryCourseMainPage', data).then(res => {
          self.loading = false
          console.log(res,9999)
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
        }).catch(res => {
          self.loading = false
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        let self = this;
        self.tableData = null;
        self.getCourseMainPage(1, val)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let self = this;
        self.tableData = null;
        self.getCourseMainPage(val)
      },
      currentPage(val) {
        console.log(val, 99999999)
      },
      handleClick(id) {
        this.$router.push({ name: 'Classdetail', query: { id: id } })
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

  .className {
    .className-l {
      width: 85px;
      height: 85px;
      background: rgba(216, 216, 216, 1);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .className-r {
      flex-direction: column;
      overflow: hidden;
      justify-content: space-between;
      height: 100%;
      text-align: left;
      p {
        font-size: 14px;
        color: rgba(74, 74, 74, 1);
        line-height: 1.2;
      }
      span {
        width: 68px;
        display: inline-block;
        font-size: 12px;
        line-height: 1;
        color: #ffffff;
        background: rgba(26, 169, 123, 1);
        padding: 4px 10px;
        border-radius: 10px;
      }
      .create-time {
        p {
          font-size: 12px;
          text-align: left;
          color: rgba(155, 155, 155, 1);
        }
      }
    }
  }
</style>