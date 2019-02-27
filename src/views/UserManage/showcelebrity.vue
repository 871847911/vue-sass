<template>
  <div class="app-container">
    <tit></tit>
    <div class="template-form">
      <div class="container">
        <div class="hd dis-flex">
          <div class="hd-l">
            <img :src="roles.resDomain+ruleForm.photoUrl" />
          </div>
          <div class="hd-r flex-1 overflow-h">
            <div class="dis-flex flex-direction justify-b h100">
              <h2>{{ruleForm.name}}
                <el-tag type="success" style="vertical-align: bottom;" class="ml-10">{{ruleForm.job}}</el-tag>
              </h2>
              <p class="w-100 ellipsis">{{ruleForm.introduce}}</p>
            </div>
          </div>
        </div>
        <div class="main" v-html="ruleForm.detail">{{ruleForm.detail}}</div>
        <el-button type="primary" @click="goRouter('editcelebrity')" class="center">编辑</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import tit from "@/components/Htitle/index";
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        ruleForm: {
          name: "",
          photoUrl: "",
          job: "",
          detail: "",
          introduce: ""
        }
      };
    },
    computed: {
      ...mapGetters(["roles"])
    },
    components: {
      tit
    },
    created() {
      let self = this;
      if (self.$route.query.id) {
        console.log(self.$route.query.id);
        self.getCelebrity(self.$route.query.id);
      }
    },
    methods: {
      getCelebrity(id) {
        let self = this;
        this.$store
          .dispatch("getAuthor", { id: id })
          .then(res => {
            if (res.success) {
              self.ruleForm = {
                name: res.data.name,
                photoUrl: res.data.photoUrl,
                job: res.data.job,
                detail: res.data.detail,
                introduce: res.data.introduce
              };
            } else {
              this.$message({
                message: res.message,
                type: "warning"
              });
            }
          })
          .catch(res => {
            console.log("查询", res);
          });
      },
      goRouter(dir) {
        let id = this.$route.query.id;
        this.$router.push({ path: `${dir}`, query: { id: id } });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .container {
    padding: 60px;
    background: #ffffff;
  }

  .main {
    margin-top: 60px;
    overflow: hidden;
  }

  .hd-l {
    height: 72px;
    margin-right: 24px;
    img {
      width: 72px;
      height: 72px;
      border-radius: 100%;
    }
  }

  .hd-r {
    h2 {
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 33px;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
      span.cutLine {
        height: 16px;
        border-left: 1px solid rgba(0, 0, 0, 0.45);
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }

  .center {
    margin-top: 60px;
  }
</style>