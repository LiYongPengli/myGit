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
      <el-form :model="phone_form" :rules="phoneRules" ref="phone_form" v-show="index == 0" class="phoneLogin">
        <el-form-item :error="phoneerr" class="iptitem" prop="tel">
          <el-input
            prefix-icon="el-icon-mobile-phone"
            type="text"
            v-model="phone_form.tel"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item :error="vcerr" class="iptitem" prop="tel_vc">
          <el-input
            prefix-icon="el-icon-warning-outline"
            type="text"
            v-model="phone_form.tel_vc"
            placeholder="请输入短信验证码"
          />
          <span @click="get_code" class="get_code">{{
            send_code ? "(" + time + ")秒后可重新发送" : "获取手机验证码"
          }}</span>
        </el-form-item>
        <div style="margin-top: 20px">
          <el-button @click="next" type="danger" style="width: 100%"
            >下一步</el-button
          >
        </div>
      </el-form>
      <!-- 重置密码 -->
      <el-form :model="pwd_form" ref="pwdform" :rules="pwdRules" class="restpassword" v-show="index == 1">
        <el-form-item class="iptitem" prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            show-password
            type="password"
            v-model="pwd_form.password"
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item class="iptitem" prop="surepassword">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="pwd_form.surepassword"
            placeholder="请再次输入密码"
          />
        </el-form-item>
        <div style="margin-top: 20px">
          <el-button @click="phong_login" type="danger" style="width: 100%"
            >确认重置</el-button
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
<style lang="scss">
.findpassword {
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
}
</style>