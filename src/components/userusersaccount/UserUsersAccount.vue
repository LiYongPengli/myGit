<template>
<!-- 用户管理/管理账号 -->
  <div class="userusersaccount">
    <div class="top">
      <div class="userIco">
        <img v-if="!user.headimg&&!user.wechat_info.head_img" src="../../assets/img/morentx.png" alt="">
        <img v-if="user.headimg" :src="user.headimg" alt="">
        <img v-if="!user.headimg&&user.wechat_info.head_img" :src="user.wechat_info.head_img" alt="">
      </div>
      <div class="nickname">
        <span>昵称:</span>
        <span>{{user.nickname}}</span>
      </div>
      <div class="wename">
        <span>微信:</span>
        <span>{{user.wechat_info.binding?user.wechat_info.nickname:'未绑定'}}</span>
      </div>
    </div>
    <div class="body">
      <div class="left">
        <p>当前账户手机号</p>
        <p>{{user.phone_number}}</p>
        <el-button type="primary" style="margin-top:20px;width:150px;">更换手机号</el-button>
      </div>
      <div class="right">
        <p>重置密码</p>
        <p>随机生成8位密码，将通过用户在本平台的手机号进行短信告知</p>
        <el-button @click="resetPwd=true" type="primary" style="margin-top:20px;width:150px;">重置密码</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="resetPwd" title="重置密码" width="800px" top="25vh">
      <p class="title">重置密码成功</p>
      <p class="newPwd">新密码为:<span>12345</span><span>复制</span></p>
      <p class="message">密码通过手机号短信发送,请提醒用户留意短信</p>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import UserUsersAccountCom from './UserUsersAccount'
@Component
export default class UserUsersAccount extends mixins(UserUsersAccountCom) {
}
</script>

<style lang="scss">
@import './UserUsersAccount.scss';
</style>