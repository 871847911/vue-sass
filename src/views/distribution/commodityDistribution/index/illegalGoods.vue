<template>
  <div class="app-container">
    <tit :showBack="backBtn"></tit>
    <div class="components_box">
      <!-- Tabs -->
      <el-tabs v-model="activeName" @tab-click="handleClick" class="hz_ele_tabs">
        <!-- 分销商品 -->
        <el-tab-pane label="分销商品" name="first"></el-tab-pane>

        <!-- 商品审核 -->
        <el-tab-pane label="商品审核" name="second"></el-tab-pane>

        <!-- 违规商品 -->
        <el-tab-pane label="违规商品" name="third"></el-tab-pane>

        <!-- 首页推荐 -->
        <el-tab-pane label="首页推荐" name="fourth"></el-tab-pane>
      </el-tabs>

      <!-- main -->
      <!-- 数据列表 -->
      <div class="list">
        <!-- 搜索条件 -->
        <el-form ref="form" :model="searchForm" label-width="40px" class="hz_el_form">
          <div class="layout_flex mb-20">
            <el-form-item label="类型">
              <div class="layout_flex">
                <el-select v-model="searchForm.type">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="课程" value="0"></el-option>
                </el-select>
                <el-form-item class="mg_l_30 wid_box">
                  <el-input v-model="searchForm.shopName" placeholder="商品名称/商户" maxlength=15></el-input>
                </el-form-item>

                <el-form-item class="mg_l_10">
                  <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>
              </div>
            </el-form-item>
          </div>
        </el-form>
        
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column label="商品名称" align="center" min-width="200">
            <template slot-scope="scope">
              <div class="scope-icon">
                <img :src="scope.row.imageUrl" alt>
                <span>{{scope.row.goodsName}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商户" align="center" min-width="200">
            <template slot-scope="scope">{{scope.row.shopName}}</template>
          </el-table-column>
          <el-table-column label="分类" align="left" min-width="120">
            <template slot-scope="scope">{{scope.row.categoryName}}/{{scope.row.typeName}}</template>
          </el-table-column>
          <el-table-column label="类型" align="center" min-width="150">
            <template slot-scope="scope">{{scope.row.classifyType == 0?"课程":"其他"}}</template>
          </el-table-column>
          <el-table-column label="处理时间" align="left" min-width="200">
            <template slot-scope="scope">{{scope.row.handleDate == null?"/":scope.row.handleDate.slice(0,16)}}</template>
          </el-table-column>
          <el-table-column label="操作" align="left"  min-width="200">
            <template slot-scope="scope">
              <div class="btn_box">
                <span @click="detailPage(scope.row.peddleGoodsId)">查看</span>
                <span @click="removeEvent(scope.row.peddleGoodsId)">移除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="prev, pager, next,sizes,jumper"
            :total="total"
            background
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import tit from "@/components/Htitle";
import api from "@/api/commodity";
export default {
  name: "checkGoods",
  data() {
    return {
      activeName: "third",
      backBtn: false,
      pageNum: 1,
      pageSize: 10,
      total: 50,
      formLabelWidth: "40px",
      tableData: [], //列表数据
      searchForm: {
        //搜索框数据
        type: "",
        shopName: ""
      },
      dialogState: false,
      formDialog: {
        //弹出框数据
        name: ""
      }
    };
  },
  components: {
    tit
  },
  methods: {
    getPeddleGoodsList() {
      let that = this;
      let params = {
        checkState: 3,//违规商品固定 3
        classifyType: that.searchForm.type == ""?null:that.searchForm.type,
        keyword: that.searchForm.shopName == ""?null:that.searchForm.shopName,
        page: this.pageNum,
        pageSize: this.pageSize
      };
      api.getPeddleGoodsList(params).then(res => {
        console.log("违规商品列表", res);
        if (res.serviceCode == "E000000000") {
          that.tableData = res.data.list;
          that.total = res.data.total;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    onSubmit() {
      console.log("条件搜索");
      this.pageNum = 1;
      this.getPeddleGoodsList();
    },
    detailPage(id) {
      console.log(id);
      this.$router.push({ name: "commodityDetail", query: { id: id } });
    },
    removeEvent(id) {
      console.log("移除");
      let that = this;
      let params = {
        peddleGoodsId: id
      };
      api.delViolationPeddleGoods(params).then(res => {
        console.log("移除对应id为" + id + "的商品", res);
        if (res.serviceCode == "E000000000") {
          this.$message({
            type: "success",
            message: "移除成功!"
          });
          this.getPeddleGoodsList()
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    handleClick(tab, event) {
      console.log(this.activeName);
      switch (this.activeName) {
        case "first":
          this.$router.push({ name: "commodityGoods" });
          break;
        case "second":
          this.$router.push({ name: "checkGoods" });
          break;
        case "third":
          this.$router.push({ name: "illegalGoods" });
          break;
        case "fourth":
          this.$router.push({ name: "recommendList" });
          break;
        default:
          break;
      }
    },
    handleSizeChange(val) {
      console.log(`组件内部、每页显示 ${val} 条`);
      this.pageSize = val;
      this.getPeddleGoodsList();
    },
    handleCurrentChange(val) {
      console.log(`组件内部 分页页面跳转时间、当前页: ${val}`);
      this.pageNum = val;
      this.getPeddleGoodsList();
    },
    confirmEvent() {
      console.log("发请求改变 点击了确认按钮");
      this.dialogState = false;
    },
    handlePage(id) {
      console.log("拿到违规处理的数据ID", id);
      this.dialogState = true;
    }
  },
  created() {
    this.getPeddleGoodsList();//商品详情列表
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .components_box {
    background: #ffffff;
    padding: 30px 20px;
    .list:after {
      content: "";
      clear: both;
      display: block;
      visibility: hidden;
    }
    .list {
      .scope-icon {
        display: flex;
        align-items: center;
        padding-left: 20px;
        width: 100%;
        background:none;
        span {
          margin-left: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        img {
          width: 40px;
          height: 40px;
          min-width:40px;
          min-height:40px;
        }
      }
    }
  }
}

.layout_flex {
  display: flex;
}

.mg_l_30 {
  margin-left: 30px;
}
.mg_l_10 {
  margin-left: 10px;
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
</style>
