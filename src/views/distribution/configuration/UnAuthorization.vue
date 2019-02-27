<template>
      <div class="tabBox">
        <el-tabs v-model="activeName" @tab-click="handleClickItem">
            <el-tab-pane label="公众号配置" name="first"></el-tab-pane>
            <el-tab-pane label="图文管理" name="second"></el-tab-pane>
            <el-tab-pane label="客服二维码" name="third"></el-tab-pane>
            <el-tab-pane label="首页轮播图" name="forth"></el-tab-pane>
        </el-tabs>
        <div class="buzhou">
            <div class="numb">1</div>
            <div class="text">绑定公众号
                <span>绑定已认证的服务号，授权给学兽第三方平台</span>
            </div>
            <div class="line"></div>
            <div class="numb">2</div>
            <div class="text">创建开放平台账号
                <span class="span2">绑定公众号之后，系统将自动为您的店铺创建开放平台账号，多个应用之间可以共享用户</span>
            </div>
            <div class="line"></div>
            <div class="numb">3</div>
            <div class="text">发布公众号H5
                <span>绑定公众号后，可复制店铺H5链接到公众号自定义菜单中配置</span>
            </div>
        </div>
        <div class="centerText">将公众号绑定店铺，即可在学兽后台管理公众号，还能使用更多更强大的功能</div>
        <div class="centerBotton">
            <el-button type="primary" @click="handleBind(1)">立即绑定</el-button>
        </div>
        <div class="centerText">还没有公众号？<a href="https://mp.weixin.qq.com/" target="black">立即申请</a></div>
        <div class="shuoming">
            <div class="smTitle">授权说明</div>
            <div class="smMain">
                <ul>
                    <li>1、公众号仅支持一种绑定类型：认证服务号，非认证的订阅/服务号无法绑定;</li>
                    <li>2、一个微信公众号仅可绑定一个学兽商户；绑定之后支持解除绑定; </li>
                    <li>3、为保证所有功能的正常使用，授权时请保持默认选择，把权限统一授权给学兽</li>
                </ul>
            </div>
            <div class="jiaocheng"><a href="https://shimo.im/docs/L725hL98zrMoQFv9" target="black">查看绑定教程</a></div>
        </div>
        <PollingMask v-if="isAuthLoading" @ok="handleOk" @close="handleClose" />
    </div>
</template>

<script>
import api from "@/api/distribution";
import {mapGetters} from 'vuex'
import PollingMask from "./PollingMask";

export default {
  name: "UnAuthorization",
  data() {
    return {
      dialogVisible: false,
      isAuthLoading: false,
      activeName: 'first',
    };
  },
  props:{
    unType: { // 公众号-public 小程序-program
      type: String 
    }
  },
  components: {
    PollingMask
  },
  computed: {
    // ...mapGetters([
    //   'storeId'
    // ])
  },
  methods: {
    handleBind(type){
      this.isAuthLoading= true
      window.open(`/wechat/componentloginpagenew?storeId=-1&authorizeType=1`, '_target')
    },

    // 成功授权
    handleOk(){
      this.isAuthLoading = false
      this.$emit('refresh', true)
    },

    // 关闭
    handleClose(){
      this.isAuthLoading = false
      this.$emit('refresh')
    },
    handleClickItem(tab, event) {
        console.log(tab.name);
        if(tab.name=="second"){
            this.$router.push({ name: "management" });
        }else if(tab.name=="third"){
            this.$router.push({ name: "qrCode" });
        }else if(tab.name=="forth"){
            this.$router.push({ name: "indexSwiper" });
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.tabBox{
    background: #ffffff;
    padding: 10px 20px 40px 20px;
    .green{
        color: #00B4B9;
        cursor: pointer;
    }
    .theme-bd-color{
        display: inline-block;
        margin-left: 20px;
    }
    .el-tabs__item{
        line-height: 30px;
    }
    .buzhou{
        width: 1055px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        // padding-left: 40px;
        padding: 40px 0 130px 0;
        .numb{
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border:1px solid rgba(39,189,193,1);
            font-size:16px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(39,189,193,1);
            text-align: center;
            line-height: 32px;
        }
        .text{
            font-size:16px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(74,74,74,1);
            margin-left: 10px;
            position: relative;
            span{
                width: 200px;
                position: absolute;
                left: 0;
                bottom: -47px;
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(155,155,155,1);
                line-height: 18px;
            }
            .span2{
                width: 320px;
            }
        }
        .line{
            width:200px;
            height:1px;
            background:rgba(39,189,193,1);
            margin:0 20px;
        }
    }
    .shuoming{
        width: 760px;
        height: 250px;
        background:rgba(249,250,249,1);
        margin: 0 auto;
        margin-top: 40px;
        .smTitle{
            font-size:14px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(74,74,74,1);
            padding: 30px 0 20px 124px;
        }
        .smMain{
            padding-left: 124px;
            ul{
                li{
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(74,74,74,1);
                    padding-bottom: 20px;
                }
            }
        }
        .jiaocheng{
            padding-top: 10px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(39,189,193,1);
            text-align: center;
            cursor: pointer;
        }
    }
    .centerText{
        text-align: center;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(74,74,74,1);
        a{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(39,189,193,1);
        }
    }
    .centerBotton{
        text-align: center;
        padding: 18px 0 22px 0;
    }
}
</style>
