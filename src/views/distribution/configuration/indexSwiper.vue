<template>
	<div class="app-container">
		<tit></tit>
		<div class="indexSwiper">
			<el-tabs
				v-model="activeName"
				@tab-click="handleClickItem"
			>
				<el-tab-pane
					label="公众号配置"
					name="first"
				></el-tab-pane>
				<el-tab-pane
					label="图文管理"
					name="second"
				></el-tab-pane>
				<el-tab-pane
					label="客服二维码"
					name="third"
				></el-tab-pane>
				<el-tab-pane
					label="首页轮播图"
					name="forth"
				></el-tab-pane>
			</el-tabs>
			<div class="addCode">
				<el-button
					type="primary"
					@click="addSwiper"
				>添加轮播图</el-button>
			</div>
			<div class="table">
				<el-table
					:data="tableData"
					stripe
					style="width: 100%"
					v-loading="loading"
				>
					<el-table-column width="120" label="序号">
						<template slot-scope="scope">
							{{scope.row.sequenceNumber}}
						</template>
					</el-table-column>
					<el-table-column label="轮播图">
						<template slot-scope="scope">
							<div class="scope-icon">
								<img
									:src="$store.state.user.roles.resDomain+scope.row.url"
									width="100%"
								/>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="关联商品">
						<template slot-scope="scope">
							{{scope.row.productName}}
						</template>
					</el-table-column>
					<el-table-column label="是否上线">
						<template slot-scope="scope">
							<el-switch
								v-model="scope.row.status"
								:active-value="1"
								:inactive-value="0"
								@change="switchChange($event,scope.row)"
								active-color="rgba(39,189,193,0.15)"
								inactive-color="#C7C7C7"
							></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<div
								class="green"
								@click="handleClickTrue(scope.row)"
							>编辑</div>
							<div
								class="green refuse"
								@click="handleClickFalse(scope.row)"
							>删除</div>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize"
					layout="prev, pager, next,sizes,jumper"
					:total="total"
					background
				>
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import api from "@/api/distribution";
	import { mapGetters } from "vuex";
	import tit from "@/components/Htitle";
	export default {
		methods: {},
		components: {
			tit
		},
		computed: {
			...mapGetters(["roles"])
		},
		data() {
			return {
				activeName: "forth",
				code: "", //课程编号
				page: 1,
				tableData: null,
				total: null,
				pageSize: 10,
				name: "", //课程名称
				loading: false
			};
		},
		created() {
			this.getCatalogPage(1);
		},
		mounted() {},
		methods: {
			//编辑页
			goEdit() {
				console.log(111);
				this.$router.push({ name: "graphicEditing" });
			},
			//查看图文内容
			goDetail() {
				this.$router.push({ name: "editingDetails" });
			},
			handleClickItem(tab, event) {
				console.log(tab.name);
				if (tab.name == "first") {
					this.$router.push({ name: "configuration" });
				} else if (tab.name == "second") {
					this.$router.push({ name: "management" });
				} else if (tab.name == "third") {
					this.$router.push({ name: "qrCode" });
				}
			},
			getCatalogPage(page = 1, pageSize) {
				let self = this;
				if (self.loading) {
					return this.$message({
						message: "正在查询中,请勿重复点击查询",
						type: "error"
					});
				}
				let data = {
					pageNum: page || self.page,
					pageSize: pageSize || self.pageSize
				};
				self.loading = true;

				api.selectBanners(data).then(res => {
					console.log(res);
					self.loading = false;
					if (res.serviceCode == "E000000000") {
						self.total = res.data.total;
						self.page = res.data.page;
						// self.pageSize = res.data.pageSize;
						self.tableData = res.data.list;
					} else {
						this.$message({
							type: "error",
							message: res.message
						});
					}
				});
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				let self = this;
				self.tableData = null;
				self.getCatalogPage(1, val);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				let self = this;
				self.tableData = null;
				self.getCatalogPage(val);
			},
			//switch
			switchChange(e, n) {
				console.log(e, n);
				let data = {
					id: n.id,
					status: e
				};
				api.editBanner(data).then(res => {
					if (res.serviceCode == "E000000000") {
						this.$message({
							type: "success",
							message: "修改成功"
						});
					} else {
						this.$message({
							type: "error",
							message: res.message
						});
					}
				});
			},
			//编辑
			handleClickTrue(val) {
				console.log(val);
				this.$router.push({
					name: "edtingSwiper",
					query: {
						lbname: val.productName, //名称
						lbxuhao: val.sequenceNumber, //序号
						catalogUrl: val.url,
						accountStatus: val.status,
						productId: val.productId,
						id: val.id
					}
				});
			},
			//删除
			handleClickFalse(val) {
				let data = {
					id: val.id
				};
				api.deleteBanner(data).then(res => {
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
			//新增轮播图
			addSwiper() {
				this.$router.push({ name: "addSwiper" });
			}
		}
	};
</script>
<style lang="scss">
	.indexSwiper {
		background: #ffffff;
		padding: 10px 20px 140px 20px;
		position: relative;
		.addCode {
			position: absolute;
			right: 20px;
			top: 10px;
			.el-button {
				padding: 8px 20px;
			}
		}
		.table {
			padding: 0;
			.scope-icon {
				width: 100px;
				height: 60px;
				margin: 0 auto;
				background: #fff;
				display: flex;
				align-items: center
			}
			table{
				th{
					text-align: center
				}
				td{
					text-align: center
				}
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
			.green {
				color: #00b4b9;
				cursor: pointer;
				display: inline-block;
			}
			.refuse {
				margin-left: 20px;
			}
		}
	}
</style>
