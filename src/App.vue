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
    <transition
      @after-enter="load_topic = true"
      @after-leave="load_topic = false"
      name="topic"
    >
      <div v-show="topic_show" class="topics">
        <!-- 聊天工具组件 -->
        <topic v-show="load_topic" />
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
      <share-content type="news" :content="shareNews">
        <a v-show="$route.name == 'NewsInfo'" class="fenxiang">
          <img title="分享" src="./assets/img/fenxiang.png" alt="" />
        </a>
      </share-content>

      <a @click="setTopic" class="chat">
        <el-badge :hidden="!isGlobMessage" is-dot>
          <img title="聊天工具" src="./assets/img/chat.png" alt="" />
        </el-badge>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";
import Topic from "@/components/topic/Topic.vue";
import ShareContent from "@/components/sharecontent/ShareContent.vue";
@Component({
  components: {
    Topic,
    ShareContent,
  },
})
export default class App extends Vue {
  private isshow = true;
  public show_fx = true;
  public friend_list: any[] = [];
  public shareWindow: boolean = false;
  public share_user: any = "";
  //是否加载聊天窗口
  public load_topic: boolean = false;
  //附加消息
  public sharetext: string = "";
  //是否展示聊天工具
  @State("topic_show") topic_show!: boolean;
  @State("topic_status") topic_status!: number;
  //是否有全局消息
  @State("isGlobMessage") isGlobMessage!: boolean;
  @State("language") language!: string;
  //被分享的新闻
  @State("shareNews") shareNews!: any;
  //设置用户信息
  @Mutation("setUserMessage") setUserMessage: any;
  @Mutation("setSureTop") setSureTop!: any;
  @Mutation("setTopicShow") setTopicShow!: any;
  @Mutation("setGlobMessage") setGlobMessage!: any;

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

  @Watch("topic_show")
  public listenTopic(newVal:boolean,oldVal:boolean):void{
    if(newVal){
      if(this.topic_status==1){
        this.setGlobMessage(false);
      }
    }
  }

  private created(): void {
    window.addEventListener("message", this.getGlobMessage, false);
  }

  public setTopic():void{
    if(!this.topic_show){
      this.setTopicShow(true);
    }else{
      this.setTopicShow(false);
    }
  }

  //获取全局消息
  private getGlobMessage(e: MessageEvent): void {
    // console.log(e.data.eventName); // event name
    // console.log(e.data.data); // event data
    if (e.data.eventName&&e.data.eventName=='new-message') {
      if(!this.topic_show){
        this.setGlobMessage(true);
      }
    }
    
  }

  //显示分享弹窗
  setShare(user: any): void {
    this.share_user = user;
    this.shareWindow = true;
  }

  //分享新闻
  public shareMessage(): void {
    this.axios
      .post("/v1/cmd/", {
        cmd: "share_news",
        paras: {
          account: this.share_user.account,
          news_id: this.shareNews.news_id,
          url:
            "http://zlbxxcj.bjceis.com/#/newsinfo?id=" +
            this.shareNews.news_id +
            "&md_id=" +
            this.shareNews.media_id,
          message: this.sharetext,
        },
      })
      .then((res) => {
        this.$message.success("分享成功");
        this.shareWindow = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getFriendList(): void {
    this.axios
      .post("/v1/cmd/", {
        cmd: "my_friends",
      })
      .then((res) => {
        this.friend_list = res.data.data;
        console.log(this.friend_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //回到顶部
  public toTop(): void {
    this.setSureTop(true);
  }

  private userLoginType(): void {
    this.axios
      .get("/v1/user/login/")
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
      .post("/v1/cmd/", {
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
  .share_wrap {
    color: white;
    .share_user {
      padding: 5px 0;
      padding-left: 30px;
      display: flex;
      align-items: center;
      .user_ico,
      img {
        display: block;
        width: 30px;
        height: 30px;
        background: #009688;
        border-radius: 3px;
        margin-right: 5px;
      }
      .user_ico {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .news_content {
      padding: 5px 0;
      text-indent: 2em;
    }
    .message {
      padding: 5px 0;
      padding-left: 30px;
      textarea {
        background: none;
        outline: none;
        color: white;
        padding: 5px;
      }
    }
  }
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
    display: flex;
    flex-direction: column;
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
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    a {
      width: 60px;
      height: 60px;
      display: block;
      text-align: center;
      padding-top: 20px;
      img {
        margin: auto;
        width: 24px;
        cursor: pointer;
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
    width: 820px;
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
      margin-left: -820px;
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
  .in-range div {
    background: #3a3a48 !important;
  }
}
.el-date-editor {
  background: #494959 !important;
  input {
    background: #494959;
    border: 0;
    color: white !important;
    cursor: pointer;
  }
  .el-range-separator {
    color: white !important;
  }
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: white;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: white;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: white;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: white;
  }
  .timesearch {
    .el-date-editor {
      .el-input__prefix {
        .el-input__icon {
          color: white !important;
        }
      }
    }

    .zhi {
      display: inline-block;
      width: 16px;
      font-weight: bold;
      float: none !important;
    }
  }
}
</style>
