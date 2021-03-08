<template>
  <!-- 首页的banner模块 -->
  <div class="homebanner">
    <div class="top">
      <p class="title">媒体更新情况</p>
      <div class="search">
        <img v-show="!searchText" src="../../assets/img/sousuo.png" alt="" />
        <span
          @click="clear"
          v-show="searchText"
          class="el-icon-close"
        ></span>
        <input
          v-model="searchText"
          @blur="isClear"
          @focus="focus"
          placeholder="请输入搜索内容"
          type="text"
        />
      </div>
    </div>
    <div class="table">
      <div class="thead">
        <div class="th">国家名称</div>
        <div class="th">媒体名称</div>
        <div class="th">最新时间</div>
        <div class="th">采集类型</div>
        <div class="th">与源网站更新是否一致</div>
      </div>
      <div
        @mouseover="isStartScroll = false"
        @mouseout="mouseLeave"
        class="tbody"
      >
        <my-scroll @loading="scroll.scrollTop = 0" @getscroll="getScroll">
          <div
            v-show="listenSearchText(v)"
            class="tr"
            v-for="(v, i) in dataList"
            :key="i"
          >
            <div class="td">{{ v.country }}</div>
            <div class="td">
              <img class="icon" :src="v.media_icon" alt="" />
              <speed-text width="100px" height="20px" :text="v.name_zh" />
            </div>
            <div v-if="v.last_update!='None'" v-time="v.last_update" class="td"></div>
            <div v-if="v.last_update=='None'" class="td">暂无数据</div>
            <div class="td">{{ v.gather_type }}</div>
            <div class="td">{{ v.consistency }}</div>
          </div>
        </my-scroll>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MyScroll from "@/components/MyScroll.vue";
import SpeedText from "@/components/SpeedText.vue";
@Component({
  components: {
    MyScroll,
    SpeedText,
  },
})
export default class HomeBanner extends Vue {
  public scroll!: HTMLElement;
  public interval: number | null = null;
  public dataList: any[] = [];
  public isStartScroll: boolean = true;
  public searchText: string = "";
  public inputFocus: boolean = false;
  @Watch("isStartScroll")
  public listenScroll(newVal: boolean, oldVal: boolean): void {
    if (newVal) {
      if (!this.searchText) {
        if (!this.interval) {
          this.startScroll();
        }
      }
    } else {
      this.pauseScroll();
    }
  }

  public listenSearchText(item: any): boolean {
    //   if(!this.searchText) return true;
    if (~item.country.indexOf(this.searchText)) return true;
    if (~item.name_zh.indexOf(this.searchText)) return true;
    return false;
  }

  public mounted(): void {
    this.getData();
  }

  public focus(): void {
    this.inputFocus = true;
    this.isStartScroll = false;
  }

  public isClear(): void {
    this.inputFocus = false;
    if (!this.searchText) {
      this.isStartScroll = true;
    }
  }
  
  public clear():void{
      this.searchText = '';
      this.inputFocus = false;
      this.isStartScroll = true;
  }

  public getScroll(scroll: HTMLElement): void {
    this.scroll = scroll;
  }

  private getData(): void {
    this.axios
      .post("/v1/cmd/", {
        cmd: "media_update_stat",
      })
      .then((res) => {
        console.log(res.data);
        this.dataList = res.data.data;
        this.startScroll();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private startScroll(): void {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.scroll.scrollTop++;
      }, 50);
    }
  }

  public mouseLeave(): void {
    if (!this.inputFocus) this.isStartScroll = true;
  }

  private pauseScroll(): void {
    if (this.interval) {
      clearInterval(<number>this.interval);
      this.interval = null;
    }
  }
}
</script>

<style lang="scss" scoped>
.homebanner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(58, 58, 72, 1);
  background: -moz-linear-gradient(
    top,
    rgba(58, 58, 72, 1) 0%,
    rgba(38, 38, 48, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, rgba(58, 58, 72, 1)),
    color-stop(100%, rgba(38, 38, 48, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(58, 58, 72, 1) 0%,
    rgba(38, 38, 48, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(58, 58, 72, 1) 0%,
    rgba(38, 38, 48, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(58, 58, 72, 1) 0%,
    rgba(38, 38, 48, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(58, 58, 72, 1) 0%,
    rgba(38, 38, 48, 1) 100%
  );
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  padding: 0 30px;
  .top {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    .title {
      font-size: 18px;
      color: white;
    }
    .search {
      width: 200px;
      position: relative;
      input {
        width: 100%;
        border: 1px solid gray;
        background: none;
        padding: 7px 10px;
        color: white;
        outline: none;
        border-radius: 3px;
      }
      img {
        width: 20px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        cursor: pointer;
      }
      span {
        position: absolute;
        font-size: 18px;
        color: white;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        cursor: pointer;
      }
    }
  }
  .table {
    flex: 1;
    color: white;
    position: relative;
    .thead {
      display: flex;
      border-bottom: 1px solid #494958;
      .th {
        flex: 1;
        text-align: center;
        padding: 15px 0;
      }
      .th:nth-of-type(2) {
        flex: 2.5;
      }
      .th:nth-of-type(3) {
        flex: 2.5;
      }
      .th:nth-of-type(4) {
        flex: 2.5;
      }
      .th:last-of-type {
        flex: 2;
      }
    }
    .tbody {
      width: 100%;
      position: absolute;
      left: 0;
      top: 60px;
      bottom: 10px;
      font-size: 15px;
      color: rgba(255, 255, 255, 0.8);
      .tr {
        display: flex;
        .td {
          flex: 1;
          text-align: center;
          padding: 10px 0;
        }
        .td:nth-of-type(2) {
          flex: 2.5;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          .icon {
            width: 25px;
            display: block;
            margin-left: 50px;
            margin-right: 15px;
          }
          span {
            margin-left: 15px;
          }
        }
        .td:nth-of-type(3) {
          flex: 2.5;
        }
        .td:nth-of-type(4) {
          flex: 2.5;
        }
        .td:last-of-type {
          flex: 2;
        }
      }
    }
  }
}
</style>