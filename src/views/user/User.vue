<template>
  <div class="user">
    <header-two />
    <div class="user_scroll">
      <my-scroll>
        <div class="user_wrap">
          <div class="user_header">
            <div class="user_info" v-if="user_message">
              <div class="user_img">
                <img
                  v-show="!user_message.wechat_info.head_img"
                  src="../../assets/img/tx.png"
                  alt=""
                />
                <img
                  v-if="user_message.wechat_info.head_img"
                  :src="user_message.wechat_info.head_img"
                  alt=""
                />
              </div>
              <div class="user_message">
                <p class="user_name">{{ user_message.nickname }}</p>
                <span class="user_id">{{ user_message.phone_number }}</span>
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
                :class="{ user_nav_active: active_nav == v.path }"
              >
                {{ v.name }}
              </li>
            </ul>
          </div>
          <div class="user_content">
            <router-view />
          </div>
        </div>
      </my-scroll>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserCom from "./User";
import HeaderTwo from "@/components/HeaderTwo.vue";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    HeaderTwo,
    MyScroll,
  },
})
export default class User extends mixins(UserCom) {}
</script>

<style lang="scss" scoped>
@import "./User.scss";
</style>