<template>
  <ul class="friendslist">
    <li class="friendslist_search">
      <input placeholder="根据用户昵称进行搜索" type="text" v-model="search" />
      <img src="../../assets/img/scsearch.png" alt="">
    </li>
    <li v-show="~v.nickname.indexOf(search)" class="friendlist_item" v-for="(v, i) in friend_list" :key="i">
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
    public search:string = "";

    @Emit('show')
    public setShare(user:any):any{
        return user;
    }
};
</script>

<style lang="scss" scoped>
.friendslist {
  &_search{
    position: relative;
    input{
      background: none;
      border: 1px solid gray;
      border-radius: 3px;
      width: 100%;
      color: white;
      padding-right: 35px;
      padding-left: 10px;
      outline: none;
    }
    img{
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
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