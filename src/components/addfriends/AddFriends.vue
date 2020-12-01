<template>
<!-- 添加好友 -->
  <div class="addfriends">
      <span @click="$emit('update:visable', 1)">返回</span>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import AddFriendsCom from './AddFriends'
@Component
export default class AddFriends extends mixins(AddFriendsCom) {

}
</script>

<style lang="scss" scoped>
@import "./AddFriends.scss";
</style>