<template>
  <div id="app">
    <video
      class="back_video"
      v-if="isshow"
      autoplay
      muted
      loop
      src="./assets/video/index_back.mp4"
    ></video>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class App extends Vue {
  private isshow = false;
  @Watch("$route.name")
  listenRoute(newVal: string, oldVal: string): void {
    if (newVal == "Login" || newVal == "Register" || newVal == "Findpassword") {
      this.isshow = true;
    } else {
      this.isshow = false;
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  .back_video {
    width: 100%;
    height: 100%;
    position: fixed;
    object-fit: fill;
    left: 0;
    top: 0;
    z-index: -1;
  }
}
.clear:after {
  display: block;
  height: 0;
  content: ""; /*不用有内容也可以*/
  visibility: hidden;
  clear: both;
}
//下拉框样式
.el-popover {
  background: #2d2d39 !important;
  border: none!important;
  color: white!important;
  box-sizing: border-box;
}

/* .el-dropdown-menu li{
  color: white!important;
}
.el-dropdown-menu li:hover{
  background:  #2d2d39!important;
} */
.popper__arrow::after{
  border-color: #2d2d39!important;
}
</style>
