<template>
  <div class="zhuanti">
    <div class="mycollect">
      <ul class="position">
        <li class="L">
          <a @click="$router.push('/user/collection/0')"> 我的收藏 </a>
          >
          <a> {{ name }} </a>
          <span class="tongji"> 共 {{ list.length }} 篇文章 </span>
        </li>
      </ul>
      <share-content :content="{ name: name }" type="collection">
        <span class="plfx right">分享收藏夹</span>
      </share-content>
    </div>
    <div class="list">
      <my-scroll>
        <ul>
          <list-item :shoControls="['share1','delete']" @ondelete="toDelete(v,i)" :item="v" v-for="(v, i) in list" :key="i" />
          <!-- <li v-for="(v, i) in list" :key="i">
            <div class="pic">
              <video-thum-bnail
                v-if="v.cover.type == 'video'"
                :video_photo="v.cover.url"
                :video_url="v.cover.video"
              />
              <el-image
                  :fit="'scale-down'"
                  class="img"
                  lazy
                  v-if="v.cover.type == 'image'"
                  :src="v.cover.url[0]"
                >
                  <div slot="error" class="image-slot">
                    <img
                      style="width: 200px"
                      src="../../assets/img/404.png"
                      alt=""
                    />
                  </div>
                </el-image>
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
              <span @click="toDelete(v, i)" class="shanchu"> 删除</span>
              <share-content :content="v" type="news">
                <span class="fenxiang">分享</span>
              </share-content>
            </div>
          </li> -->
          <!-- <div class="jzgd">更多精彩内容，加载中</div> -->
        </ul>
      </my-scroll>
    </div>
    <transition name="el-fade-in-linear">
      <warning
        v-if="showWarning"
        text="确认要删除该条收藏吗?"
        title="温馨提示"
        top="25vh"
        @sure="sure"
        @ext="ext"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import ZhuantiCom from "./Zhuanti";
import MyScroll from "@/components/MyScroll.vue";
import Warning from "@/components/Warning.vue";
import ShareContent from "@/components/sharecontent/ShareContent.vue";
import VideoThumBnail from "@/components/videothumbnai/VideoThumbnail.vue";
import ListItem from "@/components/ListItem.vue";
@Component({
  components: {
    MyScroll,
    Warning,
    ShareContent,
    VideoThumBnail,
    ListItem
  },
})
export default class Zhuanti extends mixins(ZhuantiCom) {}
</script>

<style lang="scss">
@import "./Zhuanti.scss";
</style>