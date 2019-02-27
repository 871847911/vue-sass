<template>
  <div class="list">
    <div class="list-table list-thead-gray">
        <el-table
          stripe
          :data="list"
          style="width: 100%">
          <el-table-column
              prop="createTime"
              label="月份"
              align="center"
              width="150">
          </el-table-column>
          <el-table-column
              label="当月储存空间量"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                {{scope.row.storageSpace}}GB
              </template>
          </el-table-column>
          <el-table-column
              label="免费赠送存储空间量"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                {{scope.row.freeSpace}}GB
              </template>
          </el-table-column>
          <el-table-column
              label="当月计费储存量"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                 {{scope.row.paySpace}}GB
              </template>
          </el-table-column>
          <el-table-column
              label="计费价格"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                 {{scope.row.unitPrice}}元/GB
              </template>
          </el-table-column>
          <el-table-column
              label="消费金额"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                {{scope.row.payAmount}}元
              </template>
          </el-table-column>
      </el-table>
    </div>
  </div>  
</template>

<script>
export default {
  name: "StorageSpace",
  data(){
    return {}
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="scss" scoped>

.list {
  width: 100%;
  margin: 0 auto 20px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 5px;
  background: #fff;
  box-sizing: border-box;
  .list-table {
    width: 100%;
    margin: 20px auto 30px;
  }
}
</style>
