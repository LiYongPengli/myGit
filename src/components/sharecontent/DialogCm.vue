<template>
  <div class="dialogcm">
    <div class="fxg">
      <p class="fxgp">分享给:</p>
      <!-- 好友信息 -->
      <div v-if="share_type == 'user'" class="share_user">
        <img :src="axios.defaults.baseURL + '/avatar/' + share_user.account" alt="" />
        <p class="user_name">
          {{ share_user.nickname
          }}{{ share_user.remark_name ? "(" + share_user.remark_name + ")" : "" }}
        </p>
      </div>
    </div>
    <!-- 群组信息 -->
    <div v-if="share_type == 'group'" class="share_user">
      <img v-if="share_user.headimg" :src="share_user.headimg" alt="" />
      <p v-if="!share_user.headimg" class="user_ico">
        {{ share_user.name.slice(0, 1) }}
      </p>
      <p class="user_name">
        {{ share_user.name }}
      </p>
      <p class="user_name">{{ share_user.name }}</p>
    </div>
    <div class="nr">
      <p class="nrp">分享内容:</p>
      <p v-if="language == 'crawler' && type == 'news'" class="news_content">
        {{ content.title.crawler }}
      </p>
      <p v-if="language == 'en' && type == 'news'" class="news_content">
        {{ content.title.en }}
      </p>
      <p v-if="language == 'zh-CN' && type == 'news'" class="news_content">
        {{ content.title["zh-CN"] }}
      </p>
      <p v-if="type == 'collection' && content" class="news_content">
        {{ content.name }}
      </p>
      <p v-if="type == 'collection' && !content" class="news_content">
        {{ showNames() }}
      </p>
    </div>
   <div class="fjxx">
      <p class="fjxxp">附加消息:</p>
    <div class="message">
      <textarea v-model="sharetext" placeholder="说点什么吧" rows="5"></textarea>
    </div>
   </div>
    <div style="text-align: center;margin-top:100px" class="footer">
      <el-button @click="shareMessage" style="width: 100px" size="mini" type="primary"
        >分享</el-button
      >
      <el-button @click="close" style="width: 100px" size="mini">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";

@Component
export default class DialogCm extends Vue {
  @Prop({ default: "" }) type!: string;
  @Prop({}) share_type!: string;
  @Prop({}) content!: any;
  @Prop({}) clear!: boolean;
  @Prop({
    default() {
      return [];
    },
  })
  names!: string[];
  @Prop({}) share_user!: any;
  @State("language") language!: string;
  @Mutation("setIsShare") setIsShare!: (n: boolean) => void;

  //附加消息
  public sharetext: string = "";
  //分享新闻
  public shareMessage(): void {
    switch (this.type) {
      case "news":
        this.requestMessage();
        break;
      case "collection":
        this.requestCollection();
        break;
    }
  }

  @Watch('clear')
  public listenClear():void{
    this.sharetext = "";
    this.clear = false;
  }

  @Emit("close")
  public close(): boolean {
    return false;
  }

  public showNames(): string {
    let arr = [];
    for (let i of this.names) {
      if (i) {
        arr.push(i);
      }
    }
    return arr.join(",");
  }

  //分享新闻
  private requestMessage(): void {
    let obj: any = {
      news_id: this.content.news_id,
      url: "/#/newsinfo?id=" + this.content.news_id + "&md_id=" + this.content.media_id,
      message: this.sharetext,
    };
    if (this.share_type == "user") {
      obj.account = this.share_user.account;
    } else {
      obj.room_id = this.share_user.room_id;
    }
    this.axios
      .post("/v1/cmd/", {
        cmd: "share_news",
        paras: obj,
      })
      .then((res) => {
        this.$message.success("分享成功");
        this.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //分享单个收藏夹
  private requestCollection(): void {
    let obj: any = {
      share_type: this.names.length ? "many" : "one",
      message: this.sharetext,
    };
    if (this.names.length) {
      obj.many = [];
      for (let i of this.names) {
        if (i) {
          obj.many.push(i);
        }
      }
    } else {
      obj.one = this.content.name;
    }
    if (this.share_type == "user") {
      obj.account = this.share_user.account;
    } else {
      obj.room_id = this.share_user.room_id;
    }
    this.axios
      .post("/v1/cmd/", {
        cmd: "share_favorite",
        paras: obj,
      })
      .then((res) => {
        this.$message.success("分享成功");
        this.setIsShare(false);
        this.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss" scoped>
.dialogcm {
  color: white;
  .share_user {
    padding: 5px 0;
    // padding-left: 30px;
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
  .fxg,.nr,.fjxx{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
      .fxgp,.nrp,.fjxxp{
        display: flex;
        flex: 1;
      }
      .share_user,.news_content,.message{
        display: flex;
        flex: 10;
      }
  }
  .news_content {
    padding: 5px 0;
    // text-indent: 2em;
  }
  .message {
    height: 150px;
    // padding: 5px 0;
    // padding-left: 30px;
    textarea {
       width: 100%;
      background: none;
      outline: none;
      color: white;
      padding: 5px;
      border: 1px solid gray;
    }
  }
}
</style>
