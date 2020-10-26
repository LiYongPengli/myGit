<template>
  <div class="findpassword">
    <div class="wrap">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <div class="title">
        <h3>找回密码</h3>
        <span v-show="index == 0" @click="$router.back()"
          >返回登录<i class="el-icon-arrow-right"></i
        ></span>
        <span v-show="index == 1" @click="index--"
          >返回上一步<i class="el-icon-arrow-right"></i
        ></span>
      </div>
      <!-- 手机登录 -->
      <div v-if="index == 0" class="phoneLogin">
        <div class="item username">
          <span class="icon el-icon-mobile-phone"></span>
          <input
            type="text"
            v-model="phone_form.tel"
            placeholder="请输入手机号"
          />
        </div>
        <div class="item VerificationCode">
          <span class="icon el-icon-warning-outline"></span>
          <input
            type="text"
            v-model="phone_form.tel_vc"
            placeholder="请输入验证码"
          />
          <span @click="get_code" class="get_code">{{
            send_code ? "(" + time + ")秒后可重新发送" : "获取手机验证码"
          }}</span>
        </div>
        <div style="margin-top: 20px">
          <el-button @click="next" type="danger" style="width: 100%"
            >下一步</el-button
          >
        </div>
      </div>
      <!-- 重置密码 -->
      <div class="restpassword" v-if="index == 1">
        <div class="item password">
          <span class="icon el-icon-lock"></span>
          <input type="password" v-model="phone_form.password" placeholder="请输入新密码" />
        </div>
        <div class="item password">
          <span class="icon el-icon-lock"></span>
          <input type="password" v-model="surepassword" placeholder="请再次输入密码" />
        </div>
        <div style="margin-top: 20px">
          <el-button @click="phong_login" type="danger" style="width: 100%"
            >确认重置</el-button
          >
        </div>
      </div>
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
import Component, { mixins } from "vue-class-component";
import FindPasswordCom from "./FindPassword";
@Component
export default class Findpassword extends mixins(FindPasswordCom) {}
</script>

<style lang="scss" scoped>
@import "./FindPassword.scss";
</style>