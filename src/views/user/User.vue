<template>
  <div class="user">
    <header-two />
    <div class="user_scroll">
      <my-scroll>
        <div
          :style="{ width: (topic_show ? 1000 : 1200) + 'px' }"
          class="user_wrap"
        >
          <div class="user_header">
            <div class="user_info" v-if="user_message">
              <el-popover
                placement="bottom-start"
                popper-class="header_img_list_wrap"
                width="150"
                trigger="click"
              >
                <ul class="header_img_list">
                  <li @click="headportraitupdate = true">上传头像...</li>
                  <li @click="showWeiChatHeader=true" v-if="user_message.wechat_info.binding">使用微信头像</li>
                </ul>
                <div
                  slot="reference"
                  @mouseenter="showUpload = true"
                  class="user_img"
                >
                  <img
                    class="camera"
                    src="../../assets/img/camera.png"
                    alt=""
                  />
                  <img :src="user_message.headimg" alt="" />
                  <div
                    @mouseleave="showUpload = false"
                    v-show="showUpload"
                    class="img_float"
                  >
                    <span>点击上传</span>
                  </div>
                </div>
              </el-popover>

              <div class="user_message">
                <p class="user_name">{{ user_message.nickname }}</p>
                <!-- <span class="user_id"
                  >{{ user_message.phone_number.slice(0, 3) }}****{{
                    user_message.phone_number.slice(7, 11)
                  }}</span
                > -->
                <span class="user_id">{{ user_message.account }}</span>
              </div>
            </div>
            <ul class="user_menu">
              <li
                v-show="v.nosee != user_message.role"
                @click="router_link(v)"
                v-for="(v, i) in user_nav_list"
                :key="i"
                tag="li"
                :to="v.path"
                class="item"
                :class="{ user_nav_active: active_nav == v.routename }"
              >
                {{ v.name }}
              </li>
            </ul>
          </div>
          <div class="user_content">
            <router-view />
          </div>
          <div class="user_footer">
            <!-- 睿读v2.1.35 2018 © 中经软件 -->
            睿读v3.0 2020 © 中经软件
          </div>
        </div>
      </my-scroll>
    </div>
    <!-- 上传头像 -->
    <el-dialog
      :visible.sync="upLoadPhoto"
      :close-on-click-modal="false"
      :append-to-body="true"
      title="头像上传"
      width="800px"
      top="25vh"
    >
      <up-file
        v-if="upLoadPhoto"
        @ext="upRes"
        :width="210"
        :height="210"
        :img="headerPhotoPrv"
      />
    </el-dialog>
    <!-- 头像修改 -->
    <el-dialog
      :visible.sync="headportraitupdate"
      :close-on-click-modal="false"
      title="头像修改"
      class="ghsjh"
      width="800px"
      top="25vh"
    >
      <div class="niname">
        <div class="ninam_top">
          <span>头像:</span>
          <label for="up">
            <div
              @mouseenter="showUpload1 = true"
              v-if="headerPhoto"
              class="headportraitchoice1"
            >
              <img :src="headerPhotoURL" alt="" />
              <div
                v-if="showUpload1"
                @mouseleave="showUpload1 = false"
                class="header_float"
              >
                <span>重新上传</span>
              </div>
            </div>
            <input
              @change="setHeaderPhoto"
              ref="file"
              style="display: none"
              type="file"
              id="up"
              name=""
            />
            <div v-if="!headerPhoto" class="headportraitchoice">
              <img src="../../assets/img/cjqs.png" alt="" />

              <p>上传头像</p>
            </div>
          </label>
        </div>
        <div class="niname_foot">
          <el-button
            @click="changeheadportrait"
            style="width: 190px"
            type="primary"
            >确认</el-button
          >
          <el-button @click="quit" style="width: 190px">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <warning icon="headimg" @ext="showWeiChatHeader=false" @sure="useWeiChatHeader" v-if="showWeiChatHeader" title="提示" text="确定要使用微信头像吗" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserCom from "./User";
import HeaderTwo from "@/components/HeaderTwo.vue";
import MyScroll from "@/components/MyScroll.vue";
import UpFile from "@/components/upfile/UpFile.vue";
import SpeedText from "@/components/SpeedText.vue";
import Warning from "@/components/Warning.vue";
@Component({
  components: {
    HeaderTwo,
    MyScroll,
    UpFile,
    SpeedText,
    Warning
  },
})
export default class User extends mixins(UserCom) {}
</script>

<style lang="scss" scoped>
@import "./User.scss";
</style>
<style lang="scss">
.header_img_list_wrap {
  padding: 0;
  background: rgb(76,75,91)!important;
  .header_img_list {
    li {
      width: 100%;
      padding: 10px 0;
      padding-left: 20px;
      color: #bcc2d5;
      cursor: pointer;
    }
    li:first-of-type {
      border-bottom: 1px solid #4d4d5d;
    }
  }
}
</style>
