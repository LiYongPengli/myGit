<template>
  <!-- 头部2 -->
  <div class="headertwo">
    <div @click="$router.push('/')" class="logo">
      <img src="../assets/img/personalcenter.png" alt="" />
    </div>
    <div class="user">
      <!-- 头部下拉框 -->
      <el-popover placement="bottom-start" width="265" trigger="click">
        <ul id="setting_list">
          <router-link to="/user" tag="li">
            <img src="../assets/img/shezhi.png" alt="" />
            <span>个人中心</span>
          </router-link>
          <li @click="logout">
            <img src="../assets/img/icon_loginout.png" alt="" />
            <span>退出登录</span>
          </li>
        </ul>
        <div slot="reference" class="user_wrap">
          <div class="user_img" v-if="user_message">
            <img
              v-show="!user_message.wechat_info.head_img"
              src="../assets/img/tx.png"
              alt=""
            />
            <img
              v-if="user_message.wechat_info.head_img"
              :src="user_message.wechat_info.head_img"
              alt=""
            />
          </div>
          <span>{{ user_message.nickname }}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
      </el-popover>
    </div>
    <div class="search">
      <img src="../assets/img/search.png" alt="" />
      <input
      @click="setShowIntelligent(true)"
        type="text"
        placeholder="大家正在搜：加码挑拨！美议员提决议案：呼吁美国恢复与台“邦交”，终结一中政策"
      />
    </div>
    <div class="language">
      <span
        @click="setLanguage('crawler')"
        :class="{ language_active: language == 'crawler' }"
        >原文</span
      >
      <span
        @click="setLanguage('zh-CN')"
        :class="{ language_active: language == 'zh-CN' }"
        >中文</span
      >
      <span
        @click="setLanguage('en')"
        :class="{ language_active: language == 'en' }"
        >英文</span
      >
    </div>
    <transition name="el-zoom-in-top">
      <intelligent-retrieval v-if="show_intelligent" />
    </transition>
  </div>
</template>

<script lang="ts">
import { baseApi } from "@/axios/axios";
import { Component, Vue } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";
import IntelligentRetrieval from '@/components/intelligentretrieval/IntelligentRetrieval.vue'
@Component({
  components:{
    IntelligentRetrieval
  }
})
export default class HeaderTwo extends Vue {
  //当前系统语言
  @State("language") language!: string;
  //用户信息
  @State("user_message") user_message!: string;
  //设置语言
  @Mutation("setLanguage") setLanguage!: any;
  @State('show_intelligent') show_intelligent!:boolean;

  @Mutation('setShowIntelligent') setShowIntelligent:any;
  //登出
  private logout(): void {
    this.axios
      .post(baseApi.api1 + "/v1/user/login/logout")
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 1) {
          this.$router.push("/login");
          this.$message.success("已登出");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss" scoped>
.headertwo {
  display: flex;
  height: 85px;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(138, 138, 138, 0.2) 100%
    ),
    linear-gradient(#30303c, #30303c);
  background-blend-mode: overlay, normal;
  .logo {
    display: flex;
    width: 210px;
    border-right: 1px solid #3a3a48;
    align-items: center;
    flex-shrink: 0;
    img {
      display: block;
      width: 55%;
      margin: auto;
    }
  }
  .user {
    width: 266px;
    display: flex;
    align-items: center;
    border-right: 1px solid #3a3a48;
    flex-shrink: 0;
    &_wrap {
      width: 265px;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: white;
      border-right: 1px solid #3a3a48;
      .user_img {
        width: 39px;
        height: 39px;
        border-radius: 5px;
        overflow: hidden;
        margin-left: 31px;
        img {
          display: block;
          width: 100%;
        }
      }
      .user_name {
        margin-left: 21px;
      }
      span {
        margin-left: 23px;
        font-size: 20px;
      }
      i {
        margin-left: 13px;
      }
    }
  }
  .search {
    flex: 1;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      background: #272731;
      border: none;
      outline: none;
      box-sizing: border-box;
      padding-left: 75px;
      color: white;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #77777d;
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #77777d;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #77777d;
    }
    input:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #77777d;
    }
    img {
      position: absolute;
      left: 31px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .language {
    width: 349px;
    flex-shrink: 0;
    border-left: 1px solid #3a3a48;
    display: flex;
    span {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
    }
  }
  .language_active {
    background-color: #22222b;
  }
}
</style>