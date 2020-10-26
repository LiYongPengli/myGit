<template>
  <!-- 登录页 -->
  <div class="login">
    <div class="login_wrap">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <p class="title">欢迎登录大数据采集系统</p>
      <!-- 账号密码登录的输入框 -->
      <div v-if="account" class="inputs">
        <div class="item username">
          <span class="icon el-icon-user"></span>
          <input
            type="text"
            v-model="form.account"
            placeholder="请输入账户名称"
          />
        </div>
        <div class="item password">
          <span class="icon el-icon-lock"></span>
          <span
            @click="show_password = !show_password"
            class="show el-icon-view"
          ></span>
          <input
            v-show="show_password"
            type="text"
            v-model="form.password"
            placeholder="请输入密码"
          />
          <input
            v-show="!show_password"
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          />
        </div>
        <div class="item VerificationCode">
          <span class="icon el-icon-warning-outline"></span>
          <input
            type="text"
            v-model="form.vc"
            placeholder="请输入验证码"
          />
          <img @click="getImgCode" class="code" :src="img_vc" alt="">
        </div>
        <div class="sub_btn">
          <el-button @click="toLogin" style="flex: 3" type="primary"
            >登录</el-button
          >
          <el-button @click="toRegister" style="flex: 1" type="danger">注册</el-button>
        </div>
        <div class="other">
          <div class="rember_pwd">
            <el-checkbox v-model="remember_password">记住密码</el-checkbox>
          </div>
          <div @click="$router.push('/findpassword')" class="foget_pwd">忘记密码?</div>
        </div>
      </div>
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
        <div class="footer"><span @click="noBindWeichat">暂不绑定,</span>可通过个人中心绑定或解绑</div>
      </div>
      <!-- 微信登录 -->
      <div v-if="weiChatLogin" class="weiChatLogin">
        <div class="code">
          <wx-login :state="wx_data.state" :redirect_uri="wx_data.redirect_uri" :appid="wx_data.appid" :scope="wx_data.scope"/>
        </div>
        <!-- <div class="text">
          <p>请使用微信扫描二维码</p>
          <p>登录睿读数据采集平台</p>
        </div> -->
      </div>
      <!-- 手机登录 -->
      <div v-if="phoneLogin" class="phoneLogin">
        <div class="item username">
          <span class="icon el-icon-mobile-phone"></span>
          <input type="text" v-model="phone_form.tel" placeholder="请输入手机号" />
        </div>
        <div class="item VerificationCode">
          <span class="icon el-icon-warning-outline"></span>
          <input type="text" v-model="phone_form.tel_vc" placeholder="请输入验证码" />
          <span @click="get_code" class="get_code">{{
            send_code ? "(" + time + ")秒后可重新发送" : "获取手机验证码"
          }}</span>
        </div>
        <div style="margin-top:20px;">
          <el-button @click="phong_login" type="primary" style="width:100%;">登录</el-button>
        </div>
      </div>
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
    <el-dialog
      :destroy-on-close="true"
      top="40vh"
      center
      :close-on-click-modal="false"
      title="请输入图片验证码"
      :visible.sync="show_vc_code"
      width="400px"
    >
      <div class="code_wrap">
        <span class="icon el-icon-warning-outline"></span>
        <input v-model="img_vc_code" type="text" placeholder="请输入验证码" />
        <img @click="getImgCode" class="code" :src="img_vc" alt="" />
      </div>
      <el-button
        @click="img_srue"
        style="width: 100%; margin-top: 20px"
        type="primary"
        >确认</el-button
      >
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import LoginCom from "./Login";
import WxLogin from '@/components/WxLogin.vue'
@Component({
  components:{WxLogin}
})
export default class Login extends mixins(LoginCom){
  private created():void{
    this.getImgCode();
  }
}
</script>

<style lang="scss" scoped>
@import "./Login.scss";
</style>