<template>
  <!-- 首页头部导航 -->
  <div class="headerone">
    <div @click="$router.push('/')" class="logo">
      <a></a>
    </div>
    <div class="search">
      <button value="" title=""></button>
      <!-- <input
        type="text"
        placeholder="大家正在搜：加码挑拨！美议员提决议案：呼吁美国恢复与台“邦交”，终结一中政�"
      /> -->
      <div @click="setShowIntelligent(true)" class="ss">
    <div @click="setShowIntelligent(true)" class="ss">大家正在搜：加码挑拨！美议员提决议案：呼吁美国恢复与台“邦交”，终结一中政策</div>
      </div>
      <div class="bottom">
        <div class="user_info" v-if="user_message">
          <!-- 头部下拉-->
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
            <div slot="reference" class="user_info_wrap">
              <img
                :src="
                  'http://zlbxxcj.bjceis.com/avatar/' + user_message.account
                "
                alt="头像"
              />
              <!-- <img v-if="user_message.wechat_info.head_img&&!user_message.headimg" :src="user_message.wechat_info.head_img" alt="头像" />
            <img v-if="!user_message.wechat_info.head_img&&!user_message.headimg" src="../assets/img/tx.png" alt="头像" /> -->
              <span>{{ user_message.nickname }}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
          </el-popover>
        </div>
        <div class="nav">
          <router-link to="/myfollow">我的关注</router-link>
          <router-link to="/recommend">热门推荐</router-link>
        </div>
        <div class="lang">
          <span
            @click="setLanguage('crawler')"
            :class="{ cur: language == 'crawler' }"
            >原文</span
          >
          <span
            @click="setLanguage('zh-CN')"
            :class="{ cur: language == 'zh-CN' }"
            >中文</span
          >
          <span @click="setLanguage('en')" :class="{ cur: language == 'en' }"
            >英文</span
          >
        </div>
      </div>
      <transition name="el-zoom-in-top">
        <intelligent-retrieval v-if="show_intelligent" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";
import IntelligentRetrieval from "@/components/intelligentretrieval/IntelligentRetrieval.vue";
@Component({
  components: {
    IntelligentRetrieval,
  },
})
export default class HeaderOne extends Vue {
  //当前系统语言
  @State("language") language!: string;
  //用户信息
  @State("user_message") user_message!: string;
  //设置语言
  @Mutation("setLanguage") setLanguage!: any;

  @State("show_intelligent") show_intelligent!: boolean;

  @Mutation("setShowIntelligent") setShowIntelligent: any;

  //登出
  public logout(): void {
    this.axios
      .post("/v1/user/login/logout")
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 1) {
          this.$router.push("/login");
          this.$message.success("已登录");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss" scoped>
.headerone {
  width: 100%;
  // border: 1px solid;
  position: fixed;
  left: 0;
  top: 0;
  height: 130px;
  z-index: 102;
  background-image: linear-gradient(to bottom, #31313d, #272730);
  .logo {
    position: absolute;
    left: 0;
    // top: 47px;
    width: 210px;
    height: 132px;
    z-index: 0;
    background: url(../assets/img/logo.png) 20px center no-repeat #30303c;
    border-right: 1px solid #3a3a48;
  }
  .search {
    margin-left: 210px;
    border-bottom: 1px solid #242432;
    button {
      background: url(../assets/img/search.png) 30px center no-repeat #272731;
      border: none;
      cursor: pointer;
      border: 0;
      height: 65px;
      width: 75px;
      float: left;
      outline: none;
    }
    input {
      //width: 1618px;
      width: calc(100% - 75px);
      background-color: #272731;
      height: 65px;
      border: 0;
      box-sizing: border-box;
      color: white;
      // margin-left: 10px;
    }
    .ss {
      // width: calc(100% - 75px);
      background-color: #272731;

      height: 65px;
      line-height: 65px;
      border: 0;
      box-sizing: border-box;
      color: white;
      opacity: 0.5;
    }
    input:focus {
      outline: none;
      border: 10px solid #272731;
      background-color: #272731;
    }
  }
  .bottom {
    // margin-left: 210px;
    height: 65px;
    background: #282832;
    border-top: 1px solid #3a3a48;
    .user_info {
      float: left;
      &_wrap {
        width: 265px;
        cursor: pointer;
        display: flex;
        align-items: center;
        color: white;
        border-right: 1px solid #3a3a48;
        margin-top: 12px;
        img {
          margin-left: 30px;
          background: center no-repeat #272731;
          background-size: 100%;
          border: none;
          cursor: pointer;
          border: 0;
          height: 39px;
          width: 39px;
          float: left;
          outline: none;
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
    .nav {
      float: left;
      height: 65px;
      line-height: 65px;
      padding-left: 40px;
      a {
        display: block;
        width: 150px;
        text-align: center;
        color: white;
        font-size: 16px;
        margin-right: 60px;
        text-decoration: none;
        display: inline-block;
        // width: 70px;
      }
      a:last-of-type {
        margin-left: 10px;
      }
      a.router-link-active {
        background-image: url(../assets/img/cur.png);
        background-position: bottom;
        background-repeat: no-repeat;
        background-size: 100%;
        //  width: 70px;
        text-align: center;
      }
    }
    .lang {
      float: right;
      width: 282px;
      height: 65px;
      line-height: 65px;
      margin-right: 50px;
      span {
        color: white;
        width: 94px;
        display: inline-block;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }
      span.cur {
        background-color: #22222b;
      }
    }
  }
}
</style>
<style lang="scss">
#setting_list {
  width: 100%;
  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 15px 0;
    span {
      margin-left: 14px;
    }
  }
}
</style>