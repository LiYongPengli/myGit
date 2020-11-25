<template>
  <!-- 聊天工具，通讯录 -->
  <div class="maillist">
    <div class="content">
      <div class="title">
        <span class="maybetitle">通讯录</span>
        <span class="newfriend">
          <a href="">+</a>
          新的朋友
        </span>
      </div>
      <div class="search">
        <input type="text" placeholder="搜索好友" />
        <img src="../../assets/img/search.png" alt="" />
      </div>
      <div class="content_userlists">
        <ul>
          <!-- <li v-for="(v, k) in tableData" :key="k" :class="{'active':k%2 != 0}"> -->
          <my-scroll>
            <p>"王天驰"将"李湘"的名片推给您</p>
            <li class="recommend">
              <div class="content_userlist new">
                <p class="content_userlist_engname">L</p>
                <p class="content_userlist_chinename">李湘</p>
                <p class="content_userlist_fabuqingqiu">
                  <img src="../../assets/img/fabuqingqiu.png" alt="" />
                  请求添加好友
                </p>
                <p class="content_userlist_hulve">
                  <img src="../../assets/img/hulve.png" alt="" />
                  忽略
                </p>
              </div>
            </li>
            <li class="addnewfriend">
              <div class="content_userlist new">
                <p class="content_userlist_engname">L</p>
                <p class="content_userlist_chinename">李湘</p>
                <!-- 备注 -->
                <p class="remarks">我是中联部李湘</p>
                <p class="content_userlist_sendmessage">
                  <img src="../../assets/img/refuse.png" alt="" />
                  拒绝
                </p>
                <p class="content_userlist_share">
                  <img src="../../assets/img/accept.png" alt="" />
                  接受
                </p>
              </div>
            </li>
            <li
              v-for="(v, k) in userlists"
              :key="k"
              :class="{ cur: v.num == 1 ||v.num==2}"
            >
              <div class="content_userlist">
                <img v-if="v.num == 1||v.num == 2" src="../../assets/img/tx.png" alt="" />
                <p v-if="v.num == 0" class="content_userlist_engname">
                  {{ v.headportrait }}
                </p>
                <p class="content_userlist_chinename">
                  {{ v.chinename }} ({{ v.engname }})
                </p>
                <p v-show="v.num == 1" class="content_userlist_share">
                  <img src="../../assets/img/share.png" alt="" />
                  分享名片
                </p>
                <p v-show="v.num == 1" class="content_userlist_sendmessage">
                  <img src="../../assets/img/sendmessage.png" alt="" />
                  发送消息
                </p>
                 <p v-show="v.num == 2" class="content_userlist_sharehe">
                  <img src="../../assets/img/share.png" alt="" />
                  分享给他
                </p>
              </div>
            </li>
            <div class="zm">
              <a v-for="(v1, k1) in zmlist" :key="k1" href="">{{ v1.name }}</a>
            </div>
          </my-scroll>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MailListCom from "./MailList";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class MailList extends mixins(MailListCom) {}
</script>

<style lang="scss" scoped>
@import "./MailList.scss";
</style>