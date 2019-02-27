<template>
    <div class="choose__shoppingDalog_show">
	    <el-dialog class="choose_shopping_dalog_box" title="选择分销商品" :show-close="false" :visible.sync="chooseShoppingShowComp" width="50%">
		    <div class="dalog_main_box">
			    <div class="dalog_serch_box">
				    <el-input v-model.trim="cShoppingDalogSerchVal" class="shopping_inp" placeholder="商品名称"></el-input>
				    <el-button type="primary" class="serch_btn" @click="chooseShoppingDalogApiFunc">搜索</el-button>
			    </div>
			    <el-table ref="chooseShoppingDalogTable" :data="chooseShoppingDalogTableData" highlight-current-row style="width: 100%;margin-top : 10px;">
				    <el-table-column property="courseId" width="120">
					    <template slot-scope="scope">
						    <el-radio :label="scope.$index" v-model="templateRadio" @change.native="handleCurrentChange(scope.$index,scope.row.peddleGoodsId)">&nbsp</el-radio>
					    </template>
				    </el-table-column>
				    <el-table-column label="商品名称" property="courseName">
						<template slot-scope="scope">
						    {{scope.row.goodsName}}
					    </template>
					</el-table-column>
				    <el-table-column label="类型" property="classifyType">
					    <template slot-scope="scope">
						    <!-- {{scope.row.classifyType}} -->
							课程
					    </template>
				    </el-table-column>
			    </el-table>
			    <div class="pagination">
				    <el-pagination
					    @current-change="handldPageChange"
					    :current-page.sync="chooseShoppingDalogPageData.page"
					    :page-sizes="[10]"
					    :page-size="chooseShoppingDalogPageData.size"
					    layout="prev, pager, sizes,  next , jumper"
					    :total="chooseShoppingDalogPageData.total">
				    </el-pagination>
			    </div>
		    </div>

		    <span slot="footer" class="dialog-footer">
			    <el-button class="cancel" @click="chooseShoppingShowComp = false">取 消</el-button>
			    <el-button type="primary" @click="toApplyShoppingPage">确 定</el-button>
		    </span>
	    </el-dialog>
    </div>
</template>

<script>
	import api from "@/api/distribution";
	import { mapGetters } from "vuex";
export default {
    name: 'choose__shoppingDalog_show',
    data () {
        return {
	        cShoppingDalogSerchVal : null,//选择分销商品 - 商品名称
	        chooseShoppingDalogTableData: [],//选择分销商品 - 商品列表
	        chooseShoppingDalogPageData : {
		        page : 1,
		        size : 10,
		        total : null
	        },
			templateRadio : null,
			dalogCourseId : null
        }
	},
	created(){
		this.chooseShoppingDalogApiFunc();
	},
	computed : {
		chooseShoppingShowComp : {
			get(){
				return this.$store.state.distribution.dalogShow
			},
			set(val){
				this.$store.commit("changeDalogShow" , val)
			}
		},
		courseId : {
			get(){
				return this.$store.state.distribution.courseId;
			},
			set(val){
				this.$store.commit("getcourseId" , val)
			}
		}
	},
    methods: {
	    //选择分销商品列表
	    chooseShoppingDalogApiFunc(page = 1, pageSize = 10){
		    let self = this;
			if (self.loading) {
					return this.$message({
					message: "正在查询中,请勿重复点击查询",
					type: "error"
				});
			}
			let data = {
				page: page || self.page,
				pageSize: pageSize || self.pageSize,
				keyword : this.cShoppingDalogSerchVal,
			};
			self.loading = true;
			api.rotationGoodsChoice(data).then(res => {
				console.log(res)
				self.loading = false;
				if (res.serviceCode=="E000000000") {
					self.total = res.data.total;
					self.page = res.data.page;
					// self.pageSize = res.data.pageSize;
					self.chooseShoppingDalogTableData = res.data.list;
				} else {
					this.$message({
						type: "error",
						message: res.message
					});
				}
			});
	    },
		handleCurrentChange(index , courseId) {
			this.templateRadio = index;
			this.dalogCourseId = courseId
		},
	    toApplyShoppingPage(){
	    	if(this.dalogCourseId){
	    		this.courseId = this.dalogCourseId;
				this.chooseShoppingShowComp = false;
		    }else{
	    		this.$message.error("请选择分销商品")
			}
			

	    },
	    //分页改变
	    handldPageChange(page){
		    this.chooseShoppingDalogPageData.page = page
		    this.chooseShoppingDalogApiFunc();
	    }
	},
	destroyed(){
		this.$store.commit("changeDalogShow" , false);
    },
}
</script>

<style lang="stylus" >
	.choose__shoppingDalog_show{
		.choose_shopping_dalog_box{
			.dalog_main_box{
				width : 100%;
				.pagination{
					overflow hidden;
				}
				.dalog_serch_box{
					.shopping_inp{
						width:300px;
						margin-right: 10px;
					}
				}
				.dian{
					width:24px;
					height:24px;
					border : 1px solid #AEB8BE;
					border-radius 50%;
					text-align  : center;
					line-height : 24px;
					.dian_line{
						display : inline-block;
						width:12px;
						height:12px;
						background : #6CDDC7;
						border-radius : 50%;
					}
				}
				
			}
			.pagination{
				text-align : right ;
				margin-top:20px;
			}

		}
		.el-dialog__footer{
			background:#FAFAFA;
			.el-button{
				padding :10px 30px;

			}
			.cancel {
                padding: 10px 25px;
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
