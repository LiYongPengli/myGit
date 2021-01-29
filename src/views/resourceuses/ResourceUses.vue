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
        <!-- 新闻资源使用率 -->
        <div class="platformaccess">
          <div v-show="pageIndex == 0" class="contentss">
            <news-resources-item
              :type="'share'"
              :cells="['排名', '新闻名称', '转发次数']"
              :title="'新闻转发次数统计'"
            />
            <news-resources-item
              class="Fabulous"
              :type="'like'"
              :title="'新闻点赞次数统计'"
              :cells="['排名', '新闻名称', '点赞次数']"
            />
            <news-resources-item
              class="browse"
              :type="'view'"
              :title="'新闻浏览次数统计'"
              :cells="['排名', '新闻名称', '浏览次数']"
            />
          </div>
          <div v-show="pageIndex == 1" class="shiyonglv">
            <news-resources-item :cells="['排名', '站点名称', '浏览次数']" :page="2" :type="'share'" :title="'站点浏览次数统计'" />
          </div>
        </div>
        <!-- <div v-show="pageIndex == 0" class="country">
          <news-resources />
        </div> -->
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Component, { mixins } from "vue-class-component";
import ResourceUsesCom from "./ResourceUses";
import MyScroll from "@/components/MyScroll.vue";
import NewsResourcesItem from "@/components/newsresources/NewSResourceItem.vue";
@Component({
  components: {
    MyScroll,
    NewsResourcesItem,
  },
})
export default class ResourceUses extends mixins(ResourceUsesCom) {}
</script>

<style lang="scss" scoped>
@import "./ResourceUses.scss";
</style>