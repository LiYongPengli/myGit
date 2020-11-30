<template>
  <div id="app">
    <video
      class="back_video"
      v-if="isshow"
      autoplay
      muted
      loop
      src="./assets/video/index_back.mp4"
    ></video>
    <!-- 聊天工具 -->
    <transition name="topic">
      <div v-if="topic_show" class="topics">
        <!-- 聊天工具组件 -->
        <topic />
      </div>
    </transition>
    <div class="right_content">
      <router-view />
    </div>
    <!-- 浮窗工具 -->
    <div v-show="show_fx" class="fx">
      <a @click="toTop" class="arrow"
        ><img title="置顶" src="./assets/img/arrow-right.png" alt=""
      /></a>
      <a class="fenxiang" href=""
        ><img title="分享" src="./assets/img/fenxiang.png" alt=""
      /></a>
      <a @click.stop="setTopicShow(true)" class="chat">
        <img title="分享到微信" src="./assets/img/chat.png" alt=""
      /></a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";
import { baseApi } from "./axios/axios";
import Topic from "@/components/topic/Topic.vue";
@Component({
  components: {
    Topic,
  },
})
export default class App extends Vue {
  private isshow = true;
  public show_fx = true;
  //是否展示聊天工具
  @State("topic_show") topic_show!: boolean;
  //设置用户信息
  @Mutation("setUserMessage") setUserMessage: any;
  @Mutation("setSureTop") setSureTop!: any;
  @Mutation('setTopicShow') setTopicShow!: any;

  @Watch("$route.name")
  listenRoute(newVal: string, oldVal: string): void {
    if (
      newVal == "Login" ||
      newVal == "Register" ||
      newVal == "Findpassword" ||
      newVal == "BindAccount"
    ) {
      this.isshow = true;
      this.show_fx = false;
    } else {
      this.isshow = false;
      this.show_fx = true;
      this.userLoginType();
    }
  }

  private created(): void {
    this.userLoginType();
  }

  //回到顶部
  public toTop(): void {
    this.setSureTop(true);
  }

  private userLoginType(): void {
    this.axios
      .get(baseApi.api2 + "/v1/user/login/")
      .then((res) => {
        this.getUserInfo(res.data.data.user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * 获取用户信息
   * @param user_id 用户id
   */
  private getUserInfo(user_id: string): void {
    this.axios
      .post(baseApi.api2 + "/v1/cmd/", {
        cmd: "user_info",
        paras: { user_id: user_id },
      })
      .then((res) => {
        this.setUserMessage(res.data.data);
        if (!res.data.data.sub_prompted && this.$route.name != "HomeSet") {
          this.$router.push("/homeset");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
}

html,
body {
  height: 100%;
}
#app {
  height: 100%;
  display: flex;
  .back_video {
    width: 100%;
    height: 100%;
    position: fixed;
    object-fit: fill;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .right_content {
    flex: 1;
    overflow: hidden;
    height: 100%;
  }
  .fx {
    top: 163px;
    right: 50px;
    position: fixed;
    border: 1px solid #343441;
    border-radius: 5px;
    background-color: #343441;
    z-index: 100;
    a {
      width: 60px;
      height: 60px;
      display: block;
      line-height: 60px;
      text-align: center;
      img {
        margin: 18px auto;
        width: 24px;
      }
    }
    a.arrow {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
    a.fenxiang {
      border-top: 1px solid #494958;
    }
    a.chat {
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      border-top: 1px solid #494958;
    }
  }
  .topics {
    width: 800px;
    height: 100%;
    flex-shrink: 0;
    position: relative;
    background-color: #2f343d;
  }
  .topic-enter-active {
    animation: show linear 0.3s;
  }
  .topic-leave-active {
    animation: show linear 0.3s reverse;
  }
  @keyframes show {
    from {
      margin-left: -900px;
    }
    to {
      margin-left: 0;
    }
  }
}
.clear:after {
  display: block;
  height: 0;
  content: ""; /*不用有内容也可以*/
  visibility: hidden;
  clear: both;
}
//下拉框样式
.el-popover {
  background: #2d2d39 !important;
  border: none !important;
  color: white !important;
  box-sizing: border-box;
}

/* .el-dropdown-menu li{
  color: white!important;
}
.el-dropdown-menu li:hover{
  background:  #2d2d39!important;
} */
.popper__arrow::after {
  border-color: #2d2d39 !important;
}
.el-picker-panel__body {
  background: #494959;
}
</style>
