<template>
  <!-- 智能检索 -->
  <div class="intelligentretrieval">
    <div v-if="!showSearch" class="intelligent_wrap">
      <my-scroll @loading="loadMore">
        <header>
          <div class="search">
            <div @click="setShowIntelligent(false)" class="gbjs">关闭检索</div>
            <input
              @keypress="toSearch"
              @input="listenSearch"
              @blur="blur"
              v-model="searchText"
              type="text"
              placeholder="美国大选"
            />
            <!-- <img class="sousuo"  src="../../assets/img/sousuo.png" alt=""> -->
            <img class="sousuo" src="../../assets/img/sousuo.png" alt="" />
            <div class="searchList" v-show="showSearchList">
              <my-scroll>
                <ul>
                  <li
                    @click="clickList(v)"
                    v-for="(v, i) in searchList"
                    :key="i"
                  >
                    {{ v }}
                  </li>
                </ul>
              </my-scroll>
            </div>
          </div>
        </header>
        <div class="content" v-if="searchData">
          <!-- <div class="searchresults">
            <div class="path">
              <a style="margin-right: 10px" href="/">全部结果</a> &gt;
              <a class="searchresult" href="listlm.aspx?clmId=215"
                >关于我们 X</a
              >
              &gt;
              <a class="searchresult" href="listlm.aspx?clmId=250">章程 X</a>

            </div>
          </div> -->
          <div class="mj">
            <!-- 国家 -->
            <div class="countrymore country">
              <!-- 顶部字母筛选 -->
              <ul v-show="showCountry" style="margin-left: 80px" class="zm">
                <li
                  :class="{ cur: v.choose }"
                  @click="toFilterMenu('country', v)"
                  v-for="(v, i) in filterMenu"
                  :key="i"
                >
                  {{ v.name }}
                </li>
              </ul>
              <span>国家：</span>
              <div class="list">
                <!-- <el-tooltip class="item" effect="dark"  placement="top"> -->
                <div
                @click="multiple('country')"
                  v-show="filter.country.length > 1 && !multipleCountry"
                  class="country_search_result_list"
                >
                  {{ filter.country.join("、") }}
                  <img
                    @click.stop="clearMultiple('country')"
                    style="margin-left: 50px; margin-right: 10px"
                    src="../../assets/img/close.png"
                    alt=""
                  />
                </div>
                <!-- </el-tooltip> -->
                <ul
                  v-show="filter.country.length < 2 || multipleCountry"
                  :style="{ height: showCountry ? 'auto' : '30px' }"
                >
                  <div v-show="!multipleCountry && filter.country.length < 2">
                    <p
                      @click="chooseitem('country', '')"
                      
                      class="all listqb"
                      :class="{ cur: !filter.country.length }"
                    >
                      全部
                    </p>
                  </div>
                  <li
                    :class="{ countryli: ~filter.country.indexOf(v.name.en) }"
                    @click="chooseitem('country', v)"
                    v-for="(v, i) in countryList"
                    :key="i"
                  >
                    <el-tooltip
                      class="item itmemt_ch"
                      effect="dark"
                      :content="v.name.en + '(' + v.name['zh-CN'] + ')'"
                      placement="top"
                    >
                      <p>{{ v.name.en }}({{ v.name["zh-CN"] }})</p>
                    </el-tooltip>
                  </li>
                </ul>
              </div>

              <div class="operation">
                <!-- <div
                  v-show="filter.country.length < 2 && !multipleCountry"
                  @click="showCountry = !showCountry"
                  class="more"
                >
                  {{ "更多" + (showCountry ? "-" : "+") }}
                </div> -->
                <div
                  :style="{
                    visibility:
                      filter.country.length < 2 && !multipleCountry
                        ? 'visible'
                        : 'hidden',
                  }"
                  @click="showMore('country')"
                  class="more"
                >
                  {{ "更多" + (showCountry ? "-" : "+") }}
                </div>
                <div @click="multiple('country')" class="morchoice">多选+</div>
              </div>
            </div>
            <div class="cz" v-show="multipleCountry">
              <div @click="multipleSure('country')" class="quanbu">确定</div>
              <div @click="noMultiple('country')" class="quxiao">取消</div>
            </div>
            <!-- 媒体 -->
            <div class="countrymore country">
              <ul v-show="showMedia" style="margin-left: 80px" class="zm">
                <li
                  :class="{ cur: v.choose }"
                  class="listqb"
                  @click="toFilterMenu('media', v)"
                  v-for="(v, i) in filterMenu"
                  :key="i"
                >
                  {{ v.name }}
                </li>
              </ul>
              <span>媒体：</span>
              <div class="list">
                <div class="other">
                  <div
                  @click="multiple('media')"
                    v-show="filter.media.length > 1 && !multipleMedia"
                    class="country_search_result_list"
                  >
                    {{ filter.media.join("、") }}
                    <img
                      @click.stop="clearMultiple('media')"
                      style="margin-left: 50px; margin-right: 10px"
                      src="../../assets/img/close.png"
                      alt=""
                    />
                  </div>
                  <ul
                    v-show="filter.media.length < 2 || multipleMedia"
                    :style="{ height: showMedia ? 'auto' : '30px' }"
                  >
                    <div v-show="!multipleMedia && filter.media.length < 2">
                      <p
                        class="all"
                        
                        :class="{ cur: !filter.media.length }"
                        @click="chooseitem('media', '')"
                      >
                        全部
                      </p>
                    </div>
                    <li
                      :class="{ mtli: ~filter.media.indexOf(v.name.en) }"
                      @click="chooseitem('media', v)"
                      v-for="(v, i) in mediaList"
                      :key="i"
                    >
                      <el-tooltip
                        class="item itmemt_ch"
                        effect="dark"
                        :content="v.name.en + '(' + v.name['zh-CN'] + ')'"
                        placement="top"
                      >
                        <p>{{ v.name.en }}({{ v.name["zh-CN"] }})</p>
                      </el-tooltip>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="operation">
                <!-- <div v-show="showMedia" @click="showMedia = !showMedia" class="more">更多-</div>

                <div v-show="!showMedia" @click="showMedia = !showMedia" class="more">更多+</div> -->
                <!-- :style="{visibility: showMore ? 'visible' : 'hidden'}" -->
                <div
                  :style="{
                    visibility:
                      filter.media.length < 2 && !multipleMedia
                        ? 'visible'
                        : 'hidden',
                  }"
                  @click="showMore('media')"
                  class="more"
                >
                  {{ "更多" + (showMedia ? "-" : "+") }}

                  <!-- <div v-show="filter.media.length < 2 && !multipleMedia" @click="showMedia = !showMedia" class="more">
                  {{ "更多" + (showMedia ? "-" : "+") }} -->
                </div>
                <div @click="multiple('media')" class="morchoice">多选+</div>
              </div>
            </div>
            <div class="cz" v-show="multipleMedia">
              <div @click="multipleSure('media')" class="quanbu">确定</div>
              <div @click="noMultiple('media')" class="quxiao">取消</div>
            </div>
            <!-- 人物 -->
            <div class="country">
              <span>人物：</span>
              <div class="list">
                <div class="other">
                  <div
                  @click="multiple('character')"
                    v-show="filter.character.length > 1 && !multipleCharacter"
                    class="country_search_result_list"
                  >
                    {{ filter.character.join("、") }}
                    <img
                      @click.stop="clearMultiple('character')"
                      style="margin-left: 50px; margin-right: 10px"
                      src="../../assets/img/close.png"
                      alt=""
                    />
                  </div>
                  <ul
                    v-show="filter.character.length < 2 || multipleCharacter"
                    :style="{ height: showCharacter ? 'auto' : '30px' }"
                  >
                    <div v-show="
                          !multipleCharacter && filter.character.length < 2
                        ">
                      <p
                        @click="chooseitem('character', '')"
                        class="all listqb"
                        
                        :class="{ cur: !filter.character.length }"
                      >
                        全部
                      </p>
                    </div>
                    <li
                      @click="chooseitem('character', v)"
                      :class="{ rwli: ~filter.character.indexOf(v) }"
                      v-for="(v, i) in characterList"
                      :key="i"
                    >
                      <el-tooltip
                        class="item itmemt_ch"
                        effect="dark"
                        :content="v"
                        placement="top"
                      >
                        <p>{{ v }}</p>
                      </el-tooltip>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="operation">
                <!-- <div @click="showCharacter = !showCharacter" class="morepe">
                  更多+
                </div> -->
                <!-- :style="{visibility: (filter.media.length < 2 && !multipleMedia) ? 'visible' : 'hidden'}"  character -->
                <div
                  :style="{
                    visibility:
                      filter.character.length < 2 && !multipleCharacter
                        ? 'visible'
                        : 'hidden',
                  }"
                  @click="showMore('character')"
                  class="more"
                >
                  {{ "更多" + (showCharacter ? "-" : "+") }}
                </div>

                <div @click="multiple('character')" class="morchoice">
                  多选+
                </div>
              </div>
            </div>
            <div class="cz" v-show="multipleCharacter">
              <div @click="multipleSure('character')" class="quanbu">确定</div>
              <div @click="noMultiple('character')" class="quxiao">取消</div>
            </div>
            <!-- 时间 -->
            <div class="time">
              <span>时间：</span>
              <div class="list">
                <div class="other">
                  <ul>
                    <li @click="setFilterTime(0)" :class="{ cur: dayFilter }">
                      <div>今日</div>
                    </li>
                    <li :class="{ cur: weekFilter }" @click="setFilterTime(7)">
                      <div>一周内</div>
                    </li>
                    <li
                      :class="{ cur: monthFilter }"
                      @click="setFilterTime(30)"
                    >
                      <div>一月内</div>
                    </li>
                    <!-- <time-slot :clear="clearDate" @dateChange="dateChange" /> -->
                     <el-date-picker
                        @change="dateChange"
                        style="width: 250px; margin-right: 20px"
                        v-model="dateTime"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      >
                      </el-date-picker>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- 筛选结果 -->
          <div class="resultlist">
            <div class="paixu">
              <div
                @click="sortList('r')"
                :class="{ cur: filter.sort_type == 'r' }"
                class="correlationsort"
              >
                相关度排序
                <!-- <img class="up" src="../../assets/img/up.png" alt="" />
                <img class="down" src="../../assets/img/down.png" alt="" /> -->
              </div>
              <div
                @click="sortList('t')"
                :class="{ cur: filter.sort_type == 't' }"
                class="releasetimesort"
              >
                发布时间排序
                <!-- <img class="up" src="../../assets/img/up.png" alt="" />
                <img class="down" src="../../assets/img/down.png" alt="" /> -->
              </div>
               <div
                @click="sortList('v')"
                :class="{ cur: filter.sort_type == 'v' }"
                class="releasetimesort"
              >
                热度排序
                
              </div>
              <ul>
                <li
                  @click="setLanguage('crawler')"
                  :class="{ cur: language == 'crawler' }"
                >
                  <a>原文</a>
                </li>
                <li
                  @click="setLanguage('zh-CN')"
                  :class="{ cur: language == 'zh-CN' }"
                >
                  <a>中文</a>
                </li>
                <li
                  @click="setLanguage('en')"
                  :class="{ cur: language == 'en' }"
                >
                  <a>英文</a>
                </li>
              </ul>

              <!-- <el-button type="primary"
              >相关度排序<i class="el-icon-d-caret el-icon--right"></i
            ></el-button>
            <el-button type="primary"
              >发布时间排序<i class="el-icon-d-caret el-icon--right"></i
            ></el-button> -->
            </div>
            <div class="result">
              <ul>
                <li v-for="(v, i) in newsList" :key="i">
                  <div class="pic">
                    <img v-if="v.cover.type=='image'" :src="v.cover.url" alt="" />
                    <video-thumbnail style="width:200px;margin-right: 30px;" v-if="v.cover.type=='video'" :video_photo="v.cover.url" :video_url="v.cover.video" />
                  </div>
                  <div class="text">
                    <p v-show="language=='crawler'" @click="toNewsInfo(v)" class="title">{{ v.title.crawler }}</p>
                    <p v-show="language=='en'" @click="toNewsInfo(v)" class="title">{{ v.title.en }}</p>
                    <p v-show="language=='zh-CN'" @click="toNewsInfo(v)" class="title">{{ v.title['zh-CN'] }}</p>
                    <span class="mt">媒体: {{ v.media_name }} </span>
                    <span class="time">时间: {{ init_time(v.time) }}</span>
                    <span class="ll">浏览次数: {{ v.pv }}人</span>
                  </div>
                </li>
                <div v-show="!finished" class="jzgd">更多精彩内容，加载中</div>
              </ul>
            </div>
          </div>
        </div>
      </my-scroll>
    </div>
    <search-com @tosearch="getSearchText" v-if="showSearch" />
  </div>
</template>


<script lang="ts">
import Component, { mixins } from "vue-class-component";
import { baseApi } from "@/axios/axios";

import IntelligentRetrievalCom from "./IntelligentRetrieval";
import SearchCom from "@/components/Search.vue";
import TimeSlot from "@/components/TimeSlot.vue";
import MyScroll from "@/components/MyScroll.vue";
import VideoThumbnail from "@/components/videothumbnai/VideoThumbnail.vue";

@Component({
  components: {
    SearchCom,
    TimeSlot,
    MyScroll,
    VideoThumbnail
  },
})
export default class IntelligentRetrieval extends mixins(
  IntelligentRetrievalCom
) {}
</script>


<style lang="scss" scoped>
@import "./IntelligentRetrieval.scss";
</style>