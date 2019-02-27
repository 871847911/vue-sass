<template>
  <div class="app-container">
    <tit :showBack="false"><span class="tips">投票一旦开始后，无法更改【开始时间】，只能改【结束时间】【投票限制】，更改的设置即时生效</span>
      <el-button type="success" class="theme-bg-color theme-bd-color" @click="goSetting" slot="btn">投票设置</el-button>
    </tit>
    <div class="table">
      <el-table :data="firstPage.tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="视频首图">
          <template slot-scope="scope">
            <div class="scope-icon">
              <img :src="roles?roles.resDomain+scope.row.coverUrl:scope.row.coverUrl" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="参赛编号">
          <template slot-scope="scope">
            {{scope.row.entryNo}}
          </template>
        </el-table-column>
        <el-table-column label="标签">
          <template slot-scope="scope">
            {{scope.row.competitor}}
          </template>
        </el-table-column>
        <el-table-column label="总票数">
          <template slot-scope="scope">
            {{scope.row.voteNum}}
          </template>
        </el-table-column>
        <el-table-column label="排名">
          <template slot-scope="scope">
            {{scope.row.voteRank}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <ul class="btns dis-flex">
              <li class="btn flex-1 btn-1" @click="preview(scope.row)">查看</li>
              <li class="btn flex-1 btn-2" @click="showVideo(scope.row)">视频</li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
        :page-size="firstPage.pageSize" layout="prev, pager, next,sizes,jumper" :total="firstPage.total" background>
      </el-pagination>
    </div>
    <el-dialog width="30%" :visible.sync="detialPlayVideo" @close="state=true">
      <video-player :videoUrl="videoUrl" :state="state"></video-player>
      <span slot="footer" class="dialog-footer">
        <el-row :gutter="12" class="mb-20" type="flex" justify="start" align="middle">
          <el-col :span="16">
            <el-input placeholder="请输入内容" v-model="videoUrlPreview" :disabled="true"></el-input>
          </el-col>
          <el-col :span="8">
            <button class="btnPreview copyVideoUrl" :data-clipboard-text="videoUrlPreview">复制网址</button>
          </el-col>
          <el-col :span="8">
            <button class="btnPreview" :data-clipboard-text="videoUrlPreview" @click="previewUrl">进入网址</button>
          </el-col>
        </el-row>
        <el-button type="primary" @click="downVideo(obj_video)">下载</el-button>
      </span>
    </el-dialog>
    <el-dialog title="作品详情" :visible.sync="dialogFormVisible" width="840px" v-if="dialogData">
      <div class="dialog-main">
        <div class="desc-list">
          <div class="desc-item fl dis-flex justify-b">
            <label>提交时间</label>
            <p class="ellipsis flex-1">{{dialogData.createDate}}</p>
          </div>
          <div class="desc-item fr dis-flex justify-b">
            <label>主体</label>
            <p class="ellipsis flex-1">{{dialogData.channelType==2?"公司":"个人"}}</p>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="desc-list">
          <div class="desc-item fl dis-flex justify-b">
            <label>名称</label>
            <p class="ellipsis flex-1">{{dialogData.competitor}}</p>
          </div>
          <div class="desc-item fr dis-flex justify-b">
            <label>联系电话</label>
            <p class="ellipsis flex-1">{{dialogData.phone}}</p>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="desc-list">
          <div class="desc-item fl dis-flex justify-b">
            <label>联系邮箱</label>
            <p class="ellipsis flex-1">{{dialogData.email}}</p>
          </div>
          <div class="desc-item fr dis-flex justify-b">
            <label>身份证号码</label>
            <p class="ellipsis flex-1">{{dialogData.idNo}}</p>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="desc-list">
          <div class="desc-item fl dis-flex justify-b w-100" style="width:100%;">
            <label>履历</label>
            <p class="ellipsis flex-1">{{dialogData.resume}}</p>
          </div>

          <div class="clearfix"></div>
        </div>
        <div class="tit">参赛信息</div>
        <div class="desc-list">
          <div class="desc-item fl dis-flex justify-b">
            <label>参赛编码</label>
            <p class="ellipsis flex-1">{{dialogData.entryNo}}</p>
          </div>
          <div class="desc-item fr dis-flex justify-b">
            <label>分类标签</label>
            <p class="ellipsis flex-1">{{(dialogData.tagType==1&&'情感心理')||(dialogData.tagType==2&&'个人成长')||(dialogData.tagType==3&&'生活兴趣')||(dialogData.tagType==4&&'互联网营销')||(dialogData.tagType==5&&'职场技能')||(dialogData.tagType==6&&'其他')}}</p>
          </div>
          <!-- <div class="desc-item fr dis-flex justify-b">
              <label>参赛赛区</label>
              <p class="ellipsis flex-1">{{(dialogData.areaType==1&&'广州')||(dialogData.areaType==2&&'杭州')||(dialogData.areaType==3&&'上海')}}</p>
            </div> -->
          <div class="clearfix"></div>
        </div>
        <div class="desc-list">
          <div class="desc-item fl dis-flex justify-b">
            <label>视频描述</label>
            <p class="ellipsis flex-1">{{dialogData.introduction}}</p>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </el-dialog>
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
        loading: false,
        firstPage: {
          page: 1,
          tableData: null,
          total: null,
          pageSize: 10,
        },
        dialogFormVisible: false,
        detialPlayVideo: false,
        dialogData: null,
        videoUrl: '', //视频地址
        videoUrlPreview: '',//针对看不了的视频
        obj_video: null,
        state: false
      };
    },
    created() {
      this.getCatalogPage(1)
    },
    methods: {
      handleClick(tab, event) {
        let self = this
        if (tab.name == 'first') {
          self.formData.isBlacklist = false
        } else {
          self.formData.isBlacklist = true
          if (!self.tableData) {
            self.getCatalogPage(1)
          }
        }
      },
      getCatalogPage(page = 1, pageSize) {
        let self = this
        if (self.loading) {
          return this.$message({
            message: '正在查询中',
            type: 'error'
          })
        }
        let data = {
          page: page || self.page,
          pageSize: pageSize || self.pageSize
        }
        self.loading = true
        this.$store.dispatch('searchRankByPage', data).then(res => {
          self.loading = false
          if (res.success) {
            self.firstPage.total = res.pageInfo.total
            self.firstPage.page = res.pageInfo.page
            self.firstPage.pageSize = res.pageInfo.pageSize
            self.firstPage.tableData = res.pageInfo.list
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        let self = this;
        self.firstPage.tableData = null;
        self.getCatalogPage(1, val)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let self = this;
        self.firstPage.tableData = null
        self.getCatalogPage(val)
      },
      currentPage(val) {
        console.log(val, 99999999)
      },
      preview(obj) {
        this.dialogFormVisible = true
        this.dialogData = obj
      },
      showVideo(obj) {
        let src = obj.entryUrl
        if (!src) {
          return this.$message({
            type: 'error',
            message: '暂无视频信息'
          });
        }
        this.detialPlayVideo = true
        this.videoUrl = this.roles.resDomain + src
        this.videoUrlPreview = this.videoUrl + '?avvod/m3u8/s/960x640/vb/1000k'
        this.obj_video = obj
        this.state = false
      },
      goSetting() {
        this.$router.push({ name: 'Setting' })
      },
      downloadIamge(src, name) {
        var a = document.createElement('a')
        var event = new MouseEvent('click')
        a.download = name
        a.href = src
        a.dispatchEvent(event)
      },
      previewUrl() {
        window.open("http://ofh8zet7t.bkt.clouddn.com/index.html", "_blank");
      },
      downVideo(obj) {
        let self = this
        self.downloadIamge(`${self.videoUrl}?attname=${obj.entryNo}.mp4`, obj.entryNo)
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

  .lable {
    display: block;
    line-height: 40px;
    color: #4A4A4A;
    text-align: center;
  }

  .scope-icon {
    width: 60px;
    height: 60px;
    background: #e0e0e0;
    overflow: hidden;
    margin-top: 30px;
    margin-bottom: 30px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .desc-item {
    vertical-align: middle;
    padding-bottom: 5px;
    padding-top: 5px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    width: 370px;
    margin-bottom: 30px;

    label {
      display: inline-block;
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: RGBA(155, 155, 155, 1);
      margin-right: 10px;
    }

    p {
      /* height: 20px; */
      font-size: 14px;
      line-height: 20px;
      text-align: right;
      word-wrap: break-word;
      word-break: break-all
    }
  }

  .tit {
    font-size: 12px;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    line-height: 17px;
    margin-bottom: 15px;
  }
</style>