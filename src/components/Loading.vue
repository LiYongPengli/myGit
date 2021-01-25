<template>
  <div class="myloading">
    <span>{{ text }}</span>
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Loading extends Vue {
  @Prop({ default: "加载中请稍后", type: String }) text!: string;
}
</script>

<style lang="scss" scoped>
.myloading {
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    // width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;
    div {
      background-color: #494958;
      height: 100%;
      margin-left: 3px;
      width: 3px;
      display: inline-block;
      -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
      animation: stretchdelay 1.2s infinite ease-in-out;
    }
    .rect2 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    .rect3 {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
    .rect4 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    .rect5 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
  }

  @-webkit-keyframes stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
}
</style>