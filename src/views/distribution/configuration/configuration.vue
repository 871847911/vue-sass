<template>
  <div class="app-container">
    <tit></tit>
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
            <el-button type="primary">立即绑定</el-button>
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
    </div>
    <div class="table2">
        <el-tabs v-model="activeName" @tab-click="handleClickItem">
            <el-tab-pane label="公众号配置" name="first"></el-tab-pane>
            <el-tab-pane label="图文管理" name="second"></el-tab-pane>
            <el-tab-pane label="客服二维码" name="third"></el-tab-pane>
            <el-tab-pane label="首页轮播图" name="forth"></el-tab-pane>
        </el-tabs>
        <el-container>
            <el-aside width="200px">
                <img class="headerImg" src="http://kpay-temp.qiniu.vdlb.cn/resource/image/jpeg/203001/o_1ctkal67fo291s841tt7cjsupf1p.jpeg" alt="">
                <p>学兽</p>
                <div class="payBtn" @click="goPaySetting">支付设置</div>
            </el-aside>
            <el-container>
                <el-header height="">
                    <div class="headerBox">
                        <dl>
                            <dt>公众号主体</dt>
                            <dd>浙江微动天下信息技术有限公司</dd>
                        </dl>
                        <dl>
                            <dt>店铺H5地址</dt>
                            <dd>XXXXXXXXXXXXXXXXXXXX<span class="ml10">复制</span></dd>
                        </dl>
                    </div>
                </el-header>
                <el-main>
                    <div class="headerBox">
                        <dl>
                            <dt>APPID</dt>
                            <dd>wx9128a7fdc0ae145f</dd>
                        </dl>
                        <dl>
                            <dt>已授权权限</dt>
                            <dd><span @click="authorizationList=true">查看</span></dd>
                        </dl>
                    </div>
                </el-main>
                <el-footer  height="">
                    <div class="headerBox boderN">
                        <dl>
                            <dt>公众号类型</dt>
                            <dd>已认证服务号</dd>
                        </dl>
                    </div>
                </el-footer>
            </el-container>
            <el-aside width="240px">
                <img class="headerImg2" src="http://kpay-temp.qiniu.vdlb.cn/resource/image/jpeg/203001/o_1ctkal67fo291s841tt7cjsupf1p.jpeg" alt="">
                <a href="">下载</a>
            </el-aside>
        </el-container>
        <div class="tableBottom">
            <p>已绑定的开发平台信息</p>
            <div class="bottomMain">
                <div class="MainBox">
                    <dl>
                        <dt>平台账号</dt>
                        <dd>xxxxxxxxxxxxxxxxxxxxxxx</dd>
                    </dl>
                    <dl>
                        <dt>主体信息</dt>
                        <dd>浙江微动天下信息技术有限公司</dd>
                    </dl>
                </div>
                <div class="MainBox">
                    <dl>
                        <el-button type="primary" @click="Untying=true">解绑公众号</el-button>
                    </dl>
                    <dl>
                        <p>账号信息更新时，可以 <span @click="again=true">重新授权</span></p> 
                    </dl>
                </div>
            </div>
        </div>
        <el-dialog
            title="记录详情"
            :visible.sync="dialogVisible"
            :show-close="false"
            width="50%"
            :before-close="handleClose">
            <span>
                <i class="iconfont t1">&#xe659;</i>
                <p class="falseTitle">绑定失败</p>
                <p class="t2">原因1：权限不足，请保证您已将所有权限集授权给学兽</p>
                <p class="t2">原因2：账号类型不匹配，请确认您的账号是已认证通过的服务号</p>
                <p class="t2">原因3：服务号主体和开放平台主体不一致，开放平台主体：微动天</p>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">重新授权</el-button>
            </span>
        </el-dialog>
        <!-- 授权权限列表 -->
        <el-dialog
            title="授权权限列表"
            :visible.sync="authorizationList"
            width="50%"
            :before-close="handleClose">
            <span>
                <div class="authorizationList">
                    <ul>
                        <li><i class="iconfont">&#xe660;</i>消息管理权限</li>
                        <li><i class="iconfont">&#xe660;</i>消息管理权限</li>
                        <li><i class="iconfont">&#xe660;</i>消息管理权限</li>
                        <li><i class="iconfont">&#xe660;</i>消息管理权限</li>
                        <li><i class="iconfont">&#xe661;</i>消息管理权限</li>
                        <li><i class="iconfont">&#xe660;</i>消息管理权限</li>
                        <li><i class="iconfont">&#xe660;</i>消息管理权限</li>
                    </ul>
                </div>
            </span>
        </el-dialog>
        <!-- 重新授权 -->
        <el-dialog
            title="重新授权"
            :visible.sync="again"
            :show-close="false"
            width="50%"
            :before-close="handleClose">
            <span class="again">
                <p>1、重新授权时必须是同一微信公众号 ，授权其他公众号会导致授权失败</p>
                <p>2、为保证您在学兽平台功能的正常使用，授权时请保持默认选择，把开放平台账号 管理权限统一授权给学兽。</p>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel" @click="again = false">取 消</el-button>
                <el-button type="primary" @click="again = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="解绑公众号"
            :visible.sync="Untying"
            :show-close="false"
            width="50%"
            :before-close="handleClose">
            <span>
                <i class="iconfont t1">&#xe659;</i>
                <p class="falseTitle">您当前正要解绑公众号，注意解绑后用户无法登陆，请谨慎操作</p>
                <div class="codeBox">
                    <div class="codeText">当前公众号</div>
                    <div class="codePhone">学兽汤</div>
                    <div class="yzm"></div>
                    <div class="yzm"></div>
                </div>
                <div class="codeBox">
                    <div class="codeText">管理员手机号</div>
                    <div class="codePhone">13800138000</div>
                    <el-input placeholder="请输入内容" v-model="input22" clearable></el-input>
                    <div class="yzm">获取验证码</div>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel" @click="Untying = false">取 消</el-button>
                <el-button type="primary" @click="Untying = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    <!-- 绑定失败 -->
    
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import tit from "@/components/Htitle";
export default {
  methods: {},
  components: {
    tit,
  },
  computed: {
    ...mapGetters(["roles"])
  },
  data() {
    return {
      code: "", //课程编号
      page: 1,
      tableData: null,
      total: null,
      pageSize: 10,
      name: "", //课程名称
      loading: false,
      activeName: 'first',
      formData:"",
      dataValue:'',
      dialogVisible:false, //授权失败
      authorizationList:false, //授权列表
      again:false, //重新授权
      Untying:false, //解绑
      input22:"",
    };
  },
  created() {
    this.getCatalogPage(1);
  },
  mounted(){
  },
  methods: {
    handleQuery(){
      
    },
    getCatalogPage() {
      
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
    },
    //详情
    handleClick(val) {
      
    },
    //关闭
    handleClose(){
        this.dialogVisible = false
        this.authorizationList = false
    },
    //支付设置
    goPaySetting(){
        this.$router.push({ name: "paySettings" });
    }
  }
};
</script>
<style lang="scss">
.flexBox{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .flexBoxItem{
        width: 45%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(230,230,230,1); 
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(155,155,155,1);
        span{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(74,74,74,1);
        }
    }
}
.titleSmall{
    font-size:12px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(74,74,74,1);
    padding:10px 0 20px 0;
}
.tabBox{
    background: #ffffff;
    padding: 10px 20px 40px 20px;
    display: none;
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
.table2{
    background: #ffffff;
    padding: 10px 20px 120px 20px;
    .el-aside {
        text-align: center;
        border-right:1px solid rgba(230,230,230,1);
        padding: 45px 0;
        .headerImg{
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
        .headerImg2{
            width: 150px;
            height: 150px;
        }
        a{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(74,74,74,1);
            display: block;
            padding-top: 10px;
        }
        p{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(74,74,74,1);
            text-align: center;
            padding: 5px 0 20px 0;
        }
        .payBtn{
            cursor: pointer;
            width: 96px;
            height: 32px;
            background:rgba(226,248,248,1);
            border-radius:4px;
            line-height: 32px;
            text-align: center;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(39,189,193,1);
            margin: 0 auto;
        }
    }
    .el-aside:last-child{
        border: none;
        border-left:1px solid rgba(230,230,230,1);
    }
     .el-header, .el-footer, .el-main{
        height: auto;
        padding:26px 20px 0 20px;
    }
    .headerBox{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(230,230,230,1); 
        padding:0 20px 20px 20px;
        dl{
             dt{
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(155,155,155,1);
                padding-bottom: 10px;
            }
            dd{
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(74,74,74,1);
                span{
                    font-size:12px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(39,189,193,1);
                    cursor: pointer;
                }
                .ml10{
                    padding-left: 10px;
                }
            }
        }
    }
    .boderN{
        border: none;
    }
    .tableBottom{
        margin-top: 20px;
        border-top:1px solid rgba(230,230,230,1);
        p{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(74,74,74,1);
            padding: 60px 0 30px 60px;
        }
        .bottomMain{
            display: flex;
            .MainBox{
                width: 49.9%;
                display: flex;
                border-right: 1px solid rgba(230,230,230,1);
                dl{
                    padding-left: 60px;
                    dt{
                        font-size:14px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(155,155,155,1);
                        padding-bottom: 10px;
                    }
                    dd{
                        font-size:14px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(74,74,74,1);
                    }
                    p{
                        font-size:14px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(155,155,155,1);
                        line-height:40px;
                        padding: 0;
                        span{
                            color: #27BDC1;
                            cursor: pointer;
                        }
                    }
                }
            }
            .MainBox:last-child{
                border: none;
            }
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
.t1{
    text-align: center;
    font-size: 124px;
    color: #FF6767;
    display: block;
}
.falseTitle{
    font-size:18px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(74,74,74,1);
    line-height:25px;
    padding: 10px 0 30px 0;
    text-align: center;
}
.t2{
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(74,74,74,1);
    padding-bottom: 10px;
    width: 80%;
    margin: 0 auto;
}
.t4{
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(155,155,155,1);
    padding: 20px 0 10px 0;
    display: flex;
    span{
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(74,74,74,1);
        margin-left: 30px;
    }
    .demo-input-suffix{
        width: 50%;
        input{
            width: 169px;
        }
    }
}
.again{
    p{
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(74,74,74,1);
        padding-bottom: 20px;
    }
}
.codeBox{
    width: 90%;
    margin: 0 auto;
    padding-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .codeText{
        width: 20%;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(155,155,155,1);
    }
    .codePhone{
        width: 25%;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(74,74,74,1);
    }
    .el-input{
        width: 25%;
    }
    .yzm{
        width: 25%;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(39,189,193,1);
        text-indent: 30px;
        cursor: pointer;
    }
}
}
.authorizationList{
    overflow: hidden;
    ul{
        li{
            width: 33.3%;
            float: left;
            padding-bottom: 16px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(74,74,74,1);
            .iconfont{
                padding-right: 10px;
            }
        }
    }
}
.green{
  color: #00B4B9;
  cursor: pointer;
}
.line {
  text-align: center;
}
.zucheng{
    font-size: 16px;
    color: #9B9B9B;
    padding: 30px 0 20px 0;
    overflow: hidden;
    .titleBox{
      float: left;
      height: 40px;
      line-height: 40px;
    }
    .inputBox{
      width: 30%;
      float: right;
    }
    .bottonBox{
      margin-left: 30px;
      float: right;
    }
}
.pushDetails{
    background: #fff;
    padding: 30px 40px 50px 40px;
    
}
.table {
  background-color: #ffffff;
  padding: 0 0 40px 0;
}

.table:after {
  content: "";
  width: 0;
  height: 0;
  clear: both;
  display: block;
  visibility: hidden;
}

.scope-icon {
  width: 40px;
  height: 40px;
  background: #e0e0e0;
  overflow: hidden;
}

</style>