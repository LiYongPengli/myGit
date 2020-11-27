<template>
    <div class="resourceuses">
        <div class="content">
      <div class="menu">
        <ul class="top_nav">
          <li
            class="item"
            @click="pageIndex = 0"
            :class="{ active: pageIndex == 0 }"
          >
            新闻资源使用率 /
          </li>
      
          <li
            class="item"
            @click="pageIndex = 1"
            :class="{ active: pageIndex == 1 }"
          >
            站点资源使用率
          </li>
        </ul>
      </div>
      <div class="menu_content">
        <div v-show="pageIndex == 0" class="country">
          <news-resources />
        </div>

        <div v-show="pageIndex == 1" class="media">
          <site-resources />
        </div>
      </div>
    </div>
    </div>
</template>


<script lang="ts">
import Component, { mixins } from "vue-class-component";
import ResourceUsesCom from "./ResourceUses";
import MyScroll from "@/components/MyScroll.vue";
import NewsResources from "@/components/newsresources/NewsResources.vue";
import SiteResources from "@/components/siteresources/SiteResources.vue";
@Component({
  components: {
    MyScroll,
    NewsResources,
    SiteResources,
  },
})

export default class ResourceUses extends mixins(ResourceUsesCom) {}
</script>

<style lang="scss" scoped>
@import "./ResourceUses.scss";
</style>