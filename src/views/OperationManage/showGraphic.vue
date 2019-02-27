<template>
  <div class="app-container">
    <tit></tit>
    <div class="template-form">
      <div class="container">
        <div class="hd">
          <div class="hd-r flex-1 overflow-h mb-20">
            <div class="dis-flex flex-direction justify-b h100">
              <h2>{{ruleForm.title}}
                <el-tag type="success" style="vertical-align: bottom;" class="ml-10">{{options[ruleForm.type].label}}</el-tag>
              </h2>
              <p class="w-100 ellipsis">{{ruleForm.subTitle}}</p>
              <p class="w-100 ellipsis" v-if="ruleForm.upDate">上架时间 : {{ruleForm.upDate}}</p>
            </div>
          </div>
          <div class="hd-l">
            <img :src="roles.resDomain+ruleForm.cover" />
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
          title: "",
          subTitle: "",
          type: 1,
          cover: "", //封面
          detail: "" //详情(富文本)
        },
        options: {
          1: {
            value: 1,
            label: "课程"
          },
          2: {
            value: 2,
            label: "专栏"
          },
          3: {
            value: 3,
            label: "产品更新"
          },
          4: {
            value: 4,
            label: "使用课程"
          },
          5: {
            value: 5,
            label: "学兽动态"
          },
          6: {
            value: 6,
            label: "学兽观点"
          },
          7: {
            value: 7,
            label: "新闻报道 "
          }
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
        self.getCelebrity(self.$route.query.id);
      }
    },
    methods: {
      getCelebrity(id) {
        let self = this;
        this.$store
          .dispatch("getGraphic", { id: id })
          .then(res => {
            if (res.success) {
              self.ruleForm = res.data
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
        this.$router.push({name:'EditGraphic', query: { id: id } });
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
    width:300px;
    height: 188px;
    overflow: hidden;
    img {
      width:100%;
      height: 100%;
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