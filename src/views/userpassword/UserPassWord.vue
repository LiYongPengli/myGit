<template>
  <div class="userpassword">
    <div class="userpassword_wrap">
      <el-form ref="form" size="small" :model="form" :rules="rules" label-width="97px" label-position="left">
        <el-form-item class="item" label="旧密码:" prop="oldpwd">
          <el-input
            v-model="form.oldpwd"
            class="usrpwd"
            type="password"
            placeholder="请输入旧密码"
          />
          <span class="fogetpwd">忘记原密码></span>
        </el-form-item>
        <el-form-item class="item" label="新密码:" prop="newpwd">
          <el-input
            v-model="form.newpwd"
            class="usrpwd"
            type="password"
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item class="item" label="确认密码:" prop="surenewpwd">
          <el-input
            v-model="form.surenewpwd"
            class="usrpwd"
            type="password"
            placeholder="请输入确认密码"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button @click="toEditPassword" style="width:280px;" type="primary">确认修改</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserPassWordCom from "./UserPassWord";
@Component
export default class UserPassWord extends mixins(UserPassWordCom) {}
</script>

<style lang="scss" scoped>
@import "./UserPassWord.scss";
</style>
<style lang="scss">
.userpassword {
  .el-form-item__label {
    color: white !important;
  }
  .usrpwd input{
      width: 400px;
      background: none!important;
      border: none!important;
      border-bottom: 1px solid #4d4d5d !important;
      padding: 10px 0;
      outline: none!important;
      color: white!important;
    }
  .el-form-item__label::before{
    content: ""!important;
    margin-right:0!important;
  }
}
</style>