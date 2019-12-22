<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login">
      <div>
        <h3 class="title">系统登陆</h3>
      </div>
      <el-form-item prop="userName" :rules="[
      { required: true, message: '请输入用户名'}
    ]">
        <el-input
          v-model="loginForm.userName"
          clearable
          prefix-icon="el-icon-user"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userPassword" :rules="[
      { required: true, message: '请输入密码'}
    ]">
        <el-input
          v-model="loginForm.userPassword"
          show-password
          clearable
          prefix-icon="el-icon-unlock"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="submitLogin" style="width: 100%">登 陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import NProgress from "nprogress";
import { buildParams } from "@/utils/util";
import md5 from "md5";
export default {
  name: "login.vue",
  data: function() {
    return {
      loginForm: {
        userName: "",
        userPassword: ""
      },
      loading: false
    };
  },
  mounted: function() {},
  methods: {
    //点击登陆执行的函数
    submitLogin: function() {
      var self = this;
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          self.loading = true;
          NProgress.start();
          axios
            .post(
              "/api/user/login.json",
              buildParams({
                loginName: self.loginForm.userName,
                password: md5(self.loginForm.userPassword)
              })
            )
            .then(function(val) {
              self.loading = false;
              NProgress.done();
              if (val.data.code === 200) {
                self.$router.push("/");
              } else {
                self.$notify.error({
                  title: "错误",
                  message: val.data.message
                });
              }
            })
            .catch(function(error) {
              self.$notify.error({
                title: "错误",
                message: error.Error
              });
            });
        }
      });
    }
  }
};
</script>

<style>
.login-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #2d3a4b;
}
.login-container .login {
  width: 520px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 160px 35px 0 35px;
}
.login-container .title {
  font-size: 26px;
  color: #eee;
  margin: 0 auto 40px auto;
  text-align: center;
  font-weight: 700;
}
.login-container input {
  height: 47px;
  line-height: 47px;
  border: none;
  background: transparent;
  color: #fff;
  caret-color: #fff;
}
.login-container .el-input {
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
}
.login-container input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #283443 inset !important;
  -webkit-text-fill-color: #fff !important;
}
</style>