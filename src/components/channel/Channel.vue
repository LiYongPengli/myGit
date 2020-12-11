<template>
    <div class="channel">
         <!-- 已关注 -->
    <div class="concerned">
      <p class="concerned_p">已关注</p>
      <ul element-loading-background="rgba(58, 58, 72, 0.5)"  v-loading="loading">
        <li v-for="(v,i) in channelFollowList" :key="i">
          <div>
            <img class="flag" src="../../assets/img/followchina.png" alt="">
            <!-- <p>{{v.name}}</p> -->
              <el-tooltip class="item" effect="dark" :content="v.name" placement="top">
              <p>
                {{ v.name
                }}
              </p>
              </el-tooltip>
              <img class="close" @click="unsub(v,i)" src="../../assets/img/close.png" alt="">
          </div>
        </li>
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
       <ul>
        <li v-for="(v,i) in showlist" :key="i">
          <div>
            <img class="flag" src="../../assets/img/followchina.png" alt="">
            <!-- <p>{{v.name}}<img @click="addFollow(v,i)" src="../../assets/img/add.png" alt=""></p> -->
              <el-tooltip class="item" effect="dark" :content="v.name" placement="top">
              <p>
                {{ v.name
                }}
              </p>
              </el-tooltip>
              <img class="add" @click="addFollow(v,i)" src="../../assets/img/add.png" alt="">
          </div>
        </li>
      </ul>
    </div>
    </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import ChannelCom from "./Channel";
@Component
export default class Channel extends mixins(ChannelCom) {}
</script>
<style lang="scss" scoped>
@import "./Channel.scss";
</style>