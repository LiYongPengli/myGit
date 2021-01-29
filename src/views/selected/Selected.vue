<template>
  <!-- 精选 -->
  <div class="selected">
    <div class="list_wrap">
      <div class="list_nav">
        <span
          v-for="(v, i) in menu_list"
          :key="i"
          @click="listenChooseNav(v)"
          :class="{ cur: chooseNav == v }"
          >{{ v }}</span
        >
        <!-- <span
          @click="listenChooseNav('country')"
          :class="{ cur: chooseNav == 'country' }"
          ></span
        >
        <span
          @click="listenChooseNav('people')"
          :class="{ cur: chooseNav == 'people' }"
          ></span
        > -->
        <!-- <span
          @click="listenChooseNav('media')"
          :class="{ cur: chooseNav == 'media' }"
          >精选频道4</span
        > -->
      </div>

      <div class="list">
        <div class="nodata" v-show="!list.length && isfinished">暂无数据</div>
        <div class="loadingData">
          <loading v-if="initData" />
        </div>
        <ul>
          <list-item
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
@Component({
  components: {
    ShareContent,
    ListItem,
    Loading,
  },
})
export default class Selected extends mixins(SelectedCom) {}
</script>
 

<style lang="scss" scoped>
@import "./Selected.scss";
</style>