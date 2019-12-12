<template>
  <div class="login-container">
    <el-form ref="form" :model="loginForm" class="login">
      <div>
        <h3 class="title">系统登陆</h3>
      </div>
      <el-form-item>
        <el-input
          v-model="loginForm.userName"
          clearable
          prefix-icon="el-icon-user"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginForm.userPassword"
          show-password
          clearable
          prefix-icon="el-icon-unlock"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" style="width: 100%">登 陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import { buildParams } from "../../utils/common-util";
import md5 from "md5";
export default {
  name: "login.vue",
  data: function() {
    return {
      loginForm: {
        userName: "",
        userPassword: ""
      }
    };
  },
  mounted: function() {},
  methods: {
    //点击登陆执行的函数
    login: function() {
      var self = this;
      axios
        .post(
          "/api/user/login.json",
          buildParams({
            loginName: self.loginForm.userName,
            password: md5(self.loginForm.userPassword)
          })
        )
        .then(function(val) {
          if (val.data.code === 200) {
            self.$router.push("/");
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