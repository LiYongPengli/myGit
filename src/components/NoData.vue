<template>
  <div class="nodata">
      <span>{{text}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class NoData extends Vue {
    @Prop({default:'暂无数据'}) text!:string;
}
</script>

<style lang="scss" scoped>
.nodata{
    text-align: center;
    span{
        font-size: 20px;
        color: white;
        padding: 50px 0;
    }
}
</style>