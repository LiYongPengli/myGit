<template>
  <div class="nopeople">
    <a class="search_a" @click="close">返回</a>
    <div class="search_input">
      <input
        @keypress="toSearch"
        v-model="searchText"
        type="text"
        placeholder="请输入想要搜索的人物名称"
      />
      <img
        @click="searchCharacter"
        class="sousuo"
        src="../../assets/img/sousuo.png"
        alt=""
      />
    </div>
    <ul class="noattentionlists">
      <li v-for="(v, i) in characterList" :key="i" class="noattentionlist">
        <div class="concernedlistdiv">
          <img v-if="v.avatar!=-1&&v.avatar!=null" :src="axios.defaults.baseURL+'/attachments/avator/'+v.avatar" alt="" />
            <img v-if="v.avatar==-1||v.avatar==null" src="../../assets/img/tx.png" alt="" />
          <span>{{ v.name }}</span>
          <div class="concernedname">
            <speed-text
              width="152px"
              height="20px"
              :text="v.description ? v.description : '暂无'"
            >
            </speed-text>
          </div>
          <img @click="addFollow(v, i)" src="../../assets/img/add.png" alt="" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { Component, Emit, Vue, Watch } from "vue-property-decorator";
import SpeedText from "@/components/SpeedText.vue";
import { CancelTokenSource } from "axios";
@Component({
  components: {
    SpeedText,
  },
})
export default class NoPeople extends Vue {
  public characterList: any[] = [];
  public searchText: string = "";
  public request: CancelTokenSource | null = null;
  @Emit("close")
  public close(): boolean {
    return false;
  }

  @Emit("follow")
  public follow(item: any): any {
    return item;
  }

  public toSearch(e: KeyboardEvent): void {
      if(e.keyCode==13){
          this.searchCharacter();
      }
  }

  public created(): void {
    this.request = this.axios.CancelToken.source();
  }

  public searchCharacter(): void {
    if (!this.searchText) {
        this.characterList = [];
      return;
    }
    this.axios
      .post(
        "/v1/cmd/",
        {
          cmd: "search_character",
          paras: { keyword: this.searchText },
        },
        { cancelToken: this.request?.token, timeout: 5000 }
      )
      .then((res) => {
        this.characterList = res.data.data;
      })
      .catch((err) => {
        if (this.axios.isCancel(err)) {
          console.log(err.message);
        }
        console.log(err);
      });
  }

  //添加到关注
  public addFollow(item: any, index: number): void {
    this.axios
      .post("/v1/user/sub/", {
        sub_id: item.sub_id,
        sub_type: "character",
        sub_oper_type: "sub",
      })
      .then((res) => {
        this.follow(item);
        this.characterList.splice(index, 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss" scoped>
.nopeople {
  min-height: 300px;
  background-color: #3a3a48;
  .search_a {
    margin-top: 40px;
    color: white;
    display: inline-block;
    text-decoration: none;
    width: 100%;
    font-size: 20px;
    padding-left: 15px;
    background: url("../../assets/img/searchpeoplereturn.png") left center
      no-repeat;
  }
  .search_input {
    margin-top: 50px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    input {
      height: 40px;
      background-color: #3a3a48;
      outline: none;
      border: 1px solid #979797;
      width: 600px;
      padding-left: 20px;
      border-radius: 3px;
      color: white;
    }
    .sousuo {
      position: relative;
      top: 5px;
      right: 40px;
      cursor: pointer;
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
  }
  ul {
    overflow: hidden;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 270px;
      position: relative;
      margin-bottom: 20px;
      padding-right: 20px;
      display: flex;
      align-items: center;
      .concernedlistdiv {
        width: 270px;
        position: relative;
        img:first-child {
          width: 54px;
          height: 54px;
          margin-right: 20px;
        }
        span {
          position: absolute;
          height: 21px;
          line-height: 21px;
          font-size: 15px;
          top: 5px;
        }
        .concernedname {
          position: absolute;
          width: 145px;
          top: 30px;
          left: 70px;
          overflow: hidden;
        }
        img:last-child {
          position: absolute;
          right: 10px;
          top: 27px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>