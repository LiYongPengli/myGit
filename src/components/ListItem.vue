<template>
  <!-- 每个列表项 -->
  <div class="listitem">
    <div class="top">
      <div class="itemInfo">
        <div class="logo">
          <img
            v-if="item.media_icon && !item.error"
            :src="item.media_icon"
            alt=""
          />
          <img v-if="item.error" src="../assets/img/media_default.png" alt="" />
          <div v-if="item.media_source == 'Spider'" class="dgdiv">
            <img class="duigou" src="../assets/img/mtdg.png" alt="" />
          </div>
        </div>
        <div class="itemInfo_info">
          <p class="name">
            媒体:{{
              item.media_name_zh == "其他"
                ? item.media_name
                : item.media_name_zh
            }}
          </p>
          <span class="time">时间: <span v-time="item.time"></span></span>
          <span v-if="!selected" class="pv">浏览次数:{{ item.pv }}</span>
        </div>
      </div>
      <div class="controls">
        <!-- 点赞 -->
        <div
          ref="like"
          v-if="~shoControls.indexOf('like')"
          @click="onlike"
          class="btn"
        >
          <img v-if="!item.liked" src="../assets/img/zanpress.png" alt="" />
          <img v-if="item.liked" src="../assets/img/zanpressl.png" alt="" />
          <span>{{ item.like }}</span>
        </div>
        <!-- 分享 -->
        <share-content :content="item" type="news">
          <div v-if="~shoControls.indexOf('share1')" class="btn">
            <img style="width: 15px" src="../assets/img/sczhuanfa.png" alt="" />
            <span>分享</span>
          </div>
        </share-content>
        <!-- 分享 -->
        <share-content :content="item" type="news">
          <div v-if="~shoControls.indexOf('share2')" class="btn">
            <img src="../assets/img/sczhuanfa.png" alt="" />
          </div>
        </share-content>
        <!-- 收藏 -->
        <div
          v-if="~shoControls.indexOf('collection')"
          @click="toCollection"
          class="btn"
        >
          <img src="../assets/img/nocollection.png" alt="" />
          <span>收藏</span>
        </div>
        <!-- <div v-show="item.favorited" v-if="~shoControls.indexOf('collection')" @click="toCollection" class="btn">
          <img src="../assets/img/shoucangl.png" alt="" />
          <span>已收藏</span>
        </div> -->
        <div
          v-if="~shoControls.indexOf('delete')"
          @click="toDelete"
          style="margin-right: 0"
          class="btn"
        >
          <img src="../assets/img/shanchu.png" alt="" />
          <span>删除</span>
        </div>
      </div>
    </div>
    <p v-if="!selected" @click="toNewsInfo" class="title">
      {{ item.title[language1 ? language1 : language] }}
    </p>
    <p v-if="selected" @click="toNewsInfo" class="title2">
      {{ item.title[language1 ? language1 : language] }}
    </p>
    <div class="content">
      <el-image
        @error="showImg1 = false"
        :fit="'scale-down'"
        class="img"
        lazy
        v-if="item.cover.type == 'image' && showImg1"
        :src="item.cover.url[0] + '?imageMogr2/thumbnail/200x'"
      >
        <div slot="error" class="image-slot">
          <img style="width: 200px" src="../assets/img/404.png" alt="" />
        </div>
      </el-image>
      <el-image
        @error="showImg2 = false"
        :fit="'scale-down'"
        class="img"
        lazy
        v-if="item.cover.type == 'image' && item.cover.url[1] && showImg2"
        :src="item.cover.url[1] + '?imageMogr2/thumbnail/200x'"
      >
        <div slot="error" class="image-slot">
          <img style="width: 200px" src="../assets/img/404.png" alt="" />
        </div>
      </el-image>
      <div v-if="item.cover.type == 'video'" class="video_wrap">
        <video
          v-if="item.cover.url[item.cover.url.length - 1] != '/'"
          @click="toPlay"
          ref="video"
          preload="none"
          :poster="item.cover.url"
          width="640px"
          height="360px"
          :src="item.cover.video"
          v-show="!error"
          @error="error = true"
          :crossorigin="env == 'development' ? false : 'use-credentials'"
          controls
          :controlsList="selected ? 'nodownload noremote footbar' : ''"
        >
          <track
            v-if="track_cw.type"
            :default="!track_zh.type"
            :src="axios.defaults.baseURL + track_cw.url"
            label="原文"
          />
          <track
            v-if="track_zh.type"
            default
            :src="axios.defaults.baseURL + track_zh.url"
            label="中文"
          />
        </video>

        <!-- 无封面视频 -->
        <video
          v-if="item.cover.url[item.cover.url.length - 1] == '/'"
          ref="video"
          width="640px"
          height="360px"
          :src="item.cover.video"
          v-show="!error"
          @error="error = true"
          :crossorigin="env == 'development' ? false : 'use-credentials'"
          controls
          :controlsList="selected ? 'nodownload noremote footbar' : ''"
        >
          <track
            v-if="track_cw.type"
            :default="!track_zh.type"
            :src="axios.defaults.baseURL + track_cw.url"
            label="原文"
          />
          <track
            v-if="track_zh.type"
            default
            :src="axios.defaults.baseURL + track_zh.url"
            label="中文"
          />
        </video>
        <img v-show="error" src="../assets/img/4041.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import ClickAble from "@/libs/ClickAble";
import ShareContent from "@/components/sharecontent/ShareContent.vue";
@Component({
  components: {
    ShareContent,
  },
})
export default class ListItem extends Vue {
  @Prop({}) item: any;
  @Prop({ default: false }) selected!: boolean;
  @Prop({}) shoControls!: string[];
  @Prop({ default: "" }) language1!: string[];
  @State("language") language!: string;
  @State("env") env!: string;
  public video_play: boolean = false;
  public error: boolean = false;
  public showImg1: boolean = true;
  public showImg2: boolean = true;
  public video: HTMLElement | null = null;
  public IntersectionObserver: IntersectionObserver | null = null;
  public track_zh = {
    url: "",
    type: false,
  };
  public track_cw = {
    url: "",
    type: false,
  };
  public created() {
    this.showTrack();
  }

  @Watch("item.news_id")
  public listenNewsId(newVal: string, oldVal: string): void {
    this.track_zh.type = false;
    this.track_zh.url = "";
    this.track_cw.type = false;
    this.track_cw.url = "";
    this.error = false;
    this.video_play = false;
    this.showTrack();
    setTimeout(() => {
      this.init_video();
    }, 500);
  }

  public mounted(): void {
    this.init_video();
  }

  public init_video() {
    let that = this;
    if (this.IntersectionObserver) {
      if (this.video) {
        this.IntersectionObserver.disconnect();
        this.IntersectionObserver.unobserve(<HTMLElement>this.video);
        this.IntersectionObserver = null;
      }
    }
    let video = <HTMLVideoElement>this.$refs.video;
    this.video = video;
    if (video) {
      if (!this.IntersectionObserver) {
        this.IntersectionObserver = new IntersectionObserver(function (
          entries,
          observer
        ) {
          console.log(entries[0]);
          if (!entries[0].isIntersecting) {
            video.pause();
            // that.video_play = false;
          }
        });
      }
      this.IntersectionObserver.observe(video);
      video.onplay = () => {
        this.video_play = true;
      };
    }
  }

  public beforeDestroy(): void {
    if (this.IntersectionObserver) {
      this.IntersectionObserver.disconnect();
      this.IntersectionObserver.unobserve(<HTMLElement>this.$refs.video);
      this.IntersectionObserver = null;
    }
  }

  public toPlay(): void {
    let video = <HTMLVideoElement>this.$refs.video;
    if (!this.video_play) {
      video.play();
    }
    this.video_play = true;
  }

  public toNewsInfo(): void {
    if (this.selected) {
      return;
    }
    window.open(
      "#/newsinfo?id=" + this.item.news_id + "&md_id=" + this.item.media_id
    );
  }

  public showTrack(): void {
    for (let i = 0; i < this.item.attachments.length; i++) {
      if (this.item.attachments[i].position == "SUBTITLES_ZH") {
        this.track_zh.type = true;
        let url = <string>this.item.attachments[i].url;
        let urlArr = url.split("/");
        urlArr.splice(0, 3);
        let lastUrl = urlArr.join("/");
        this.track_zh.url = "/" + lastUrl;
      }
      if (this.item.attachments[i].position == "SUBTITLES_RAW") {
        this.track_cw.type = true;
        let url = <string>this.item.attachments[i].url;
        let urlArr = url.split("/");
        urlArr.splice(0, 3);
        let lastUrl = urlArr.join("/");
        this.track_cw.url = "/" + lastUrl;
      }
    }
  }

  //删除
  @Emit("ondelete")
  public toDelete() {}
  //点赞
  public onlike() {
    let like = <HTMLElement>this.$refs.like;
    this.axios
      .post("/v1/cmd/", {
        cmd: "like_news",
        paras: {
          news_id: this.item.news_id,
          news_oper: this.item.liked ? "undo" : "do",
        },
      })
      .then((res) => {
        if (res.data.data.msg == "操作成功") {
          if (this.item.liked) {
            this.item.like--;
          } else {
            this.item.like++;
            new ClickAble(like, like.offsetLeft + 10, like.offsetTop);
          }
          this.item.liked = !this.item.liked;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //收藏
  @Emit("oncollection")
  public toCollection() {}
}
</script>

<style lang="scss" scoped>
.listitem {
  border-bottom: 1px solid #3a3a48;
  padding: 20px;
  color: white;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .itemInfo {
      display: flex;
      align-items: center;
      .logo {
        width: 54px;
        position: relative;
        .dgdiv {
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: 0px;
          right: -5px;
          background-color: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          img.duigou {
            width: 120%;
            display: block;
          }
        }
        img {
          display: block;
          width: 100%;
        }
      }
      .itemInfo_info {
        margin-left: 20px;
        .name {
          padding-bottom: 15px;
        }
        .time,
        .pv {
          font-size: 13px;
          color: #bcc2d5;
        }
        .pv {
          margin-left: 25px;
        }
      }
    }
    .controls {
      display: flex;
      align-items: center;
      .btn {
        display: flex;
        align-items: center;
        margin: 0 10px;
        cursor: pointer;
        img {
          margin-right: 5px;
        }
        span {
          font-size: 14px;
          color: #bcc2d5;
        }
      }
    }
  }
  .title2 {
    margin-top: 15px;
    width: max-content;
    max-width: 100%;
  }
  .title {
    margin-top: 15px;
    cursor: pointer;
    width: max-content;
    max-width: 100%;
  }
  .title:hover {
    text-decoration: underline;
  }
  .content {
    margin-top: 20px;
    .img {
      width: 200px;
      height: 132px;
      margin-right: 20px;
      background: #393946;
    }
    .video_wrap {
      video {
        outline: none;
      }
    }
  }
}
</style>