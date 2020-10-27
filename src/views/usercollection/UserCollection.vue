<template>
  <!-- 我的收藏 -->
  <div class="usercollection">
    <div class="ss">
      <p>我的收藏(8)</p>
      <input type="text" placeholder="请输入关键词" />
      <button class="plfx">批量分享</button>
    </div>
    <div class="collectionlist">
      <ul>
        <li>
          <div class="collection">
            <img src="../../assets/img/sylbtp.png" alt="">
            <span class="name">拜登系列</span>
            <span class="time">2020年10月21日 创建</span>
          </div>
        </li>
         <li>
          <div class="collection">
            <img src="../../assets/img/sylbtp.png" alt="">
            <span class="name">拜登系列</span>
            <span class="time">2020年10月21日 创建</span>
          </div>
        </li>
         <li>
          <div class="collection">
            <img src="../../assets/img/sylbtp.png" alt="">
            <span class="name">拜登系列</span>
            <span class="time">2020年10月21日 创建</span>
          </div>
        </li>
         <li>
          <div class="collection">
            <img src="../../assets/img/sylbtp.png" alt="">
            <span class="name">拜登系列</span>
            <span class="time">2020年10月21日 创建</span>
          </div>
        </li>
         <li>
          <div class="collection">
            <img src="../../assets/img/sylbtp.png" alt="">
            <span class="name">拜登系列</span>
            <span class="time">2020年10月21日 创建</span>
          </div>
        </li>
         <li>
          <div class="collection">
            <img src="../../assets/img/sylbtp.png" alt="">
            <span class="name">拜登系列</span>
            <span class="time">2020年10月21日 创建</span>
          </div>
        </li>
         <li>
          <div class="collection">
            <img src="../../assets/img/sylbtp.png" alt="">
            <span class="name">拜登系列</span>
            <span class="time">2020年10月21日 创建</span>
          </div>
        </li>
         <li>
          <div class="collection">
            <img src="../../assets/img/sylbtp.png" alt="">
            <span class="name">拜登系列</span>
            <span class="time">2020年10月21日 创建</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserCollectionCom from "./UserCollection";
@Component
export default class UserCollection extends mixins(UserCollectionCom) {}
</script>

<style lang="scss" scoped>
@import "./UserCollection.scss";
</style>