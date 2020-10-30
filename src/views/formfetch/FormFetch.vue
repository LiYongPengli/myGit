<template>
        <!-- 数据采集页面 -->
    <div class="formfetch">
        <h1>数据采集页面111111111</h1>
    </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import FormFetchCom from "./FormFetch";
@Component
export default class FormFetch extends mixins(FormFetchCom) {}
</script>



<style scoped>
@import "./FormFetch.scss";
</style>