<template>
  <div class="newsinfo">
    <header-two />

    <div class="wrap" v-if="newsInfo">
      <my-scroll>
        <div class="wrap_content">
          <div class="crumbs">
            <a @click="$router.push('/')">首页</a><b>&gt;</b><a>新闻详情</a>
          </div>
          <p v-show="language == 'crawler'" class="title">{{ newsInfo.title.crawler }}</p>
          <p v-show="language == 'en'" class="title">{{ newsInfo.title.en }}</p>
          <p v-show="language == 'zh-CN'" class="title">{{ newsInfo.title["zh-CN"] }}</p>
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
              <span @click="showCollection = true" class="tool"
                ><i class="el-icon-shoucang" :class="{ actives: newsInfo.favorited }"></i
                >收藏</span
              >
              <span @click="likes" class="tool"
                ><i class="el-icon-zan" :class="{ actives: newsInfo.liked }"></i
                >点赞</span
              >
              <span @click="notInterested" class="tool"
                ><i
                  class="el-icon-nozan"
                  :class="{ actives: newsInfo.not_interested }"
                ></i
                >不感兴趣</span
              >
              <div class="font">
                【 字体:<span
                  @click="fontSize = 14"
                  :class="{ fontActive: fontSize == 14 }"
                  >小</span
                ><span @click="fontSize = 16" :class="{ fontActive: fontSize == 16 }"
                  >中</span
                ><span @click="fontSize = 20" :class="{ fontActive: fontSize == 20 }"
                  >大</span
                >】
              </div>
            </div>
          </div>
          <!-- 文章主体 -->
          <div v-if="newsInfo" class="content" :style="{ 'font-size': fontSize + 'px' }">
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
                    v-for="(v, i) in getYouTubeText(newsInfo.html[language].content)"
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
              <span @click="showDownLoad = true">附件下载</span>
            </div>
            <div class="right">
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
      <my-scroll>
        <ul class="download_list">
          <li v-for="(v, i) in newsInfo.attachments" :key="i">
            <span v-if="v.name" class="file_name">{{ v.name }}</span>
            <span v-if="!v.name" class="file_name">未知</span>
            <div class="downimg" @click="todownLoad(v)">
              <img src="../../assets/img/download.png" alt="" />
            </div>
          </li>
        </ul>
      </my-scroll>
      <span class="downloadClose" @click="showDownLoad = false">取消</span>
    </el-dialog>
    <!-- 收藏夹 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showCollection"
      width="800px"
      top="20vh"
      title="收藏到我的"
      class="sc"
    >
      <add-collection
        :id="$route.query.id"
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
@Component({
  components: {
    HeaderTwo,
    MyFooter,
    MyScroll,
    AddCollection,
  },
})
export default class NewsInfo extends mixins(NewsInfoCom) {}
</script>

<style lang="scss" scoped>
@import "./NewsInfo.scss";
</style>
<style lang="scss">
.newsinfo {
  .el-dialog {
    background: #3a3a48;
    min-height: 450px;
    .el-dialog__header {
      height: 80px;
      line-height: 80px;
      padding: 0;
      padding-left: 20px;
      border-bottom: 1px solid #4D4D5D;
      .el-dialog__title {
        font-size: 20px;
      }
      .el-dialog__headerbtn {
        right: 50px;
      }
    }
    .el-dialog__body {
      padding: 20px 50px;
    }
  }

  .el-icon-close {
    line-height: 24px;
    color: white;
  }
  .el-icon-close:hover {
    color: white;
  }
  .el-dialog__title {
    color: white;
    margin-left: 30px;
  }
}
</style>
