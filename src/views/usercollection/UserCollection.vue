<template>
  <!-- 我的收藏 -->
  <div class="usercollection">
    <div class="ss">
      <p>我的收藏(8)</p>
      <input type="text" placeholder="请输入关键词" />
      <span class="plfx">批量分享</span>
    </div>
    <vue-scroll>
      <div class="collectionlist">
        <ul>
          <li>
            <div class="collection">
              <img src="../../assets/img/scmr.png" alt="">
              <span class="name">默认标签</span>
              <span class="time"></span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
           <li>
            <div class="collection cjsqhz">
              <img class="cjsq" src="../../assets/img/cjqs.png" alt="" />
              <span class="cjsqmz">拜登系列</span>
              <span class="time"></span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
            <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
            <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
         
         
        </ul>
      </div>
    </vue-scroll>
     <footer-two />
  </div>
 
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserCollectionCom from "./UserCollection";
import FooterTwo from '@/components/FooterTwo.vue';
@Component({
  components:{
    FooterTwo
  }
})
export default class UserCollection extends mixins(UserCollectionCom) {};
</script>

<style lang="scss" scoped>
@import "./UserCollection.scss";
</style>