<template>
  <!-- 每个列表项 -->
  <div class="listitem">
    <div class="top">
      <div class="itemInfo">
        <div class="logo">
          <img src="../assets/img/media_default.png" alt="" />
        </div>
        <div class="itemInfo_info">
          <p class="name">媒体:{{ item.media_name }}</p>
          <span class="time">时间: <span v-time="item.time"></span></span>
          <span class="pv">浏览次数:{{ item.pv }}</span>
        </div>
      </div>
      <div class="controls">
        <div v-if="~shoControls.indexOf('like')" @click="onlike" class="btn">
          <img src="../assets/img/zanpress.png" alt="" />
          <span>{{ item.like }}</span>
        </div>
        <share-content :content="item" type="news">
          <div v-if="~shoControls.indexOf('share1')" class="btn">
            <img src="../assets/img/sczhuanfa.png" alt="" />
            <span>分享</span>
          </div>
        </share-content>
        <share-content :content="item" type="news">
          <div v-if="~shoControls.indexOf('share2')" class="btn">
            <img src="../assets/img/sczhuanfa.png" alt="" />
          </div>
        </share-content>
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
    <p class="title">{{ item.title[language] }}</p>
    <div class="content">
      <el-image
        :fit="'scale-down'"
        class="img"
        lazy
        v-if="item.cover.type == 'image'"
        :src="item.cover.url[0]"
      >
        <div slot="error" class="image-slot">
          <img style="width: 200px" src="../assets/img/404.png" alt="" />
        </div>
      </el-image>
      <el-image
        :fit="'scale-down'"
        class="img"
        lazy
        v-if="item.cover.type == 'image' && item.cover.url[1]"
        :src="item.cover.url[1]"
      >
        <div slot="error" class="image-slot">
          <img style="width: 200px" src="../assets/img/404.png" alt="" />
        </div>
      </el-image>
      <div v-if="item.cover.type == 'video'" class="video_wrap">
        <video
          v-show="!error"
          @error="error = true"
          :src="item.cover.video"
          controls
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
        <img v-show="error" src="../assets/img/404.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import ShareContent from "@/components/sharecontent/ShareContent.vue";
@Component({
  components: {
    ShareContent,
  },
})
export default class ListItem extends Vue {
  @Prop({}) item: any;
  @Prop({}) shoControls!: string[];
  @State("language") language!: string;
  public error:boolean = false;
  public track_zh = {
    url: "",
    type: false,
  };
  public track_cw = {
    url: "",
    type: false,
  };
  public created() {
    console.log(this.item);
    this.showTrack();
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
        console.log(this.track_cw.url)
      }
    }
  }

  //删除
  @Emit("ondelete")
  public toDelete() {}
  //点赞
  @Emit("onlike")
  public onlike() {}
}
</script>

<style lang="scss" scoped>
.listitem {
  border-bottom: 1px solid #3a3a48;
  padding: 20px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .itemInfo {
      display: flex;
      align-items: center;
      .logo {
        width: 54px;
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
  .title {
    margin-top: 15px;
    cursor: pointer;
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
    }
  }
}
</style>