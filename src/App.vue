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
    <!-- <context-menu
      :left="menuleft"
      :top="menutop"
      v-if="showContextMenu && env == 'development'"
    /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";
import Topic from "@/components/topic/Topic.vue";
import ShareContent from "@/components/sharecontent/ShareContent.vue";
import ContextMenu from "@/components/ContextMenu.vue";
@Component({
  components: {
    Topic,
    ShareContent,
    ContextMenu,
  },
})
export default class App extends Vue {
  public isshow = false;
  public showContextMenu: boolean = false;
  public menuleft: number = 0;
  public menutop: number = 0;
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
  @State("user_message") user_message!: any;
  @State("topic_status") topic_status!: number;
  //是否有全局消息
  @State("isGlobMessage") isGlobMessage!: boolean;
  @State("language") language!: string;
  //被分享的新闻
  @State("shareNews") shareNews!: any;
  @State("env") env!: string;
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
      newVal == "BindAccount" ||
      newVal == "XjPublicity" ||
      newVal == "HomeSet" ||
      newVal == "Publicity"
    ) {
      if (newVal == "Publicity") {
        if (!this.user_message) {
          this.userLoginType();
        }
      }
      this.isshow = true;
      this.show_fx = false;
    } else {
      this.isshow = false;
      this.show_fx = true;
      if (!this.user_message) {
        this.userLoginType();
      }
    }
  }

  @Watch("topic_show")
  public listenTopic(newVal: boolean, oldVal: boolean): void {
    if (newVal) {
      if (this.topic_status == 1) {
        this.setGlobMessage(false);
      }
    }
  }

  public created(): void {
    if (
      this.$route.name == "Login" ||
      this.$route.name == "Register" ||
      this.$route.name == "Findpassword" ||
      this.$route.name == "BindAccount" ||
      this.$route.name == "XjPublicity" ||
      this.$route.name == "HomeSet" ||
      this.$route.name == "Publicity"
    ) {
      if (this.$route.name == "Publicity") {
        if (!this.user_message) {
          this.userLoginType();
        }
      }
      this.isshow = true;
      this.show_fx = false;
    } else {
      this.isshow = false;
      this.show_fx = true;
      if (!this.user_message) {
        this.userLoginType();
      }
    }
    window.addEventListener("message", this.getGlobMessage, false);
  }

  // public mounted(): void {
  //   if (this.env == "development") {
  //     window.addEventListener("contextmenu", this.contextMenu, false);
  //     document.addEventListener("click", this.hideContextMenu, false);
  //     window.addEventListener("keydown", this.kedown, false);
  //   }
  // }

  private hideContextMenu(): void {
    this.showContextMenu = false;
  }

  private contextMenu(e: MouseEvent): void {
    e.preventDefault();
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    if (width - e.clientX >= 250) {
      this.menuleft = e.clientX;
    } else {
      this.menuleft = e.clientX - 250;
    }
    if (height - e.clientY > 200) {
      this.menutop = e.clientY;
    } else {
      this.menutop = e.clientY - 190;
    }
    this.showContextMenu = true;
  }

  private kedown(e: KeyboardEvent): void {
    let ctr = e.ctrlKey;
    let shift = e.shiftKey;
    if (ctr && shift && e.keyCode == 73) {
      const h = this.$createElement;

      this.$notify({
        title: "标题名称",
        message: h(
          "i",
          { style: "color: teal" },
          "你还没有权限使用开发者工具(不要再挣扎了，还是乖乖的按规则行事吧)"
        ),
      });
      e.preventDefault();
    }
    if (ctr && e.keyCode == 85) {
      e.preventDefault();
    }
    if (e.keyCode == 123) {
      // e.preventDefault();
      const h = this.$createElement;

      this.$notify({
        title: "标题名称",
        message: h(
          "i",
          { style: "color: teal" },
          "你还没有权限使用开发者工具(不要再挣扎了，还是乖乖的按规则行事吧)"
        ),
      });
    }
  }

  public setTopic(): void {
    if (!this.topic_show) {
      this.setTopicShow(true);
    } else {
      this.setTopicShow(false);
    }
  }

  //获取全局消息
  private getGlobMessage(e: MessageEvent): void {
    // console.log(e.data.eventName); // event name
    // console.log(e.data.data); // event data
    if (e.data.eventName && e.data.eventName == "new-message") {
      if (!this.topic_show) {
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
            this.axios.defaults.baseURL +
            "/#/newsinfo?id=" +
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
        this.axios
          .get("/avatar/" + res.data.data.account + "?format=base64")
          .then((result) => {
            res.data.data.headimg = result.data;
            this.setUserMessage(res.data.data);
          });
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
@import "./style.scss";
</style>
