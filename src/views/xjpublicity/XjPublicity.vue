<template>
  <div class="xjpublicity">
   <div>
         <my-scroll>
     <img src="../../assets/img/xj01.jpg" alt="">
     <img src="../../assets/img/xj02.jpg" alt="">
     <img src="../../assets/img/xj03.jpg" alt="">
     <img src="../../assets/img/xj04.jpg" alt="">
     <img src="../../assets/img/xj05.jpg" alt="">
     <img src="../../assets/img/xj06.jpg" alt="">
     <img src="../../assets/img/xj07.jpg" alt="">
     <img src="../../assets/img/xj08.jpg" alt="">
         </my-scroll>
   </div>
   <div  class="logo">
      <img src="../../assets/img/xjlogo.png" alt="" />
    </div>
    <div class="return">
      <a  href="#">
        返回 >
      </a>
    </div>
    <div class="ljzn">
      <a href="#">
        <img src="../../assets/img/rdsyzn.png" alt="">
      </a>
    </div>
  </div>
</template>
<script cript lang="ts">
import Component, { mixins } from "vue-class-component";
import XjPublicityCom from "./XjPublicity";
 
import MyScroll from "@/components/MyScroll.vue";
@Component({
    components: {
    MyScroll,
  },
})
export default class XjPublicity extends mixins(XjPublicityCom) {}
</script>

<style lang="scss" scoped>
@import "./XjPublicity.scss";
</style>
