<template>
  <div class="userusers">
    <div class="choose_nav">
      <div class="left">
        <p>用户管理</p>
        <p v-if="editAccount">>管理账号</p>
      </div>
      <div @click="editAccount=false" v-show="editAccount" class="back">返回></div>
    </div>
    <!-- 主体 -->
    <div v-if="!editAccount" class="content">
      <div class="top">
        <p>用户登录名单</p>
        <div class="inputs">
          <input type="text" placeholder="账号/昵称/手机号" />
          <img src="../../assets/img/search.png" alt="" />
        </div>
      </div>
      <!-- 表格 -->
      <div class="table">
        <div class="thead">
          <div class="th">账号</div>
          <div class="th">昵称</div>
          <div class="th">手机号</div>
          <div class="th">微信昵称</div>
          <div class="th zcsj">注册时间
                <img v-show="sortType=='up'" class="up" src="../../assets/img/up.png" alt="" />
                <img v-show="sortType!='up'" @click="sortType='up'" class="upact" src="../../assets/img/down.png" alt="" />
                
                <img v-show="sortType!='down'" @click="sortType='down'" class="downact" src="../../assets/img/down.png" alt="" />
                <img v-show="sortType=='down'" class="down" src="../../assets/img/up.png" alt="" />
                </div>
          <div class="th">操作</div>
        </div>
        <div class="tbody">
          <my-scroll>
            <div v-for="(v, i) in userList" :key="i" class="tr">
              <div class="td">{{v.account}}</div>
              <div class="td">{{v.nickname}}</div>
              <div class="td">{{v.phone_number}}</div>
              <div class="td">{{v.wechat_info.binding?v.wechat_info.nickname:'未绑定'}}</div>
              <div class="td">{{UserCreatetime(v.registration_date)}}</div>
       
              <div class="td more">
                  <span v-if="user_message.role=='admin'&&v.role!='oper'" @click="setAdmin(v)">设为管理员 |</span> 
                <span v-if="user_message.role=='admin'&&v.role=='oper'" @click="setAdmin(v)">取消管理员 |</span>
                <span @click="toEditAccount(v)"> 管理账号</span>
              </div>
            </div>
          </my-scroll>
        </div>
      </div>
    </div>
    <!-- 管理账号 -->
    <div v-if="editAccount" class="content">
        <user-account :user="eidtUser" />
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserUsersCom from "./UserUsers";
import MyScroll from "@/components/MyScroll.vue";
import UserAccount from "@/components/userusersaccount/UserUsersAccount.vue"
@Component({
  components: {
    MyScroll,
    UserAccount
  },
})
export default class UserCollection extends mixins(UserUsersCom) {}
</script>


<style lang="scss" scoped>
@import "./UserUsers.scss";
</style>