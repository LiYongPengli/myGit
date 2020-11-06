<template>
  <div class="newsinfo">
    <header-two />
    <div class="wrap">
      <div class="wrap_content">
        <div class="crumbs">
          <a @click="$router.push('/')">首页</a><b>&gt;</b><a>新闻详情</a>
        </div>
        <p class="title">{{ newsInfo.title }}</p>
        <div class="control_wrap">
          <div class="left">
            <span @click="tofollow" v-if="!newsInfo.subscribed" class="unfollow"
              >关注</span
            >
            <span @click="tofollow" v-if="newsInfo.subscribed" class="follow"
              >已关注</span
            >
            <span class="info"
              >{{ newsInfo.media_name }} 丨 {{ newsInfo.time }} 丨
              {{ newsInfo.favorite }}人收藏 丨 {{ newsInfo.pv }}次浏览量</span
            >
          </div>
          <div class="right">
            <span @click="toCollection" class="tool"
              ><i
                class="el-icon-star-off"
                :class="{ actives: newsInfo.favorited }"
              ></i
              >收藏</span
            >
            <span @click="likes" class="tool"
              ><i
                class="el-icon-star-off"
                :class="{ actives: newsInfo.liked }"
              ></i
              >点赞</span
            >
            <span @click="notInterested" class="tool"
              ><i
                class="el-icon-star-off"
                :class="{ actives: newsInfo.not_interested }"
              ></i
              >不感兴趣</span
            >
            <div class="font">
              【 字体:<span
                @click="fontSize = 14"
                :class="{ fontActive: fontSize == 14 }"
                >小</span
              ><span
                @click="fontSize = 16"
                :class="{ fontActive: fontSize == 16 }"
                >中</span
              ><span
                @click="fontSize = 20"
                :class="{ fontActive: fontSize == 20 }"
                >大</span
              >】
            </div>
          </div>
        </div>
        <!-- 文章主体 -->
        <div
          v-if="newsInfo"
          class="content"
          :style="{ 'font-size': fontSize + 'px' }"
        >
          <div
            v-if="newsInfo.media_name != 'YouTube'"
            v-html="getNewsContent()"
            class="news"
          ></div>
          <div v-if="newsInfo.media_name == 'YouTube'" class="youtube">
            <div class="video_wrap">
              <video :src="newsInfo.attachments[1].url" controls>
                <track :src="newsInfo.attachments[2].url" label="中文" />
                <track :src="newsInfo.attachments[3].url" label="原文" />
              </video>
            </div>
            <div class="vvts">
              <my-scroll>
                <p
                  v-for="(v, i) in getYouTubeText(newsInfo.html.content)"
                  :key="i"
                >
                  {{ v.innerHTML }}
                </p>
              </my-scroll>
            </div>
          </div>
        </div>
        <!-- 底部操作 -->
        <div class="footer">
          <div class="left">
            <div class="download_box">
              <div class="name">附件:</div>
              <ul class="list">
                <li v-for="(v, i) in newsInfo.attachments" :key="i">
                  <el-tooltip :content="v.name" placement="top">
                    <span v-if="v.name" class="file_name">{{ v.name }}</span>
                  </el-tooltip>
                  <span v-if="!v.name" class="file_name">未知</span>
                  <a :href="v.url" :download="v.name">下载</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="right">
            <div class="download_this">
              <span @click="downloadWord"><i></i>下载到本地</span>
            </div>
          </div>
        </div>
        <my-footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import NewsInfoCom from "./NewsInfo";
import HeaderTwo from "@/components/HeaderTwo.vue";
import MyFooter from "@/components/FooterTwo.vue";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    HeaderTwo,
    MyFooter,
    MyScroll,
  },
})
export default class NewsInfo extends mixins(NewsInfoCom) {}
</script>

<style lang="scss" scoped>
@import "./NewsInfo.scss";
</style>