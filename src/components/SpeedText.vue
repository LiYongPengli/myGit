<template>
  <div @mouseleave="reset" @mouseenter="move" class="speedtext" :style="{'width':width+'px','height':height+'px'}">
      <div class="dom" ref="dom">
          <slot></slot>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class SpeedText extends Vue {
    @Prop({}) width!:number;
    @Prop({}) height!:number;
    //子元素与父元素宽度差值
    public offset:number = 0;
    //滚动定时器
    public timer:number|null = null;

    public mounted():void{
        let dom = <HTMLElement>this.$refs.dom;
        if(dom.offsetWidth>this.width){
            this.offset = dom.offsetWidth - this.width;
            //this.move(dom,offset);
        }
    }

    public move():void{
        if(!this.offset) return;
        let dom = <HTMLElement>this.$refs.dom;
        if(this.timer) return;
        let flag = false;
        this.timer = setInterval(()=>{
            if(dom.offsetLeft<=0&&Math.abs(dom.offsetLeft)>=this.offset){
                flag = false;
            }else if(dom.offsetLeft>=0){
                flag = true;
            }
            if(!flag){
                dom.style.left = (dom.offsetLeft+1)+'px';
            }else{
                dom.style.left = (dom.offsetLeft-1)+'px';
            }
        },100)
    }

    public reset():void{
         let dom = <HTMLElement>this.$refs.dom;
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
        dom.style.left = 0+'px';
    }
}
</script>

<style lang="scss" scoped>
.speedtext{
    overflow: hidden;
    position: relative;
    .dom{
        width: max-content;
        position: absolute;
        left: 0;
        top: 0;
    }
}
</style>