<template>
  <!-- 数据采集页面 -->
  <div class="formfetch">
    <div class="content">
      <div class="count">
        <div class="cjgj">
          <p class="sl"> 153 </p>
          <p class="name"> 采集覆盖国家数 </p>
        </div>
        <div class="cjzd">
            <p class="sl">1,257 </p>
         <p class="name"> 采集覆盖站点数 </p>
        </div>
        <div class="cjtj">
           <p class="sl"> 3,695,452 </p>
         <p class="name"> 累计采集数据 </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import FormFetchCom from "./FormFetch";
@Component
export default class FormFetch extends mixins(FormFetchCom) {}
</script>

<style lang="scss" scoped>
@import "./FormFetch.scss";
</style>