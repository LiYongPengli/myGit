<template>
  <div class="zhuanti"></div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import ZhuantiCom from './Zhuanti'
@Component
export default class Zhuanti extends mixins(ZhuantiCom) {

}
</script>

<style lang="scss">
@import './Zhuanti.scss';
</style>