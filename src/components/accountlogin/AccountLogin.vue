<template>
  <div class="accountlogin">
    <el-form ref="account_form" :model="form" :rules="account_rules">
      <el-form-item class="iptitem" prop="account">
        <el-input
          prefix-icon="el-icon-user"
          type="text"
          v-model="form.account"
          placeholder="请输入账号/手机号"
        />
      </el-form-item>

      <el-form-item class="iptitem" prop="password">
        <el-input
          prefix-icon="el-icon-lock"
          show-password
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        />
      </el-form-item>

      <el-form-item :error="vc_err" class="iptitem" prop="vc">
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
          >登录</el-button
        >
        <el-button @click="toRegister" style="flex: 1" type="danger"
          >注册</el-button
        >
      </div>
      <div class="other">
        <div class="rember_pwd">
          <el-checkbox :true-label="1" :false-label="0" v-model="remember_login"
            >七天内免登录</el-checkbox
          >
        </div>
        <div @click="$router.push('/findpassword')" class="foget_pwd">
          忘记密码?
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang='ts'>
import Component, { mixins } from "vue-class-component";
import AccountLoginCom from "./AccountLogin";
@Component
export default class AccountLogin extends mixins(AccountLoginCom) {}
</script>

<style lang="scss" scoped>
@import "./AccountLogin.scss";
</style>
<style lang="scss">
.accountlogin {
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