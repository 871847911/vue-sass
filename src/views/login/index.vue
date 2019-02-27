<template>
  <div class="login-container">
    <div class="login-body dis-flex pos-r">
      <div class="login-tit-body flex-1-50">
        <div class="login-tit-h1">
          <p>HELLO,</p>
          <p>WELCOME TO</p>
          <p>LEARNING</p>
          <p>BEAST</p>
        </div>
        <div class="login-tit-h2">
          <strong>学兽</strong> SAAS平台
        </div>
        <div class="logo-1">
        </div>
      </div>
      <div class="login-form-body flex-1-50">
        <div class="login-form-h1">
          账户登录
        </div>
        <el-form class="login-form"  auto-complete="off" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
          <el-form-item prop="username">
            <span class="svg-container svg-container_login">
              <svg-icon icon-class="user" />
            </span>
            <el-input name="username" type="text" v-model="loginForm.username"  placeholder="SAAS平台管理员账号"/>
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password"></svg-icon>
            </span>
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"  auto-complete="off"
              placeholder="请输入密码"></el-input>
            <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-button type="primary" class="login-btn btn-bg-color btn-bd-color" size="medium" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { isvalidUsername } from "@/utils/validate";

  export default {
    name: "login",
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
        pwdType: "password"
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
              .dispatch("Login", this.loginForm).then(() => {
                this.$store.dispatch("GetInfo").then((res) => {
                  console.log(res)
                  this.loading = false;
                  if(res.data.saasRoleType == '0'){
                    this.$router.push({ name: "Tree" });
                  }else if(res.data.saasRoleType =='10'){
                    this.$router.push({ name: "Celebrity" });
                  }
                }).catch(() => {
                  this.loading = false;
                });
              }).catch((Error) => {
                console.log(Error)
                this.loading = false;
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */

  .login-container {
    .login-body {
      width: 876px;
      height: 484px;
      flex-direction: row;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      flex-basis: 50%;
      box-sizing: border-box;
      border-radius: 5px;
      overflow: hidden;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 0 10px #999999;
      .flex-1-50 {
        width: 50%;
      }
      .login-tit-body {
        padding-left: 35px;
        box-sizing: border-box !important;
        background: url("../../../static/images/login_form_bg.png") no-repeat 0 center;
        background-size: contain;
        .login-tit-h1 {
          margin-top: 63px;
          width: 350px;
          height: 180px;
          p {
            color: #ffffff;
            font-size: 50px;
            line-height: 55px;
            font-weight: 700;
          }
        }
        .login-tit-h2 {
          color: #ffffff;
          margin-top: 58px;
          font-size: 30px;
          line-height: 42px;
        }
      }
      .login-form-body {
        padding-left: 59px;
        padding-right: 59px;
        box-sizing: border-box !important;
        background-color: #ffffff;
        .login-form-h1 {
          margin-top: 73px;
          font-size: 20px;
          color: rgba(74, 74, 74, 1);
          font-weight: 700;
          line-height: 28px;
        }
        .login-form {
          margin-top: 45px;
        }
        .login-btn {
          float: right;
          width: 135px;
          border-radius: 5px;
        }
      }
    }
    .el-input {
      display: inline-block;
      height: 44px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px; // color: $light_gray;
        height: 44px;
        color:#FFF;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background:#2d3a4b;
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    background: url("../../../static/images/login_bg.png") center no-repeat;
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
      width: 98px;
      height: 50px;
      margin-top: 50px;
      background: url(../../../static/images/logo_1.png) center no-repeat;
      background-size: cover;
    }
  }
  input:-webkit-autofill{
     background:rgba(0, 0, 0, 0.1)!important;
  }
</style>