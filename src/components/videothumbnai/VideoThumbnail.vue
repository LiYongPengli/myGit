<template>
  <!-- 视频缩略图 -->
  <div class="videoThumbnail">
    <img
      class="img"
      @mouseenter="play"
      @mouseleave="stop"
      :src="video_photo"
      v-if="!showVideo"
    />
    <video
      ref="video"
      style="display: none"
      :src="video_url"
    ></video>
    <canvas
      width="200"
      height="112"
      @mouseleave="stop"
      v-show="showVideo"
      ref="videoCtx"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class VideoThumbnail extends Vue {
  //视频封面
  @Prop({}) public video_photo!:string;
  //视频地址
  @Prop({}) public video_url!: string;
  //是否展示视频动画
  private showVideo: boolean = false;
  //播放视频用的canvas上下文
  private videoCtx!: HTMLCanvasElement;
  //视频组件
  private video!: HTMLVideoElement;
  //定时器
  private interval: any = null;
  private timeout:any = null;

  private mounted(): void {
    this.videoCtx = this.$refs.videoCtx as HTMLCanvasElement;
    this.video = this.$refs.video as HTMLVideoElement;
  }

  //播放视频缩略动画
  private play(): void {
    this.timeout = setTimeout(() => {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        let ctx = this.videoCtx.getContext("2d") as CanvasRenderingContext2D;
        ctx.drawImage(
          this.video,
          0,
          0,
          this.videoCtx.width,
          this.videoCtx.height
        );
      });
      this.showVideo = true;
      this.video.volume = 0;
      this.video.play();
    },200);
  }

  //停止播放
  private stop(): void {
    if(this.timeout){
      clearTimeout(this.timeout);
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.showVideo = false;
    this.video.currentTime = 0;
    this.video.pause();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.videoThumbnail {
  width: 100%;
  .img {
    width: 100%;
  }
}
</style>
