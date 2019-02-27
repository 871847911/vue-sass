<template>
  <div>
    <h3 class="text-content">图文内容</h3>
    <div class="img-content">
      <div class="audio-info">
        <h3 class="small-part-title">音频</h3>
        <div class="audio-style">
            <audioVue :name="content.audioName" :url="content.audioUrl" :size="content.audioSize"></audioVue>  
        </div>
      </div>

      <div class="col-intro">
        <h3 class="small-part-title">内容</h3>
        <div class="text" v-html="content.content">
          {{content.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import audioVue from "@/components/MusicPlayer/MusicPlayer" 
export default {
  name: 'GraphicContentComponent',
  data(){
    return {}
  },

  props:{
    content:{
      type:Object,
      default:{}
    }
  },

  components:{
    audioVue
  }
}
</script>

<style scoped lang="scss">
 .text-content {
  color: #999999;
  background-color: #F9FAF9;
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
}
.img-content {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 30px 0 0 20px;
  .audio-info {
    position: relative;
    margin-bottom: 40px;
    &::before {
      content: "";
      position: absolute;
      bottom: -40px;
      height: 1px;
      width: 980px;
      background-color: #E6E6E6;
    }
  }
  .col-intro {
    padding-bottom: 52px;
    margin-top: 80px;
    p {
      line-height: 28px;
    }
  }
  .small-part-title  {
    color: #9B9B9B;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    margin-bottom: 30px;
  }
  .text{
    line-height: 28px;
  }
}

</style>
