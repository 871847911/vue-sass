<template>
  <div class="app-container">
    <div class="title_btn dis-flex justify-b">
      <div>{{h1.title}}</div>
      <div class="title_r dis-flex">
        <div class="part_l" @click="backEvent">
          <i class="iconfont icon-fanhui mr-5"></i>返回
        </div>
      </div>
    </div>

    <div class="components_box">
      <div class="commodity_detail">
        <!-- 基本信息 -->
        <div class="part_item">
          <div class="h3">基本信息</div>
          <div class="commodity_info dis-flex justify-b">
            <div class="left dis-flex">
              <img :src="goodsDetail.imageUrl" alt>
              <div class="text_info">
                <h2 class="style_change">
                  <span class="ellipsis limit">{{goodsDetail.goodsName ?goodsDetail.goodsName:"null"}}</span>
                </h2>

                <div class="course_info">
                  <div class="box_l">
                    <div class="t_title">课程名称</div>
                    <div class="value">{{resourseData.subName}}</div>
                  </div>
                  <div class="box_r">
                    <div class="t_title">内容</div>
                    <div class="value">第 {{contentIndex}} 篇</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="box_pic">
                <img :src="goodsDetail.storeLogUrl" alt>
                <div class="shop_name">{{goodsDetail.storeName}}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 音频 -->
        <div class="part_item" v-if="resourseData.subType == 2">
          <div class="h3">音频</div>
          <div class="music_box">
            <music-Player :name="resourseData.subName" :url="resourseData.subUrl" :size="resourseData.subLength"></music-Player>
          </div>

        </div>

        <!-- 商品简介 图文内容 -->
        <div class="part_item" v-if="quilleditorData">
          <div class="h3">图文内容</div>
          <div class="commodity_intr">
            <p v-html="quilleditorData"></p>
          </div>
        </div>

        <!-- 视频 -->
        <div class="part_item" v-if="resourseData.subType == 3">
          <div class="h3">视频</div>
          <div class="video_box">
            <video-player :videoUrl="resourseData.subUrl"></video-player>
            <!-- <div>{{resourseData.subName}}</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tit from "@/components/Htitle";
import api from "@/api/commodity";
import videoPlayer from "@/components/Video";
import musicPlayer from "@/components/MusicPlayers";
export default {
  name: "contentCatolog",
  data() {
    return {
      msg: "商品详情",
      apply_state: false,
      activeName: "second",
      peddleGoodsId: null,
      subId: null,
      contentIndex:null,
      goodsDetail: {}, //商品数据
      quilleditorData: null, //富文本数据
      resourseData: {
        // subUrl:"http://kpay-temp.qiniu.vdlb.cn/resource/video/mp4/2058/o_1cvq9h2u51q1m1slofhvhahj615.mp4",
      }, //视频音频数据
      // musicUrl:"http://kpay-temp.qiniu.vdlb.cn/resource/audio/mp3/2058/o_1cvq9df9q2di1sba1d7911av52pc.mp3",
      // musicName:"自定义名字",
      // testsubUrl:"http://kpay-temp.qiniu.vdlb.cn/resource/video/mp4/2058/o_1cvq9h2u51q1m1slofhvhahj615.mp4",
      // stateV:false,
    };
  },
  components: {
    tit,
    videoPlayer,
    musicPlayer,
  },
  computed: {
    h1() {
      return this.$route.meta;
    }
  },
  methods: {
    backEvent() {
      this.$router.back(-1);
    },
    getPeddleGoodsDetail() {
      let that = this;
      let params = {
        peddleGoodsId: that.peddleGoodsId
      };
      api.getPeddleGoodsDetail(params).then(res => {
        console.log("商品详情", res);
        if (res.serviceCode == "E000000000") {
          that.goodsDetail = res.data;
        } else {
          this.$message({
            type: "error",
            message: "请求失败!"
          });
        }
      });
    },
    getQuilleditor() {
      let that = this;
      let params = {
        subId: that.subId
      };
      api.getSubContext(params).then(res => {
        console.log("富文本图文数据=》", res);
        if (res.serviceCode == "E000000000") {
          that.quilleditorData = res.data;
        } else {
          this.$message({
            type: "error",
            message: "请求失败!"
          });
        }
      });
    },
    getResource() {
      let that = this;
      let params = {
        subId: that.subId
      };
      api.getSubDetail(params).then(res => {
        console.log("音频视频资源=》", res);
        if (res.serviceCode == "E000000000") {
          that.resourseData = res.data;
        } else {
          this.$message({
            type: "error",
            message: "请求失败!"
          });
        }
      });
    }
  },
  created() {
    console.log(
      "路由传递的subId",
      this.$route.query.subId,
      "路由传递的peddleGoodsId",
      this.$route.query.id,
      "路由传递的课程篇幅contentIndex",
      this.$route.query.contentIndex
    );
    this.subId = this.$route.query.subId;
    this.peddleGoodsId = this.$route.query.id;
    this.contentIndex = parseInt(this.$route.query.contentIndex) + 1
    
    // console.log(this.contentIndex)
    this.getPeddleGoodsDetail();
    this.getQuilleditor();
    this.getResource();
    console.log("音频",musicPlayer)
  },
  mounted() {
    console.log(this.resourseData);
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  font-family: "PingFangSC";
  font-size: 14px;
  // 头部title
  .title_btn {
    color: #9b9b9b;
    font-size: 20px;
    line-height: 40px;
    height: 40px;
    margin-bottom: 10px;
    .title_r {
      cursor: pointer;
      .part_r {
        margin-left: 20px;
        box-sizing: border-box;
        span {
          display: inline-block;
          text-align: center;
          width: 80px;
          height: 40px;
          border-radius: 4px;
          font-size: 14px;
          border: 1px solid #00b4b9;
          &:nth-child(1) {
            background: #ffffff;
            margin-right: 10px;
            color: #27bdc1;
          }
          &:nth-child(2) {
            background: #00b4b9;
            color: #ffffff;
          }
        }
      }
    }
  }

  // 提示语
  .remind_tip {
    padding-bottom: 10px;
  }

  .components_box {
    padding: 30px 20px;
    background: #ffffff;
    .commodity_detail {
      margin-bottom: 40px;
      .part_item {
        .h3 {
          background: #f9faf9;
          font-size: 14px;
          color: #9b9b9b;
          padding: 10px 0 10px 10px;
          margin-bottom: 20px;
        }
        // 商品信息
        .commodity_info {
          margin-bottom: 40px;
          align-items: center;
          .left {
            padding: 0 20px;
            width:100%;
            img {
              width: 288px;
              height: 180px;
              margin-right: 20px;
            }
            .text_info {
              padding: 5px 0;
              min-width: 360px;
              font-size: 14px;
              width:100%;
              h2 {
                font-weight: 600;
                color: #4a4a4a;
                font-size: 16px;
                padding-bottom: 10px;
                display: flex;
                align-items: center;
                .commodity_state {
                  color: #ffffff;
                  font-size: 12px;
                  background: #27bdc1;
                  padding: 2px 5px;
                  font-weight: normal;
                  margin-left: 10px;
                }
              }
              .style_change {
                padding-bottom: 60px;
                border-bottom: 1px solid #e6e6e6;
                margin-bottom: 30px;
                .limit {
                  max-width: 300px;
                }
              }
              .auth_info {
                display: flex;
                align-items: center;
                color: #9b9b9b;
                padding-bottom: 20px;
                margin-bottom: 30px;
                border-bottom: 1px solid #e6e6e6;
                .item_info {
                  margin-right: 20px;
                  span {
                    color: #666666;
                  }
                }
              }
              .title_column {
                padding-bottom: 8px;
                // background: yellow;
              }

              .plat_info {
                display: flex;
                align-items: center;
                padding-bottom: 8px;
                .item_plat {
                  margin-right: 20px;
                  span {
                    color: #666666;
                  }
                }
              }

              .course_info {
                display: flex;
                .box_l {
                  padding-right: 40px;
                  border-right: 1px solid #e6e6e6;
                }
                .box_r {
                  padding-left: 40px;
                }
                .t_title {
                  padding-bottom: 10px;
                  color: #9b9b9b;
                }
                .value {
                  color: #4a4a4a;
                }
              }
            }
          }
          .right {
            height: 160px;
            padding: 0 120px 0 100px;
            display: flex;
            align-items: center;
            text-align: center;
            border-left: 1px solid #e6e6e6;
            .box_pic {
              width: 60px;
              height: 60px;
              img{
                width: 60px;
                height: 60px;
              }
              .shop_name {
                padding-top: 10px;
                color: #666666;
                font-size: 14px;
              }
            }
          }
        }

        // 商品简介
        .commodity_intr {
          padding: 0 80px 0 20px;
          p {
            padding: 0;
            margin: 0;
            color: #4a4a4a;
            line-height: 20px;
            padding-bottom: 20px;
          }
          img {
            width: 404px;
            height: 240px;
          }
        }

        // 音频
        .music_box {
          padding-bottom: 40px;
        }

        // 视频
        .video_box {
          margin-bottom: 160px;
        }
      }
    }
  }
}
</style>