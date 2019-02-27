<template>
    <div>
        <div class="no-type" v-if="courseType == 1">
            <div class="no-type-main">
                <div class="main-img" v-if="subType == 1 && courseContent.length>0" v-html="courseContent[0].context">
                </div>
                <div class="main-audio" v-if="subType == 2 && courseContent.length>0">
                    <audio controls="controls" class="audio-src">
                        <source :src="imageHead + courseContent[0].subUrl" type="audio/ogg">
                        <source :src="imageHead + courseContent[0].subUrl" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <div class="audio-desc">
                        <p class="name">{{courseContent[0].fileName}}</p>
                        <span class="size">{{courseContent[0].fileSize}}</span>
                    </div>
                </div>
                <div class="main-video" v-if="subType == 3 && courseContent.length>0">
                    <video width="333" height="187" controls  class="video-src">
                        <source :src="imageHead + courseContent[0].subUrl" type="video/mp4">
                        <source :src="imageHead + courseContent[0].subUrl" type="video/ogg">
                        your browser does not support the video tag
                    </video>
                    <div class="audio-desc">
                        <p class="name">{{courseContent[0].fileName}}</p>
                        <span class="size">{{courseContent[0].fileSize}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="type" v-if="courseType == 2">
            <div class="type-main">
                <ul class="main-img" v-if="subType == 1">
                    <li class="img-item" v-for="(item, index) of courseContent" :key="item.id">
                        <p class="item-index">图文课时({{index+1}})</p>
                        <div class="item-body" v-html="item.context">{{index}}</div>
                    </li>
                </ul>
                <ul class="main-audio" v-if="subType == 2">
                    <li class="audio-content" v-for="(item, index) of courseContent" :key="item.id">
                        <div class="audio-name">
                            <div class="img-l">
                                <span class="img-l-num">{{index+1}}</span>
                                <span class="img-l-name">{{item.subName}}</span>
                            </div>
                            <div class="img-r">
                                <i class="iconfont">&#xe606;</i>
                            </div>
                        </div>
                        <div class="audio-body" @click="playAudio(item.subUrl)">
                            <div class="body-l">
                                <p class="body-l-num">
                                    <i class="iconfont">&#xe62d;</i>
                                </p>
                                <span class="body-l-name">{{item.fileName}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="main-video" v-if="subType == 3">
                    <li class="video-content" v-for="(item, index) of courseContent" :key="item.id">
                        <div class="audio-name">
                            <div class="img-l">
                                <span class="img-l-num">{{index+1}}</span>
                                <span class="img-l-name">{{item.subName}}</span>
                            </div>
                            <div class="img-r">
                                <i class="iconfont">&#xe606;</i>
                            </div>
                        </div>
                        <div class="audio-body" @click="playVideo(item.subUrl)">
                            <div class="body-l">
                                <p class="body-l-num">
                                    <i class="iconfont">&#xe62e;</i>
                                </p>
                                <span class="body-l-name">{{item.fileName}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="audio-dialog" v-if="audioDialogFlag">
            <i class="iconfont" @click="audioCancel">&#xe61e;</i>
            <audio controls="controls" class="audio-src">
                <source :src="imageHead + audioUrl" type="audio/ogg">
                <source :src="imageHead + audioUrl" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        </div>
        <div class="video-dialog" v-if="videoDialogFlag">
            <i class="iconfont" @click="videoCancel">&#xe61e;</i>
            <video width="999" height="561" controls  class="video-src">
                <source :src="imageHead + videoUrl" type="video/mp4">
                <source :src="imageHead + videoUrl" type="video/ogg">
                your browser does not support the video tag
            </video>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CourseMain',
  data () {
    return {
      audioUrl: '',
      audioDialogFlag: false,
      videoUrl: '',
      videoDialogFlag: false
    }
  },
  props: {
    courseType: Number,
    subType: Number,
    courseContent: Array,
    imageHead: String
  },
  methods: {
    playAudio (url) {
      this.audioUrl = url
      this.audioDialogFlag = true
    },
    audioCancel () {
      this.audioDialogFlag = false
    },
    playVideo (url) {
      this.videoUrl = url
      this.videoDialogFlag = true
    },
    videoCancel () {
      this.videoDialogFlag = false
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
.audio-dialog,.video-dialog
    z-index 999
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0, 0, 0, 0.5)
    .audio-src,.video-src
        width 334px
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        margin auto
    .video-src
        width 999px
    .iconfont
        position fixed
        top 50px
        right 50px
        color #fff
        font-size 40px
        cursor pointer
.type
    width 334px
    height 649px
    .type-main
        width 100%
        height 649px
        overflow-x hidden
        overflow-y auto
        .main-img
            width 100%
            .img-item
                width 100%
                .item-index
                    height 22px
                    line-height 22px
                    font-size 14px
                    color #4A4A4A
                    margin-bottom 10px
                    font-weight 600
                .item-body
                    width 334px
                    font-size 14px
                    color #4A4A4A
                    padding-bottom 20px
                    margin-bottom 60px
        .main-audio,.main-video
            width 100%
            .audio-content,.video-content
                width 334px
                background #FAFAFA
                .audio-name
                    height 84px
                    display flex
                    justify-content space-between
                    align-items center
                    .img-l
                        display flex
                        justify-content flex-start
                        align-items center
                        cursor pointer
                        .img-l-num
                            font-size 24px
                            color #9B9B9B
                            margin-left 22px
                            margin-right 36px
                        .img-l-name
                            font-size 14px
                            color #4A4A4A
                    .img-r
                        cursor pointer
                        .iconfont
                            margin-right 32px
                            color #9B9B9B
                .audio-body
                    height 74px
                    display flex
                    justify-content space-between
                    align-items center
                    background #EDEDED
                    .body-l
                        display flex
                        justify-content flex-start
                        align-items center
                        cursor pointer
                        margin-left 34px
                        .body-l-num
                            height 40px
                            width 40px
                            margin-right 15px
                            i
                                font-size 40px
                                color #1AA97B
                        .body-l-num-video
                            height 40px
                            width 64px
                            margin-right 15px
                            i
                                font-size 40px
                                color #1AA97B
                        .body-l-name
                            font-size 14px
                            color #4A4A4A
.main-img >>> img
    max-width 334px
.no-type
    width 334px
    height 649px
    .no-type-main
        width 100%
        height 649px
        overflow-x hidden
        overflow-y auto
        .main-img
            width 100%
            font-size 14px
            color #4A4A4A
        .main-audio,.main-video
            display flex
            flex-direction column
            justify-content flex-start
            align-items flex-start
            width 334px
            .audio-src
                width 100%
            .audio-desc
                height 20px
                width 100%
                display flex
                justify-content space-between
                align-items center
                padding-top 10px
                .name
                    width 200px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    font-size 18px
                    color #4A4A4A
                    margin-left 20px
                .size
                    font-size 12px
                    color #9B9B9B
                    margin-right 20px
</style>
