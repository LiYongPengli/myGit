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
        <!-- <p v-if="chooseNav == 'country' && country.length" class="sx">
          选择相关国家可以进行信息筛
        </p>
        <p v-if="chooseNav == 'people' && people.length" class="sx">
          选择相关人物可以进行信息筛
        </p>
        <p v-if="chooseNav == 'media' && media.length" class="sx">
          选择相关媒体可以进行信息筛
        </p> -->
        <!-- 筛选栏 -->
        <!-- 国家 -->
        <div v-show="chooseNav == 'country' && country.length" class="erhang">
          <span
            @click="all('country')"
            :class="{ cur: country_all }"
            class="all"
            >全部</span
          >
          <!-- <div v-show="people.length > 4" class="gd">更多+</div> -->
          <ul>
            <!-- <li><a>中国</a>X</li> -->
            <li
              :class="{ cur: v.choose }"
              @click="choose('country', (v.choose?false:true), v.name_zh)"
              v-for="(v, i) in country"
              :key="i"
            >
              <a>{{ v.name_zh }}</a>
              <!-- <span class="el-icon-close" @click.stop="choose('country', false, v.name_zh)" v-show="v.choose"></span> -->
            </li>
          </ul>
        </div>
        <!-- 人物 -->
        <div v-show="chooseNav == 'people' && people.length" class="erhang">
          <span :class="{ cur: people_all }" @click="all('people')" class="all"
            >全部</span
          >
          <!-- <div v-show="people.length > 4" class="gd">更多+</div> -->
          <ul>
            <li
              :class="{ cur: v.choose }"
              @click="choose('people', (v.choose?false:true), v.zh_name)"
              v-for="(v, i) in people"
              :key="i"
            >
              <a>{{ v.zh_name }}</a>
            </li>
          </ul>
        </div>
        <!-- 媒体 -->
        <div v-show="chooseNav == 'media' && media.length" class="erhang">
          <span :class="{ cur: media_all }" @click="all('media')" class="all"
            >全部</span
          >
          <!-- <div v-show="people.length > 4" class="gd">更多+</div> -->
          <ul>
            <li
              :class="{ cur: v.choose }"
              @click="choose('media', (v.choose?false:true), v.name_zh)"
              v-for="(v, i) in media"
              :key="i"
            >
              <a>{{ v.name_zh }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="list">
        <div class="nodata" v-show="!list.length&&isfinished">暂无数据</div>
        <div class="loadingData">
          <loading v-if="initData" />
        </div>
        <ul>
          <list-item :shoControls="['like','share2']" :item="v" v-for="(v, i) in list" :key="i" />
          <loading v-if="!isfinished&&mainPageLoading&&!initData" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MyFollowCom from "./Myfollow";
import ShareContent from "@/components/sharecontent/ShareContent.vue";
import ListItem from "@/components/ListItem.vue";
import Loading from "@/components/Loading.vue";
@Component({
  components: {
    ShareContent,
    ListItem,
    Loading
  },
})
export default class MyFollow extends mixins(MyFollowCom) {}
</script>
 

<style lang="scss" scoped>
@import "./Myfollow.scss";
</style>