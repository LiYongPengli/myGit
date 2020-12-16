<template>
  <!-- 个人中心 统计报表 -->
  <div class="userform">
    <div class="top_nav">
      <ul>
        <router-link tag="li" class="cur" to="/user/form/fetch"
          >数据采集统计</router-link
        >
        <router-link tag="li" to="/user/form/platform"
          >平台运行统计</router-link
        >
        <router-link tag="li" to="/user/form/resource"
          >资源使用率统计</router-link
        >
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserFormCom from "./UserForm";
@Component
export default class UserForm extends mixins(UserFormCom) {}
</script>

<style lang="scss" scoped>
@import "./UserForm.scss";
</style>