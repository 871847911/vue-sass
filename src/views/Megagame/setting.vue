<template>
  <div class="app-container">
    <tit><span class="tips">投票一旦开始后，无法更改【开始时间】，只能改【结束时间】【投票限制】，更改的设置即时生效</span></tit>
    <div class="table">
      <div class="form">
        <el-form ref="form" :model="form" label-width="100px" class="demo-dynamic" label-position="top" value-format="yyyy-MM-dd">
          <el-form-item label="开始日期 - 截止日期">
            <el-date-picker v-model="value4" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd hh:mm:ss" :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="结束日期">
            <el-date-picker v-model="form.voteEndDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item> -->
          <el-form-item label="投票限制">
            <el-input-number v-model="form.voteLimit" controls-position="right" :min="1" :max="10"></el-input-number>
            <span class="demonstration">每人每天可投票数</span>
          </el-form-item>
          <el-form-item>
            <div class="txt-c">
              <el-button type="success" class="theme-bg-color theme-bd-color dis-inline" @click="save">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import videoPlayer from "@/components/Video";
  import {
    mapGetters
  } from "vuex";
  import tit from "@/components/Htitle";
  export default {
    components: {
      tit,
      videoPlayer
    },
    computed: {
      ...mapGetters(["roles"])
    },
    data() {
      return {
        form: {
          createDate: '',
          voteBeginDate: '',
          voteEndDate: '',
          voteLimit: ''
        },
        value4: []
      };
    },
    created() {
      this.getConfigGame()
    },
    methods: {
      getConfigGame() {
        let self = this
        this.$store.dispatch('getConfigGame').then(res => {
          if (res.success) {
            self.form = {
              createDate: res.data.createDate,
              voteBeginDate: res.data.voteBeginDate,
              voteEndDate: res.data.voteEndDate,
              voteLimit: res.data.voteLimit
            }
            self.value4 = [res.data.voteBeginDate, res.data.voteEndDate]
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      },
      save() {
        let self = this
        if (self.value4.length != 2) {
          return this.$message({
            message: '请选择完整时间',
            type: 'warning'
          })
        }
        self.form['voteBeginDate'] = self.value4[0].replace(/ 12:/g,' 00:')
        self.form['voteEndDate'] = self.value4[1].replace(/ 11:/g,' 23:')
        this.$store.dispatch('saveConfig', self.form).then(res => {
          if (res.success) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .h1 {
    height: auto !important;
  }

  .tips {
    position: relative;
    min-width: 400px;
    margin-left: 5px;
    top: -2px;
    font-size: 12px;
    color: rgba(255, 0, 0, 1);
  }

  .form {
    width: 360px;
    margin: auto;
  }

  .demonstration {
    margin-left: 20px;
    font-size: 14px;
    font-weight: 300;
    color: rgba(0, 185, 180, 1);
    line-height: 22px;
  }
</style>