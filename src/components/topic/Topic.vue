<template>
  <!-- 聊天工具 -->
  <div class="topic">
    <div class="topic_wrap">
      <iframe v-if="status==1" src="http://zlbxxcj.bjceis.com:58889/" frameborder="0"></iframe>
      <!-- 通讯录 -->
      <mail-list v-if="status==2" />
      <!-- 可能认识 -->
      <maybe-know v-if="status==3" />
    </div>
    <div class="topic_foot">
      <div class="left_menu">
          <div @click="status=1" class="item" :class="{'active':status==1}">
              <img src="../../assets/img/message.png" alt="">
              <p>消息</p>
          </div>
          <div @click="status=2" class="item" :class="{'active':status==2}">
              <img src="../../assets/img/tongxunlu.png" alt="">
              <p>通讯录</p>
          </div>
          <div @click="status=3" class="item" :class="{'active':status==3}">
              <img src="../../assets/img/qunzu.png" alt="">
              <p>可能认识</p>
          </div>
      </div>
      <div class="close" @click="setTopicShow(false)">
          <img src="../../assets/img/shouqi.png" alt="">
          <p>收起</p>
      </div>
    </div>
   
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import TopicCom from "./Topic";
import MailList from '@/components/maillist/MailList.vue'
import MaybeKnow from '@/components/maybeknow/MaybeKnow.vue'
@Component({
    components:{
        MailList,
        MaybeKnow
    }
})
export default class Topic extends mixins(TopicCom) {}
</script>

<style lang="scss" scoped>
@import './Topic.scss';
</style>