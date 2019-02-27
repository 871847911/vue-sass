<template>
  <div class="app-container">
    <tit></tit>
    <div class="editingDetails">
      <span>赚钱秘籍</span>
      <p><i class="iconfont">&#xe680;</i><span>{{getTime(Vdate)}}</span></p>
      <div v-html="Vtext">

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
      activeName: "second",
      Vtext:'',
      Vdate:''
    };
  },
  created() {
    this.getCatalogPage();
  },
  mounted() {},
  methods: {
    getTime(time){
          let newTime = Number(time)
        let date = new Date(newTime);
        let year = date.getFullYear();
        let month = date.getMonth()<10?"0"+(date.getMonth()+1):(date.getMonth()+1);
        let weekArray = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
        let weeks = weekArray[date.getDay()];
        let day = date.getDate()<10?"0"+date.getDate():date.getDate();
        let h = date.getHours()<10?"0"+date.getHours():date.getHours();
        let m = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
        return year+"-"+month+"-"+day+" "+h+":"+m;
	  },
    getCatalogPage() {
      let self = this;
      let data = {};
      api.imageText(data).then(res => {
        console.log(res);
        if (res.serviceCode == "E000000000") {
          self.Vtext = res.data.text
          self.Vdate = res.data.createTime
          
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.editingDetails {
  background: #ffffff;
  padding: 40px 20px 140px 20px;
  
  span{
    font-size:18px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(74,74,74,1)
  }
  p{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(155,155,155,1);
    padding: 10px 0 30px 0;
    .iconfont{
      font-size: 16px;
      margin-right: 6px;
      line-height: 22px;
    }
    span{
      font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(155,155,155,1);
    }
  }
}
</style>