<template>
  <div class="app-container">
    <div class="topbar">
      <div>
        <h3>专栏内容</h3>
      </div>
      <div>
        <h3 @click="goback">
          <i class="iconfont icon-fanhui"></i>
          <span>返回</span>     
        </h3>
      </div>
    </div>
    <div class="action-bar">
      <div class="action-content">
        <p>目前专栏为 <span class="title">【{{info.columnName}}】</span> ，作者{{info.userName}}，当前进度 <span>{{info.shelvesNumber}}/{{info.articleNumber}}</span></p>
      </div>
    </div>

    <div class="table">
      <el-table 
        :data="tableList" 
        v-loading="loading"
        stripe 
        >
        <el-table-column 
          type="index"
          align="center"
          width="150"
          :index="indexMethod"
          label="序号">
        </el-table-column>
        <el-table-column 
          prop="contentName" 
          align="center"
          label="标题">
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
          prop="onDate" 
          align="center"
          label="上架时间">
        </el-table-column>
        <el-table-column 
          align="center"
          label="操作">
          <template slot-scope="scope">
            <span class="right_btn" @click="handleLook(scope.row)">查看</span>
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
  data(){
    return {
      statusList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 1,
          label: "上架"
        },
        {
          value: 2,
          label: "下架"
        }
      ],
      info:{},
      tableList:[],
      formData:{
        status:'',
      },
      pageSize: 10,
      currentPage:1,
      total: 0,
      loading:false
    }
  },
  created(){
    this.init()
    this.getColumnInfo()
  },
  
  methods:{
    // 数据初始化
    init(){
      let self = this
      self.$store
        .dispatch('columnContentList', {
          columnId:this.$route.query.id,
          pageSize:this.pageSize,
          page:this.currentPage
        }).then(res => {
          if (res.success) {
            this.tableList = res.pageInfo.list
          }
        })
    },

    getColumnInfo(){
      let self = this
      self.$store
        .dispatch('getColumnInfo', {
          id:this.$route.query.id
        }).then(res => {
          if (res.success) {
            this.info = res.data
          }
        })
    },

    // 查看图文信息
    handleLook(row){
      this.$router.push({
        name:'ColumnGraphic',
        query:{
          id:row.id
        }
      })      
    },

    // 分页
    handleSizeChange(val) {
      this.tableList = null
      this.currentPage = val
    },

    handleCurrentChange(val) {
      this.tableList = null
      this.pageSize = val
    },

    // 序号补0
    indexMethod(index){
      const cur = this.currentPage
      const size = this.pageSize
      
      index++
      if(cur > 1){
        index = (cur - 1) * size + index
      }

      return index;
    },

    // 回退
    goback(){
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
  .topbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size:12px;
    margin-bottom:20px;
    div{
      display: flex;
      align-items: center;
      justify-content: center;
      color:#9B9B9B;
      a{
        display:flex;
        align-items:center;
        justify-content:center;
        align-items:center;
      }
      i{
        font-size:18px;
        display:inline-block;
        margin-right:4px;
      }
    }
  }
  h3{
    font-size:20px;
    margin-right:20px;
    cursor:pointer;
  }
  p{
    cursor:pointer;
  }
  a{
    color:#9B9B9B;
  }
  .action-bar{
    width:100%;
    background-color:#ffffff;
    padding:0 20px;
    box-sizing:border-box;
    p{
      font-size:14px;
      color:#666666;
    } 
    .action-content{
      display:flex;
      justify-content:space-between;
      align-items:center;
      width:100%;
      padding:10px 0;
      border-bottom:2px solid #E6E6E6;
      box-sizing:border-box;
      .title{
        color:#6CDDC7;
      }
    }
  }
  .right_btn{
    color: #6CDDC7;
    cursor: pointer;
    padding-right: 0;
  }
  .el-table__body-wrapper .cell{
    display: flex;
    justify-content: center;
  }
   
  
</style>

