<template>
<!-- 我的收藏 -->
  <div class="usercollection"></div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import UserCollectionCom from './UserCollection'
@Component
export default class UserCollection extends mixins(UserCollectionCom) {

}
</script>

<style lang="scss" scoped>
@import './UserCollection.scss';
</style>