<template>
  <ul class="friendslist">
    <li class="friendslist_search">
      <input :placeholder="placeholder" type="text" v-model="search" />
      <img src="../../assets/img/scsearch.png" alt="" />
    </li>
    <ul class="friendslist_list">
      <li class="title">
        <div @click="choose_state=0" :class="{'title_nav_active':choose_state==0}" class="title_nav">我的好友</div>
        <div @click="choose_state=1" :class="{'title_nav_active':choose_state==1}" class="title_nav">我加入的群组</div>
      </li>
      <ul v-show="choose_state==0" class="friend">
        <my-scroll>
          <li
            v-show="~v.nickname.indexOf(search)"
            class="friendlist_item"
            v-for="(v, i) in friend_list"
            :key="i"
          >
            <div class="left">
              <img class="user_ico" :src="axios.defaults.baseURL + '/avatar/' + v.account" alt="" />
              <p class="user_name">
                {{ v.nickname
                }}{{ v.remark_name ? "(" + v.remark_name + ")" : "" }}
              </p>
            </div>
            <div @click.stop="setShare('user',v)" class="right">
              <img src="../../assets/img/share.png" alt="" />
              <span>分享给他(她)</span>
            </div>
          </li>
        </my-scroll>
      </ul>
      <!-- 群组 -->
      <ul v-show="choose_state==1" class="grop">
        <my-scroll>
          <li v-show="~v.name.indexOf(search)" class="friendlist_item" v-for="(v, i) in grop_list" :key="i">
            <div class="left">
              <img v-if="v.headimg" :src="v.headimg" alt="" />
              <!-- <img
                v-if="!v.headimg && v.wechat_info.head_img"
                :src="v.headimg"
                alt=""
              /> -->
              <div v-if="!v.headimg" class="user_ico">
                {{ v.name.slice(0, 1) }}
              </div>
              <p class="user_name">
                {{ v.name }}
              </p>
            </div>
            <div @click.stop="setShare('group',v)" class="right">
              <img src="../../assets/img/share.png" alt="" />
              <span>分享到该群</span>
            </div>
          </li>
        </my-scroll>
      </ul>
    </ul>
  </ul>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class FriendsList extends Vue {
  @Prop({}) friend_list!: any[];
  @Prop({}) grop_list!: any[];
  public placeholder:string = "根据用户昵称进行搜索";
  public search: string = "";
  public choose_state:number = 0;

  @Watch('choose_state')
  public chooseStateChg(newVal:number,oldVal:number):void{
    this.search = "";
    if(newVal==0){
      this.placeholder = "根据用户昵称进行搜索"
    }else{
      this.placeholder = "根据群名称进行搜索"
    }
  }

  @Emit("show")
  public setShare(type:string,user: any): any {
    return {
      item:user,
      type:type
    };
  }
}
</script>

<style lang="scss" scoped>
.friendslist {
  &_search {
    position: relative;
    padding: 5px 20px;
    height: 50px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    input {
      background: none;
      border: 1px solid gray;
      border-radius: 3px;
      width: 100%;
      color: white;
      padding-right: 35px;
      padding-left: 10px;
      outline: none;
    }
    img {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  &_list {
    .title {
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
      color: rgba(255,255,255,0.5);
      &_nav{
        cursor: pointer;
      }
      &_nav:last-of-type{
        margin-left: 20px;
      }
      &_nav_active{
        font-size: 16px;
        color: white;
      }
    }
    .friend,
    .grop {
      height: 250px;
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
}
</style>