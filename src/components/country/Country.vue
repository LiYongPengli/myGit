<template>
<!-- 个人中心 我的关注 国家列表 -->
  <div class="country"></div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import CountryCom from './Country'
@Component
export default class Country extends mixins(CountryCom) {

}
</script>

<style lang="scss" scoped>
@import './Country.scss';
</style>