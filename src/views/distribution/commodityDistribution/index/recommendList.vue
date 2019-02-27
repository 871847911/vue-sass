<template>
  <div class="app-container">
    <tit :showBack="backBtn"></tit>
    <div class="components_box">
      <div class="btn_right">
        <el-button
          type="primary"
          class="theme-bg-color theme-bd-color"
          @click="addCommodityDialog"
        >添加推荐商品</el-button>
      </div>
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
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column label="商品名称" align="center" min-width="250">
            <template slot-scope="scope">
              <div class="scope-icon">
                <img :src="scope.row.imageUrl" alt>
                <span>{{scope.row.goodsName}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商户" align="center" min-width="150">
            <template slot-scope="scope">{{scope.row.shopName}}</template>
          </el-table-column>
          <el-table-column label="分类" align="left" min-width="150">
            <template slot-scope="scope">{{scope.row.categoryName}}/{{scope.row.typeName}}</template>
          </el-table-column>
          <el-table-column label="类型" align="center" min-width="100">
            <template slot-scope="scope">{{scope.row.classifyType == 0?"课程":"其他类型"}}</template>
          </el-table-column>
          <el-table-column label="状态" align="center" min-width="100">
            <template slot-scope="scope">
              <i
                class="iconfont icon-zitikuicon-"
                :style="{color:scope.row.openState == 0?'#F5A623':'#6cddc7'}"
              ></i>
              <span>{{scope.row.openState == 0?"未上架":"已上架"}}</span>
            </template>
          </el-table-column>
          <el-table-column label="分销价格" align="center" min-width="100">
            <template slot-scope="scope">{{scope.row.price}}元</template>
          </el-table-column>
          <el-table-column label="销量" align="center" min-width="100">
            <template slot-scope="scope">{{scope.row.saleNum == null ?"0":scope.row.saleNum}}</template>
          </el-table-column>
          <el-table-column label="操作" align="left" min-width="200">
            <template slot-scope="scope">
              <div class="btn_box">
                <span @click="detailPage(scope.row.peddleGoodsId,0)">商品详情</span>
                <span @click="detailPage(scope.row.peddleGoodsId,1)">目录内容</span>
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

    <!-- 添加分类弹出层 -->
    <div class="hz_el_dialog">
      <el-dialog title="添加推荐商品" :visible.sync="dialogState">
         <!-- width="50%" -->
        <el-form :model="formDialog" class="hz_el_form dialog_body">
          <el-form-item>
            <div class="layout_flex pad_b_20 wid_box">
              <el-form-item>
                <el-input v-model="formDialog.authName" placeholder="名称/作者/商户" maxlength=15></el-input>
              </el-form-item>

              <el-form-item class="mg_l_10">
                <el-button type="primary" @click="onSubmit">搜索</el-button>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item>
            <div>
              <el-table
                ref="multipleTable"
                :data="dataDialog"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="商品名称">
                  <template slot-scope="scope">{{ scope.row.goodsName }}</template>
                </el-table-column>
                <el-table-column label="作者">
                  <template slot-scope="scope">{{ scope.row.authorName }}</template>
                </el-table-column>
                <el-table-column label="商户">
                  <template slot-scope="scope">{{ scope.row.shopName }}</template>
                </el-table-column>
                <el-table-column label="价格">
                  <template slot-scope="scope">{{ scope.row.price }}</template>
                </el-table-column>
              </el-table>
            </div>

            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChangeDia"
                @current-change="handleCurrentChangeDia"
                :current-page="dialogPage.pageNum"
                :page-sizes="[5]"
                :page-size="dialogPage.pageSize"
                layout="prev, pager, next,sizes,jumper"
                :total="dialogPage.total"
                background
              ></el-pagination>
            </div>
          </el-form-item>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
          <span class="shopNums">已选择 {{selectNum}} 个商品</span>
          <el-button @click="dialogState = false">取 消</el-button>
          <el-button type="primary" @click="confirmEvent()">确 定</el-button>
        </span> -->

        <div class="layout_flex flex_r btn_box dialog_btn">
          <div class="shopNums">已选择 {{selectNum}} 个商品</div>
          <span @click="dialogState = false">取消</span>
          <span @click="confirmEvent()">确定</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tit from "@/components/Htitle";
import api from "@/api/commodity";
export default {
  name: "commodityGoods",
  data() {
    return {
      activeName: "fourth",
      backBtn: false,
      pageNum: 1,
      pageSize: 10,
      total: 50,
      formLabelWidth: "70px",
      tableData: [], //数据列表
      // dataDialog: [{id:"1",leap:"测试"},{id:"2",leap:"开发"},{id:"3",leap:"运维"}], //弹出框列表
      dataDialog: [],
      dialogPage: {
        //弹窗框列表分页相关
        pageNum: 1,
        pageSize: 5,
        total: 12
      },
      dialogState: false,
      formDialog: {
        //弹出框搜索条件
        authName: ""
      },
      selectNum: 0, //添加推荐商品选中的数量
      selectArr: [],
      addCommodityIdList: []
    };
  },
  components: {
    tit
  },
  methods: {
    getPeddleGoodsList() {
      let that = this;
      let params = {
        isShow: 1,
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
    listDialog() {
      let that = this;
      let params = {
        keyword: that.formDialog.authName == ""?null:that.formDialog.authName,
        page: that.dialogPage.pageNum,
        pageSize: that.dialogPage.pageSize
      };
      api.indexGoodsChoice(params).then(res => {
        console.log("添加首页推荐内部列表", res);
        if (res.serviceCode == "E000000000") {
          that.dataDialog = res.data.list;
          that.dialogPage.total = res.data.total;
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
      this.listDialog();
    },
    addCommodity() {
      let that = this;
      console.log(that.addCommodityIdList)
      api
        .addIndexPeddleGoods({ peddleGoodsIds: that.addCommodityIdList })
        .then(res => {
          console.log("添加首页推荐数据", res);
          that.dialogState = false
          if (res.serviceCode == "E000000000") {
            that.$message({
              type: "success",
              message: "添加成功!"
            });
            that.getPeddleGoodsList()
          } else {
            that.$message({
              type: "error",
              message: res.message
            });
          }
        });
    },
    addCommodityDialog() {
      console.log("添加商品");
      this.dialogState = true;
      this.addCommodityIdList = []
      this.listDialog();
    },
    detailPage(id, type) {
      console.log(id);
      if (type) {
        this.$router.push({ name: "contentCatolog", query: { id: id } });
      } else {
        this.$router.push({ name: "commodityDetail", query: { id: id } });
      }
    },
    removeEvent(id) {
      console.log("移除", id);
      let that = this;
      let params = {
        peddleGoodsId: id
      };
      api.delIndexPeddleGoods(params).then(res => {
        console.log("移除首页推荐id=>", res);
        if (res.serviceCode == "E000000000") {
          this.$message({
            type: "success",
            message: "移除成功!",
          });
          that.getPeddleGoodsList();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    handleClick(tab, event) {
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
    handleSizeChangeDia(val) {
      console.log(`组件内部、每页显示 ${val} 条`);
      this.dialogPage.pageSize = val;
    },
    handleCurrentChangeDia(val) {
      console.log(`组件内部 分页页面跳转时间、当前页: ${val}`);
      this.dialogPage.pageNum = val;
    },
    confirmEvent() {
      console.log(
        "发请求改变 点击了确认按钮",
        this.selectArr,
        this.addCommodityIdList
      );
      this.selectArr.forEach(ele => {
        this.addCommodityIdList.push(ele.peddleGoodsId);
      });

      console.log("当前选中几个",this.selectNum)
      if(this.selectNum >0){
        this.addCommodity();
      }else{
        this.$message({
            type: "error",
            message: "暂无选择商品!",
          });
      }
      
      
    },
    toggleSelection(rows) {
      console.log(rows);
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.selectNum = val.length;
      this.selectArr = val;
    }
  },
  created() {
    this.getPeddleGoodsList();
    
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .components_box {
    background: #ffffff;
    padding: 30px 20px;
    position: relative;
    .btn_right {
      position: absolute;
      right: 20px;
      top: 15px;
      z-index: 999;
    }
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
  .shopNums {
    margin-right: 20px;
    color: #9b9b9b;
    font-size: 14px;
    height:40px;
    line-height:40px;
  }
}

.layout_flex {
  display: flex;
}
.flex_r {
  justify-content: flex-end;
}

.mg_l_30 {
  margin-left: 30px;
}
.mg_l_10 {
  margin-left: 10px;
}
.pad_b_20 {
  padding-bottom: 20px;
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
    &:nth-child(2) {
      background: #ffffff;
      border: 1px solid #00b4b9;
    }
    &:nth-last-child(1) {
      background: #00b4b9;
      color: #ffffff;
    }
  }
}

.dialog_body{
  // background:red;
  padding:0 30px 30px;
}
</style>
