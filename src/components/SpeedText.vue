<template>
  <div
    @mouseleave="reset"
    @mouseenter="move"
    class="speedtext"
    :style="{ width: width, height: height }"
  >
    <div class="dom" ref="dom">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class SpeedText extends Vue {
  @Prop({}) width!: string;
  @Prop({}) height!: string;
  @Prop({}) text!: string;
  @Prop({ default: 0.3, type: Number }) speed!: number;
  //子元素与父元素宽度差值
  public offset: number = 0;
  //滚动定时器
  public timer: number | null = null;

  @Watch("text")
  public textChg(newVal: string, oldVal: string): void {
    setTimeout(() => {
      let dom = <HTMLElement>this.$refs.dom;
      let width = ~this.width.indexOf("%")
        ? this.width.slice(0, this.width.length - 1)
        : this.width.slice(0, this.width.length - 2);
      if (dom.offsetWidth > Number(width)) {
        this.offset = dom.offsetWidth - Number(width);
      } else {
        this.offset = 0;
      }
    }, 100);
  }
  public mounted(): void {
    let dom = <HTMLElement>this.$refs.dom;
    let width = ~this.width.indexOf("%")
      ? this.width.slice(0, this.width.length - 1)
      : this.width.slice(0, this.width.length - 2);
    if (dom.offsetWidth > Number(width)) {
      this.offset = dom.offsetWidth - Number(width);
    } else {
      this.offset = 0;
    }
  }

  public move(): void {
    if (!this.offset) return;
    let dom = <HTMLElement>this.$refs.dom;
    if (this.timer) return;
    let flag = false;
    let left = dom.offsetLeft;
    this.timer = setInterval(() => {
      if (dom.offsetLeft <= 0 && Math.abs(dom.offsetLeft) >= this.offset) {
        flag = false;
      } else if (dom.offsetLeft >= 0) {
        flag = true;
      }
      if (!flag) {
        left += this.speed;
      } else {
        left -= this.speed;
      }
      dom.style.left = left + "px";
    }, 10);
  }

  public reset(): void {
    let dom = <HTMLElement>this.$refs.dom;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    dom.style.left = 0 + "px";
  }
}
</script>

<style lang="scss" scoped>
.speedtext {
  overflow: hidden;
  position: relative;
  .dom {
    width: max-content;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>