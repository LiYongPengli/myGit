<template>
  <!-- 首页头部导航 -->
  <div class="headerone">
    <div @click="jumpHome" class="logo">
      <img src="../assets/img/logo.png" alt="" />
      <a></a>
    </div>
    <div class="search">
      <div class="searchheader">
        <img class="imgss" src="../assets/img/search.png" alt="" />
        <input
          class="ss"
          @click="setShowIntelligent(true)"
          type="text"
          placeholder="请输入关键词，查询相关内容"
        />
        <p class="becareful">
          非涉密系统，禁止处理涉密信息; 资料仅供工作参考，严禁外传。
        </p>
      </div>

      <!-- <div @click="setShowIntelligent(true)" class="ss">
   
              请输入关键词，查询相关内容 
      </div> -->
      <div class="bottom">
        <div class="user_info" v-if="user_message">
          <!-- 头部下拉-->
          <el-popover placement="bottom-start" width="265" trigger="click">
            <ul id="setting_list">
              <router-link custom v-slot="{ navigate }" to="/user">
                <li @click="navigate">
                  <img src="../assets/img/shezhi.png" alt="" />
                  <span>个人中心</span>
                </li>
              </router-link>
              <li @click="logout">
                <img src="../assets/img/icon_loginout.png" alt="" />
                <span>退出登录</span>
              </li>
            </ul>
            <div slot="reference" class="user_info_wrap">
              <img
                v-if="user_message.headimg.constructor == String"
                :src="user_message.headimg"
                alt="头像"
              />

              <span>{{ user_message.nickname }}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
          </el-popover>
        </div>
        <div class="nav">
          <router-link to="/myfollow">我的关注</router-link>
          <router-link to="/recommend">热门推荐</router-link>
          <router-link to="/selected">精选</router-link>
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
  @State("user_message") user_message!: any;
  //设置语言
  @Mutation("setLanguage") setLanguage!: any;
  @Mutation("setUserMessage") setUserMessage!: any;

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
          this.$message.success("已登出");
          this.setUserMessage("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  public jumpHome(): void {
    if (this.$route.path != "/recommend") {
      this.$router.push("/");
    } else {
      this.$router.go(0);
    }
  }
}
</script>

<style lang="scss" scoped>
.headerone {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  height: 132px;
  z-index: 102;
  background-image: linear-gradient(to bottom, #31313d, #272730);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  user-select: none;
  .logo {
    position: absolute;
    left: 0;

    width: 210px;
    height: 132px;
    z-index: 0;

    background-image: url(../assets/img/grcenter.jpg);
    border-right: 1px solid #3a3a48;
    cursor: pointer;
    img {
      display: block;
      margin-left: 13%;
      margin-top: 15%;
    }
  }
  .search {
    margin-left: 210px;
    border-bottom: 1px solid #242432;
    position: relative;
    .searchheader {
      display: flex;
      flex-direction: row;

      img.imgss {
        position: absolute;
        left: 31px;
        top: 23px;
      }
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
        // width: calc(100% - 75px);
        background-color: #272731;
        height: 65px;
        border: 0;
        box-sizing: border-box;
        color: white;
        // margin-left: 10px;
      }
      .ss {
        display: flex;
        flex: 1;
        width: 50%;
        background: #272731;
        border: none;
        outline: none;
        box-sizing: border-box;
        padding-left: 75px;
        color: white;
        font-size: 16px;
      }
      .becareful {
        flex: 1;
        color: #e96464;
        font-size: 16px;
        width: 50%;
        background: #272731;
        height: 65px;
        text-align: right;
        line-height: 65px;
        overflow: hidden;
        padding-right: 30px;
      }
    }
  }
  .bottom {
    height: 65px;
    border-top: 1px solid #3a3a48;
    // background: rgba(43, 43, 54, 1);
    // background: -moz-linear-gradient(
    //   top,
    //   rgba(43, 43, 54, 1) 0%,
    //   rgba(39, 39, 48, 1) 100%
    // );
    // background: -webkit-gradient(
    //   left top,
    //   left bottom,
    //   color-stop(0%, rgba(43, 43, 54, 1)),
    //   color-stop(100%, rgba(39, 39, 48, 1))
    // );
    // background: -webkit-linear-gradient(
    //   top,
    //   rgba(43, 43, 54, 1) 0%,
    //   rgba(39, 39, 48, 1) 100%
    // );
    // background: -o-linear-gradient(top, rgba(43, 43, 54, 1) 0%, rgba(39, 39, 48, 1) 100%);
    // background: -ms-linear-gradient(
    //   top,
    //   rgba(43, 43, 54, 1) 0%,
    //   rgba(39, 39, 48, 1) 100%
    // );
    // background: linear-gradient(
    //   to bottom,
    //   rgba(43, 43, 54, 1) 0%,
    //   rgba(39, 39, 48, 1) 100%
    // )
    background-image: url(../assets/img/gcenter.jpg);

    .user_info {
      float: left;
      &_wrap {
        width: 265px;
        cursor: pointer;
        display: flex;
        align-items: center;
        color: white;

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
          font-size: 16px;
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
      border-left: 1px solid #3a3a48;
      a {
        display: block;
        // width: 150px;
        padding: 0 40px;
        text-align: center;
        color: white;
        font-size: 16px;
        text-decoration: none;
        display: inline-block;
        // width: 70px;
      }
      // a:last-of-type {
      //   margin-left: 10px;
      // }
      a.router-link-active {
        background-image: url(../assets/img/cur.png);
        background-position: bottom;
        background-repeat: no-repeat;
        background-size: 100% 150%;
        //  width: 70px;
        text-align: center;
      }
    }
    .lang {
      float: right;
      width: 282px;
      height: 67px;
      line-height: 65px;
      margin-right: 50px;
      span {
        color: white;
        width: 94px;
        display: inline-block;
        text-align: center;
        font-size: 16px;

        cursor: pointer;
      }
      span.cur {
        background-color: #22222b;
        font-weight: bold;
        height: 67px;
        border-left: 1px solid #3a3a48;
        border-right: 1px solid #3a3a48;
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
