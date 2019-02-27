<template>
  <div class="app-container">
    <tit></tit>
    <div class="applyData" v-for="item in tableList" :key='item.id' :class="!item.isRead ? 'active' : ''">
      <div class="left">
        <span>开店申请</span>
        <span>申请人：{{item.contentJson.applicant}}</span>
        <span>电话：{{item.contentJson.phone}}</span>
      </div>
      <div class="right">
        <span>{{item.createDate}}</span>
        <span @click="handleSee(item)">查看</span>
      </div>
    </div>
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
</template>

<script>
import tit from "@/components/Htitle";
export default {
  data() {
    return {
      tableList:[],
      pageSize: 10,
      currentPage:1,
      total: 0,
    };
  },
  components: {
    tit
  },

  created(){
    this.init()
  },
  mounted() {},
  methods: {
    // 数据初始化
    init(){
      let self = this
      self.$store
        .dispatch('platformMessage', {
          size:this.pageSize,
          page:this.currentPage,
        })
        .then(res => {
          if (res.success) {
            this.tableList = res.pageInfo.list
            this.total = res.pageInfo.total
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
    },
    handleSee(row){
      this.$store
        .dispatch('read',{id:row.id})
        .then(res => {
          if(res.success){
            this.$store.dispatch('statsMessage').then(() =>{
              this.$router.push({
                name:'Apply'
              })
            })
          }else{
            this.$message.error(res.message);
          }
        })
    }
  }
};
</script>
<style lang="scss">
.applyData {
  margin-bottom: 20px;
  border-left: 2px solid #9b9b9b;
  background-color: #ffffff;
  border-radius: 2px;
  padding: 30px 40px 30px 34px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  .left{
    span {
      &:nth-child(1) {
        margin-right: 20px;
        height: 22px;
        font-size: 14px;
        font-weight: 600;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
      }
      &:nth-child(2),&:nth-child(3) {
        margin-right: 25px;
        height: 22px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
      }
    }
  }
  .right{
    span{
      &:nth-child(1) {
        margin-right:120px;
        height: 22px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 22px;
      }
      &:nth-child(2) {
        cursor: pointer;
        margin-left: 119px;
        width: 27px;
        height: 18px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 180, 185, 1);
        line-height: 18px;
      }
    }
  }
}
.active{
  border-left: 2px solid #05BAB5 !important;
}
</style>