<template>
  <!-- 绑定睿读账号 -->
  <div class="bindAccount">
    <div class="login_wrap">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <p class="title">微信授权成功,请绑定睿读账号</p>
      <!--  -->
      <el-form ref="form" :model="form" :rules="rules" class="inputs">
        <el-form-item class="iptitem" prop="account">
          <el-input
            prefix-icon="el-icon-user"
            type="text"
            v-model="form.account"
            placeholder="请输入账户名称"
          />
        </el-form-item>
        <el-form-item class="iptitem" prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            show-password
            v-model="form.password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item :error="vcerr" class="iptitem" prop="vc">
          <el-input
            prefix-icon="el-icon-warning-outline"
            type="text"
            v-model="form.vc"
            placeholder="请输入验证码"
          />
          <img @click="getImgCode" class="code" :src="img_vc" alt="" />
        </el-form-item>
        <div class="sub_btn">
          <el-button @click="toLogin" style="flex: 3" type="primary"
            >绑定</el-button
          >
          <el-button @click="$router.back()" style="flex: 1" type="danger"
            >取消</el-button
          >
        </div>
      </el-form>
      <!--  -->
    </div>
  </div>
</template>

<script lang="ts">
import { baseApi } from "@/axios/axios";

import qs from "qs";
import Component, { mixins } from "vue-class-component";
import BindAccountCom from "./BindAccount";
@Component
export default class BindAccount extends mixins(BindAccountCom) {}
</script>

<style lang="scss" scoped>
@import "./BindAccount.scss";
</style>
<style lang="scss">
.bindAccount {
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