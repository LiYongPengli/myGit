<template>
<!-- 聊天工具，通讯录 -->
  <div class="maillist">
    
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import MailListCom from './MailList'
@Component
export default class MailList extends mixins(MailListCom) {

}
</script>

<style lang="scss" scoped>
@import './MailList.scss';
</style>