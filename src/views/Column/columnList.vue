<template>
  <div class="app-container">
    <div class="dis-flex mb-30">
      <el-row :gutter="20" class="flex-1">
        <el-col :span="2">
          <el-select v-model="onStatus" placeholder="状态">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="searchName" placeholder="专栏名称/作者/商户"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="success" class="theme-bg-color theme-bd-color" @click="handleQuery">查询</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table 
        :data="tableList" 
        v-loading="loading"
        stripe 
        >
        <el-table-column 
          align="center"
          label="专栏名称">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:flex-start;align-items:center;">
              <img :src="scope.row.resDomain + scope.row.columnUrl" alt="" style="width:60px;height:60px;display:block;">
              {{scope.row.columnName}}
            </div>
          </template>
        </el-table-column>
        <el-table-column 
          prop="userName" 
          align="center"
          label="作者">
        </el-table-column>
       <el-table-column 
          prop="storeName" 
          align="center"
          label="商户">
        </el-table-column>
        <el-table-column 
          align="center"
          label="订阅人数">
          <template slot-scope="scope">
            {{scope.row.buyNumber}}
          </template>
        </el-table-column>
        <el-table-column 
          align="center"
          label="状态">
          <template slot-scope="scope">
            <i class="iconfont icon-zitikuicon-" v-if="scope.row.onStatus == 0" style="color:#F42C21;"></i>
            <i class="iconfont icon-zitikuicon-" v-if="scope.row.onStatus == 1" style="color:#6cddc7;"></i>
            <span v-if="scope.row.onStatus === 0">未上架</span>
            <span v-if="scope.row.onStatus === 1">已上架</span>
          </template>
        </el-table-column>
        <el-table-column 
          align="center"
          label="进度">
          <template slot-scope="scope">
            {{scope.row.articleUpdateNumber}}/{{scope.row.articleNumber}}
          </template>
        </el-table-column>
        <el-table-column 
          align="center"
          label="操作">
          <template slot-scope="scope">
            <div class="btn-flex">
              <div class="right_btn" @click="handleLook(scope.row)">专栏介绍</div> 
              <span></span>
              <div class="right_btn" @click="handleDetail(scope.row)">专栏内容</div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage" 
        :page-sizes="[10, 20, 30, 40]" 
        :page-size="pageSize" 
        layout="prev, pager, next,sizes,jumper" 
        :total="total" 
        background>
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name:'ColumnList',
  data(){
    return {
      statusList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 1,
          label: "已上架"
        },
        {
          value: 0,
          label: "未上架"
        }
      ],
      searchName:'',
      tableList:[],
      onStatus:'',
      pageSize: 10,
      currentPage:1,
      total: 0,
      loading:false
    }
  },
  created(){
    this.init()
  },
  
  methods:{
    // 数据初始化
    init(){
      let self = this
      self.$store
        .dispatch('columnList', {
          onStatus:this.onStatus,
          pageSize:this.pageSize,
          page:this.currentPage,
          searchName:this.searchName
        })
        .then(res => {
          if (res.success) {
            // res.pageInfo.list.forEach(item => {
            //   item.columnUrl = item.resDomain + item.columnUrl
            // });
            self.tableList = res.pageInfo.list

            this.total = res.pageInfo.total
          }
        })
    },

    // 查询
    handleQuery(){ 
      this.init()
    },
    
    // 查看专栏介绍
    handleLook(row){
      this.$router.push({
        name:'ColumnIntroduce',
        query:{
          id:row.id
        }
      })
    },

    // 查看专栏内容列表
    handleDetail(row){
      this.$router.push({
        name:'Columncontent',
        query:{
          id:row.id
        }
      })
    },

    // 分页
    handleSizeChange(val) {
      this.tableList = null
      this.pageSize = val
      this.init()
    },

    handleCurrentChange(val) {
      this.tableList = null
      this.currentPage = val
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
  .btn-flex{
    display: flex;
    align-items: center;
    justify-content: center;
    .right_btn{
      cursor: pointer;
    }
    span{
      height:15px;
      width:1px;
      margin: 0 5px;
      background-color:#9b9b9b;
    }
  }
</style>

