<template>
  <div class="app-container">
    <tit></tit>
    <div class="dis-flex mb-30">
      <el-row :gutter="20" class="flex-1">
        <el-col :span="3">
          <el-input v-model="name" placeholder="模板名称" class="mr-10"></el-input>
        </el-col>
        <el-col :span="2">
          <el-select v-model="isEnabled" placeholder="启用状态">
            <el-option v-for="item in lists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="success" class="theme-bg-color theme-bd-color" @click="getQueryTemplate">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" class="theme-bg-color theme-bd-color" @click="addTemplate">
        <i class="el-icon-plus el-icon--right mr-10"></i>添加模板</el-button>
    </div>
    <div class="select-module-lists">
      <div class="module-list mr-20" @mouseenter="moduleMouseFun(index)" @mouseleave="moduleMouseFun()" :class="mouseenter&&(module_list_active_index==index)?'module-list-active':''" @click="toInfo(item.detail.id)" v-for="(item,index) in moduleLists">
        <div class="module-img">
          <img :src="item.resDomain+item.coverList[0]" style="width:100%;height:100%"/>
        </div>
        <div class="module-h3 ellipsis">
          {{item.detail.name}}
        </div>
        <div class="module-info dis-flex justify-b dis-flex-ac">
          <span class="module-type">￥ {{item.detail.price}}</span>
          <div class="module-btn dis-flex dis-flex-ac">
            <span @click.stop>
            <el-switch v-model="item.detail.isEnable" @change="changeEnable(item.detail)">
            </el-switch>
            </span>
            <div class="module-btn-s ml-5">{{item.detail.isEnable?'已启用':'未启用'}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tit from "@/components/Htitle";
import imgHead from "@/config/config";
export default {
  data() {
    return {
      lists: [
        {
          value: '',
          label: "全部"
        },
        {
          value: 'n',
          label: "未启用"
        },
        {
          value:'y',
          label: "启用"
        }
      ],
      moduleLists: [], //模板列表
      isEnabled: '',
      name: "",
      mouseenter: false,
      imgHost: imgHead.imgHost,
      imgHostTemp: imgHead.imgHostTemp,
      module_list_active_index:''
    };
  },
  components: {
    tit
  },
  computed: {
    $route(e) {
      console.log(e);
    }
  },
  mounted() {
    this.getQueryTemplate();
  },
  methods: {
    changeEnable(obj) {
      let self = this;
      self.$store
        .dispatch("templateEnable", { id: obj.id, isEnable: obj.isEnable })
        .then(res => {
          if (res.success) {
          } else {
            self.$message({
              message: res.message,
              type: "error"
            });
          }
        })
        .catch(res => {
          console.info("modifyAppTemplateEnable", res);
        });
    },
    getQueryTemplate() {
      let self = this;
      self.$store
        .dispatch("queryTemplate",{name:self.name,isEnabled:self.isEnabled})
        .then(res => {
          if (res.success) {
              self.moduleLists = res.items;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    moduleMouseFun(index) {
      this.mouseenter = !this.mouseenter;
      this.module_list_active_index = index;
    },
    addTemplate() {
      this.$router.push({ name: "addtemplate", params: { id: 1111 } });
    },
    toInfo(id) {
      this.$router.push({ name: "templateinfo", params: { id: id } });
    },
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.line {
  text-align: center;
}

.h1 {
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  color: rgba(155, 155, 155, 1);
  line-height: 28px;
}

/*module-list*/

.module-list {
  display: inline-block;
  vertical-align: middle;
  margin-right: 40px;
  width: 200px;
  padding: 10px;
  transition: all 0.6s;
  transform: translate3d(0, 0, 0);
  border-radius: 5px;
  box-sizing: content-box;
  .module-h3 {
    margin-top: 17px;
    font-size: 14px;
    color: rgba(74, 74, 74, 1);
    line-height: 20px;
  }
  .module-type {
    margin-top: 2px;
    font-size: 18px;
    color: rgba(245, 166, 35, 1);
    line-height: 25px;
  }
  .module-btn {
    .module-btn-s {
      font-size: 12px;
      color: rgba(26, 169, 123, 1);
    }
  }
}

.module-list-active {
  padding: 10px;
  background-color: #ffffff;
}

.module-img {
  width: 200px;
  height: 432px;
  margin: auto;
  // background-color: #e0e0e0;
}

.module-list:hover {
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.35);
  transition: all 0.6s;
  transform: translate3d(0, -2px, 0);
}
</style>
