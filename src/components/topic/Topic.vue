<template>
  <!-- 聊天工具 -->
  <div class="topic">
    <div class="topic_wrap">
      <iframe
      ref="iframe"
        v-show="topic_status == 1"
        v-if="iframeShow && env == 'production'"
        :src="axios.defaults.baseURL + topic_url"
        frameborder="0"
      ></iframe>
      <!-- 通讯录 -->
      <mail-list v-if="topic_status == 2" />
      <!-- 可能认识 -->
      <maybe-know v-if="topic_status == 3" />
    </div>
    <div class="topic_foot">
      <div class="left_menu">
        <div
          @click="setTopicStatus(1)"
          class="item"
          :class="{ active: topic_status == 1 }"
        >
          <img src="../../assets/img/chatxz.png" alt="" />
          <p>消息</p>
        </div>
        <div
          @click="setTopicStatus(2)"
          class="item"
          :class="{ active: topic_status == 2 }"
        >
          <img src="../../assets/img/tongxunlu.png" alt="" />
          <p>通讯录</p>
        </div>
        <div
          @click="setTopicStatus(3)"
          class="item"
          :class="{ active: topic_status == 3 }"
        >
          <img src="../../assets/img/connection.png" alt="" />
          <p>可能认识</p>
        </div>
        <div class="item jztlsm">
        禁止讨论涉密、敏感内容。 
        </div>
      </div>
      <div class="close" @click="setTopicShow(false)">
        <img src="../../assets/img/shouqi.png" alt="" />
        <p>收起</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import TopicCom from "./Topic";
import MailList from "@/components/maillist/MailList.vue";
import MaybeKnow from "@/components/maybeknow/MaybeKnow.vue";
@Component({
  components: {
    MailList,
    MaybeKnow,
  },
})
export default class Topic extends mixins(TopicCom) {}
</script>

<style lang="scss" scoped>
@import "./Topic.scss";
</style>
