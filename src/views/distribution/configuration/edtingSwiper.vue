<template>
  <div class="app-container">
    <tit></tit>
    <div class="addSwiper">
        <div class="mainBox">
            <div class="sub-title">轮播图名称</div>
            <el-input v-model="lbname" placeholder="请输入轮播图名称"></el-input>
        </div>
        <div class="mainBox">
            <div class="sub-title">轮播图序号</div>
            <el-input v-model="lbxuhao" placeholder="请输入轮播图序号"></el-input>
        </div>
        <div class="mainBox">
            <div class="sub-title">轮播图图片</div>
            <p>建议尺寸1080*375，大小不超过2M，支持Jpg、Png格式</p>
            <div>
                <upload :img.sync="catalogUrl" :resDomain="roles.resDomain"></upload>
            </div>
        </div>
        <div class="mainBox guanlian">
            <div class="guanlianMain">
                <p>关联内容</p>
                <el-button type="primary" @click="chooseShoppingList">选择商品</el-button>
            </div>
            <div class="guanlianMain">
                <p>是否上线</p>
                <el-switch
                  v-model="accountStatus"
                  :active-value="1"
                  :inactive-value="0"
                  @change="switchChange"
                  active-color="rgba(39,189,193,0.15)"
                  inactive-color="#C7C7C7"
                ></el-switch>
            </div>
        </div>
        <div class="btnBox">
            <el-button @click="cancel" class="cancel" type="primary">取 消</el-button>
            <el-button @click="submit" type="primary">点击上传</el-button>
        </div>
    </div>
    <chooseShoppingDalog></chooseShoppingDalog>
  </div>
</template>
<script>
import api from "@/api/distribution"; 
import { mapGetters } from "vuex";
import tit from "@/components/Htitle";
import upload from "@/components/Upload6";
import chooseShoppingDalog from "@/components/chooseShoppingDalog";
export default {
  methods: {},
  components: {
    tit,
    upload,
    chooseShoppingDalog
  },
  computed: {
    ...mapGetters(["roles","XcourseId"]),
    courseId : {
        get(){
            return this.$store.state.distribution.courseId;
        },
        set(val){
            this.$store.commit("getcourseId" , val)
        }
    }
  },
  data() {
    return {
        id:this.$route.query.id,
        lbname:this.$route.query.lbname, //名称
        lbxuhao:this.$route.query.lbxuhao, //序号
        catalogUrl:this.$route.query.catalogUrl,
        accountStatus:this.$route.query.accountStatus,
    };
  },
  created() {
    this.getCatalogPage(1);
  },
  destroyed () {
       this.$store.commit("getcourseId" , null);
  },
  mounted() {},
  methods: {
    handleQuery() {},
    getCatalogPage() {
        this.courseId = this.$route.query.productId
    },
    //switch
    switchChange(){
        console.log(this.accountStatus)
    },
    chooseShoppingList(){
        console.log(this.$store)
        this.$store.commit("changeDalogShow",true)
    },
    //cancel
    cancel(){
        this.$router.push({ name: "indexSwiper" });
    },
    //提交
    submit(){
        console.log(this.courseId)
        if(this.lbname==""){
            this.$message({
                type: "error",
                message: "请输入轮播图名称"
            });
        }else if(this.lbxuhao==""){
            this.$message({
                type: "error",
                message: "请输入轮播图序号"
            });
        }else if(this.catalogUrl==""){
            this.$message({
                type: "error",
                message: "轮播图图片"
            });
        }else if(this.courseId==null){
            this.$message({
                type: "error",
                message: "请选择关联商品"
            });
        }else{
            let data = {
                id:this.id,
                sequenceNumber:this.lbxuhao,
                name:this.lbname,
                url:this.catalogUrl.substring(0,this.catalogUrl.length-8),
                productId:this.courseId,
                status:this.accountStatus
            };
            api.editBanner(data).then(res => {
                if (res.serviceCode == "E000000000") {
                    this.$message({
                        type: "success",
                        message: "修改成功"
                    });
                    this.$router.push({ name: "indexSwiper" });
                } else {
                    this.$message({
                        type: "error",
                        message: res.message
                    });
                }
            });
        }
    },
  },
};
</script>
<style lang="scss">
    .addSwiper{
        background: #fff;
        padding: 60px 20px 220px 20px;
        .mainBox{
            width: 500px;
            margin: 0 auto;
            .upload{
                width: 432px;
                height: 250px;
            }
            p{
              font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(155,155,155,1);  
                padding-bottom: 5px;
            }
            .sub-title{
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(74,74,74,1);
                padding-bottom: 10px;
            }
            .el-input{
                margin-bottom: 20px;
            }
        }
        .guanlian{
            display: flex;
            justify-content: space-between;
            .guanlianMain{
                width: 40%;
                display: flex;
                align-items: center;
                p{
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(74,74,74,1);
                    margin-right: 10px;
                }
                .el-switch__core:after {
                    background-color: rgba(151, 151, 151, 1);
                }
                .el-switch__core {
                    border: 1px solid rgba(39, 189, 193, 0.15);
                }
                .el-switch.is-checked .el-switch__core::after {
                    background-color: rgba(39, 189, 193, 1);
                }
                .el-button{
                    padding: 6px 15px;
                    background-color: #E2F8F8!important;
                    border-color: #E2F8F8!important;
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(39,189,193,1);
                }
            }
        }
        .btnBox{
            text-align: center;
            margin-top: 70px;
            .el-button{
                padding: 15px 40px;
            }
            .cancel {
                padding: 15px 50px;
                background-color: #ffffff !important;
                font-size: 14px;
                font-weight: 400;
                color: #00b4b9 !important;
                border: 1px solid #00b4b9 !important;
            }
            .cancel:hover {
                background-color: #ffffff !important;
                color: #00b4b9 !important;
            }
        }
    }
</style>