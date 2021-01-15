<template>
  <div class="userpassword">
    <div class="choose_nav">
      <p>密码管理</p>
      <span @click="fogetpwd=false" v-show="fogetpwd">返回></span>
    </div>
    <div class="userpassword_wrap">
      <!-- 普通找回密码 -->
      <el-form class="normal" v-show="!fogetpwd" ref="form" size="small" :model="form" :rules="rules" label-width="97px" label-position="left">
        <el-form-item class="item" label="旧密码:" prop="oldpwd">
          <el-input
            v-model="form.oldpwd"
            class="usrpwd"
            type="password"
            placeholder="请输入旧密码"
          />
          <span @click="fogetpwd=true" class="fogetpwd">忘记原密码></span>
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
      <!-- 忘记原密码 -->
      <el-form ref="fogetform" :rules="fogetRules" :model="fogetForm" label-width="97px" label-position="left" size="small" class="foget" v-if="fogetpwd">
        <el-form-item :error="showTelError" :show-message="true" class="item" label="手机号:" prop="tel">
          <el-input readonly class="usrpwd" v-model="fogetForm.tel" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item class="item" label="验证码:" prop="vc">
          <el-input class="usrpwd" v-model="fogetForm.vc" placeholder="请输入短信验证码" />
          <span @click.stop="get_code" class="get_code">{{
            send_code ? "(" + time + ")秒后可重新发送" : "获取手机验证码"
          }}</span>
        </el-form-item>
        <el-form-item class="item" label="新密码:" prop="newpwd">
          <el-input class="usrpwd" type="password"  v-model="fogetForm.newpwd" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item class="item" label="确认密码:" prop="surenewpwd">
          <el-input class="usrpwd" type="password" v-model="fogetForm.surenewpwd" placeholder="请输入确认密码" />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button @click="toEditPassword" style="width:280px;" type="primary">确认修改</el-button>
    </div>
    <el-dialog :close-on-click-modal="false" title="获取验证码" width="600px" top="30vh" :visible.sync="show_vc_code">
      <div class="img_code_wrap">
        <div class="img_code_item">
          <span>图片验证码:</span>
          <input type="text" v-model="img_vc_code" placeholder="请输入图片验证码" />
          <img @click="getImgCode" :src="img_vc" alt="">
        </div>
        <div class="footer">
          <el-button @click="img_srue" style="width:200px;" type="primary">确定</el-button>
        </div>
      </div>
    </el-dialog>
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
  .el-dialog{
    background: #3a3a48;
  }
}
</style>