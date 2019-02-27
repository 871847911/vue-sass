<template>
  <div class="app-container">
    <tit></tit>
    <div class="table">
      
    </div>
  </div>
</template>
<script>
import tit from "@/components/Htitle";
export default {
  data() {
    return {};
  },
  components: {
    tit
  }
};
</script>
<style scoped lang="scss">
.line {
  text-align: center;
}

.scope-icon {
  width: 40px;
  height: 40px;
  margin: auto;
  background: #e0e0e0;
  overflow: hidden;
}
.table {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 26px;
  background-color: #ffffff;
}
</style>