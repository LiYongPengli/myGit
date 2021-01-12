<template>
  <!-- 视频缩略图 -->
  <div class="videoThumbnail">
    
    <img
      class="img"
      @error="imgError"
      @mouseenter="play"
      @mouseleave="stop"
      :src="video_photo"
      v-if="!showVideo&&!img_err"
    />
     <img  v-if="!showVideo&&!img_err&&!video_err" class="dianbo" src="../../assets/img/dianbo.png" alt="">
     <img  v-if="img_err&&!showVideo" class="img" src="../../assets/img/404.png" alt="">
     <img  v-if="video_err&&showVideo" class="img" src="../../assets/img/4041.png" alt="">
    <video
      @error="imgError"
      width="200"
      height="112"
      ref="video"
      v-show="showVideo&&!video_err"
      @mouseleave="stop"
      :src="video_url"
    ></video>
    <!-- <canvas
      width="200"
      height="112"
      @mouseleave="stop"
      v-show="showVideo&&!video_err"
      ref="videoCtx"
    ></canvas> -->
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
  //视频组件
  private video!: HTMLVideoElement;
  //视频加载失败
  private video_err:boolean = false;
  //封面加载失败
  private img_err:boolean = false;
  //定时器
  private timeout:any = null;

  private mounted(): void {
    this.video = this.$refs.video as HTMLVideoElement;
  }

  //图片加载失败
  public imgError():void{
    this.img_err = true;
  }

  public videoError():void{
    this.video_err = true;
  }

  //播放视频缩略动画
  private play(): void {
    this.timeout = setTimeout(() => {
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
    this.showVideo = false;
    this.video.currentTime = 0;
    this.video.pause();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.videoThumbnail {
  position: relative;
  width: 100%;
  .img {
    width: 100%;
  }
  .dianbo{
    position: absolute;
    top: 25%;
    left: 35%;
    pointer-events: none;
  }
}
</style>
