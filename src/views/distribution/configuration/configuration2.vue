<template>
  <div class="app-container">
    <tit></tit>
    <AuthorizationPublic v-if="authData.status === 1" :authData="authData" @refresh="init" />
    <UnAuthorization  v-if="authData.status !== undefined && authData.status === 0 || authData.status === null" :unType="'public'" @refresh="init" />
  </div>
</template>
<script>
import api from "@/api/distribution";
import { mapGetters } from "vuex";
import tit from "@/components/Htitle";
import AuthorizationPublic from "./AuthorizationPublic";
import UnAuthorization from "./UnAuthorization";
export default {
  name: "AuthPublic",
  data() {
    return {
      authData: {}
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  components:{
    AuthorizationPublic,
    UnAuthorization,
    tit
  },
  created(){
    this.init()
  },
  methods: {
    init(isToast){
      let data = {
        
      };
      api.getAuthorizerInfo(data).then(res => {
        console.log(res)
        self.loading = false;
        if (res.serviceCode=="E000000000") {
          this.authData = res.data
          if(isToast){ this.$message.success('授权成功！') }
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