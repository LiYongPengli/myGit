<template>
  <!-- 个人中心 我的关注 国家列表 -->
  <div class="country">
    <!-- 已关注 -->
    <div class="concerned">
      <p class="concerned_p">已关注</p>
      <ul element-loading-background="rgba(58, 58, 72, 0.5)"  v-loading="loading">
        <li v-for="(v, k) in country_follow_list" :key="k">
          <div>
            <img class="flag" :src="v.flag" alt="" />
            <el-tooltip class="item" effect="dark" :content="v.name" placement="top">
              <p>
                {{ v.name }}
              </p>
            </el-tooltip>
            <img
              class="close"
              @click.stop="unsub(v, k)"
              src="../../assets/img/close.png"
              alt=""
            />

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
        {{ word }}

        <img v-if="word == '展开'" src="../../assets/img/open.png" alt="" />
        <img v-else src="../../assets/img/shouqil.png" alt="" />
      </p>
      <ul v-loading="loadFollow">
        <li v-for="(v1, k1) in showlist" :key="k1">
          <div>
            <img class="flag" :src="v1.flag" alt="" />
            <el-tooltip class="item" effect="dark" :content="v1.name" placement="top">
              <p>
                {{ v1.name }}
              </p>
            </el-tooltip>
            <img
              class="add"
              @click="addFollow(v1, k1)"
              src="../../assets/img/add.png"
              alt=""
            />
          </div>
        </li>
        <div style="display:blcok;content:'';clear:both"></div>
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
