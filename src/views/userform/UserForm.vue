<template>
<!-- 个人中心 统计报表 -->
  <div class="userform">
    <div class="top_nav">
      <router-link tag="div" class="cur" to="/user/form/fetch">数据采集统计</router-link>
      <router-link tag="div"  to="/user/form/platform">平台运行统计</router-link>
      <router-link tag="div"  to="/user/form/resource">资源使用率说明</router-link>

    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import UserFormCom from './UserForm'
@Component
export default class UserForm extends mixins(UserFormCom) {

}
</script>

<style lang="scss" scoped>
@import './UserForm.scss';
</style>