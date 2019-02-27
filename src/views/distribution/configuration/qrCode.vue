<template>
  <div class="app-container">
    <tit></tit>
    <div class="qrCode">
        <el-tabs v-model="activeName" @tab-click="handleClickItem">
            <el-tab-pane label="公众号配置" name="first"></el-tab-pane>
            <el-tab-pane label="图文管理" name="second"></el-tab-pane>
            <el-tab-pane label="客服二维码" name="third"></el-tab-pane>
            <el-tab-pane label="首页轮播图" name="forth"></el-tab-pane>
        </el-tabs>
        <div class="addCode">
            <el-button type="primary" @click="dialogFirst=true">添加二维码</el-button>
        </div>
        <div class="qrcodeBox">
            <div class="howToGetMoney" v-for="(item,index) in qrCode">
                <p>{{item.name}}</p>
                <el-dropdown trigger="click" size="mini">
                    <span class="el-dropdown-link">
                        <i class="iconfont">&#xe62b;</i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item @click.native="goEdit(index)">编辑</el-dropdown-item>
                        <el-dropdown-item @click.native="deleteList(index)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                <div class="yuan">
                    <img :src="$store.state.user.roles.resDomain+item.url">
                </div>
            </div>
        </div>
        <el-dialog title="添加二维码" :visible.sync="dialogFirst" width="30%">
            <el-form :model="formOne">
                <el-form-item label="图片" :label-width="formLabelWidth">
                    <upload :img.sync="formOne.catalogUrl" :resDomain="roles.resDomain"></upload>
                </el-form-item>
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="formOne.name" auto-complete="off" placeholder="请输入名称"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel" @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirmEvent">确 定</el-button>
            </span>
        </el-dialog>
    </div>

  </div>
</template>
<script>
import api from "@/api/distribution";
import { mapGetters } from "vuex";
import tit from "@/components/Htitle";
import upload from "@/components/Upload6";
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
      activeName: 'third',
      dialogFirst:false,
      formLabelWidth: "80px",
      qrCode:'',
      formOne:{
          catalogUrl:'',
          name:'',
      },
      isadd:true
    };
  },
  created() {
    this.getCatalogPage();
  },
  mounted(){
  },
  methods: {
      getCatalogPage() {
        let self = this;
        let data = {};
        api.selectCustomServices(data).then(res => {
            console.log(res);
            if (res.serviceCode == "E000000000") {
                self.qrCode = res.data
            } else {
            this.$message({
                type: "error",
                message: res.message
            });
            }
        });
    },
    //编辑页
    goEdit(e){
       this.qrCodeid = this.qrCode[e].id
       this.formOne.catalogUrl = this.qrCode[e].url
       this.formOne.name = this.qrCode[e].name
       this.isadd = false
       this.dialogFirst = true
    },
    //删除
    deleteList(e) {
        let data = {
            id:this.qrCode[e].id
        };
        api.deleteCustomServer(data).then(res => {
            console.log(res);
            if (res.serviceCode == "E000000000") {
                this.$message({
                    type: "success",
                    message: "删除成功"
                });
                this.getCatalogPage();
            } else {
                this.$message({
                    type: "error",
                    message: res.message
                });
            }
        });
    },
    handleClickItem(tab, event) {
        console.log(tab.name);
        if(tab.name=="first"){
            this.$router.push({ name: "configuration" });
        }else if(tab.name=="second"){
            this.$router.push({ name: "management" });
        }else if(tab.name=="forth"){
            this.$router.push({ name: "indexSwiper" });
        }
    },
    //取消
    cancel(){
        this.formOne.catalogUrl = ''
        this.formOne.name = ''
        this.dialogFirst = false
        this.qrCodeid = ''
        this.isadd = true
    },
    //保存
    confirmEvent(id){
        console.log(this.formOne.catalogUrl)
        console.log(this.formOne.name)
        if(this.formOne.catalogUrl!=''||this.formOne.name!=''){
            if(!this.isadd){
                let data = {
                    id:this.qrCodeid,
                    url:this.formOne.catalogUrl.substring(0,this.formOne.catalogUrl.length-8),
                    name:this.formOne.name,
                };
                api.editCustomService(data).then(res => {
                    console.log(res);
                    if (res.serviceCode == "E000000000") {
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        });
                        this.formOne.catalogUrl = ''
                        this.formOne.name = ''
                        this.dialogFirst = false
                        this.qrCodeid = ''
                        this.isadd = true
                        this.getCatalogPage();
                    } else {
                        this.$message({
                            type: "error",
                            message: res.message
                        });
                    }
                });
            }else{
                let data = {
                    url:this.formOne.catalogUrl.substring(0,this.formOne.catalogUrl.length-8),
                    name:this.formOne.name,
                    isDelete:0
                };
                api.addCustomServer(data).then(res => {
                    console.log(res);
                    if (res.serviceCode == "E000000000") {
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        });
                        this.formOne.catalogUrl = ''
                        this.formOne.name = ''
                        this.dialogFirst = false
                        this.qrCodeid = ''
                        this.isadd = true
                        this.getCatalogPage();
                    } else {
                        this.$message({
                            type: "error",
                            message: res.message
                        });
                    }
                });
            }
        }else{
            this.$message({
                type: "error",
                message: "请上传图片或者输入名称"
            });
        }

    }
  }
};
</script>
<style lang="scss">
.qrCode{
    background: #ffffff;
    padding: 10px 20px 140px 20px;
    position: relative;
    .qrcodeBox{
        overflow: hidden;
        .howToGetMoney{
            width:260px;
            height:300px;
            border-radius:5px;
            background: #F9FAF9;
            float: left;
            margin-right: 10px;
            margin-top: 20px;
            // position: relative;
            // padding-top: 75px;
            overflow: hidden;
            position: relative;
            .yuan{
                width:160px;
                height:160px;
                background:rgba(249,250,249,1);
                margin: 0 auto;
                margin-top: 60px;
                img{
                    width: 100%;
                    height: 100%;;
                }
            }
            p{
                position: absolute;
                top: 10px;
                left: 20px;
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(74,74,74,1);
            }

            .el-dropdown{
                float: right;

                i{
                    display: block;
                    text-align: right;
                    margin-right: 10px;
                    margin-top: 5px;
                    cursor: pointer;
                }
            }
        }
    }
    .addCode{
        position: absolute;
        right: 20px;
        top: 10px;
        .el-button{
            padding: 8px 20px;
        }
    }
    .el-dialog__footer {
        padding: 10px 20px !important;
        background: rgba(250, 250, 250, 1);
    }
    .el-button {
        padding: 12px 40px;
    }
    .cancel {
        background: #ffffff !important;
        font-size: 14px;
        font-weight: 400;
        color: #00b4b9 !important;
        border: 1px solid #00b4b9 !important;
    }
    .cancel:hover {
        background-color: #ffffff !important;
        color: #00b4b9 !important;
    }
    .howToGetMoney:hover{
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);
    }
}
</style>
