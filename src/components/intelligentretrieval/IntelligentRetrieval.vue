<template>
  <!-- 智能检索 -->
  <div class="intelligentretrieval">
    <div v-if="!showSearch" class="intelligent_wrap">
      <header>
        <div class="search">
          <div @click="setShowIntelligent(false)" class="gbjs">关闭检索</div>
          <input v-model="searchText" type="text" placeholder="美国大选" />
          <img class="sousuo"  src="../../assets/img/sousuo.png" alt="">
        </div>
      </header>
      <div class="content" v-if="searchData">
        <div class="mj">
          <div class="countrymore country">
            <ul v-show="showCountry" style="margin-left: 55px" class="zm">
              <li>A</li>
              <li>B</li>
              <li>C</li>
              <li>D</li>
              <li>E</li>
              <li>F</li>
              <li>G</li>
              <li>H</li>
              <li>I</li>
              <li>J</li>
              <li>K</li>
              <li>L</li>
              <li>M</li>
              <li>N</li>
              <li>O</li>
              <li>P</li>
              <li>Q</li>
              <li>R</li>
              <li>S</li>
              <li>T</li>
              <li>U</li>
              <li>V</li>
              <li>W</li>
              <li>X</li>
              <li>Y</li>
              <li>Z</li>
            </ul>
            <span>国家：</span>
            <div class="list">
              <div @click="chooseitem('country','')" :class="{'all':!filter.country.length}" class="listqb">全部</div>
              <ul>
                <li :class="{'countryli':~filter.country.indexOf(v.name.en)}" @click="chooseitem('country',v)" v-for="(v, i) in getFilterList('country',searchData.filters.country)" :key="i">
                  <p> {{ v.name.en }}({{ v.name["zh-CN"] }}) </p>
                </li>
                <li data-v-2750436f="" class=""><p data-v-2750436f=""> Kenya(肯尼亚) </p></li>
              </ul>
            </div>
            <div class="operation">
              <div @click="showCountry=!showCountry" class="more">更多+</div>
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
              <li>A</li>
              <li>B</li>
              <li>C</li>
              <li>D</li>
              <li>E</li>
              <li>F</li>
              <li>G</li>
              <li>H</li>
              <li>I</li>
              <li>J</li>
              <li>K</li>
              <li>L</li>
              <li>M</li>
              <li>N</li>
              <li>O</li>
              <li>P</li>
              <li>Q</li>
              <li>R</li>
              <li>S</li>
              <li>T</li>
              <li>U</li>
              <li>V</li>
              <li>W</li>
              <li>X</li>
              <li>Y</li>
              <li>Z</li>
            </ul>
            <span>媒体：</span>
            <div class="list">
              <div :class="{'all':!filter.media.length}" @click="chooseitem('media','')" class="listqb">全部</div>
              <div class="other">
                <ul>
                  <li :class="{'mtli':~filter.media.indexOf(v.name.en)}" @click="chooseitem('media',v)" v-for="(v, i) in getFilterList('media',searchData.filters.media)" :key="i">
                    <p>{{ v.name.en }}({{ v.name["zh-CN"] }})</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="operation">
              <div @click="showMedia=!showMedia" class="more">更多+</div>
              <div class="morchoice">多选+</div>
            </div>
          </div>
          <!-- 人物 -->
          <div class="country">
            <span>人物：</span>
            <div class="list">
              <div @click="chooseitem('character','')" :class="{'all':!filter.character.length}" class="listqb">全部</div>
              <div class="other">
                <ul>
                  <li @click="chooseitem('character',v)" :class="{'rwli':~filter.character.indexOf(v)}" v-for="(v, i) in getFilterList('character',searchData.filters.character)" :key="i">
                    <p>{{ v }}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="operation">
              <div @click="showCharacter=!showCharacter" class="morepe">更多+</div>
            </div>
          </div>
          <div class="time">
            <span>时间：</span>
            <div class="list">
              <div class="other">
                <ul>
                  <li @click="setFilterTime(0)" :class="{'cur':dayFilter}">
                    <div>今日</div>
                  </li>
                  <li :class="{'cur':weekFilter}" @click="setFilterTime(7)"><div>一周内</div></li>
                  <li :class="{'cur':monthFilter}" @click="setFilterTime(30)"><div>一月内</div></li>
                  <time-slot :clear="clearDate" @dateChange="dateChange" />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="resultlist">
          <div class="paixu">
            <div @click="sortList('r')" :class="{'cur':filter.sort_type=='r'}" class="correlationsort">
              相关度排序
              <!-- <img class="up" src="../../assets/img/up.png" alt="" />
              <img class="down" src="../../assets/img/down.png" alt="" /> -->
            </div>
            <div @click="sortList('t')" :class="{'cur':filter.sort_type=='t'}" class="releasetimesort">
              发布时间排序
              <!-- <img class="up" src="../../assets/img/up.png" alt="" />
              <img class="down" src="../../assets/img/down.png" alt="" /> -->
            </div>
            <ul>
              <li @click="setLanguage('crawler')" :class="{'cur':language=='crawler'}"><a>原文</a></li>
              <li @click="setLanguage('zh-CN')" :class="{'cur':language=='zh-CN'}"><a>中文</a></li>
              <li @click="setLanguage('en')" :class="{'cur':language=='en'}"><a>英文</a></li>
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
              <li @click="toNewsInfo(v)" v-for="(v, i) in newsList" :key="i">
                <div class="pic">
                  <img src="../../assets/img/sylbtp.png" alt="" />
                </div>
                <div class="text">
                  <p class="title">
                    {{ v.title }}
                  </p>
                  <span class="mt">媒体: {{ v.media_name }} </span>
                  <span class="time">时间: {{ init_time(v.time) }}</span>
                  <span class="ll">浏览次数: {{ v.pv }}人</span>
                </div>
              </li>
              <div class="jzgd">更多精彩内容，加载中</div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <search-com @tosearch="getSearchText" v-if="showSearch" />
  </div>
</template>


<script lang="ts">
import Component, { mixins } from "vue-class-component";
import IntelligentRetrievalCom from "./IntelligentRetrieval";
import SearchCom from "@/components/Search.vue";
import TimeSlot from "@/components/TimeSlot.vue";
@Component({
  components: {
    SearchCom,
    TimeSlot,
  },
})
export default class IntelligentRetrieval extends mixins(
  IntelligentRetrievalCom
) {}
</script>


<style lang="scss" scoped>
@import "./IntelligentRetrieval.scss";
</style>