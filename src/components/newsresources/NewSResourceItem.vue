<template>
  <div class="newsresourceitem">
    <div class="content_form_one">
      <span class="namelist">{{ title }}</span>
      <div>
        <span
          @click="setDate('today')"
          class="today"
          :class="{
            dateActive: dateState=='today',
          }"
          >今日</span
        >
        <span
          @click="setDate('all')"
          :class="{
            dateActive: dateState=='all',
          }"
          class="Cumulative"
          >累计</span
        >
        <el-date-picker
          @change="setFormdate"
          style="width: 250px; margin-right: 20px; border: 1px solid rgb(58, 58, 72)"
          v-model="share_date"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <!-- <div @click="setFormdate" class="searchdate">
        <img src="../../assets/img/search.png" alt="" />
      </div> -->
        <span class="export" @click="toExport(page, form.stat_type)">导出</span>
      </div>
    </div>
    <div class="content_form_list">
      <ul v-if="cells">
        <li class="list_li">
          <div class="list_li_accountnumber">{{ cells[0] }}</div>
          <div class="list_li_name">{{ cells[1] }}</div>
          <div class="list_li_phone">{{ cells[2] }}</div>
        </li>
        <li style="height: 250px">
          <my-scroll style="content_mt_onescroll">
            <li
              v-show="!isnulldata"
              v-for="(v, k) in share_data"
              :key="k"
              :class="{ active: k % 2 != 0 }"
            >
              <div class="list_li_accountnumber">
                {{ k + 1 }}
              </div>
              <div class="list_li_name">
                {{ v.title ? v.title : v.name_zh }}
              </div>
              <div class="list_li_phone value">
                {{ v.count }}
              </div>
            </li>
            <li
          style="width: 100%; height: 250px; justify-content: center; align-items: center"
          v-show="isnulldata"
        >
          <div>暂无数据</div>
        </li>
          </my-scroll>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import NewsResourceItemCom from "./NewsResourcesItem";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class NewsResourceItem extends mixins(NewsResourceItemCom) {}
</script>

<style lang="scss">
@import "./NewsResourcesItem.scss";
</style>
