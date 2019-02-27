<template>
  <div class="app-container">
    <tit></tit>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClickItem">
            <el-tab-pane label="公众号配置" name="first"></el-tab-pane>
            <el-tab-pane label="图文管理" name="second"></el-tab-pane>
            <el-tab-pane label="客服二维码" name="third"></el-tab-pane>
            <el-tab-pane label="首页轮播图" name="forth"></el-tab-pane>
        </el-tabs>
        <div class="howToGetMoney">
            <el-dropdown trigger="click" size="mini">
                <span class="el-dropdown-link">
                    <i class="iconfont">&#xe62b;</i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item @click.native="goEdit">编辑</el-dropdown-item>
                    <el-dropdown-item @click.native="goDetail">查看</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            <div class="yuan">
                <i class="iconfont">&#xe67e;</i>
            </div>
            <p>赚钱秘籍</p>
        </div>
    </div>
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
      activeName: 'second',
    };
  },
  created() {
    // this.getCatalogPage(1);
  },
  mounted(){
  },
  methods: {
    //编辑页
    goEdit(){
        console.log(111)
      this.$router.push({ name: "graphicEditing" });
    },
    //查看图文内容
    goDetail() {
      this.$router.push({ name: "editingDetails" });
    },
    handleClickItem(tab, event) {
        console.log(tab.name);
        if(tab.name=="first"){
            this.$router.push({ name: "configuration" });
        }else if(tab.name=="third"){
            this.$router.push({ name: "qrCode" });
        }else if(tab.name=="forth"){
            this.$router.push({ name: "indexSwiper" });
        }
    },
  }
};
</script>
<style lang="scss">
.container{
    background: #ffffff;
    padding: 10px 20px 140px 20px;
    .howToGetMoney{
        width:260px;
        height:300px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);
        border-radius:5px;
        margin-top: 20px;
        // position: relative;
        // padding-top: 75px;
        overflow: hidden;
        .yuan{
            width:150px;
            height:150px;
            background:rgba(249,250,249,1);
            border-radius: 50%;
            margin: 0 auto;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content:center;
            margin-top: 75px;
            .iconfont{
                font-size: 60px;
                color: #27BDC1;
            }
        }
        p{
            font-size:16px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(74,74,74,1);
            text-align: center;
            padding-top: 16px;
        }
        
        .el-dropdown{
            float: right;
            
            i{  
                display: block;
                text-align: right;
                margin-right: 10px;
                margin-top: 5px;
                cursor: pointer;
            }
        }
    }
}
</style>