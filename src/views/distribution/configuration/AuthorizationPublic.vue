<template>
 <div class="table2">
        <el-tabs v-model="activeName" @tab-click="handleClickItem">
            <el-tab-pane label="公众号配置" name="first"></el-tab-pane>
            <el-tab-pane label="图文管理" name="second"></el-tab-pane>
            <el-tab-pane label="客服二维码" name="third"></el-tab-pane>
            <el-tab-pane label="首页轮播图" name="forth"></el-tab-pane>
        </el-tabs>
        <el-container>
            <el-aside width="200px">
                <img class="headerImg" :src="authData.headImg">
                <p>{{authData.nickName}}</p>
                <div class="payBtn" @click="goSetPay">支付设置</div>
            </el-aside>
            <el-container>
                <el-header height="">
                    <div class="headerBox">
                        <dl>
                            <dt>公众号主体</dt>
                            <dd>{{authData.principalName}}</dd>
                        </dl>
                        <dl>
                            <dt>分销H5地址</dt>
                            <dd>{{authData.h5Url}}<span v-clipboard:copy="authData.h5Url" v-clipboard:success="onCopy" v-clipboard:error="onError" class="ml10">复制</span></dd>
                        </dl>
                    </div>
                </el-header>
                <el-main>
                    <div class="headerBox">
                        <dl>
                            <dt>APPID</dt>
                            <dd>{{authData.appid}}</dd>
                        </dl>
                        <dl>
                            <dt>已授权权限</dt>
                            <dd><span @click="handleLook">查看</span></dd>
                        </dl>
                    </div>
                </el-main>
                <el-footer  height="">
                    <div class="headerBox boderN">
                        <dl>
                            <dt>公众号类型</dt>
                            <dd>
                              <span v-if="authData.serviceTypeInfo === 2">{{ authData.verifyTypeInfo  === 0 ? '已认证' : '未认证'}}服务号</span>
                              <span v-else>{{ authData.verifyTypeInfo  === 0 ? '已认证' : '未认证'}}订阅号</span>
                            </dd>
                        </dl>
                    </div>
                </el-footer>
            </el-container>
            <el-aside width="240px">
                <img class="headerImg2" :src="authData.qrcodeUrl" alt="二维码">
                <a @click="downs">下载</a>
            </el-aside>
        </el-container>
        <div class="tableBottom">
            <p>已绑定的开发平台信息</p>
            <div class="bottomMain" v-if="authData.wechatOpenPlatform">
                <div class="MainBox">
                    <dl>
                        <dt>平台账号</dt>
                        <dd>{{authData.wechatOpenPlatform.openId}}</dd>
                    </dl>
                    <dl>
                        <dt>主体信息</dt>
                        <dd>{{authData.wechatOpenPlatform.principalName}}</dd>
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
            <div v-else>暂无数据</div>
        </div>
        <el-dialog
            title="记录详情"
            :visible.sync="dialogVisible"
            :show-close="false"
            width="50%">
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
            :visible.sync="lookVisible"
            width="50%"
            :show-close="true">
            <span>
                <div class="authorizationList">
                    <ul>
                       <li v-for="item of authList" :key="item[0]"><i class="iconfont green" v-if="item[1].auth">&#xe672;</i>{{item[1].name}}</li>
                    </ul>
                </div>
            </span>
        </el-dialog>
        <!-- 重新授权 -->
        <el-dialog
            title="重新授权"
            :visible.sync="again"
            :show-close="false"
            width="50%">
            <span class="again">
                <p>1、重新授权时必须是同一微信公众号 ，授权其他公众号会导致授权失败</p>
                <p>2、为保证您在学兽平台功能的正常使用，授权时请保持默认选择，把开放平台账号 管理权限统一授权给学兽。</p>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel" @click="again = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirmAuth">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="解绑公众号"
            :visible.sync="Untying"
            :show-close="false"
            width="50%">
            <span>
                <i class="iconfont t1">&#xe659;</i>
                <p class="falseTitle">您当前正要解绑公众号，注意解绑后用户无法登陆，请谨慎操作</p>
                <div class="codeBox">
                    <div class="codeText">当前公众号</div>
                    <div class="codePhone">{{authData.wechatOpenPlatform.openId}}</div>
                    <div class="yzm"></div>
                    <div class="yzm"></div>
                </div>
                <!-- <div class="codeBox">
                    <div class="codeText">管理员手机号</div>
                    <div class="codePhone">{{phone}}</div>
                    <el-input placeholder="请输入内容" v-model.number="codeValue" clearable></el-input>
                    <div class="yzm">
                      <span v-if="!isGetCode" class="light" @click="handleCode">获取验证码</span>
                      <span v-else class="light">{{sec}}</span></div>
                </div> -->
            </span>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button class="cancel" @click="Untying = false">取 消</el-button>
                <el-button type="primary" @click="Untying = false">确 定</el-button> -->
                <el-button class="cancel" @click="Untying = false">取消</el-button>
                <el-button class="" @click="handleCancelAuth">确定</el-button>
            </span>
        </el-dialog>
        <PollingMask v-if="isAuthLoading" @ok="handleOk" @close="handleClose" />
    </div>

</template>

<script>
import api from "@/api/distribution";
import { mapGetters } from "vuex";
import authList from "./authList";
import PollingMask from "./PollingMask";
export default {
  name: "AuthorizationPublic",
  data() {
    return {
      phone:18405818220,
      Untying:false,
      dialogVisible:false,
      activeName: 'first',
      again: false,
      unbindVisible: false,
      lookVisible: false,
      isAuthLoading: false,
      isGetCode: false, //是否获取验证码
      sec: 60, // 倒计时
      codeValue: "",
      authList: []
    };
  },
  props: {
    authData: {
      type: Object
    }
  },
  computed: {
    // ...mapGetters(["phone", "storeId"])
  },
  components: {
    PollingMask,
  },
  created(){
    this.handleFilter(this.authData)
  },
  watch: {
    authData(newVal, oldVal){
      this.handleFilter(newVal)
    }
  },
  destroyed(){
    if(this.timer){
      clearInterval(this.timer)
    }
  },
  methods: {
    //复制成功
    onCopy(){
        this.$message({
            type: "success",
            message: "复制成功"
          });
    },
    onError(){
        this.$message({
            type: "error",
            message: "复制失败"
          });
    },
    //  筛选权限
    handleFilter(val){
      if(!val) return false
      const mp =  authList

      val.funcIds.forEach(item => {
        item = typeof item === 'string' ? Number(item) : item
        const isHas = mp.has(item)

        if(isHas) mp.set(item, {...mp.get(item), auth: true})
      });
      this.authList = [...mp].filter(item => {
        return !item[1].sp
      })
    },

    // 取消授权短信
    handleCode(){
      if(!this.phone){
        this.$message.warning('未获取手机号,请尝试重新登录！')
        return false
      }
      this.isGetCode = true
      this.handleTimer()

      api.sendVerificationCodeDelAuth({
        phone: this.phone
      }).then(res => {
        if (res.serviceCode=="E000000000") {
          this.$message({
            type: "success",
            message: "发送成功"
          });
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      })
    },

    // 取消授权
    handleCancelAuth(){
    //   if(!this.phone){
    //     this.$message.warning('未获取手机号,请尝试重新登录！')
    //     return false
    //   }

    //   if(this.codeValue === ''){
    //     this.$message.warning('请输入验证码！')
    //     return false
    //   }

      api.unbundAuthorizerInfo({
        
      }).then(res => {
        if(res.serviceCode=="E000000000"){
          this.$message.success('解绑公众号成功！')
          this.unbindVisible = false
          this.$emit('refresh')
        }else{
          this.$message.error(res.message)
        }
      })
    },

    // 确认授权
    handleConfirmAuth(){
      this.again = false
      this.isAuthLoading = true
      window.open(`/wechat/componentloginpagenew?storeId=-1&authorizeType=1`, '_target')
    },

    // 查看权限
    handleLook(){
      this.lookVisible = true
    },

    // 计时器
    handleTimer(){
      this.timer = null
      this.timer = setInterval(() => {
        this.sec--
        if(this.sec === 0){
          clearInterval(this.timer)
          this.sec = 60
          this.isGetCode = false
        }
      }, 1000);
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
    
    onCopy(e) {
      this.$message.success('复制成功！')
    },

    onError(e) {
      this.$message.error('复制失败！')
    },
    
    goSetPay(){
      this.$router.push({
        path: 'paySettings',
        query: {
          appId: this.authData.appid
        }
      })
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
    downloadIamge(imgsrc, name) {//下载图片地址和图片名
    var image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
    
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
    };
        image.src = imgsrc;
    },
    downs(){
        this.downloadIamge(this.authData.qrcodeUrl, 'pic')
    }
  }
};
</script>

<style lang="scss" scoped>
.table2{
    background: #ffffff;
    padding: 10px 20px 120px 20px;
    .el-dialog__footer {
      padding: 10px 20px !important;
      background: rgba(250, 250, 250, 1);
    }
    .green{
        color: #00B4B9;
        cursor: pointer;
    }
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
            color:#27bdc1;
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
          width: 50%;
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
                overflow: hidden;
                word-break: break-word;
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
          dl{
            dd{
              span{
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(74,74,74,1);
              }
            }
          }
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
}
</style>
