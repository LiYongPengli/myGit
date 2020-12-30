<template>
  <!-- 热门推荐 -->
  <div class="myfollow">
    <div class="list_wrap">
      <div class="list_nav">
        <span
          @click="listenChooseNav('all')"
          :class="{ cur: chooseNav == 'all' }"
          >全部关注</span
        >
        <span
          @click="listenChooseNav('country')"
          :class="{ cur: chooseNav == 'country' }"
          >国家</span
        >
        <span
          @click="listenChooseNav('people')"
          :class="{ cur: chooseNav == 'people' }"
          >人物</span
        >
        <span
          @click="listenChooseNav('media')"
          :class="{ cur: chooseNav == 'media' }"
          >媒体</span
        >
      </div>
      <div class="gjlb">
        <p v-if="chooseNav == 'country' && country.length" class="sx">
          选择相关国家可以进行信息筛
        </p>
        <p v-if="chooseNav == 'people' && people.length" class="sx">
          选择相关人物可以进行信息筛
        </p>
        <p v-if="chooseNav == 'media' && media.length" class="sx">
          选择相关媒体可以进行信息筛
        </p>
        <!-- 筛选栏 -->
        <!-- 国家 -->
        <div v-show="chooseNav == 'country' && country.length" class="erhang">
          <span
            @click="all('country')"
            :class="{ cur: country_all }"
            class="all"
            >全部</span
          >
          <div v-show="people.length > 4" class="gd">更多+</div>
          <ul>
            <!-- <li><a>中国</a>X</li> -->
            <li
              :class="{ cur: v.choose }"
              @click="choose('country', true, i)"
              v-for="(v, i) in country"
              :key="i"
            >
              <a>{{ v.name_zh }}</a
              ><span @click.stop="choose('country', false, i)" v-show="v.choose"
                ><img src="../../assets/img/close.png" alt=""
              /></span>
            </li>
          </ul>
        </div>
        <!-- 人物 -->
        <div v-show="chooseNav == 'people' && people.length" class="erhang">
          <span :class="{ cur: people_all }" @click="all('people')" class="all"
            >全部</span
          >
          <div v-show="people.length > 4" class="gd">更多+</div>
          <ul>
            <li
              :class="{ cur: v.choose }"
              @click="choose('people', true, i)"
              v-for="(v, i) in people"
              :key="i"
            >
              <a>{{ v.name }}</a
              ><span @click.stop="choose('people', false, i)" v-show="v.choose"
                ><img src="../../assets/img/close.png" alt=""
              /></span>
            </li>
          </ul>
        </div>
        <!-- 媒体 -->
        <div v-show="chooseNav == 'media' && media.length" class="erhang">
          <span :class="{ cur: media_all }" @click="all('media')" class="all"
            >全部</span
          >
          <div v-show="people.length > 4" class="gd">更多+</div>
          <ul>
            <li
              :class="{ cur: v.choose }"
              @click="choose('media', true, i)"
              v-for="(v, i) in media"
              :key="i"
            >
              <a>{{ v.name_zh }}</a
              ><span @click.stop="choose('media', false, i)" v-show="v.choose"
                ><img src="../../assets/img/close.png" alt=""
              /></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list">
        <div class="nodata" v-show="!list.length">暂无数据</div>
        <ul>
          <li v-for="(v, i) in list" :key="i">
            <div class="ly">
              <div class="tx">
                <img src="../../assets/img/media.png" alt="" />
              </div>
              <div class="sjrs">
                <span class="mt">媒体:{{ v.media_name }}</span>
                <span class="time">时间: {{ init_time(v.time) }}</span>
                <span class="ll">浏览次数: {{ v.pv }}</span>
              </div>
              <div class="zan">
                <img src="../../assets/img/zanpress.png" alt="" />
                <span>{{ v.like }}</span>
                <share-content :content="v" type="news">
                  <img src="../../assets/img/sczhuanfa.png" alt="" />
                </share-content>
              </div>
            </div>
            <div class="content">
              <p v-show="language == 'crawler'" class="title">
                <a @click="toNewsInfo(v)">{{ v.title.crawler }}</a>
              </p>
              <p v-show="language == 'en'" class="title">
                <a @click="toNewsInfo(v)">{{ v.title.en }}</a>
              </p>
              <p v-show="language == 'zh-CN'" class="title">
                <a @click="toNewsInfo(v)">{{ v.title["zh-CN"] }}</a>
              </p>
              <div class="ziyuan">
                <img v-if="v.cover.type=='image'" :src="v.cover.url[0]" alt="" />
                <img v-if="v.cover.type=='image'" :src="v.cover.url[1]" alt="" />
                <div v-if="v.cover.type=='video'" class="video_wrap">
                  <video v-show="!v.error" @error="loaderr(i)" :src="v.cover.video" controls></video>
                  <img v-show="v.error" src="../../assets/img/404.jpg" alt="">
                </div>
              </div>
            </div>
          </li>
          <div @click="getList" v-show="!isfinished" class="jzgd">点击加载更多</div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MyFollowCom from "./Myfollow";
import ShareContent from "@/components/sharecontent/ShareContent.vue";
@Component({
  components: {
    ShareContent,
  },
})
export default class MyFollow extends mixins(MyFollowCom) {}
</script>
 

<style lang="scss" scoped>
@import "./Myfollow.scss";
</style>