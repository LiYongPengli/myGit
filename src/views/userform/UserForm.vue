<template>
<!-- 个人中心 统计报表 -->
  <div class="userform">
    <div class="top_nav">
      <router-link tag="div" to="/user/form/fetch">数据采集统计</router-link>
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

</style>