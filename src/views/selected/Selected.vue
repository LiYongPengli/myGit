<template>
  <!-- 精选 -->
  <div class="selected">
    <div class="nav_wrap">
      <ul class="list_nav">
        <my-scroll>
          <li
            v-for="(v, i) in menu_list"
            :key="i"
            @click="listenChooseNav(v.name)"
          >
            <img
              class="list_icon"
              :src="getIcon(v)"
              alt=""
            />
            <span>{{ v.zh_name }}</span>
            <img
              v-if="chooseNav == v.name"
              class="cur"
              src="../../assets/img/cur.png"
              alt=""
            />
            <div v-if="chooseNav == v.name" class="border"></div>
          </li>
        </my-scroll>
      </ul>
    </div>
    <div class="list_wrap">
      <div class="list">
        <div class="nodata" v-show="!list.length && isfinished">暂无数据</div>
        <div class="loadingData">
          <loading v-if="initData" />
        </div>
        <ul>
          <list-item
            :selected="true"
            :shoControls="[]"
            :item="v"
            v-for="(v, i) in list"
            :key="i"
          />
          <loading v-if="!isfinished && mainPageLoading && !initData" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import SelectedCom from "./Selected";
import ShareContent from "@/components/sharecontent/ShareContent.vue";
import ListItem from "@/components/ListItem.vue";
import Loading from "@/components/Loading.vue";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    ShareContent,
    ListItem,
    Loading,
    MyScroll,
  },
})
export default class Selected extends mixins(SelectedCom) {}
</script>
 

<style lang="scss" scoped>
@import "./Selected.scss";
</style>