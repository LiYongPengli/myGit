<template>
    <!-- 智能检索 -->
    <div class="intelligentretrieval">
                智能搜索页面
    </div>
</template>


<script lang="ts">
import Component, { mixins } from "vue-class-component";
import IntelligentRetrievalCom from "./IntelligentRetrieval";
@Component
export default class IntelligentRetrieval extends mixins(IntelligentRetrievalCom) {}
</script>


<style lang="scss">
@import "./IntelligentRetrieval.scss";
</style>