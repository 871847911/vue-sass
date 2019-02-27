<template>
  <el-menu class="navbar dis-flex justify-b" mode="horizontal">
    <div class="sider-logo-2"></div>
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
    <!-- <breadcrumb></breadcrumb> -->
     <i class="iconfont icon-tongzhi-- bell" @click="handleMessage">
      <i class="iconfont icon-zitikuicon- point" v-if="message > 0"></i>
    </i>
    <el-dropdown class="avatar-container" trigger="click" v-if="token">
      <div class="avatar-wrapper">
        <img class="user-avatar dis-inline" :src="roles?roles.headUrl:''">
        <span class="dis-inline" style="line-height:1">{{roles.nickName}}</span>
        <i class="el-icon-caret-bottom dis-inline"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <!-- <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link> -->
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="avatar-container btn" @click='login' v-else>登录</div>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import Cookies from 'js-cookie'
  import {
    getToken, removeToken
  } from '@/utils/auth'
  export default {
    data(){
      return {
      }
    },
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'token',
        'roles',
        'message'
      ])
    },

    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          removeToken();
          this.$store.commit('CLEAN_TOKEN')
          this.$router.push({ path: '/' });
          // location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
      login() {
        this.$store.commit('SHOW_DIALOG_LOGIN', true);
      },

      handleMessage(){
        this.$router.push({
          path:'/message/messagecenter'
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    position:fixed;
    top:0;
    left:0;
    width: 100%;
    height: 64px;
    line-height: 64px;
    border-radius: 0px !important;
    background-color: #ffffff;
    border: none!important;
    z-index: 999;
    box-shadow:0px 0px 20px -6px rgba(0,0,0,0.3);
    .bell{
      outline: none;
      cursor: pointer;
      position:absolute;
      top:0px;
      right:155px;
      font-size:24px;
      color:#999999;
      .point{
        position:absolute;
        top:-7px;
        right:-2px;
        color:#00B4B9;
        font-size:8px;
      }
    }
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        // margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 20px;
          height: 20px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          // position: absolute;
          // right: -20px;
          // top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .login {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    padding-right: 20px;
    float: right;
    cursor: pointer;
    color: #303133;
  }

  .el-dropdown-menu__item--divided:before {
    display: none;
  }

  .el-dropdown-menu__item--divided {
    border: none;
  }

  .sider-logo-2 {
    position: absolute;
    top: 50%;
    left: 39px;
    transform: translateY(-50%);
    width: 96px;
    height: 47px;
    background: url('../../../../static/images/logo_2.png') center no-repeat;
    background-size: 100%;
  }
</style>