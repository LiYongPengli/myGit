<template>
<!-- 聊天工具，可能认识 -->
  <div class="maybeknow">可能认识</div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import MaybeKnowCom from './MaybeKnow'
@Component
export default class MaybeKnow extends mixins(MaybeKnowCom) {

}
</script>

<style lang="scss" scoped>
@import './MaybeKnow.scss';
</style>