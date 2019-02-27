<template>
  <el-scrollbar wrapClass="scrollbar-wrapper" >
    <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="false"
      text-color="#666666" active-text-color="#00B9B4">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'sidebar',
        'roles'
      ]),
      routes() {
        return this.$router.options.routes
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
<style lang="scss" scoped>
  .sider-logo {
    width: 100%;
    height: 49px;
    font-size: 24px;
    padding-left: 20px;
    color: rgba(255, 255, 255, 1);
    line-height: 49px;
    background-color: rgb(48, 65, 86);
    box-sizing: border-box;
  }

  .menu-wrapper .is-opened {
    .el-submenu__title {  
      span{
        color: rgb(26, 169, 123)!important;
      }
    }
  }
  .sider-logo-2{
    position:relative;
    top:50%;
    left:-8px;
    transform:translateY(-50%);
    width:80px;
    height:39px;
    background:url('../../../../../static/images/logo_1.png') center no-repeat;
    background-size:100%;
  }
</style>