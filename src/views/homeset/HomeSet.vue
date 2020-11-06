<template>
  <div class="homeset">
    <header>
      <div class="header">
        <h1>选择您感兴趣的选项</h1>
        <span> 至少选择3个，后期可以调整 </span>
        <div class="tab">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="cur" :to="{ path: '/' }"
              >国家</el-breadcrumb-item
            >
            <el-breadcrumb-item>媒体</el-breadcrumb-item>
            <el-breadcrumb-item>人物</el-breadcrumb-item>
            <el-breadcrumb-item>推荐频道</el-breadcrumb-item>
          </el-breadcrumb>
          <input v-model="searchText" type="text" placeholder="请输入关键词" />
        </div>
      </div>
    </header>
    <!-- 国家 -->
    <div v-if="pageIndex == 0" class="content">
      <span class="yx"> 已选:{{ sub_form.country.join("、") }} </span>
      <div class="content_wrap">
        <my-scroll>
          <ul>
            <li
              @click="chooseItem('country', v, i)"
              v-for="(v, i) in country_list"
              :key="i"
              :class="{ cur: v.choose }"
            >
              <a>
                <!-- 50*30 -->
                <img :src="v.flag" alt="" />
                <span class="chinese">{{ v.name_zh }}</span>
                <span class="english">{{ v.name }}</span>
              </a>
            </li>
          </ul>
        </my-scroll>
      </div>
      <div class="footer">
        <el-button
          @click="toNext"
          style="width: 280px"
          :disabled="sub_form.country.length < 3"
          type="primary"
          >下一步</el-button
        >
      </div>
    </div>
    <!-- 媒体 -->
    <div v-if="pageIndex == 1" class="content">
      <span class="yx"> 已选:{{ sub_form.media.join("、") }} </span>
      <div class="content_wrap">
        <my-scroll>
          <span class="qit">近7天内活跃的媒体</span>
          <ul class="mt">
            <li
              @click="chooseMediaItem('week', v, i)"
              v-for="(v, i) in media_list.week"
              :key="i"
              :class="{ cur: v.choose }"
            >
              <a>
                <!-- 50*30 -->
                <img src="../../assets/img/xdd.png" alt="" />
                <span class="chinese">{{ v.name_zh }}</span>
                <span class="english">{{ v.name }}</span>
              </a>
            </li>
          </ul>
          <span class="sst">近30天内活跃的媒体</span>
          <ul class="mt">
            <li
              @click="chooseMediaItem('month', v, i)"
              v-for="(v, i) in media_list.month"
              :key="i"
              :class="{ cur: v.choose }"
            >
              <a>
                <!-- 50*30 -->
                <img src="../../assets/img/xdd.png" alt="" />
                <span class="chinese">{{ v.name_zh }}</span>
                <span class="english">{{ v.name }}</span>
              </a>
            </li>
          </ul>
        </my-scroll>
      </div>
      <div class="footer">
        <el-button
          @click="toNext"
          :disabled="sub_form.media.length < 3"
          style="width: 280px"
          type="primary"
          >下一步</el-button
        >
        <div @click="pageIndex--" class="up">上一步</div>
      </div>
    </div>
    <!-- 人物 -->
    <div v-if="pageIndex == 2" class="content">
      <div class="content_wrap">
        <my-scroll>
          <ul class="rw">
            <li
              @click="chooseItem('character', v, i)"
              :class="{ cur: v.choose }"
              v-for="(v, i) in character_list"
              :key="i"
              class=" "
            >
              <a>
                <!-- 50*30 -->
                <img src="../../assets/img/xdd.png" alt="" />
                <span class="chinese">{{ v.name }}</span>
                <!-- <span class="english">中国共产党中央委员会总书记</span> -->
              </a>
            </li>
          </ul>
        </my-scroll>
      </div>

      <div class="footer">
        <el-button
          @click="toNext"
          :disabled="sub_form.character.length < 3"
          style="width: 280px"
          type="primary"
          >下一步</el-button
        >
        <div @click="pageIndex--" class="up">上一步</div>
      </div>
    </div>
    <!-- 推荐频道 -->
    <div v-if="pageIndex == 3" class="content">
      <div class="content_wrap">
        <my-scroll>
          <ul class="tjpd">
            <li
              @click="chooseItem('channel', v, i)"
              :class="{ cur: v.choose }"
              v-for="(v, i) in channel_list"
              :key="i"
            >
              <a>{{ v.name }}</a>
            </li>
          </ul>
        </my-scroll>
      </div>
      <div class="footer">
        <el-button @click="toFinish" :disabled="sub_form.channel.length < 3" style="width:280px;" type="primary">完成</el-button>
        <div @click="pageIndex--" class="up">上一步</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import HomeSetCom from "./HomeSet";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class HomeSet extends mixins(HomeSetCom) {}
</script>

<style lang="scss">
@import "./HomeSet.scss";
</style>

<style lang="scss">
.home {
  .homeset {
    .el-breadcrumb {
      width: 800px;
      height: 80px;
      line-height: 80px;
      float: left;
    }
    .el-breadcrumb__inner,
    .el-breadcrumb__inner {
      color: white !important;
    }
    span.cur .el-breadcrumb__inner.is-link {
      font-size: 20px;
    }
    .el-row {
      text-align: center;
      margin-top: 80px;
      .el-button {
        width: 280px;
        height: 60px;
      }
      .up {
        width: 140px;
        height: 60px;
        line-height: 60px;
        background-color: #272730;
        margin-left: 20px;
        display: inline-block;
        color: white;
        cursor: pointer;
      }
      .up:hover {
        font-size: 20px;
      }
    }
  }
}
</style>

