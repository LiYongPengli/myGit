<template>
  <div class="newsinfo">
    <header-two />

    <div class="wrap" v-if="newsInfo">
      <my-scroll>
        <div
          ref="wrap_content"
          class="wrap_content"
          :style="{ width: topic_show ? '1000px' : '1200px' }"
        >
          <div class="crumbs">
            <!-- <a @click="$router.push('/')">首页</a><b>&gt;</b><a>新闻详情</a> -->
            <a @click="$router.push('/')">首页</a><b>&gt;</b>
            <a v-if="newsInfo.media_name == 'YouTube'">视频详情</a>
            <a v-else>新闻详情</a>
          </div>
          <p v-if="language == 'crawler'" class="title">
            {{ newsInfo.title.crawler }}
          </p>
          <p v-if="newsInfo.url" title="url备注" v-show="false">{{newsInfo.url}}</p>
          <p v-if="language == 'en'" class="title">{{ newsInfo.title.en }}</p>
          <p v-if="language == 'zh-CN'" class="title">
            {{ newsInfo.title["zh-CN"] }}
          </p>
          <div class="control_wrap">
            <div class="left">
              <span
                @click="tofollow"
                v-if="!newsInfo.subscribed"
                class="unfollow"
                >关注</span
              >
              <span @click="tofollow" v-if="newsInfo.subscribed" class="follow"
                >已关注</span
              >
              <span class="info"
                >{{ newsInfo.media_name_zh=='其他'?newsInfo.media_name:newsInfo.media_name_zh }} 丨
                <span v-time="newsInfo.time"></span> 丨
                {{ newsInfo.favorite }}人收藏 丨 {{ newsInfo.pv }}次浏览量</span
              >
            </div>
            <div class="right">
              <span @click="showCollection = true" class="tool"
                ><i   class="el-icon-shoucang"></i>
                <!-- <i
                  v-show="newsInfo.favorited"
                  class="el-icon-shoucangl"
                  :class="{ actives: newsInfo.favorited }"
                > 
                </i>-->
                收藏
              </span>
              <span @click="likes" class="tool"
                ><i v-show="!newsInfo.liked" class="el-icon-zan"></i>
                <i
                  v-show="newsInfo.liked"
                  class="el-icon-zanl"
                  :class="{ actives: newsInfo.liked }"
                ></i>
                点赞
              </span>

              <span @click="notInterested" class="tool"
                ><i v-show="!newsInfo.not_interested"
                  class="el-icon-nozan"
                  :class="{ actives: newsInfo.not_interested }"
                ></i
                >

                <i v-show="newsInfo.not_interested"
                  class="el-icon-nozanl"
                  :class="{ actives: newsInfo.not_interested }"
                ></i
                >
                
                不感兴趣</span
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
            class="content"
            :style="{ 'font-size': fontSize + 'px' }"
          >
            <div
              v-if="!newsInfo.is_video"
              ref="newsText"
              class="news"
            ></div>
            <div v-if="newsInfo.is_video" class="youtube">
              <div class="video_wrap">
                <video
                  :crossorigin="env == 'development' ? false : 'use-credentials'"
                  :src="
                    newsInfo.attachments[1].url
                  "
                  controls
                >
                  <track
                    v-if="showTrack('RAW')"
                    :default="!showTrack('ZH')"
                    :src="showTrack('RAW')"
                    label="原文"
                  />
                  <track
                    v-if="showTrack('ZH')"
                    default
                    :src="showTrack('ZH')"
                    label="中文"
                  />
                </video>
              </div>
              <div class="vvts">
                <my-scroll>
                  <div class="spzm">
                    <span class="zm">视频字幕</span>
                    <div class="control_btn">
                      <span
                        @click="track_language = 'crawler'"
                        :class="{ active: track_language == 'crawler' }"
                        >原文</span
                      >
                      <span
                        @click="track_language = 'zh-CN'"
                        :class="{ active: track_language == 'zh-CN' }"
                        >中文</span
                      >
                    </div>
                  </div>
                  <p
                    class="nozm"
                    v-if="
                      !getYouTubeText(newsInfo.html[track_language][0].content)
                        .length
                    "
                  >
                    暂无字幕
                  </p>
                  <p
                    v-for="(v, i) in getYouTubeText(
                      newsInfo.html[track_language][0].content
                    )"
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
              <span
                v-show="newsInfo.attachments.length"
                @click="showDownLoad = true"
                >附件下载</span
              >
            </div>
            <div v-if="!newsInfo.is_video" class="right">
              <div class="download_this">
                <span @click="downloadWord"><i></i>下载到本地</span>
              </div>
            </div>
          </div>
          <my-footer />
        </div>
      </my-scroll>
    </div>
    <!-- 附件下载 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showDownLoad"
      width="600px"
      top="28vh"
      title="附件下载"
    >
      <ul class="download_list">
        <my-scroll>
          <li v-for="(v, i) in newsInfo.attachments" :key="i">
            <speed-text width="350px" :text="v.name" />
            <!-- <span v-if="v.name" class="file_name">{{ v.name }}</span> -->
            <span v-if="!v.name" class="file_name">未知</span>
            <div class="downimg" @click="todownLoad(v)">
              <img src="../../assets/img/download.png" alt="" />
            </div>
          </li>
        </my-scroll>
      </ul>
      <span class="downloadClose" @click="showDownLoad = false">取消</span>
    </el-dialog>
    <!-- 收藏夹 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showCollection"
      width="800px"
      top="10vh"
      title="收藏到我的"
      class="sc"
    >
      <add-collection
        :id="$route.query.id"
        :attachments="newsInfo.attachments"
        v-if="showCollection"
        @status="getCollectionStatus"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import NewsInfoCom from "./NewsInfo";
import HeaderTwo from "@/components/HeaderTwo.vue";
import MyFooter from "@/components/FooterTwo.vue";
import MyScroll from "@/components/MyScroll.vue";
import AddCollection from "@/components/addcollection/AddCollection.vue";
import SpeedText from "@/components/SpeedText.vue";
@Component({
  components: {
    HeaderTwo,
    MyFooter,
    MyScroll,
    AddCollection,
    SpeedText,
  },
})
export default class NewsInfo extends mixins(NewsInfoCom) {}
</script>

<style lang="scss" scoped>
@import "./NewsInfo.scss";
</style>
