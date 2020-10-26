<template>
  <div class="register">
    <div class="wrap">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <div class="register_title">
        <h3>账号注册</h3>
        <span @click="$router.back()">返回登录<i class="el-icon-arrow-right"></i></span>
      </div>
      <!-- 表单主体 -->
      <div class="form">
        <div class="item account">
          <span class="icon el-icon-user"></span>
          <input type="text" v-model="form.account" placeholder="请输入账户" />
        </div>
        <div class="item username">
          <span class="icon el-icon-bank-card"></span>
          <input
            type="text"
            v-model="form.nickname"
            placeholder="请输入用户昵称"
          />
        </div>
        <div class="item password">
          <span class="icon el-icon-lock"></span>
          <input type="password" v-model="form.password" placeholder="请输入密码" />
        </div>
        <div class="item surepassword">
          <span class="icon el-icon-lock"></span>
          <input
            type="password"
            v-model="surepassword"
            placeholder="请再次输入密码"
          />
        </div>
        <div class="item phone">
          <span class="icon el-icon-mobile-phone"></span>
          <input type="text" v-model="form.tel" placeholder="请输入手机号" />
          <span @click="get_code" class="get_code">{{
            send_code ? "(" + time + ")秒后可重新发送" : "获取手机验证码"
          }}</span>
        </div>
        <div class="item VerificationCode">
          <span class="icon el-icon-warning-outline"></span>
          <input type="text" v-model="form.tel_vc" placeholder="请输入验证码" />
        </div>
        <div class="submit">
          <el-button @click="toRegister" style="width: 100%" type="danger">确认注册</el-button>
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
import RegisterCom from "./Register";
@Component
export default class Register extends mixins(RegisterCom) {}
</script>

<style lang="scss" scoped>
@import "./Register.scss";
</style>