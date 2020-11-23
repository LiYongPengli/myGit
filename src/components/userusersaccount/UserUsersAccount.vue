<template>
  <!-- 用户管理/管理账号 -->
  <div class="userusersaccount">
    <div class="top">
      <div class="userIco">
        <img
          v-if="!user.headimg && !user.wechat_info.head_img"
          src="../../assets/img/morentx.png"
          alt=""
        />
        <img v-if="user.headimg" :src="user.headimg" alt="" />
        <img
          v-if="!user.headimg && user.wechat_info.head_img"
          :src="user.wechat_info.head_img"
          alt=""
        />
      </div>
      <div class="nickname">
        <span>昵称:</span>
        <span>{{ user.nickname }}</span>
      </div>
      <div class="wename">
        <span>微信:</span>
        <span>{{
          user.wechat_info.binding ? user.wechat_info.nickname : "未绑定"
        }}</span>
      </div>
    </div>
    <div class="body">
      <div class="left">
        <p>当前账户手机号</p>
        <p>{{ user.phone_number }}</p>
        <el-button
          @click="changePhone = true"
          type="primary"
          style="margin-top: 20px; width: 150px"
          >更换手机号</el-button
        >
      </div>
      <div class="right">
        <p>重置密码</p>
        <p>随机生成8位密码，将通过用户在本平台的手机号进行短信告知</p>
        <el-button
          @click="showWarinig=true"
          type="primary"
          style="margin-top: 20px; width: 150px"
          >重置密码</el-button
        >
      </div>
    </div>
    <!-- 重置密码 -->
    <el-dialog
      :visible.sync="resetPwd"
      title="重置密码"
      class="czmm"
      width="800px"
      top="41vh"
    >
      <div class="restMode">
        <p class="title">密码已重置成功</p>
        <p class="newPwd">
          新密码为:<span ref="newPwd">{{ resPwd }}</span
          ><span @click.stop="copyPwd">复制</span>
        </p>
        <p class="message">密码通过手机号短信发送,请提醒用户留意短信</p>
        <div class="resBtn">
          <el-button
            @click="resetPwd = false"
            style="width: 190px; margin-top: 20px"
            type="primary"
            >确定</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- 警告框 -->
    <transition name="el-fade-in-linear">
      <warning @ext="ext" @sure="sure" v-if="showWarinig" title="温馨提示" text="确认是否进行此操作" top="41vh" />
    </transition>
    <!-- 更换手机号 -->
    <el-dialog
      :visible.sync="changePhone"
      title="更换手机号"
      class="ghsjh"
      width="800px"
      top="40vh"
    >
      <div class="changePhone">
        <div class="changePhone_top">
          <span>新手机号:</span>😊
          <input
            type="number"
            v-model="phone"
            placeholder="请输入新手机号码"
          />
        </div>
        <div class="changePhone_foot">
          <el-button @click="changePhones" style="width: 190px" type="primary"
            >确认</el-button
          >
          <el-button @click="changePhone = false" style="width: 190px"
            >取消</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- 操作成功 -->
    <el-dialog
      :visible.sync="success"
      title="温馨提示"
      class="czmm"
      width="800px"
      top="41vh"
    >
      <div class="reminder">
       <img  src="../../assets/img/czcg.png" alt="">
       <p class="reminder_sucess" >操作成功</p>
        
          <el-button
            @click="success = false"
            style="width: 190px; margin-top: 20px"
            type="primary"
            >确认</el-button
          >
         
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserUsersAccountCom from "./UserUsersAccount";
import Warning from "@/components/Warning.vue";
@Component({
  components:{
    Warning
  }
})
export default class UserUsersAccount extends mixins(UserUsersAccountCom) {}
</script>

<style lang="scss" scoped>
@import "./UserUsersAccount.scss";
</style>
<style lang="scss">
.userusersaccount {
  .el-dialog {
    background: #3a3a48;
    .el-dialog__header {
      .el-dialog__title {
        color: white;
      }
    }
  }
  .el-button--primary {
    // background-color: #0074ff;
    // border-color: #409EFF;
    font-size: 16px;
  }
  .ghsjh{
    .el-dialog{
      height: 330px;
      .el-dialog__header{
        padding-top: 30px;
        height: 80px;
        padding-left: 50px;
        border-bottom: 1px solid #4d4d5d;
        .el-dialog__title{
          font-size: 20px;
        }
        .el-dialog__headerbtn{
          margin-right: 30px;
          color: white;
          top: 30px;
        }
      }
      .el-dialog__body{
        padding: 60px 20px;
      }
    }
  }
  .czmm{
    .el-dialog{
      height: 380px;
      .el-dialog__header{
        padding-top: 30px;
        height: 80px;
        padding-left: 50px;
        border-bottom: 1px solid #4d4d5d;
        .el-dialog__title{
          font-size: 20px;
        }
        .el-dialog__headerbtn{
          margin-right: 30px;
          color: white;
          top: 30px;
        }
      }
    }
  }
}
</style>