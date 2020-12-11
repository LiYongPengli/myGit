<template>
    <div class="media">
         <!-- 已关注 -->
    <div class="concerned">
      <p class="concerned_p">已关注</p>
      <ul v-loading="loadFollow"  element-loading-background="rgba(58, 58, 72, 0.5)" >
        <li v-for="(v,i) in mediaFollowList" :key="v.sub_id">
          <div>
            <img class="flag" src="../../assets/img/followchina.png" alt="">
            <!-- <p>{{v.name_zh}}</p> -->
         <el-tooltip class="item" effect="dark" :content="v.name" placement="top">
              <p>
                {{ v.name
                }}
              </p>
              </el-tooltip>
            <img  class="close" @click="unsub(v,i)" src="../../assets/img/close.png" alt="">
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
        <img v-else src="../../assets/img/close.png" alt="" />
      </p>
       <ul v-loading="loading">
        <li v-for="(v,i) in showlist" :key="v.sub_id">
          <div>
            <img class="flag" src="../../assets/img/followchina.png" alt="">
            <!-- <p>{{v.name_zh}}<img @click="addFollow(v,i)" src="../../assets/img/add.png" alt=""></p> -->
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
import MediaCom from "./Media";
@Component
export default class Media extends mixins(MediaCom) {}
</script>
<style lang="scss" scoped>
@import "./Media.scss";
</style>