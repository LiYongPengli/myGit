<template>
  <!-- 手机号登录 -->
  <div class="phonelogin">
    <el-form ref="phone_form" :model="phone_form" :rules="rules">
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
          placeholder="请输入验证码"
        />
        <span @click="get_code" class="get_code">{{
          send_code ? "(" + time + ")秒后可重新发送" : "获取手机验证码"
        }}</span>
      </el-form-item>
      <div style="margin-top: 20px">
        <el-button @click="phong_login" type="primary" style="width: 100%"
          >登录</el-button
        >
      </div>
    </el-form>
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
import phoneLoginCom from "./PhoneLogin";
@Component
export default class phoneLogin extends mixins(phoneLoginCom) {}
</script>

<style lang="scss">
@import "./PhoneLogin.scss";
</style>
<style lang="scss">
.phonelogin {
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