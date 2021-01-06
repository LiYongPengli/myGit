<template>
  <!-- 登录页 -->
  <div class="login">
    <div class="login_wrap">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <p class="title">欢迎登录大数据采集系统</p>
      <!-- 账号密码登录的输入框 -->
      <account-login v-if="account" :account.sync="account" :bindAccount.sync="bindAccount" />
      <!-- 是否绑定微信的组件框 -->
      <div v-if="bindAccount" class="bindAccount">
        <div class="top">
          <div class="left_log"></div>
          <div class="center_ico el-icon-sort"></div>
          <div class="right_log">
            <img src="../../assets/img/weixin2.png" />
          </div>
        </div>
        <div class="center">
          <el-button @click="bindWechat" type="primary" style="width: 100%"
            >立即绑定</el-button
          >
        </div>
        <div class="footer">
          <span @click="noBindWeichat">暂不绑定,</span>可通过个人中心绑定或解绑
        </div>
      </div>
      <!-- 微信登录 -->
      <div v-if="weiChatLogin" class="weiChatLogin">
        <div class="code">
          <wxlogin
            :state="wx_data.state"
            :theme="'white'"
            :redirect_uri="wx_data.redirect_uri"
            :appid="wx_data.appid"
            :scope="wx_data.scope"
          ></wxlogin>
        </div>
      </div>
      <!-- 手机登录 -->
      <phone-login v-if="phoneLogin" />
      <!-- 底部登录按钮 -->
      <footer v-show="account">
        <div @click="toWeiChatLogin" class="weixin">
          <img src="../../assets/img/weixin.png" alt="" />
          <span>微信登录</span>
        </div>
        <div @click="toPhoneLogin" class="phone">
          <img src="../../assets/img/phone.png" alt="" />
          <span>手机登录</span>
        </div>
      </footer>
      <footer v-show="weiChatLogin">
        <div @click="toAccountLogin" class="account">
          <img src="../../assets/img/account.png" alt="" />
          <span>账号登录</span>
        </div>
        <div @click="toPhoneLogin" class="phone">
          <img src="../../assets/img/phone.png" alt="" />
          <span>手机登录</span>
        </div>
      </footer>
      <footer v-show="phoneLogin">
        <div @click="toAccountLogin" class="weixin">
          <img src="../../assets/img/account.png" alt="" />
          <span>账号登录</span>
        </div>
        <div @click="toWeiChatLogin" class="phone">
          <img src="../../assets/img/weixin.png" alt="" />
          <span>微信登录</span>
        </div>
      </footer>
    </div>
    
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import LoginCom from "./Login";
import AccountLogin from "@/components/accountlogin/AccountLogin.vue"
import PhoneLogin from "@/components/phonelogin/PhoneLogin.vue"
import wxlogin from "@/components/vue-wxlogin.vue";
@Component({
  components: {
    wxlogin,
    AccountLogin,
    PhoneLogin
  },
})
export default class Login extends mixins(LoginCom) {}
</script>

<style lang="scss" scoped>
@import "./Login.scss";
</style>
<style lang="scss">
.login {
  .el-dialog {
    background: white !important;
  }
  .el-dialog__title {
    color: black !important;
  }
}
</style>