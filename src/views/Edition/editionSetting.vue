<template>
    <div class="app-container">
        <tit></tit>
        <div class="mainBox">
            <div class="title" v-if="banbenid==1">试用版</div>
            <div class="title" v-if="banbenid==2">标准版</div>
            <div class="title" v-if="banbenid==3">专业版</div>
            <div class="title" v-if="banbenid==4">高级版</div>
            <div class="title" v-if="banbenid==5">豪华版</div>
            <div class="smallTitle">以下功能在该版本中禁用，并不可启用</div>
            <div class="dialogBOx">
                <div class="midLine"></div> 
                <template v-for="(item,index) in Module">
                    <div class="dialogLeftBOx" v-if="item.state==1">
                        <dl>
                            <dt><i class="iconfont color-2">&#xe660;</i>{{item.functionName}}</dt>
                            <dd>{{item.explain}}</dd>
                        </dl>
                    </div>
                </template>
            </div>
            <div class="smallTitle">以下功能在该版本中禁用，可开启</div>
            <el-alert title="功能一旦开启并保存后，则无法关闭，且所有该版本账号均会启用该功能，请谨慎配置" type="warning" :closable="false" show-icon> </el-alert>
            <div class="Title">营销功能</div>
            <div class="dialogBOx dialogBOxB">
                <div class="midLine"></div> 
                <template v-for="(item,index) in Module">
                    <div class="dialogLeftBOx" v-if="item.state!=1">
                        <dl>
                            <dt v-if="item.state==3">
                                <el-checkbox :disabled="item.state==3" v-model="item.state==3">{{item.functionName}}</el-checkbox>
                            </dt>
                            <dt v-else>
                                <el-checkbox v-model="item.checked" @change="checkboxChange($event , item.functionId , item.functionName)">{{item.functionName}}</el-checkbox>
                            </dt>
                            <dd>{{item.explain}}</dd>
                        </dl>
                    </div>
                </template>
            </div>
            <div class="txt-c">
                <el-button @click="dialogFunction = false" class="save-btn mt-30 canceld">取 消</el-button>
                <el-button @click="save" type="success" class="save-btn mt-30">保 存</el-button>
            </div>
        </div>

        <el-dialog title="提示" :visible.sync="dialogShure" width="500px">
            <div style="text-align: center;">功能配置有改动，确认继续保存吗？</div>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel shureOpen" @click="dialogShure = false">取 消</el-button>
                <el-button class="shureOpen" type="primary" @click="dialogSave">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="dialogFunction" width="500px">
            <div style="text-align: center;">确认将<span v-for="(item,index) in functionNameList" :key="index">【{{item}}】</span>功能开启吗，如若开启则该账号会启用该功能。</div>
            <div class="smallFunction">启用并保存后无法关闭，需谨慎。</div>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel shureOpen" @click="dialogFunction = false">取 消</el-button>
                <el-button class="shureOpen" type="primary" @click="dialogSaveshure">继续保存</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>
import tit from "@/components/Htitle";
export default {
    data() {
        return {
            banbenid:1, //版本id
            Module: "",
            id: "",
            checkboxList: [],
            functionNameList: [],
            dialogFunction: false,
            dialogShure: false
        };
    },
    components: {
        tit
    },
    created() {
        let self = this;
        let id = self.$route.query.id;
        self.banbenid = self.$route.query.id;
        self.id = id;
        self.getAccount(id);
    },
    methods: {
        getAccount(id) {
            this.id = id;
            this.$store
                .dispatch("versionFunction", {
                    versionId: id
                })
                .then(res => {
                    this.dialogUpgrade = false;
                    console.log("版本管理 功能配置查询", res);
                    if (res.code == 200) {
                        this.Module = res.data.forEach(val => {
                            val.checked = false;
                        });
                        this.Module = res.data;
                        console.log(this.Module);
                    } else {
                        this.$message.error(res.message);
                    }
                });
        },
        //单选钮
        checkboxChange(e, id, name) {
            console.log(e);
            console.log(id);
            console.log(name);
            if (e) {
                this.checkboxList.push(id);
                this.functionNameList.push(name);
            } else {
                for (var i = 0; i < this.functionNameList.length; i++) {
                    if (this.functionNameList[i] == name) {
                        this.functionNameList.splice(i, 1);
                    }
                }
                for (var i = 0; i < this.checkboxList.length; i++) {
                    if (this.checkboxList[i] == id) {
                        this.checkboxList.splice(i, 1);
                    }
                }
            }
        },
        //保存配置
        save() {
            console.log(this.checkboxList, this.xuqiId, this.functionNameList);
            if (this.checkboxList == "") {
            } else {
                this.dialogShure = true;
            }
        },
        //配置弹窗确认弹窗
        dialogSave() {
            this.dialogShure = false;
            this.dialogFunction = true;
        },
        dialogSaveshure() {
            let zzr = this.checkboxList.join(",");
            this.$store
                .dispatch("versionFunctionSave", {
                    versionId: this.id,
                    funs: zzr
                })
                .then(res => {
                    console.log("版本功能保存接口", res);
                    if (res.code == 200) {
                        this.checkboxList=[]
                        this.dialogFunction = false;
                        this.$message({
                            message: "功能调整成功",
                            type: "success"
                        });
                        this.getAccount(this.id)
                    } else {
                        this.$message.error(res.message);
                    }
                });
        }
    }
};
</script>
<style lang="scss">
.shureOpen {
    padding: 12px 0 !important;
    width: 135px;
    text-align: center;
}
.mainBox {
    background: #fff;
    padding: 20px 30px 38px 30px;
    .title {
        font-size: 16px;
        font-weight: 600;
        font-family: PingFangSC-Regular;
        color: rgba(74, 74, 74, 1);
        padding-bottom: 40px;
    }
    .smallTitle {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        padding-bottom: 6px;
    }
    .Title {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
    }
}
.smallFunction {
    font-size: 14px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 25px;
    text-align: center;
    padding-top: 5px;
}
.color-2 {
    color: #f42c21;
    padding-right: 11px;
}
.el-col-2 {
    width: 150px;
}
.el-col-3 {
    width: 250px;
}
.dialogBOx {
    width: 100%;
    overflow: hidden;
    margin: 20px 0 45px 0;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-between;
    position: relative;
}
.midLine{
    width: 1px;
    height: 100%;
    background: #E6E6E6;
    position: absolute;
    left: 50%;
    top: 0;
}
.dialogLeftBOx {
    width: 45%;
    // border-right: 1px solid rgba(230, 230, 230, 1);
    flex: 0 0 45%;
}
.dialogLeftBOx .el-checkbox__input.is-checked + .el-checkbox__label {
    color: rgba(74, 74, 74, 1);
}
.dialogLeftBOx .el-checkbox__inner:hover {
    border-color: #00b4b9;
}
.dialogLeftBOx .el-checkbox__input.is-checked .el-checkbox__inner,
.dialogLeftBOx .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #00b4b9;
    border-color: #00b4b9;
}
.dialogLeftBOx .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #00b4b9;
    border-color: #00b4b9;
}
.dialogLeftBOx
    .el-checkbox__input.is-disabled.is-checked
    .el-checkbox__inner::after {
    border-color: #fff;
}
.dialogLeftBOx .el-checkbox__input.is-disabled + span.el-checkbox__label {
    font-size: 16px;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    line-height: 22px;
}
.dialogLeftBOx .el-checkbox__label {
    padding-left: 14px;
}
.dialogRightBOx {
    width: 45%;
    // float: left;
}
.dialogRightBOx dl {
    padding-left: 20px;
}
.dialogBOx dl dd {
    padding: 0 0 5px 28px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 20px;
}
.dialogBOx dl dt {
    padding: 0 0 5px 0;
    font-size: 16px;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
}
.dialogBOxB dl dt .el-checkbox__label {
    font-size: 16px;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
}
.dialogBOxB {
    margin-bottom: 0;
    padding-bottom: 0;
    display: flex;
    justify-content: space-between;
}
.dialogBOx dl {
    margin-bottom: 30px;
}
.color-1 {
    color: #27bdc1;
    margin-right: 5px;
}
.line {
    text-align: center;
}
.right_btn {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 180, 185, 1);
    float: left;
    padding-right: 10px;
    cursor: pointer;
}
.peizhi {
    padding: 0 0 14px 0;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    margin-bottom: 40px;
    overflow: hidden;
    clear: both;
}
.el-alert--warning {
    margin: 10px 0 20px 0;
}
.demo-input-suffix {
    padding-top: 10px;
}
.el-alert__title {
    font-size: 12px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
}
.el-input-group {
    width: 65%;
    margin-right: 10px;
}
.demo-input-suffix {
    display: flex;
    // justify-content: space-around;
    align-items: center;
}

.cancel {
    border: 1px solid #27bdc1 !important;
    color: #27bdc1 !important;
    background-color: #fff !important;
}
.cancel:hover {
    border: 1px solid #27bdc1 !important;
    color: #27bdc1 !important;
    background-color: #fff !important;
}
.cancel:active {
    border: 1px solid #27bdc1 !important;
    color: #27bdc1 !important;
    background-color: #fff !important;
}
.save-btn {
    width: 120px;
}
.canceld{
    border: 1px solid #27bdc1 !important;
    color: #27bdc1 !important;
    background-color: #fff !important;
}
.canceld:hover{
    border: 1px solid #27bdc1 !important;
    color: #27bdc1 !important;
    background-color: #fff !important;
}
.canceld:visited{
    border: 1px solid #27bdc1 !important;
    color: #27bdc1 !important;
    background-color: #fff !important;
}
.canceld:link{
    border: 1px solid #27bdc1 !important;
    color: #27bdc1 !important;
    background-color: #fff !important;
}
.canceld:active{
    border: 1px solid #27bdc1 !important;
    color: #27bdc1 !important;
    background-color: #fff !important;
}
.canceld:focus{
    border: 1px solid #27bdc1 !important;
    color: #27bdc1 !important;
    background-color: #fff !important;
}
.el-dialog__footer {
    padding: 10px 20px !important;
    background: rgba(250, 250, 250, 1);
}
.txt-c{
    padding-top: 30px;
}
.dialogLeftBOx .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #E6E6E6;
    border-color: #E6E6E6;
}
</style>