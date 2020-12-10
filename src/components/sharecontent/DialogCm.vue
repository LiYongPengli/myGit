<template>
  <div class="dialogcm">
    <p>分享给:</p>
    <div class="share_user">
      <img v-if="share_user.headimg" :src="share_user.headimg" alt="" />
      <img
        v-if="!share_user.headimg && share_user.wechat_info.head_img"
        :src="share_user.wechat_info.head_img"
        alt=""
      />
      <p
        v-if="!share_user.headimg && !share_user.wechat_info.head_img"
        class="user_ico"
      >
        {{ share_user.nickname.slice(0, 1) }}
      </p>
      <p class="user_name">
        {{ share_user.nickname
        }}{{ share_user.remark_name ? "(" + share_user.remark_name + ")" : "" }}
      </p>
    </div>
    <p>内容:</p>
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
    <p>附加消息:</p>
    <div class="message">
      <textarea
        v-model="sharetext"
        placeholder="说点什么吧"
        rows="5"
      ></textarea>
    </div>
    <div style="text-align: right" class="footer">
      <el-button
        @click="shareMessage"
        style="width: 100px"
        size="mini"
        type="primary"
        >分享</el-button
      >
      <el-button @click="close" style="width: 100px" size="mini"
        >取消</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { baseApi } from "@/axios/axios";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class DialogCm extends Vue {
  @Prop({ default: "" }) type!: string;
  @Prop({}) content!: any;
  @Prop({
    default() {
      return [];
    },
  })
  names!: string[];
  @Prop({}) share_user!: any;
  @State("language") language!: string;

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

  @Emit("close")
  public close(): boolean {
    return false;
  }

  public showNames():string{
    let arr = [];
    for(let i of this.names){
      if(i){
        arr.push(i)
      }
    }
    return arr.join(',');
  }

  //分享新闻
  private requestMessage(): void {
    this.axios
      .post(baseApi.api2 + "/v1/cmd/", {
        cmd: "share_news",
        paras: {
          account: this.share_user.account,
          news_id: this.content.news_id,
          url:
            "http://zlbxxcj.bjceis.com/#/newsinfo?id=" +
            this.content.news_id +
            "&md_id=" +
            this.content.media_id,
          message: this.sharetext,
        },
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
    let obj:any = {
      account: this.share_user.account,
      share_type: this.names.length ? "many" : "one",
      message: this.sharetext,
    };
    if(this.names.length){
      obj.many = [];
      for(let i of this.names){
        if(i){
          obj.many.push(i)
        }
      }
    }else{
      obj.one = this.content.name;
    }
    this.axios
      .post(baseApi.api2 + "/v1/cmd/", {
        cmd: "share_favorite",
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
}
</script>

<style lang="scss" scoped>
.dialogcm {
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
      width: 700px;
      background: none;
      outline: none;
      color: white;
      padding: 5px;
      border: 1px solid gray;
    }
  }
}
</style>
<style lang="scss">
.el-dialog {
  background: #2d2d39 !important;
  .el-dialog__title {
    color: white;
  }
}
</style>