<template>
  <ul class="friendslist">
    <li class="friendlist_item" v-for="(v, i) in friend_list" :key="i">
      <div class="left">
        <img v-if="v.headimg" :src="v.headimg" alt="" />
        <img
          v-if="!v.headimg && v.wechat_info.head_img"
          :src="v.headimg"
          alt=""
        />
        <div class="user_ico">{{ v.nickname.slice(0, 1) }}</div>
        <p class="user_name">
          {{ v.nickname }}{{ v.remark_name ? "(" + v.remark_name + ")" : "" }}
        </p>
      </div>
      <div @click.stop="setShare(v)" class="right">
        <img src="../../assets/img/share.png" alt="" />
        <span>分享给他(她)</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component,Emit,Prop,Vue } from 'vue-property-decorator';
@Component
export default class FriendsList extends Vue {
    @Prop({}) friend_list!:any[];

    @Emit('show')
    public setShare(user:any):any{
        return user;
    }
};
</script>

<style lang="scss" scoped>
.friendslist {
    li {
      padding: 5px 20px;
      height: 50px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      .left,
      .right {
        display: flex;
        align-items: center;
      }
      .left {
        .user_ico {
          width: 30px;
          height: 30px;
          border-radius: 3px;
          background: #009688;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .user_name {
          margin-left: 5px;
        }
      }
      .right {
        cursor: pointer;
        span {
          margin-left: 5px;
        }
      }
    }
  }
</style>