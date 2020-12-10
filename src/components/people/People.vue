<template>
  <div class="people">
    <!-- 已关注 -->
    <div class="concerned">
      <p class="concerned_p">已关注</p>

      <div class="concernedlists">
        <div v-for="(v,i) in characterFollowList" :key="i" class="concernedlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>{{v.name}}</span>
          <p>中国共产党中央委员会总书记</p>
          <img @click="unsub(v,i)" src="../../assets/img/close.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 未关注 -->
    <div class="noattention">
      <p class="noattention_p">未关注</p>
      <p class="noattention_list">还没有找到想关注的人物？</p>
      <div class="noattentionlists">
        <div v-for="(v,i) in characterList" :key="i" class="noattentionlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>{{v.name}}</span>
          <p>中国共产党中央委员会总书记</p>
          <img @click="addFollow(v,i)" src="../../assets/img/add.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import PeopleCom from "./People";
@Component
export default class People extends mixins(PeopleCom) {}
</script>
<style lang="scss" scoped>
@import "./People.scss";
</style>