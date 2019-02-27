<template>
  <div class="app-container">
    <tit></tit>
    <div class="template-form">
      <div class="form">
        <div class="form-item dis-flex justify-b mb-30 dis-flex-ac">
          <div class="grid-tit">
            <span>* </span>模板选择: </div>
          <div class="grid-content flex-1">
            <el-select v-model="identify" placeholder="请选择">
              <el-option v-for="item in appCodeTemplateList" :key="item.templateId" :label="item.userDesc" :value="item.templateId">
                <span style="float: left">{{ item.userDesc }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userVersion }}</span>
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-item dis-flex justify-b dis-flex-ac mb-30">
          <div class="grid-tit">
            <span>* </span>模版名称：</div>
          <div class="grid-content flex-1">
            <el-input v-model="templateName" placeholder="30字以内的中文，数字和英文"></el-input>
          </div>
        </div>
        <div class="form-item">
          <div class="dis-flex justify-b">
            <div class="grid-tit">
              <span>* </span>模版图片：</div>
            <div class="grid-content flex-1 img-desc">建议尺寸750*1624，大小不超过2M，支持Jpg、Png格式 ( 至少传一张封面图,最多三张图片 )</div>
          </div>
          <div class="preview-img dis-flex">
            <div class="grid-tit"></div>
            <!-- <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
            <upload :imgLists.sync="coverList" :resDomain="editModule?editModule.resDomain:''" ref="uploadTpl"></upload>
          </div>
        </div>
        <div class="form-item dis-flex justify-b dis-flex-ac mb-30">
          <div class="grid-tit">
            使用要求：</div>
          <div class="grid-content flex-1">
            <el-input v-model="useRequirement" placeholder="请输入使用要求"></el-input>
          </div>
        </div>
        <div class="form-item dis-flex justify-b mb-30">
          <div class="flex-1">
            <div class="dis-flex dis-flex-ac justify-b">
              <div class="grid-tit"><span>* </span>模版价格：</div>
              <div class="grid-content flex-1">
                <el-input v-model="price" placeholder="请输入价格" type="number"></el-input>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="dis-flex dis-flex-ac justify-b">
              <div class="grid-tit grid-tit-sm ml-10"><span>* </span>版本号：</div>
              <div class="grid-content flex-1">
                <el-input v-model="version" placeholder="请输入版本号"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="form-item dis-flex justify-b mb-30 dis-flex-ac">
          <div class="grid-tit"><span>* </span>模版结构：</div>
          <div class="grid-content flex-1">
            <div class="moduleLists">
              <div class="moduleList pos-r mb-10" v-for="(item,index) in checkedCitiesObj">
                {{item.name}}<span @click="deletedCity(index)"><i class="el-icon-error"></i></span>
              </div>
              <el-button type="success" round @click="addMoudle" class="dis-inline mb-10">添加结构</el-button>
            </div>
          </div>
        </div>
        <div class="form-item dis-flex justify-b mb-30">
          <div class="grid-tit">模版说明：</div>
          <div class="grid-content flex-1">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="remark">
            </el-input>
          </div>
        </div>
        <div class="form-item dis-flex justify-b dis-flex-ac mb-30">
          <div class="grid-tit">是否开启</div>
          <div class="grid-content flex-1">
            <el-switch v-model="isEnabled" active-color="#00B4B9" active-text="开" inactive-text="关">
            </el-switch>
          </div>
        </div>
        <div class="form-item dis-flex justify-b dis-flex-ac">
          <div class="grid-tit">是否默认</div>
          <div class="grid-content flex-1">
            <el-switch v-model="isDefault" active-color="#00B4B9" active-text="开" inactive-text="关">
            </el-switch>
          </div>
        </div>
      </div>
    </div>
    <div class="txt-c">
      <el-button type="success" class="save-btn mt-30" @click="addTemplate">保存</el-button>
    </div>
    <el-dialog title="模板结构" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="dialog-bd" v-loading="loading">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city.id" :key="city.id" class="mt-10">{{city.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import upload from "@/components/Upload5";
  import tit from "@/components/Htitle";
  import lodash from "lodash";
  String.prototype.trim = function () {
    ///<summary>去掉字符串前后空格</summary>
    return this.replace(/(^\s*)|(\s*$)/g, "");
  };
  export default {
    data() {
      return {
        identify: "", //模板ID
        templateName: "", //模板名称
        price: "", //价格
        useRequirement: "", //使用需求
        version: "", //版本号
        remark: "", //说明
        isEnabled: false, //是否启用
        isDefault: false,
        appCodeTemplateList: null, //模板列表
        dialogVisible: false,
        checkAll: false,
        cityOptions: [],
        checkedCities: [], //模板结构
        checkedCitiesObj: [], //前端展示
        oldcheckedCitiesObj: [], //再次打开老模板
        oldcheckedCities: [],
        cities: null,
        isIndeterminate: true,
        loading: true,
        coverList: [],
        editModule: null, //需要编辑模板内容
        reditModule: false //重新编辑
      };
    },
    components: {
      upload,
      tit
    },
    created() {
      let self = this;
      self.getQueryAppCodeTemplateList();
      if (self.$route.query.id) {
        self.getTemplate();
      }
    },
    methods: {
      getTemplate() {
        let self = this;
        let id = self.$route.query.id;
        self.id = id;
        self.$store.dispatch("getTemplate", { id: id }).then(res => {
          if (res.success) {
            let editModule = res.data;
            self.editModule = editModule;
            self.reditModule = true;
            self.identify = editModule.detail.identify;
            self.templateName = editModule.detail.name;
            self.price = editModule.detail.price;
            self.useRequirement = editModule.detail.useRequirement;
            self.remark = editModule.detail.remark;
            self.isEnabled = editModule.detail.isEnable;
            self.isDefault = editModule.detail.isDefault;
            self.coverList = editModule.coverList;
            self.version = editModule.detail.version;
            if (editModule.funcList.length) {
              self.checkedCitiesObj = editModule.funcList.concat();
              editModule.funcList.forEach((item, index) => {
                self.checkedCities.push(item.id);
              });
            }
          } else {
            self.$message({
              message: res.message,
              type: "error"
            });
          }
        });
      },
      getQueryAppCodeTemplateList() {
        let self = this;
        self.$store.dispatch("queryAppCodeTemplateList").then(res => {
          if (res.success) {
            self.appCodeTemplateList = res.items;
          }
        });
      },
      addTemplate() {
        let self = this;
        if (self.identify == "") {
          return self.$message({
            message: "请选择正确的模板",
            type: "error"
          });
        }
        if (self.templateName.trim() == "") {
          return self.$message({
            message: "请填写正确的模板名称",
            type: "error"
          });
        }
        if (self.templateName.length > 30) {
          return self.$message({
            message: "模板名称长度不得大于30",
            type: "error"
          });
        }
        console.log(self.coverList)
        if (!self.coverList.length) {
          return self.$message({
            message: "请至少上传一张封面图,最多可上传三张",
            type: "error"
          });
        }
        if (String(self.price).trim() == "" || Number(self.price) < 0) {
          return self.$message({
            message: "请填写正确价格",
            type: "error"
          });
        }
        if (String(self.version).trim() == "") {
          return self.$message({
            message: "请填写版本号",
            type: "error"
          });
        }
        if (!self.checkedCities.length) {
          return self.$message({
            message: "请填写模板结构",
            type: "error"
          });
        }
        let coverList = JSON.stringify(self.coverList).replace(/\?temp_vd/g, '')
        coverList = JSON.parse(coverList)
        let params = {
          identify: self.identify,
          name: self.templateName,
          coverList: coverList,
          price: self.price, //价格
          useRequirement: self.useRequirement, //使用需求
          version: self.version, //版本号
          remark: self.remark, //说明
          funcIds: self.checkedCities.join(","),
          isEnabled: self.isEnabled, //是否启用
          isDefault: self.isDefault
        };
        if (self.reditModule) {
          params["id"] = self.editModule.detail.id;
          self.$store
            .dispatch("modifyAppTemplate", params)
            .then(res => {
              if (res.success) {
                self.$router.push({ name: "templateIndex" });
              } else {
                self.$message({
                  message: res.message,
                  type: "error"
                });
              }
            })
            .catch(res => {
              console.log(res);
            });
        } else {
          self.$store
            .dispatch("createTemplate", params)
            .then(res => {
              // console.log(res);
              if (res.success) {
                self.$router.push({ name: "templateIndex" });
              } else {
                self.$message({
                  message: res.message,
                  type: "error"
                });
              }
            })
            .catch(res => {
              console.log(res);
            });
        }
      },
      addMoudle() {
        let self = this;
        if (self.checkedCitiesObj.length) {
          self.oldcheckedCitiesObj = self.checkedCitiesObj.concat();
          self.oldcheckedCities = self.checkedCities.concat();
        }
        if (self.cities) {
          return (self.dialogVisible = true);
        }
        self.$store.dispatch("queryTemplateFuncList").then(res => {
          if (res.success) {
            self.loading = false;
            if (res.items.length) {
              self.dialogVisible = true;
              self.cities = res.items;
              res.items.forEach((item, index) => {
                self.cityOptions.push(item.id);
              });
            }
          }
        }).catch(res => {
          console.log(res)
        });
      },
      handleClose() {
        this.checkedCities = this.oldcheckedCities.concat();
        this.checkedCitiesObj = this.oldcheckedCitiesObj.concat();
        this.isIndeterminate = true;
        this.dialogVisible = false;
      },
      deletedCity(index) {
        let self = this;
        let o = self.checkedCitiesObj[index].id;
        self.checkedCitiesObj.splice(index, 1);
        self.checkedCities.splice(self.checkedCities.indexOf(o), 1);
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cityOptions : [];
        val&&(this.checkedCitiesObj = this.cities)
        !val && (this.checkedCitiesObj = [])
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let self = this;
        let checkedCount = value.length;
        self.checkedCitiesObj = [];
        if (value.length) {
          lodash.forEach(self.cities, item => {
            lodash.forEach(value, itm => {
              if (item.id == itm) {
                self.checkedCitiesObj.push(item);
              }
            });
          });
        }
        console.log(self.checkedCitiesObj)
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .line {
    text-align: center;
  }



  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

  .preview-img {
    padding-top: 30px;
  }

  .el-checkbox {
    width: 120px;
    margin-right: 20px;
    margin-left: 0px !important;
  }

  .moduleLists {
    display: inline-block;
    .moduleList {
      display: inline-block;
      padding: 5px;
      padding-right: 25px;
      background-color: #eeeeee;
      font-size: 14px;
      color: #666666;
      border-radius: 5px;
      margin-right: 10px;
      vertical-align: middle;
      span {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        padding: 5px;
        color: #999999;
        cursor: pointer;
      }
    }
  }
</style>