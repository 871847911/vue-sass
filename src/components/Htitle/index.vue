<template>
  <div class="h1 mt-10 mb-30 dis-flex justify-b">
    <div class="pos-r">{{h1.title}}
      <slot></slot>
    </div>
    <slot name="btn"></slot>
    <div class="go-back" @click="goBack" v-if="showBack"><i class="iconfont icon-fanhui mr-5"></i>返回</div>
  </div>
</template>

<script>
  export default {
    props:{
      showBack:{
        type:Boolean,
        default:true
      }
    },
    data() {
      return {
        // h1:''
      };
    },
    computed: {
      h1() {
        return this.$route.meta;
      }
    },
    methods: {
      goBack() {
        this.$router.back(-1);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .h1 {
    height: 28px;
    font-size: 20px;
    color: rgba(155, 155, 155, 1);
    line-height: 28px;
  }

  .iconfont {
    display: inline-block;
    vertical-align: middle;
    margin-top: -3px;
  }
</style>