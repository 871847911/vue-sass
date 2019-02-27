<template>
  <video-player
    class="video-player vjs-custom-skin"
    ref="videoPlayer"
    :playsinline="true"
    :options="playerOptions"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @statechanged="playerStateChanged($event)"
  ></video-player>
</template>
<script>
import { videoPlayer } from "vue-video-player";
// import '../../node_modules/video.js/dist/video-js.css'
// import '../../node_modules/vue-video-player/src/custom-theme.css'

export default {
  props: {
    videoUrl: String,
    state: Boolean
  },
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: this.videoUrl //url地址
          }
        ],
        poster: " ", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  watch: {
    videoUrl: function(val) {
      // console.log(val, '新视频')
      // console.log(this.$refs.videoPlayer)
      if (val !== "") {
        this.playerOptions.sources[0].src = val;
      }
    },
    //弹出框关闭后暂停 否则一直在播放 state从弹出框组件传值
    state: function(val) {
      console.log(val, 999999);
      if (val) {
        this.$refs.videoPlayer.player.pause();
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    onPlayerPlay(player) {
      console.log(player);
    },
    onPlayerPause(player) {},
    playerStateChanged(player) {}
  },
  created() {
    // console.log(11111111111111)
  },
  mounted() {
    let self = this;
    // this.$refs.videoPlayer.player.play()
  }
};
</script>

<style lang="scss">
.video-player {
  .video-js {
    .vjs-big-play-button{//中间播放暂停按钮样式
      margin-left:-1em;
      height: 2em;
      line-height: 2em;
      width: 2em;
      border-radius: 50%;
    }
    .vjs-poster {//默认封面 遮罩层 隐藏显示视频页面
      background: none;
    }
    .vjs-error-display{//无视频资源时
    }
  }
}

</style>
