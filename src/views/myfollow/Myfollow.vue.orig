<template>
  <!-- 热门推荐 -->
  <div class="myfollow">
    <div class="list_wrap">
      <div class="list_nav">
        <span @click="chooseNav='all'" :class="{'cur':chooseNav=='all'}">全部关注</span>
        <span @click="chooseNav='country'" :class="{'cur':chooseNav=='country'}">国家</span>
        <span @click="chooseNav='people'" :class="{'cur':chooseNav=='people'}">人物</span>
        <span @click="chooseNav='media'" :class="{'cur':chooseNav=='media'}">媒体</span>
      </div>
      <div class="gjlb">
        <p v-if="chooseNav=='country'" class="sx">选择相关国家可以进行信息筛�/p>
        <p v-if="chooseNav=='people'" class="sx">选择相关人物可以进行信息筛�/p>
        <p v-if="chooseNav=='media'" class="sx">选择相关媒体可以进行信息筛�/p>
        <!-- 筛选栏 -->
        <!-- 国家 -->
        <div v-show="chooseNav=='country'" class="erhang">
          <span @click="all('country')" :class="{'cur':country_all}" class="all">全部</span>
           <div v-show="people.length>4" class="gd">更多+</div>
          <ul>
            <!-- <li><a>中国</a>X</li> -->
            <li :class="{'cur':v.choose}" @click="choose('country',true,i)" v-for="(v,i) in country" :key="i"><a>{{v.name_zh}}</a><span @click.stop="choose('country',false,i)" v-show="v.choose">X</span></li>
          </ul>
          
        </div>
        <!-- 人物 -->
        <div v-show="chooseNav=='people'" class="erhang">
          <span :class="{'cur':people_all}" @click="all('people')" class="all">全部</span>
           <div v-show="people.length>4" class="gd">更多+</div>
          <ul>
            <li :class="{'cur':v.choose}" @click="choose('people',true,i)" v-for="(v,i) in people" :key="i"><a>{{v.name}}</a><span @click.stop="choose('people',false,i)" v-show="v.choose">X</span></li>
          </ul>
          
        </div>
        <!-- 媒体 -->
        <div v-show="chooseNav=='media'" class="erhang">
          <span :class="{'cur':media_all}" @click="all('media')" class="all">全部</span>
           <div v-show="people.length>4" class="gd">更多+</div>
          <ul>
            <li :class="{'cur':v.choose}" @click="choose('media',true,i)" v-for="(v,i) in media" :key="i"><a>{{v.name_zh}}</a><span @click="choose('media',false,i)" v-show="v.choose">X</span></li>
          </ul>
          
        </div>
        
      </div>
      <div class="list">
        <ul>
          <li v-for="(v,i) in list" :key="i">
            <div class="ly">
              <div class="tx">
                <img src="../../assets/img/media.png" alt="" />
              </div>
              <div class="sjrs">
                <span class="mt">媒体:{{v.media_name}}</span>
                <span class="time">时间: {{init_time(v.time)}}</span>
                <span class="ll">浏览次数: {{v.pv}}</span>
              </div>
              <div class="zan">
                <img src="../../assets/img/zanpress.png" alt="" />
                <span>{{v.like}}</span>
                <img src="../../assets/img/zhuanfafasong.png" alt="" />
              </div>
            </div>
            <div class="content">
              <p  class="title"><a @click="toNewsInfo(v)" >{{v.title}}</a></p>
              <div class="ziyuan">
                <img src="../../assets/img/gztp.png" alt="" />
                <img src="../../assets/img/gztp.png" alt="" />
              </div>
            </div>
          </li>
          <div class="jzgd">更多精彩内容，加载中</div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import MyFollowCom from './Myfollow'
@Component
export default class MyFollow extends mixins(MyFollowCom) {
  
}
</script>
 

<style lang="scss" scoped>
@import "./Myfollow.scss";
</style>