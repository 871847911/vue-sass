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
                                <el-checkbox :disabled="true" v-model="item.state==3">{{item.functionName}}</el-checkbox>
                            </dt>
                            <dt v-else>
                                <el-checkbox :disabled="true" v-model="item.checked" @change="checkboxChange($event , item.functionId , item.functionName)">{{item.functionName}}</el-checkbox>
                            </dt>
                            <dd>{{item.explain}}</dd>
                        </dl>
                    </div>
                </template>
            </div>
        </div>

    </div>

</template>

<script>
import tit from "@/components/Htitle";
export default {
    data() {
        return {
            banbenid:1, //版本id
            Module: "",
            checkboxList: [],
            functionNameList: []
        };
    },
    components: {
        tit
    },
    created() {
        let self = this;
        let id = self.$route.query.id;
        self.id = id;
        self.banbenid = self.$route.query.id;
        self.getAccount(id);
    },
    mounted() {},
    methods: {
        getAccount(id) {
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
    }
};
</script>
<style lang="scss">
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
    font-size: 18px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 25px;
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
.dialogBOxB dl {
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
.selectBox {
    width: 100%;
    padding: 15px 0 40px 0;
}
.selectBox .el-select {
    width: 100%;
}
.peizhi .lf {
    font-size: 14px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    float: left;
}
.peizhi .ri {
    font-size: 14px;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    float: right;
}
.dialogLeftBOx .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #E6E6E6;
    border-color: #E6E6E6;
}
</style>