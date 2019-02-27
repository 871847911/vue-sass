<template>
    <div class="app-container">
        <tit></tit>
        <div class="table">
            <el-table :data="tableData" stripe v-loading="loading">
                <el-table-column label="版本名称" width=" 160">
                    <template slot-scope="scope">
                        {{scope.row.versionName}}
                    </template>
                </el-table-column>
                <el-table-column label="商户账号数" width=" 160">
                    <template slot-scope="scope">
                        {{scope.row.totalAccount}}
                    </template>
                </el-table-column>
                <el-table-column label="使用中账号数" width=" 160">
                    <template slot-scope="scope">
                        {{scope.row.usingAccount}}
                    </template>
                </el-table-column>
                <el-table-column label="已过期" width=" 160">
                    <template slot-scope="scope">
                        {{scope.row.overdueAccount}}
                    </template>
                </el-table-column>
                <el-table-column label="每月赠送存储空间（G）" width=" 220">
                    <template slot-scope="scope">
                        {{scope.row.storage}}
                    </template>
                </el-table-column>
                <el-table-column label="每月赠送下行流量（G）" width=" 220">
                    <template slot-scope="scope">
                        {{scope.row.down}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div @click="editionDetail(scope.row.versionId)" class="right_btn">查看功能列表</div>
                        <div @click="editionSeting(scope.row.versionId)" class="right_btn">功能配置</div>
                        <div @click="dialogXuqi(scope.row.versionId)" class="right_btn">配置空间流量</div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="prev, pager, next,sizes,jumper" :total="total" background>
            </el-pagination> -->
        </div>
        <el-dialog title="提示" :visible.sync="dialoghtishi" width="30%">
            <div style="text-align: center;" v-if="currentVersion==3">专业版账号，全功能开放，无法配置</div>
            <div style="text-align: center;" v-if="currentVersion==4">高级版账号，全功能开放，无法配置</div>
            <div style="text-align: center;" v-if="currentVersion==5">豪华版账号，全功能开放，无法配置</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialoghtishi = false">知道了</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialoghtishi2" width="30%">
            <div style="text-align: center;">试用版使用公共空间，无需配置。</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialoghtishi2 = false">知道了</el-button>
            </span>
        </el-dialog>
        <el-dialog title="配置空间流量" :visible.sync="dialogLiuliang" width="35%">
            <span class="ri" v-if="currentVersion==1">试用版</span>
            <span class="ri" v-if="currentVersion==2">标准版</span>
            <span class="ri" v-if="currentVersion==3">专业版</span>
            <span class="ri" v-if="currentVersion==4">高级版</span>
            <span class="ri" v-if="currentVersion==5">豪华版</span>
            <div class="kongjian">赠送的存储空间只影响新创建的账号，不会影响已创建的账号 赠送下行流量会在下个月按该配置的赠送流量值进行赠送，新开商户立即生效</div>
            <div class="kongjian">试用账号因仅用于试用或测试，故赠送的流量不可修改。且账号失效后会停用流量账号 该值为默认值，如需对单个账号进行额外赠送，请前往客户账号列表</div>
            <span class="icon"></span>
            <span class="icon"></span>
            <span class="icon">每个商户赠送存储空间</span>
            <div class="demo-input-suffix">
                <el-input placeholder="" @change="liuInputChange($event)" v-model="Liuliang">
                    <template slot="append">G</template>
                </el-input>
                限制0.1-1000数值
            </div>
            <span class="icon">每个商户赠送下行流量</span>
            <div class="demo-input-suffix">
                <el-input placeholder="" @change="liuInputChange2($event)" v-model="Liuliang2">
                    <template slot="append">G</template>
                </el-input>
                限制0.1-1000数值
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel" @click="dialogLiuliang = false">取 消</el-button>
                <el-button type="primary" @click="LiuliangUpdate()">保 存</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import tit from "@/components/Htitle";
export default {
    data() {
        return {
            value: "",
            Liuliang: "",
            upgrade: "",
            isOpen: true,
            isEnabled: "",
            page: "",
            tableData: null,
            total: null,
            pageSize: 10,
            account: "", //用户名
            loading: false,
            dialoghtishi: false,
            currentVersion: "",
            dialogLiuliang: false,
            Liuliang: "",
            Liuliang2: "",
            dialoghtishi2: false,
            LiuliangSave:false,
            LiuliangSave2:false
        };
    },
    components: {
        tit
    },
    mounted() {
        this.getQuerySubAccount();
    },
    methods: {
        getQuerySubAccount() {
            this.$store.dispatch("version").then(res => {
                // self.loading = false;
                console.log("版本", res);
                if (res.code == 200) {
                    this.tableData = res.data;
                }
            });
        },
        editionDetail(id) {
            console.log(id);

            this.$router.push({ name: "EditionDetail", query: { id: id } });
        },
        editionSeting(id) {
            this.currentVersion = id;
            if (id > 2) {
                this.dialoghtishi = true;
            } else {
                this.$router.push({
                    name: "EditionSetting",
                    query: { id: id }
                });
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            let self = this;
            self.tableData = null;
            self.getQuerySubAccount(1, val);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let self = this;
            self.tableData = null;
            self.getQuerySubAccount(val);
        },
        currentPage(val) {
            console.log(val);
        },
        dialogXuqi(id) {
            this.currentVersion = id;
            if (id == 1) {
                this.dialoghtishi2 = true;
            } else {
                this.dialogLiuliang = true;
            }
        },
        liuInputChange(e) {
            console.log("输入", Number(111));
            if (Number(e) || Number(e) == 0) {
                if (e > 1000) {
                    this.Liuliang = 1000.0;
                } else if (e < 0.1) {
                    this.Liuliang = 0.1;
                } else {
                    this.Liuliang = Number(e).toFixed(1);
                }
                this.LiuliangSave = true;
            } else {
                console.log(1111);
                this.Liuliang = "";
                this.LiuliangSave = false;
            }
            console.log("输出", this.Liuliang);
        },
        liuInputChange2(e) {
            console.log("输入", Number(111));
            if (Number(e) || Number(e) == 0) {
                if (e > 1000) {
                    this.Liuliang2 = 1000.0;
                } else if (e < 0.1) {
                    this.Liuliang2 = 0.1;
                } else {
                    this.Liuliang2 = Number(e).toFixed(1);
                }
                this.LiuliangSave2 = true;
            } else {
                console.log(1111);
                this.Liuliang2 = "";
                this.LiuliangSave2 = false;
            }
            console.log("输出", this.Liuliang);
        },

        LiuliangUpdate() {
            if (this.LiuliangSave&&this.LiuliangSave2) {
                this.$store
                    .dispatch("storageFlow", {
                        versionId: this.currentVersion,
                        storage: this.Liuliang,
                        down: this.Liuliang2
                    })
                    .then(res => {
                        // self.loading = false;
                        console.log("流量配置保存", res);
                        if (res.code == 200) {
                            this.dialogLiuliang = false;
                            this.getQuerySubAccount();
                            this.$message({
                                message: "流量配置成功",
                                type: "success"
                            });
                        } else {
                            this.$message.error(res.message);
                        }
                    });
            }else{
                this.$message.error("请输入数字");
            }
        }
    }
};
</script>
<style lang="scss">
.el-input-group {
    width: 65%;
    margin-right: 10px;
}
span.ri {
    font-size: 14px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    line-height: 20px;
}
.right_btn {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 180, 185, 1);
    float: left;
    padding-right: 20px;
    cursor: pointer;
}
.kongjian {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 20px;
    margin: 20px 0;
}
.demo-input-suffix {
    display: flex;
    // justify-content: space-around;
    align-items: center;
    padding: 8px 0 20px 0;
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
</style>