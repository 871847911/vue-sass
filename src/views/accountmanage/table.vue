<template>
    <div class="app-container">
        <tit></tit>
        <div class="template-form">
            <div class="form">
                <div class="form-item dis-flex justify-b mb-30 dis-flex-ac">
                    <div class="grid-tit">
                        <span>* </span>店铺账号: </div>
                    <div class="grid-content flex-1">
                        <el-input v-model="subAccount.account" placeholder="请输入店铺账号"></el-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="dis-flex justify-b justify-b">
                        <div class="grid-tit">
                            <span>* </span>身份证照片：</div>
                        <div class="grid-content flex-1 img-desc">建议尺寸475*320，大小不超过2M，支持Jpg、Png格式</div>
                    </div>
                    <div class="preview-img ">
                        <div class="grid-tit"></div>
                        <upload :subAccount.sync="subAccount" :resDomain='resDomain'></upload>
                    </div>
                </div>
                <div class="formBox">
                    <div class="form-item dis-flex justify-b mb-30 dis-flex-ac mr-10">
                        <div class="grid-tit">
                            <span>* </span>身份证号码：</div>
                        <div class="grid-content flex-1">
                            <el-input v-model="subAccount.cardId" placeholder="请输入身份证号码"></el-input>
                        </div>
                    </div>
                    <div class="form-item dis-flex justify-b mb-30 dis-flex-ac">
                        <div class="grid-tit">
                            <span>* </span>联系人：</div>
                        <div class="grid-content flex-1">
                            <el-input v-model="subAccount.contact" placeholder="请输入联系人"></el-input>
                        </div>
                    </div>
                    <div class="form-item dis-flex justify-b mb-30 dis-flex-ac mr-10">
                        <div class="grid-tit">
                            <span>* </span>手机号码：</div>
                        <div class="grid-content flex-1">
                            <el-input v-model="subAccount.phone" placeholder="请输入手机号码"></el-input>
                        </div>
                    </div>
                    <div class="form-item dis-flex justify-b mb-30 dis-flex-ac">
                        <div class="grid-tit">
                            微信号：</div>
                        <div class="grid-content flex-1">
                            <el-input v-model="subAccount.weichatId" placeholder="请输入微信号"></el-input>
                        </div>
                    </div>
                </div>
                <div class="form-item dis-flex justify-b mb-30 dis-flex-ac">
                    <div class="grid-tit">
                        <span>* </span>选择版本</div>
                    <div class="grid-content flex-1 boxBtn2">
                        <el-radio-group v-model="banben" @change="radioChange($event)" :disabled="isshow">
                            <el-radio-button v-for="(item,index) in radioLists2" :label="item" :key="index"><i v-if="banben.versionName == item.versionName" class="el-icon-success color-1"></i>{{item.versionName}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="form-item dis-flex justify-b mb-30 dis-flex-ac">
                    <div class="grid-tit">
                        <span>* </span>有效期：(天)</div>
                    <div class="grid-content flex-1" v-if="banben.versionName == '试用版'">
                        <el-radio-group v-model="subAccount.buyDays" :disabled="isshow">
                            <el-radio :disabled="(banben.versionName == '试用版') && (index != 0)" :label="item" v-for="(item,index) in radioLists" :key="index">{{item}}</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="grid-content flex-1" v-else>
                        <el-radio-group v-model="subAccount.buyDays" :disabled="isshow">
                            <el-radio :disabled="(banben.versionName != '试用版') && (index == 0)" :label="item" v-for="(item,index) in radioLists" :key="index">{{item}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="form-item dis-flex justify-b mb-30 dis-flex-ac">
                    <div class="grid-tit">
                        <span>* </span>额外赠送空间</div>
                    <div class="demo-input-suffix" v-if="banben.versionName == '试用版'">
                        <span>试用版账号，使用公共空间，无法额外配置</span>
                    </div>
                    <div class="demo-input-suffix" v-else>
                        <span>当前版本赠送{{liuInputNum}}G空间，额外赠送</span>
                        <el-input placeholder="请输入内容" @change="liuInputChange($event)" v-model="storage" class="liuInput" :disabled="isshow">
                            <template slot="append">G</template>
                        </el-input>
                        <span class="coloreee">限制0.1-1000数值</span>
                    </div>
                </div>
                <div class="form-item dis-flex justify-b mb-30 dis-flex-ac">
                    <div class="grid-tit">
                        <span>* </span>选择地址：</div>
                    <div class="grid-content flex-1">
                        <VDistpicker :province="subAccount.province" :city="subAccount.city" :area="subAccount.district" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></VDistpicker>
                    </div>
                </div>
                <div class="form-item dis-flex justify-b mb-30 dis-flex-ac">
                    <div class="grid-tit">
                        <span>* </span>详细地址：</div>
                    <div class="grid-content flex-1">
                        <el-input v-model="subAccount.address" placeholder="请输入详细地址" type="textarea" :rows="2"></el-input>
                    </div>
                </div>
                <div class="txt-c">
                    <el-button type="success" class="save-btn mt-30" @click="addUser">保存</el-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
String.prototype.trim = function() {
    ///<summary>去掉字符串前后空格</summary>
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
import tit from "@/components/Htitle";
import upload from "@/components/Upload2";
import VDistpicker from "v-distpicker";
export default {
    data() {
        return {
            isshow: false,
            list: null,
            listLoading: true,
            banben: {
                versionName: "试用版"
            }, //版本
            liuInputNum: "0",
            storage: "",
            subAccount: {
                down: "", //流量
                account: "", //店铺账号
                address: "", //详细地址
                buyDays: 7, //有效期天数
                cardBackUrl: "", //身份证背面
                cardFrontUrl: "", //身份证正面
                cardId: "", //身份证号
                city: "", //市
                contact: "", //联系人
                district: "", //区
                id: "", //客户账号id
                phone: "", //电话
                province: "", //省
                weichatId: "", //微信号
                storage: 0, //空间
                addUser_state: false,
                versionId: 1
            },
            resDomain: "",
            radioLists: [7, 30, 90, 180, 360],
            radioLists2: []
        };
    },
    components: {
        tit,
        upload,
        VDistpicker
    },
    created() {
        let self = this;
        self.version();
        if (self.$route.query.id) {
            self.isshow = true;
            self.subAccount.id = self.$route.query.id;
            self.getAccount(self.$route.query.id);
        }
    },
    methods: {
        version() {
            this.$store.dispatch("version").then(res => {
                // self.loading = false;
                console.log("版本", res);
                if (res.code == 200) {
                    this.radioLists2 = res.data;
                }
            });
        },
        liuInputChange(e) {
            console.log("输入", Number(111));
            if (Number(e) || Number(e) == 0) {
                if (e > 1000) {
                    this.storage = 1000.0
                    this.subAccount.storage = (
                        1000 + Number(this.liuInputNum)
                    ).toFixed(1);
                } else if (e < 0.1) {
                    this.storage = 0.1
                    this.subAccount.storage = (
                        0.1 + Number(this.liuInputNum)
                    ).toFixed(1);
                } else {
                    this.subAccount.storage = (
                        Number(e) + Number(this.liuInputNum)
                    ).toFixed(1);
                }
            } else {
                console.log(1111);
                this.storage = "";
                this.$message.error("请输入数字");
            }
            console.log("输出", this.Liuliang);
            console.log("输出=>",this.storage)
        },
        getAccount(id) {
            let self = this;
            self.$store.dispatch("getAccount", { id: id }).then(res => {
                if (res.success) {
                    let data = res.data;
                    self.resDomain = data.resDomain;
                    self.subAccount = {
                        account: data.userMain.username, //店铺账号
                        address: data.userMain.userInfo.address, //详细地址
                        buyDays: data.userMain.buyDateLength, //有效期天数
                        cardBackUrl: data.userMain.userInfo.idCardBackUrl, //身份证背面
                        cardBackUrl_temp:
                            data.resDomain +
                            data.userMain.userInfo.idCardBackUrl, //身份证背面
                        cardFrontUrl: data.userMain.userInfo.idCardFrontUrl, //身份证正面
                        cardFrontUrl_temp:
                            data.resDomain +
                            data.userMain.userInfo.idCardFrontUrl, //身份证背面
                        cardId: data.userMain.userInfo.idCardNum, //身份证号
                        city: data.userMain.userInfo.city, //市
                        contact: data.userMain.userInfo.contact, //联系人
                        district: data.userMain.userInfo.district, //区
                        id: id, //客户账号id
                        phone: data.userMain.userInfo.phone, //电话
                        province: data.userMain.userInfo.province, //省
                        weichatId: data.userMain.userInfo.wechatId, //微信号
                        down: data.userMain.down, //流量
                        versionId: data.userMain.versionLevel //版本
                    };
                    console.log(
                        "11",
                        data.userMain.storage - this.radioLists2[1].storage
                    );
                    if (data.userMain.versionLevel == 1) {
                        
                        this.banben.versionName = "试用版";
                        this.liuInputNum = this.radioLists2[0].storage;
                        this.storage =
                            data.userMain.storage - this.radioLists2[0].storage;
                    } else if (data.userMain.versionLevel == 2) {
                        this.banben.versionName = "标准版";
                        this.liuInputNum = this.radioLists2[1].storage;
                        this.storage =
                            (data.userMain.storage - this.radioLists2[1].storage).toFixed(1);
                            
                    } else if (data.userMain.versionLevel == 3) {
                        this.banben.versionName = "专业版";
                        this.liuInputNum = this.radioLists2[2].storage;
                        this.storage =
                            (data.userMain.storage - this.radioLists2[2].storage).toFixed(1);
                    } else if (data.userMain.versionLevel == 4) {
                        this.banben.versionName = "高级版";
                        this.liuInputNum = this.radioLists2[3].storage;
                        this.storage =
                            (data.userMain.storage - this.radioLists2[3].storage).toFixed(1);
                    } else if (data.userMain.versionLevel == 5) {
                        this.banben.versionName = "豪华版";
                        this.liuInputNum = this.radioLists2[4].storage;
                        this.storage =
                            (data.userMain.storage - this.radioLists2[4].storage).toFixed(1);
                    }
                } else {
                    self.$message({
                        message: res.message,
                        type: "error"
                    });
                }
            });
        },
        radioChange(e) {
            this.subAccount.versionId = e.versionId;
            this.liuInputNum = e.storage;
            this.subAccount.down = e.down;
            console.log(e);
            if (e.versionName != "试用版" && this.subAccount.buyDays == 7) {
                this.subAccount.buyDays = 30;
            } else if (e.versionName == "试用版") {
                this.subAccount.buyDays = 7;
            }
        },
        onChangeProvince(data) {
            console.log(data);
            this.subAccount.province = data.value;
        },
        onChangeCity(data) {
            this.subAccount.city = data.value;
        },
        onChangeArea(data) {
            this.subAccount.area = data.value;
        },
        addUser() {
            let self = this;
            if (self.addUser_state) {
                return self.$message({
                    message: "请勿重复提交",
                    type: "error"
                });
            }
            self.addUser_state = true;
            if (self.subAccount.account.trim() == "") {
                self.addUser_state = false;
                return self.$message({
                    message: "请输入店铺账号",
                    type: "error"
                });
            }
            if (
                self.subAccount.cardBackUrl == "" ||
                self.subAccount.cardFrontUrl == ""
            ) {
                self.addUser_state = false;
                return self.$message({
                    message: "请上传的证件照片",
                    type: "error"
                });
            }
            if (self.subAccount.cardId == "") {
                self.addUser_state = false;
                return self.$message({
                    message: "请输入身份证号",
                    type: "error"
                });
            } else {
                let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                if (!reg.test(self.subAccount.cardId)) {
                    self.addUser_state = false;
                    return self.$message({
                        message: "请输入正确身份证号",
                        type: "error"
                    });
                }
            }
            if (self.subAccount.contact == "") {
                self.addUser_state = false;
                return self.$message({
                    message: "请输入联系人",
                    type: "error"
                });
            }
            if (self.subAccount.phone == "") {
                self.addUser_state = false;
                return self.$message({
                    message: "请输入电话",
                    type: "error"
                });
            } else {
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(self.subAccount.phone)) {
                    self.addUser_state = false;
                    return self.$message({
                        message: "请输入正确的电话",
                        type: "error"
                    });
                }
            }
            if (self.banben.versionName != "试用版" && self.subAccount.buyDays != 7 && self.storage == "") {
                self.addUser_state = false;
                return self.$message({
                    message: "额外流量必填!",
                    type: "error"
                });
            }
            if (self.subAccount.province == "" && self.subAccount.city == "") {
                self.addUser_state = false;
                return self.$message({
                    message: "请选择正确地址",
                    type: "error"
                });
            }
            if (self.subAccount.address.trim() == "") {
                self.addUser_state = false;
                return self.$message({
                    message: "请输入详细地址",
                    type: "error"
                });
            }
            if (self.$route.query.id) {
                self.subAccount["id"] = self.$route.query.id;
                self.$store
                    .dispatch("updateAccount", self.subAccount)
                    .then(res => {
                        self.addUser_state = false;
                        if (res.success) {
                            self.$router.push({ name: "Tree" });
                        } else {
                            self.$message({
                                message: res.message,
                                type: "error"
                            });
                        }
                    });
            } else {
                self.$store
                    .dispatch("createAccount", self.subAccount)
                    .then(res => {
                        self.addUser_state = false;
                        if (res.code == 200) {
                            self.$router.push({ name: "Tree" });
                        } else {
                            self.$message({
                                message: res.message,
                                type: "error"
                            });
                        }
                    });
            }
        }
    }
};
</script>
<style leng="scss">
.save-btn {
    width: 120px;
}

.liuInput {
    width: 185px !important;
    margin: 0 10px;
}

.color-1 {
    color: #27bdc1;
    margin-right: 5px;
}
.template-form {
    background-color: #ffffff;
    width: 100%;
}
.demo-input-suffix span {
    font-size: 14px;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
}
.demo-input-suffix .coloreee {
    color: #9b9b9b;
}
.form .justify-b {
    display: block;
}
.form .img-desc {
    padding-bottom: 10px;
}
.grid-tit {
    padding-bottom: 5px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
}
.form {
    width: 710px;
}
.formBox {
    display: block;
    clear: both;
    overflow: hidden;
}
.formBox .dis-flex-ac {
    float: left;
    width: 48%;
}
.main-upload {
    text-align: left;
}
.mr-10 {
    margin-right: 4%;
}
.boxBtn2 .el-radio-group {
    width: 100%;
}
.boxBtn2 .el-radio-button {
    margin-right: 20px;
}
.boxBtn2 .el-radio-button .el-radio-button__inner {
    width: 102px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-shadow: none;
}

.boxBtn2 .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background: #fff;
    border-color: #00b4b9;
    color: #00b4b9;
}
.boxBtn2 .el-radio-button__inner:hover {
    border: 1px solid #00b4b9;
}
</style>