<template>
  <div class="app-container">
    <tit></tit>
    {{msg}}
  </div>
</template>

<script>
import tit from "@/components/Htitle";
export default {
  name: "courseAdmin",
  data() {
    return {
      msg: "放现有 课程管理"
    };
  },
  components: {
      tit,
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.app-container {
}
</style>