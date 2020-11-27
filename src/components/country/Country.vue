<template>
  <!-- 个人中心 我的关注 国家列表 -->
  <div class="country">
    <!-- 已关注 -->
    <div class="concerned">
      <p class="concerned_p">已关注</p>
      <ul>
        <li v-for="(v, k) in countrylist" :key="k" >
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>{{v.number}}-{{v.name}}<img @click.prevent="del(v.number)" src="../../assets/img/close.png" alt="" />
            </p>
            <!-- <a @click.prevent="del(v.number)" href="">删除</a> -->
          </div>
        </li>
        <!-- <li>
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>中国<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followjnd.png" alt="" />
            <p>加拿大<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>中国<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followjnd.png" alt="" />
            <p>加拿大<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>中国<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followjnd.png" alt="" />
            <p>加拿大<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>中国<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followjnd.png" alt="" />
            <p>加拿大<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>中国<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followjnd.png" alt="" />
            <p>加拿大<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>中国<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followjnd.png" alt="" />
            <p>加拿大<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>中国<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followjnd.png" alt="" />
            <p>加拿大<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>中国<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followjnd.png" alt="" />
            <p>加拿大<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>中国<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followjnd.png" alt="" />
            <p>加拿大<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>中国<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/img/followjnd.png" alt="" />
            <p>加拿大<img src="../../assets/img/close.png" alt="" /></p>
          </div>
        </li> -->
      </ul>
    </div>
    <!-- 未关注 -->
    <div class="noattention">
      <p class="noattention_p">未关注</p>
      <p class="open" @click="showAll = !showAll">
      {{word}}

        <img v-if="word=='展开'" src="../../assets/img/open.png" alt="" />
          <img v-else  src="../../assets/img/close.png" alt="" />
      </p>
      <ul>
        <li v-for="(v1,k1) in showlist" :key="k1">
          <div>
            <img src="../../assets/img/followchina.png" alt="" />
            <p>{{v1.number}}--{{v1.name}}<img  src="../../assets/img/add.png" alt="" /></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import CountryCom from "./Country";
@Component
export default class Country extends mixins(CountryCom) {}
</script>

<style lang="scss" scoped>
@import "./Country.scss";
</style>