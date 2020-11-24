<template>
<!-- 平台访问数据 -->
    <div class="platformaccess">
        <div class="content">
            111111111111111111平台访问数据
        </div>
    </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import PlatformAccessCom from "./PlatformAccess";
@Component
export default class PlatformAccess extends mixins(PlatformAccessCom) {}
</script>

<style lang="scss" scoped>
@import "./PlatformAccess.scss";
</style>