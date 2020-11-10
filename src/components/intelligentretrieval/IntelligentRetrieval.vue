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
              v-model="searchText"
              type="text"
              placeholder="美国大选"
            />
            <!-- <img class="sousuo"  src="../../assets/img/sousuo.png" alt=""> -->
            <img class="sousuo"  src="../../assets/img/sousuo.png" alt="">
          </div>
        </header>
        <div class="content" v-if="searchData">
          <div class="mj">
            <div class="countrymore country">
              <ul v-show="showCountry" style="margin-left: 55px" class="zm">
                <li :class="{cur:v.choose}" @click="toFilterMenu('country',v)" v-for="(v,i) in filterMenu" :key="i">{{v.name}}</li>
              </ul>
              <span>国家：</span>
              <div class="list">
                <div
                  @click="chooseitem('country', '')"
                  class="all listqb"
                  :class="{ cur: !filter.country.length }"
                  
                >
                  全部
                </div>
                <ul :style="{'height':showCountry?'auto':'30px'}">
                  <li
                    :class="{ countryli: ~filter.country.indexOf(v.name.en) }"
                    @click="chooseitem('country', v)"
                    v-for="(v, i) in countryList"
                    :key="i"
                  >
                    <p>{{ v.name.en }}({{ v.name["zh-CN"] }})</p>
                  </li>
                </ul>
              </div>
              <div class="operation">
                <div  @click="showCountry = !showCountry" class="more">
                {{ "更多" + (showCountry ? "-" : "+") }}
                </div>
                  
                <div class="morchoice">多选+</div>
              </div>
            </div>
            <div class="cz" v-show="multipleCountry">
              <div class="quanbu">确定</div>
              <div class="quxiao">取消</div>
            </div>
            <!-- 媒体 -->
            <div class="countrymore country">
              <ul v-show="showMedia" style="margin-left: 55px" class="zm">
                <li :class="{cur:v.choose}" class="listqb"  @click="toFilterMenu('media',v)" v-for="(v,i) in filterMenu" :key="i">{{v.name}}</li>
              </ul>
              <span>媒体：</span>
              <div class="list">
                <div
                class="all"
                  :class="{ cur: !filter.media.length }"
                  @click="chooseitem('media', '')"
                >
                  全部
                </div>
                <div class="other">
                  <ul :style="{'height':showMedia?'auto':'30px'}">
                    <li
                      :class="{ mtli: ~filter.media.indexOf(v.name.en) }"
                      @click="chooseitem('media', v)"
                      v-for="(v, i) in mediaList"
                      :key="i"
                    >
                      <p>{{ v.name.en }}({{ v.name["zh-CN"] }})</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="operation">
                <!-- <div v-show="showMedia" @click="showMedia = !showMedia" class="more">更多-</div>

                <div v-show="!showMedia" @click="showMedia = !showMedia" class="more">更多+</div> -->
                <div @click="showMedia = !showMedia" class="more">{{ "更多" + (showMedia ? "-" : "+") }}</div>
                <div class="morchoice">多选+</div>
              </div>
            </div>
            <!-- 人物 -->
            <div class="country">
              <span>人物：</span>
              <div class="list">
                <div
                  @click="chooseitem('character', '')"
                  class="all listqb"
                  :class="{ cur: !filter.character.length }"
                >
                  全部
                </div>
                <div class="other">
                  <ul :style="{'height':showCharacter?'auto':'30px'}">
                    <li
                      @click="chooseitem('character', v)"
                      :class="{ rwli: ~filter.character.indexOf(v) }"
                      v-for="(v, i) in characterList"
                      :key="i"
                    >
                      <p>{{ v }}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="operation">
                <div @click="showCharacter = !showCharacter" class="morepe">
                  更多+
                </div>
              </div>
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
                    <time-slot :clear="clearDate" @dateChange="dateChange" />
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
                    <img src="../../assets/img/sylbtp.png" alt="" />
                  </div>
                  <div class="text">
                    <p @click="toNewsInfo(v)" class="title">
                      {{ v.title }}
                    </p>
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
import IntelligentRetrievalCom from "./IntelligentRetrieval";
import SearchCom from "@/components/Search.vue";
import TimeSlot from "@/components/TimeSlot.vue";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    SearchCom,
    TimeSlot,
    MyScroll,
  },
})
export default class IntelligentRetrieval extends mixins(
  IntelligentRetrievalCom
) {}
</script>


<style lang="scss" scoped>
@import "./IntelligentRetrieval.scss";
</style>