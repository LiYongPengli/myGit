<template>
  <!-- 全文搜索 -->
  <div class="search">
    <div class="header">
      <div class="closesearch"></div>
      <span @click="setShowIntelligent(false)" class="close"> 关闭检索 </span>
    </div>
    <div class="historycontent">
      <input
        v-model="searchText"
        @keypress="toSearch"
        type="text"
        placeholder="请输入关键词"
      />
      <img
        @click.stop="clickSearch"
        class="sousuo"
        src="../assets/img/sousuo.png"
        alt=""
      />
      <div class="history">
        <p>历史记录</p>
        <span @click="clearHistory" class="clearhistory">清除历史</span>
        <ul>
          <li @click="toSearchClk(v)" v-for="(v, i) in historyList" :key="i">
            <span
              >{{ v
              }}<img
                @click.stop="deleteItemHistory(i)"
                style="margin-left: 10px"
                src="../assets/img/cha.png"
            /></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";
@Component
export default class Search extends Vue {
  @State("user_message") user_message: any;
  @Mutation("setShowIntelligent") setShowIntelligent: any;
  public historyList: string[] = [];
  //搜索内容
  public searchText: string = "";
  private created(): void {
    this.getHistory();
  }
  //获取历史记录
  private getHistory(): void {
    let user_history = localStorage.getItem("user_history");
    if (user_history) {
      if (JSON.parse(user_history)[this.user_message.phone_number]) {
        this.historyList = JSON.parse(user_history)[
          this.user_message.phone_number
        ];
      }
    }
  }
  //搜索
  @Emit("tosearch")
  public toSearch(e: KeyboardEvent): string {
    if (e.keyCode == 13) {
      if (!this.searchText) {
        return "";
      }
      this.setHistory();
      return this.searchText;
    }
    return "";
  }
  @Emit("tosearch")
  public toSearchClk(item: string): string {
    return item;
  }

  @Emit("tosearch")
  public clickSearch(): string {
    if (!this.searchText) {
      return "";
    }
    this.setHistory();
    return this.searchText;
  }

  //删除某条历史记录
  public deleteItemHistory(index: number): void {
    let user_history = JSON.parse(localStorage.user_history);
    user_history[this.user_message.phone_number].splice(index, 1);
    this.historyList.splice(index, 1);
    localStorage.user_history = JSON.stringify(user_history);
  }

  //记录搜索历史
  public setHistory(): void {
    let user_history = localStorage.getItem("user_history");
    if (user_history) {
      let user_history_parse = JSON.parse(user_history);
      if (user_history_parse[this.user_message.phone_number]) {
        if (
          !~user_history_parse[this.user_message.phone_number].indexOf(
            this.searchText
          )
        ) {
          if (user_history_parse[this.user_message.phone_number].length >= 10) {
            user_history_parse[this.user_message.phone_number].pop();
            user_history_parse[this.user_message.phone_number].unshift(
              this.searchText
            );
          } else {
            user_history_parse[this.user_message.phone_number].unshift(
              this.searchText
            );
          }
        }
      } else {
        user_history_parse[this.user_message.phone_number] = [this.searchText];
      }
      localStorage.setItem("user_history", JSON.stringify(user_history_parse));
    } else {
      let obj: any = {};
      obj[this.user_message.phone_number] = [this.searchText];
      localStorage.setItem("user_history", JSON.stringify(obj));
    }
  }

  //清空历史记录
  public clearHistory(): void {
    let user_history = localStorage.getItem("user_history");
    if (user_history) {
      let user_history_parse = JSON.parse(user_history);
      if (user_history_parse[this.user_message.phone_number]) {
        delete user_history_parse[this.user_message.phone_number];
        localStorage.setItem(
          "user_history",
          JSON.stringify(user_history_parse)
        );
        this.historyList = [];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  margin: 0 auto;
  width: 900px;
  .header {
    margin-top: 125px;
    position: relative;
    text-align: center;
    .closesearch {
      // scmr.png
      height: 59px;
      background: url("../assets/img/searchlogo.png") top no-repeat;
    }
    .close {
      position: absolute;
      top: 20px;
      right: 0;
      display: block;
      width: 100px;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      border: 1px solid #676770;
      color: #bcc2d5;
      cursor: pointer;
      border-radius: 3px;
    }
  }
  .historycontent {
    margin-top: 100px;
    position: relative;
    input {
      height: 50px;
      width: 100%;
      outline: medium;
      box-sizing: border-box;
      border: 1px solid #353541;
      padding-left: 20px;
      color: white;
      // background: url("../assets/img/sousuo.png") 95% center no-repeat;
      background-color: #353541;
    }
    img.sousuo {
      cursor: pointer;
      position: absolute;
      top: 15px;
      right: 20px;
    }

    .history {
      position: relative;
      margin-top: 40px;
      p {
        font-size: 20px;
        color: white;
      }
    }
    .clearhistory {
      position: absolute;
      right: 0;
      top: 10px;
      font-size: 14px;
      color: #bcc2d5;
      cursor: pointer;
    }
    ul {
      //margin-top: 30px;
      list-style: none;
      li {
        height: 40px;
        line-height: 40px;
        float: left;
        margin-right: 35px;
        span {
          font-size: 16px;
          color: white;
          padding-right: 20px;
          //background: url("../assets/img/cha.png") right center no-repeat;
          cursor: pointer;
        }
      }
    }
  }
}
</style>