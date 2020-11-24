<template>
    <div class="resourceuse">
        <h1>资源统计</h1>
    </div>
</template>


<script lang="ts">
import Component, { mixins } from "vue-class-component";
import ResourceUseCom from "./ResourceUse";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class ResourceUse extends mixins(ResourceUseCom) {}
</script>

<style lang="scss" scoped>
@import "./ResourceUse.scss";
</style>