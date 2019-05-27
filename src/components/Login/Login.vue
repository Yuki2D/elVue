<template>
  <div class="login">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-form">
      <h3 class="title">web16后台管理系统</h3>
      <el-form-item prop="username">
        <i class="iconfont">&#xe61a;</i>
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <i class="iconfont">&#xe777;</i>
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin-bottom: 25px">记住密码</el-checkbox>
      <el-button :loading="loading" size="medium" type="primary" style="width:100%; margin-left: 0px" @click.native.prevent="handleLogin">
        <span v-if="!loading">登 录</span>
        <span v-else>登 录 中...</span>
      </el-button>
    </el-form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Config from "@/config"
import axios from "axios"
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        rememberMe: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  created(){
    this.getCookie()
  },
  beforeRouteEnter: ((to,from,next)=>{
    this.redirect = from.path
    next()
  }),
  methods: {
    getCookie(){  //创建之后即获取缓存中的数据
      let username = Cookies.get("username");
      let password = Cookies.get("password");
      let rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username===undefined?"":username,
        password: password===undefined?"":password,
        rememberMe: rememberMe===undefined? false : Boolean(rememberMe)
      }
    },
    handleLogin(){  //提交登陆
      this.$refs.loginForm.validate(async valid=>{
        const userInfo = this.loginForm;
        if(valid){
          this.loading = true;
          if(userInfo.rememberMe){
            Cookies.set("username", userInfo.username, {expires: Config.passCookieExpires})
            Cookies.set("password", userInfo.password, {expires: Config.passCookieExpires})
            Cookies.set("rememberMe", userInfo.rememberMe, {expires: Config.passCookieExpires})
          }else{
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          let res = await this.$http({
            url: 'auth/login',
            method: "post",
            data: {
              username: userInfo.username,
              password: userInfo.password
            }
          })
          let TokenKey = res.resp.token;  //获取到的token
          if(userInfo.rememberMe){
            Cookies.set("TokenKey", TokenKey, {expires: Config.tokenCookieExpires})
          }else{
            Cookies.set("TokenKey", TokenKey)
          }
          this.loading = false
          this.$router.push({ path: this.redirect || '/' })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, lightblue,rgb(13, 177, 232));
    height: 100%;
  }
  .login-form {
    border-radius: 6px;
    background: #fff;
    width: 365px;
    padding: 25px;
    h3 {
      text-align: center;
      margin: 10px;
    }
    .el-form-item__content{
      position: relative;
      i{
        position: absolute;
        left: 10px;
        z-index: 10;
        color: #ccc;
      }
      .el-input {
        height: 38px;
        input {
          height: 38px;
        }
      }
    }
  }
</style>
