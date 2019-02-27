<template>
  <el-dialog :visible.sync="show_dialog_login" width="438px" :show-close="false" class="login-dialog" v-if="routerName!='Login'"
    @close="closeDialog">
    <div class="login-container">
      <div class="login-form-body flex-1-50">
        <div class="login-form-h1 mb-30">
          账户登录
        </div>
        <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
          <el-form-item prop="username">
            <!-- <span class="svg-container svg-container_login">
              <svg-icon icon-class="user" />
            </span> -->
            <el-input name="username" type="text" v-model="loginForm.username" placeholder="SAAS平台管理员账号" />
          </el-form-item>
          <el-form-item prop="password">
            <!-- <span class="svg-container">
              <svg-icon icon-class="password"></svg-icon>
            </span> -->
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-button type="primary" class="login-btn w-100" size="medium" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
          <div class="tips">
            <span style="margin-right:20px;">username: admin</span>
            <span> password: admin</span>
          </div>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { isvalidUsername } from "@/utils/validate";
  export default {
    name: "login",

    computed: {
      ...mapGetters([
        'show_dialog_login'
      ])
    },
    watch:{
      $route(e) {
        this.routerName = e.name
      }
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error("请输入正确的用户名"));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error("密码不能小于5位"));
        } else {
          callback();
        }
      };
      return {
        dialogVisible: true,
        loginForm: {
          username: "admin",
          password: ""
        },
        loginRules: {
          username: [
            { required: true, trigger: "blur", validator: validateUsername }
          ],
          password: [{ required: true, trigger: "blur", validator: validatePass }]
        },
        loading: false,
        pwdType: "password",
        routerName: ''
      };
    },
    methods: {
      showPwd() {
        if (this.pwdType === "password") {
          this.pwdType = "";
        } else {
          this.pwdType = "password";
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("Login", this.loginForm)
              .then(() => {
                this.$store.commit('SHOW_DIALOG_LOGIN', false)
                // this.$store.dispatch("GetInfo").then(() => {
                  
                //   this.loading = false;
                //   this.$router.push({ name: "Tree" });
                // }).catch(() => {
                //   this.loading = false;
                // });
                window.location.reload()
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      closeDialog() {
        this.$store.commit('SHOW_DIALOG_LOGIN', false)
      }
    }
  };
</script>
<style lang="scss" scoped>
  h2 {
    font-size: 20px;
    color: rgba(74, 74, 74, 1);
    line-height: 28px;
    margin-bottom: 40px;
    text-align: center;
  }

  .login-form-h1 {
    text-align: center;
    font-size: 20px;
    color: #4a4a4a;
    font-weight: 700;
    line-height: 28px;
  }

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    // position: fixed;
    // height: 100%;
    // width: 100%;
    // background-color: $bg;
    // background: url("../../../static/images/login_bg.png") center no-repeat;
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .logo-1 {
      width: 50px;
      height: 50px;
      margin-top: 78px;
      background: url(../../../static/images/logo_1.png) center no-repeat;
      background-size: cover;
    }
  }
</style>