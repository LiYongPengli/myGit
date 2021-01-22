<template>
  <!-- 查看分享的收藏夹 -->
  <div v-if="favorite" class="fromshare">
    <header-two />
    <div class="collectionlist_wrap">
      <div class="collection_header">
        <!-- <div class="left"> -->
          <!-- <img
            v-if="favorite.name == '默认'"
            src="../../assets/img/scmr.png"
            alt=""
          />
          <img v-if="favorite.name != '默认'" :src="favorite.cover" alt="" /> -->
          <div class="collection_info">
            <span class="name">
              {{ favorite.name == "默认" ? "默认标签" : favorite.name }}
            </span>
            <span class="fxr">
              ({{favorite.share_user}}分享的收藏夹)
            </span>
            <span class="length">共 {{ favorite.news.length }} 篇文章</span>
            <!-- <span class="create_time"
              >{{ favorite.share_time.split(".")[0] }} 创建</span
            > -->
          <!-- </div> -->
        </div>
        <div class="right">
          <div @click="toAddCollection" class="collect">
            <img src="../../assets/img/nocollection.png" alt="">
            <span>收藏该文件夹</span>
          </div>
          <!-- <div v-show="favorite.status!='pending'" class="ready_collect">
            <img src="../../assets/img/shoucangl.png" alt="">
            <span>已收藏</span>
          </div> -->
        </div>
      </div>
      <div class="collectionlist">
        <my-scroll>
          <ul>
            <list-item @oncollection="collectionId=v.news_id;showCollection=true" :item="v" :shoControls="['collection']" v-for="(v, i) in favorite.news" :key="i" />
            <!-- <li v-for="(v, i) in favorite.news" :key="i">
              <div class="pic">
                <video-thum-bnail v-if="v.cover.type=='video'" :video_photo="v.cover.url" :video_url="v.cover.video" />
                <img v-if="v.cover.type=='image'" :src="v.cover.url" alt="" />
              </div>
              <div class="text">
                <p
                  v-if="language == 'crawler'"
                  @click="toNewsInfo(v)"
                  class="title"
                >
                  {{ v.title.crawler }}
                </p>
                <p v-if="language == 'en'" @click="toNewsInfo(v)" class="title">
                  {{ v.title.en }}
                </p>
                <p
                  v-if="language == 'zh-CN'"
                  @click="toNewsInfo(v)"
                  class="title"
                >
                  {{ v.title["zh-CN"] }}
                </p>
                <span class="mt">媒体: {{ v.media_name }} </span>
                <span class="time">时间: {{ init_time(v.time) }}</span>
                <span class="ll">浏览次数: {{ v.pv }}</span>
              </div>

              <div class="zan">
                <span @click="collectionId=v.news_id;showCollection=true" v-show="!v.favorited" class="nocollection">收藏</span>
                <span @click="collectionId=v.news_id;showCollection=true" v-show="v.favorited" class="collected">已收藏</span>
                
              </div>
            </li> -->
          </ul>
        </my-scroll>
      </div>
      <div class="footer"></div>
    </div>
    <!-- 收藏夹 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showCollection"
      width="800px"
      top="28vh"
      title="收藏到我的"
      class="sc"
    >
      <add-collection :id="collectionId" v-if="showCollection" @status="getCollectionStatus" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import FromShareCom from "./FromShare";
import HeaderTwo from "@/components/HeaderTwo.vue";
import MyScroll from "@/components/MyScroll.vue";
import AddCollection from '@/components/addcollection/AddCollection.vue'
import ShareContent from "@/components/sharecontent/ShareContent.vue";
import VideoThumBnail from "@/components/videothumbnai/VideoThumbnail.vue";
import ListItem from "@/components/ListItem.vue";
@Component({
  components: {
    HeaderTwo,
    MyScroll,
    VideoThumBnail,
    ShareContent,
    AddCollection,
    ListItem
  },
})
export default class FromShare extends mixins(FromShareCom) {}
</script>

<style lang="scss" scoped>
@import "./FromShare.scss";
</style>