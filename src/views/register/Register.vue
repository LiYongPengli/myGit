<template>
  <div class="register">
    <div class="wrap">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <div class="register_title">
        <h3>账号注册</h3>
        <span @click="$router.back()"
          >返回登录<i class="el-icon-arrow-right"></i
        ></span>
      </div>
      <!-- 表单主体 -->
      <el-form :model="form" ref="form" :rules="rules" class="form">
        <el-form-item class="iptitem" prop="account">
          <el-input
            prefix-icon="el-icon-user"
            type="text"
            v-model="form.account"
            placeholder="请输入账号(支持最多30位字母、数字以及常规字符)"
          />
        </el-form-item>

        <el-form-item class="iptitem" prop="nickname">
          <el-input
            prefix-icon="el-icon-bank-card"
            type="text"
            v-model="form.nickname"
            placeholder="请输入用户昵称"
          />
        </el-form-item>

        <el-form-item class="iptitem" prop="password">
          <el-input
            show-password
            prefix-icon="el-icon-lock"
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          />
        </el-form-item>

        <el-form-item class="iptitem" prop="surepassword">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="form.surepassword"
            placeholder="请再次输入密码"
          />
        </el-form-item>

        <el-form-item :error="phoneerr" class="iptitem" prop="tel">
          <el-input
            prefix-icon="el-icon-mobile-phone"
            type="text"
            v-model="form.tel"
            placeholder="请输入手机号"
          />
          <span @click="get_code" class="get_code">{{
            send_code ? "(" + time + ")秒后可重新发送" : "获取短信验证码"
          }}</span>
        </el-form-item>

        <el-form-item :error="vcerr" class="iptitem" prop="tel_vc">
          <el-input
            prefix-icon="el-icon-warning-outline"
            type="text"
            v-model="form.tel_vc"
            placeholder="请输入短信验证码"
          />
        </el-form-item>
        <div class="submit">
          <el-button
            :disabled="!reqFinished"
            @click="toRegister"
            style="width: 100%"
            type="danger"
            >确认注册</el-button
          >
        </div>
      </el-form>
      <!--  -->
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
        <input
          v-model="img_vc_code"
          type="text"
          placeholder="请输入图片验证码"
        />
        <img @click="getImgCode" class="code" :src="img_vc" alt="" />
      </div>
      <el-button
        @click="img_srue"
        style="width: 100%; margin-top: 20px"
        type="primary"
        >确认</el-button
      >
    </el-dialog>
    <!-- 注册中的动画 -->
    <div v-if="!reqFinished" class="loading">
      <div class="loader"></div>
      <div class="loader"></div>
      <p class="text">注册中...</p>
    </div>
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
<style lang="scss">
.register {
  .el-dialog {
    background: white !important;
  }
  .el-dialog__title {
    color: black !important;
  }
  .iptitem {
    position: relative;
    .code {
      width: 100px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .el-input__inner {
      background: none;
      border: none;
      border-bottom: 1px solid gray;
      border-radius: 0;
      color: white;
    }
    .el-input__icon {
      font-size: 18px;
      color: white;
    }
    .el-form-item__error {
      left: 30px;
    }
  }
  .el-icon-close {
    color: #909399 !important;
  }
}
</style>