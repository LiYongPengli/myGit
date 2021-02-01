<template>
  <ul :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
    <li @click="contextClick('back')" class="item">
      <span class="left">后退</span>
      <span class="right">ctrl+向左箭头</span>
    </li>
    <li @click="contextClick('go')" class="item">
      <span class="left">前进</span>
      <span class="right">ctrl+向右箭头</span>
    </li>
    <li @click="contextClick('reset')" class="item">
      <span class="left">重新加载</span>
      <span class="right">ctrl+R</span>
    </li>
    <li @click="contextClick('save')" class="item">
      <span class="left">另存为</span>
      <span class="right">ctrl+S</span>
    </li>
    <li @click="contextClick('print')" class="item">
      <span class="left">打印</span>
      <span class="right">ctrl+P</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class ContextMenu extends Vue {
  @Prop({}) left!: number;
  @Prop({}) top!: number;

  public contextClick(type: string): void {
    switch (type) {
      case "back":
        this.$router.back();
        break;
      case "go":
        this.$router.go(1);
        break;
      case "reset":
        this.$router.go(0);
        break;
      case "save":
          
        break;
      case "print":
          window.print();
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
.contextmenu {
  position: fixed;
  width: 250px;
  z-index: 1000;
  background: #2d2d39;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 14px;
  border-radius: 5px;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    cursor: pointer;
  }
  .item:hover {
    background: #494959;
  }
}
</style>