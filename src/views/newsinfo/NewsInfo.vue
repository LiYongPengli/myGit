<template>
  <div class="newsinfo">
    <div class="header">
      <div class="logo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="user"></div>
      <div class="search">
        <img src="../../assets/img/search.png" alt="">
        <input type="text" placeholder="大家正在搜：加码挑拨！美议员提决议案：呼吁美国恢复与台“邦交”，终结一中政策" />
      </div>
      <div class="language">
        <span>原文</span>
        <span class="language_active">中文</span>
        <span>英文</span>
      </div>
    </div>
    <div class="wrap">
      <p class="title">欧树军：美国的国家认同危机</p>
      <div class="control_wrap">
        <div class="left">
          <span>关注</span>
          <span
            >TechWeb.com.cn 丨 2020-09-14 11:36 丨 23人收藏 丨 183次浏览量</span
          >
        </div>
        <div class="right"></div>
      </div>
      <!-- 文章主体 -->
      <div class="content">
        亨廷顿因《文明的冲突与世界秩序的重建》而享誉世界，其生前最后一本书《我们是谁：美国国家认同面临的挑战》，却没有得到足够充分的讨论。这本书的主旨可以概括为：文明冲突演化成为美国的文化内战，激化了21世纪初美国的国家认同危机。而在作者看来，特朗普政府的内外政策倒很像根据此书制订而成，也注定酝酿其内部的认同危机。
        本文来自微信公众号：读书杂志（ID：dushu_magazine），作者：欧树军（本文原发于《读书》2020年9月新刊），头图来自：视觉中国
        2008年，美国政治学者塞缪尔·亨廷顿（1927~2008）与世长辞。亨廷顿在政治上一生都是自由主义的民主党人，在思想上却是个不折不扣的保守主义者，他在美国耶鲁大学、芝加哥大学、哈佛大学接受政治学教育，在哈佛大学政治学系任教五十余年，六本专著均耗时近十年潜心写就，也都坦率直言美国政治、世界政治和“美国与世界”关系的要害，因此在美国政治学界备受争议却影响巨大，堪称理解美国现实政治的理想窗口。
        回首亨廷顿身后的动荡世界，人们仍能感受其思考的敏锐。他的“文明冲突论”比福山的“历史终结论”更能解释冷战结束以来的世界格局变迁。他对“我们是谁”的追问告诉人们，“文明冲突战”早已在美国国内打响。特朗普政府的所作所为正是在回应这个挑战，特朗普政府的思想路线是亨廷顿而非班农奠定的，特朗普政府的内外政策更像是受到其生前最后一部著作2004年《我们是谁：美国国家认同面临的挑战》的启发。
        如果拉长历史的视野来看，当代美国的自由主义和保守主义都是在冷战中成长起来的，二者在冷战期间既一致对外又彼此斗争，在冷战结束后彻底分道扬镳、各奔东西。自由主义者相信历史已经终结，希望向全世界推销美国价值、美国体制，保守主义者居安思危，希望重振美国的核心文化和国家认同，奥巴马政府代表前者坚持多元主义、世界主义和“软帝国主义”，特朗普政府代表后者走向美国主义、民族主义和“硬帝国主义”。
      </div>
      <!-- 底部操作 -->
      <div class="footer">
        <div class="left">
          <div class="download_box">
            <div class="name">附件:</div>
            <ul class="list">
              <li v-for="(v,i) in 2" :key="i">
                <span>xxxxx</span>
                <span>下载</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="download_this">
            <span><i></i>下载到本地</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import NewsInfoCom from "./NewsInfo";
@Component
export default class NewsInfo extends mixins(NewsInfoCom) {}
</script>

<style lang="scss" scoped>
@import "./NewsInfo.scss";
</style>