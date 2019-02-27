<template>
  <div class="app-container">
    <tit><span class="tips">轮播图建议尺寸1920*786，大小不超过2M，支持jpg、png格式</span></tit>
    <div class="table">
      <div class="dis-flex justify-b dis-flex-ac hd">
        <el-radio-group v-model="labelType" @change="tabClick">
          <el-radio-button :label="item.value" v-for="(item,index) in opitions" :key="index">{{item.label}}</el-radio-button>
        </el-radio-group>
        <el-button type="success" class="theme-bg-color theme-bd-color" @click="addSlider">添加轮播</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="编号" type="index" width="100">
        </el-table-column>
        <el-table-column label="轮播图">
          <template slot-scope="scope">
            <upload :maxNum="1" :img.sync="scope.row.picUrl" :resDomain="roles?roles.resDomain:''" :show_temp.sync="scope.row.show_temp"
              width="233" height="95" :mb30="false" :showClose="false" style="margin-top:10px;margin-bottom:10px;"></upload>
          </template>
        </el-table-column>
        <el-table-column label="图文链接">
          <template slot-scope="scope">
            {{scope.row.graphic?scope.row.graphic.title:'/'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <ul class="btns dis-flex">
              <li class="btn flex-1 btn-1">
                <span @click="editSliderFun(scope.row)">编辑</span>
              </li>
              <li class="btn flex-1 btn-2">
                <span @click="deleteBanner(scope.row.id)">删除</span>
              </li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑轮播" :visible.sync="dialogVisible" width="30%" v-if="editSlider">
      <div class="dis-flex dis-flex-ac mb-30">
        <label class="mr-20 labelItem">轮播图</label>
        <upload :maxNum="1" :img.sync="editSlider.picUrl" :resDomain="roles?roles.resDomain:''" :show_temp.sync="editSlider.show_temp"
          width="233" height="80" :mb30="false"></upload>
      </div>
      <div class="dis-flex dis-flex-ac mb-30">
        <label class="mr-20 labelItem">图文类型</label>
        <el-select v-model="editSlider.graphicType" placeholder="请选择" @change="findAll(0)">
          <el-option v-for="item in graphicOpitions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="dis-flex dis-flex-ac mb-30">
        <label class="mr-20 labelItem">图文标题</label>
        <el-select v-model="editSlider.graphicId" placeholder="请选择">
          <el-option v-for="item in graphicItems" :key="item.id" :label="item.title" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSlider">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import tit from "@/components/Htitle";
import upload from "@/components/Upload4";
export default {
  methods: {},
  components: {
    tit,
    upload
  },
  computed: {
    ...mapGetters(["roles"])
  },
  data() {
    return {
      labelType: 1,
      opitions: [
        {
          value: 1,
          label: "首页"
        },
        {
          value: 2,
          label: "学院"
        },
        // {
        //   value: 3,
        //   label: "解决方案"
        // },
        // {
        //   value: 4,
        //   label: "渠道合作"
        // },
        // {
        //   value: 5,
        //   label: "关于我们"
        // }
      ],
      graphicOpitions: [
        {
          value: 1,
          label: "课程"
        },
        {
          value: 2,
          label: "专栏"
        },
        {
          value: 3,
          label: "产品更新"
        },
        {
          value: 4,
          label: "使用教程"
        }
      ],
      graphicItems: [],
      loading: false,
      tableData: null,
      dialogVisible: false,
      editSlider: null,
      addSliderData: {
        graphicId: null,
        picUrl: null,
        type: null,
        show_temp: true,
        graphicType: 1
      }
    };
  },
  created() {
    this.findList();
  },
  methods: {
    tabClick() {
      this.findList();
    },
    addSlider() {
      let self = this;
      self.dialogVisible = true;
      self.addSliderData[`type`] = self.labelType;
      self.editSlider = { ...self.addSliderData };
      self.findAll(1);
    },
    findList() {
      let self = this;
      if (self.loading) {
        return this.$message({
          message: "正在查询中,请勿重复点击查询",
          type: "error"
        });
      }
      self.loading = true;
      this.$store.dispatch("findList", { type: self.labelType }).then(res => {
        self.loading = false;
        if (res.success) {
          if (res.items.length) {
            res.items.forEach((item, index) => {
              item.show_temp = false;
            });
            self.tableData = res.items;
          }
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    findAll(type) {
      let self = this;
      if (!type) {
        self.editSlider.graphicId = null;
      }
      this.$store
        .dispatch("findAll", { type: self.editSlider.graphicType })
        .then(res => {
          self.loading = false;
          if (res.success) {
            if (res.items.length) {
              self.graphicItems = res.items;
            }
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
    },
    editSliderFun(data) {
      let self = this;
      self.dialogVisible = true;
      if (data.graphic) {
        data.graphicType = data.graphic.type;
      } else {
        data.graphicType = 1;
      }
      self.editSlider = { ...data };
      self.findAll(1);
    },
    deleteBanner(id) {
      let self = this;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          self.$store.dispatch("deleteBanner", { id: id }).then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              self.findList();
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    saveSlider() {
      let self = this;
      let action, txt, data;
      if (self.editSlider.id) {
        action = "updateBanner";
        txt = "更新成功";
      } else {
        action = "createBanner";
        txt = "添加成功";
      }
      self.$store.dispatch(`${action}`, self.editSlider).then(res => {
        if (res.success) {
          self.dialogVisible = false;
          self.findList();
          this.$message({
            type: "success",
            message: txt
          });
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.tips {
  position: relative;
  min-width: 400px;
  margin-left: 5px;
  top: -2px;
  font-size: 12px;
  color: rgba(255, 0, 0, 1);
}

.hd {
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
}

.main-hd {
  line-height: 60px;
  text-align: center;
}

.table {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 26px;
  background-color: #ffffff;
}

.labelItem {
  width: 60px;
}
</style>