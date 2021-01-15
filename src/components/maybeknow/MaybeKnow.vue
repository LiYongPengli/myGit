<template>
  <!-- 聊天工具，可能认识 -->
  <div class="maybeknow">
    <div class="content">
      <div class="title">
        <p class="maybetitle">可能认识的人</p>
      </div>
      <div class="content_userlists">
        <ul>
          <!-- <li v-for="(v, k) in tableData" :key="k" :class="{'active':k%2 != 0}"> -->
          <my-scroll style="content_mt_onescroll">
            <li v-for="(v, k) in userlists" :key="k">
              <div class="content_userlist">
                <img
                  style="height: 40px"
                  :src="axios.defaults.baseURL + '/avatar/' + v.account"
                  alt=""
                />

                <p class="content_userlist_chinename">
                  {{ v.nickname }}
                </p>
                <p @click="toAdd(v)" class="content_userlist_add"></p>
              </div>
            </li>
          </my-scroll>
        </ul>
      </div>
    </div>

    <!-- 用户验证信息 -->
    <div v-if="inv_userInfo" class="chat">
      <div class="chatcontent">
        <div @click="inv_userInfo = ''" class="close">
          <img src="../../assets/img/chatclose.png" alt="" />
        </div>
        <div class="username">
          <img :src="axios.defaults.baseURL + '/avatar/' + inv_userInfo.account" alt="" />
          <!-- <p class="head">{{inv_userInfo.nickname.slice(0,1)}}</p> -->
          <p class="name">{{ inv_userInfo.nickname }}</p>
        </div>

        <div class="remarks_yanzheng">
          <span class="remarks_name">* 需要验证您的身份信息：</span>
          <!-- <input
            class="remarks_value"
            v-model="message"
            type="text"
            placeholder="请输入验证消息"
          /> -->
          <el-input
            type="textarea"
            :rows="5"
            class="remarks_value"
            placeholder="请输入您的请求信息"
            v-model="message"
          >
          </el-input>
        </div>
        <div class="remarks_div">
          <span class="remarks_name">备注名：</span>
          <input
            class="remarks_value"
            v-model="remark_name"
            type="text"
            placeholder="设置备注"
          />
        </div>
        <!-- <span class="nick_name">昵称：</span>
        <span class="nick_value">{{inv_userInfo.nickname}}</span> -->
        <div @click="sendMessage" class="sendmes">添加到通讯录</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MaybeKnowCom from "./MaybeKnow";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class MaybeKnow extends mixins(MaybeKnowCom) {}
</script>

<style lang="scss" scoped>
@import "./MaybeKnow.scss";
</style>

<style lang="scss">
.maybeknow {
  .chat {
    .chatcontent {
      .remarks_yanzheng {
        .remarks_value {
          .el-textarea__inner {
            background: #2f343d;
            border: 1px solid #5e656e;
            color: white;
            font-size: 16px;
          }
          textarea::-webkit-input-placeholder {
            /* WebKit browsers */
            color: #6d6d6e;
          }
          textarea:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #6d6d6e;
          }
          textarea::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #6d6d6e;
          }
          textarea::-ms-input-placeholder {
            /* Internet Explorer 10+ */
            // color: #9c9c9c;
            color: #6d6d6e;
          }
        }
      }
    }
  }
}
</style>
