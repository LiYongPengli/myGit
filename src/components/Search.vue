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
        ref="search"
        @blur="blur"
        @focus="focus"
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
      <div class="searchList" v-show="showSearchList">
        <my-scroll>
          <ul>
            <li @click="clickList(v)" v-for="(v, i) in searchList" :key="i">
              {{ v }}
            </li>
          </ul>
        </my-scroll>
      </div>
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
import { Component, Emit, Vue, Watch } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";
import MyScroll from "@/components/MyScroll.vue";
import { ElStep } from "element-ui/types/step";
import IDBDriver from "@/libs/IdbDriver";
@Component({
  components: {
    MyScroll,
  },
})
export default class Search extends Vue {
  @State("user_message") user_message: any;
  @Mutation("setShowIntelligent") setShowIntelligent: any;
  public historyList: string[] = [];
  public searchList: any[] = [];
  public showSearchList: boolean = false;
  public timer: any = null;
  private db!:IDBDriver;
  //搜索内容
  public searchText: string = "";
  private async created() {
    this.db = IDBDriver.getInstance();
    await this.db.connect('zlbxxcj','userHistory');
    this.getHistory();
  }

  public mounted():void{
    let search = <HTMLInputElement>this.$refs.search;
    search.focus();
  }

  public blur(): void {
    setTimeout(() => {
      this.showSearchList = false;
    }, 200);
  }
  public focus(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.getSearchList(this.searchText);
    }, 300);
  }

  @Watch("searchText")
  public listenSearch(newVal: string, oldVal: string): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.getSearchList(newVal);
    }, 300);
  }

  private getSearchList(val: string): void {
    if (!val) {
      return;
    }
    this.axios
      .post("/v1/cmd/", {
        cmd: "search_suggestion",
        paras: { keyword: val },
      })
      .then((res) => {
        console.log(res);
        this.searchList = res.data.data;
        if (this.searchList.length) {
          this.showSearchList = true;
        } else {
          this.showSearchList = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //获取历史记录
  private getHistory(): void {
    this.db.read(this.user_message.phone_number).then(res=>{
      if(res){
        this.historyList = res.historys
      }else{
        this.db.add(this.user_message.phone_number,[]).catch(err=>{
          console.log(err);
        })
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  @Emit("tosearch")
  public clickList(item: string): string {
    this.searchText = item;
    this.setHistory();
    return this.searchText;
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
    this.historyList.splice(index, 1);
    this.db.put(this.user_message.phone_number,this.historyList).catch(err=>{
      console.log(err);
    })
  }

  //记录搜索历史
  public setHistory(): void {
    for(let i of this.historyList){
      if(i==this.searchText){
        return;
      }
    }
    if(this.historyList.length>=10){
      this.historyList.pop();
    }
    this.historyList.unshift(this.searchText);
    this.db.put(this.user_message.phone_number,this.historyList).catch(err=>{
      console.log(err);
    })
  }

  //清空历史记录
  public clearHistory(): void {
    this.historyList = [];
    this.db.put(this.user_message.phone_number,this.historyList).catch(err=>{
      console.log(err);
    })
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
      font-size: 16px;
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
    img.sousuo {
      cursor: pointer;
      position: absolute;
      top: 15px;
      right: 20px;
    }
    .searchList {
      width: 900px;
      height: 400px;
      position: absolute;
      left: 0;
      top: 52px;
      background: #353541;

      z-index: 10;
      ul {
        padding-top: 10px;
        padding-left: 10px;
        padding-bottom: 20px;
        li {
          // border-bottom: 1px solid gray;
          padding: 10px;
          cursor: pointer;
          color: white;
          font-size: 14px;
        }
      }
    }

    .history {
      position: relative;
      margin-top: 40px;
      p {
        font-size: 20px;
        color: white;
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
    .clearhistory {
      position: absolute;
      right: 0;
      top: 10px;
      font-size: 14px;
      color: #bcc2d5;
      cursor: pointer;
    }
  }
}
</style>