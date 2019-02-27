<template>
  <div class="app-container">
    <tit></tit>
    <div class="template-form">
      <div class="form">
        <el-form :label-position="labelPosition" label-width="80px" :model="ruleForm" :rules="rules" ref="ValidateForm">
          <el-form-item label="图文类型" style="margin-top:-30px;" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程封面" prop="cover" class="pos-r">
            <span style="magin-top:-10px;" class="mb-20">建议尺寸600*376，大小不超过2M，支持Jpg、Png格式</span>
            <upload :maxNum="1" :img.sync="ruleForm.cover" :resDomain="roles?roles.resDomain:''" :show_temp.sync="show_temp" width="300"
              height="188"></upload>
          </el-form-item>
          <el-form-item label="主标题" prop="title">
            <el-input v-model="ruleForm.title" placeholder="30字以内的中文，数字和英文"></el-input>
          </el-form-item>
          <el-form-item label="副标题" prop="subTitle" v-if="ruleForm.type!=3">
            <el-input v-model="ruleForm.subTitle" placeholder="请输入副标题名称" type="textarea" :rows="2"></el-input>
          </el-form-item>
          <el-form-item label="二维码">
            <el-button type="success" @click="selectClass">选择课程</el-button>
            <el-tooltip class="item" effect="dark" content="选择课程生成对应二维码,在富文本本中添加后,可通过扫码进入课程详情" placement="right">
              <span class="ml-10 el-icon-question dis-inline" style="font-size:18px;display:inline-block;"></span>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="详细介绍">
            <umeditor :container.sync="ruleForm.detail" ref='umeditor'></umeditor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('ValidateForm')" class="center">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="课程" :visible.sync="dialogFormVisible">
      <div class="dis-flex mb-30">
        <el-row :gutter="20" class="flex-1">
          <el-col :span="8">
            <el-input v-model="courseName" placeholder="课程名称" class="mr-10"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="success" class="theme-bg-color theme-bd-color" @click="queryCourseMainPage2(page)">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table ref="singleTable" :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column label="课程编号">
          <template slot-scope="scope">
            {{scope.row.detail.courseNumber}}
          </template>
        </el-table-column>
        <el-table-column label="课程名称">
          <template slot-scope="scope">
            <p class="ellipsis">{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="下载二维码" width="100">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="downQr(scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
          layout="prev, pager, next,sizes,jumper" :total="total" background style="margin-top: -21px;">
        </el-pagination>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import upload from "@/components/Upload4";
  import umeditor from "@/components/Editor";
  import tit from "@/components/Htitle/index";
  import lodash from "lodash";
  import { mapGetters } from "vuex";
  var api = '/api'
  if(process.env.NODE_ENV == 'production'){
    api = ''
  } 
  String.prototype.trim = function () {
    ///<summary>去掉字符串前后空格</summary>
    return this.replace(/(^\s*)|(\s*$)/g, "");
  };
  export default {
    data() {
      return {
        resDomain: "",
        show_temp: false, //传的是有数据
        labelPosition: "top",
        ruleForm: {
          title: "",
          subTitle: "",
          type: "",
          cover: "", //封面
          detail: "" //详情(富文本)
        },
        rules: {
          type: [
            { required: true, message: "请选择图文类型", trigger: "change" }
          ],
          title: [
            { required: true, message: "主标题", trigger: "blur" },
            { max: 30, message: "长度在30以内", trigger: "blur" }
          ],
          subTitle: [
            { required: true, message: "请输入副标题", trigger: "blur" },
            { max: 30, message: "长度在30以内", trigger: "blur" }
          ],
          cover: [{ required: true, message: "请上传图像", trigger: "blur" }]
        },
        options: [
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
            label: "使用课程"
          },
          {
            value: 5,
            label: "学兽动态"
          },
          {
            value: 6,
            label: "学兽观点"
          },
          {
            value: 7,
            label: "新闻报道"
          }
        ],
        graphicType: 1,//列表值
        dialogFormVisible: false,
        tableData: null,
        pageSize: 10,
        page: 1,
        total: null,
        loading: false,
        courseName: ''
      };
    },
    computed: {
      ...mapGetters(["roles", 'uptoken'])
    },
    components: {
      upload,
      tit,
      umeditor
    },
    created() {
      let self = this;
      if (self.$route.query.id) {
        self.show_temp = false;
        self.getGraphic(self.$route.query.id);
      }
      if (self.$route.query.graphicType) {
        self.graphicType = self.$route.query.graphicType
      }
    },
    mounted() {
      this.queryCourseMainPage2()
    },
    methods: {
      queryCourseMainPage2(page, pageSize) {
        let self = this
        let data = {
          courseName: self.courseName,
          page: page || self.page,
          pageSize: pageSize || self.pageSize
        };
        self.loading = true;
        this.$store.dispatch("queryCourseMainPage2", data).then(res => {
          self.loading = false;
          if (res.success) {
            self.total = res.pageInfo.total;
            self.pageSize = res.pageInfo.pageSize;
            self.tableData = res.pageInfo.list;
          } else {
            // this.$message({
            //   type: "error",
            //   message: res.message
            // });
          }
        });
      },
      getGraphic(id) {
        let self = this;
        this.$store
          .dispatch("getGraphic", { id: id })
          .then(res => {
            if (res.success) {
              self.ruleForm = {
                title: res.data.title,
                subTitle: res.data.subTitle,
                type: res.data.type,
                detail: res.data.detail,
                cover: res.data.cover
              };
              // console.log(res.data.detail,'内容')
              // console
              // self.refs.umeditor.editor.setContent(res.data.detail); // 确保UE加载完成后，放入内容。
            } else {
              this.$message({
                message: res.message,
                type: "warning"
              });
            }
          })
          .catch(res => {
            console.log("查询", res);
          });
      },
      createGraphic() {
        let self = this;
        let action;
        let data = self.ruleForm;
        if (self.$route.query.id) {
          action = "updateGraphic";
          data["id"] = self.$route.query.id;
        } else {
          action = "createGraphic";
        }
        this.$store
          .dispatch(`${action}`, data)
          .then(res => {
            if (res.success) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.$router.push({ name: "Graphic", query: { graphicType: this.graphicType } });
            } else {
              this.$message({
                message: res.message,
                type: "warning"
              });
            }
          })
          .catch(res => {
            console.log(res, "保存失败");
          });
      },
      selectClass() {
        this.dialogFormVisible = true
      },
      onSubmit(formName) {
        let self = this;
        if (!self.ruleForm.cover) {
          this.$message({
            message: "请上传头像",
            type: "warning"
          });
        }
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.createGraphic();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        let self = this;
        self.tableData = null;
        self.queryCourseMainPage2(1, val)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let self = this;
        self.tableData = null;
        self.queryCourseMainPage2(val)
      },
      currentPage(val) {
        console.log(val, 99999999)
      },

      downloadIamge(src, name) {
        var a = document.createElement('a')
        var event = new MouseEvent('click')
        a.download = name
        a.href = src
        a.dispatchEvent(event)
      },
      downQr(obj) {
        let self = this
        let data = {
          storeId: obj.detail.storeId,
          courseId: obj.id
        }
        let name = obj.name + '的二维码'
        this.$store.dispatch('genCourseQrcodeFile',{courseId:obj.id}).then(res=>{
            if(res.success){
              self.downloadIamge(`${res.data}?attname=${name}.png`, name)
            }
        })
      }
    }
  };
</script>
<style lang="scss" scoped>
  .form {
    width: 750px;
  }

  span {
    display: block;
    font-size: 14px;
    color: rgba(155, 155, 155, 1);
  }

  .tips {
    bottom: 10px;
    z-index: 98;
    left: 0;
  }
</style>