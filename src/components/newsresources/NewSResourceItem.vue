<template>
  <div class="newsresourceitem">
    <div class="content_form_one">
      <span class="namelist">{{title}}</span>
      <span
        @click="setDate('today')"
        class="today"
        :class="{
          dateActive: form.time_from == form.time_to && form.time_from,
        }"
        >今日</span
      >
      <span
        @click="setDate('all')"
        :class="{
          dateActive: form.time_from == form.time_to && !form.time_from,
        }"
        class="Cumulative"
        >累计</span
      >
      <el-date-picker
        @change="setFormdate"
        style="width: 250px; margin-right: 20px"
        v-model="share_date"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <div @click="setFormdate" class="searchdate">
        <img src="../../assets/img/search.png" alt="" />
      </div>
      <span class="export">导出</span>
    </div>
    <div class="content_form_list">
      <ul v-if="cells">
        <my-scroll style="content_mt_onescroll">
          <li class="list_li">
            <div class="list_li_accountnumber">{{cells[0]}}</div>
            <div class="list_li_name">{{cells[1]}}</div>
            <div class="list_li_phone">{{cells[2]}}</div>
          </li>
          <li
            v-for="(v, k) in share_data"
            :key="k"
            :class="{ active: k % 2 != 0 }"
          >
            <div class="list_li_accountnumber">
              {{ k + 1 }}
            </div>
            <div class="list_li_name">
              {{ v.title?v.title:v.name_zh }}
            </div>
            <div class="list_li_phone value">
              {{ v.count }}
            </div>
          </li>
        </my-scroll>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import Component, { mixins } from "vue-class-component";
import NewsResourceItemCom from "./NewsResourcesItem"
import MyScroll from "@/components/MyScroll.vue";
@Component({
    components:{
        MyScroll
    }
})
export default class NewsResourceItem extends mixins(NewsResourceItemCom) {
  
}
</script>

<style lang="scss">
@import './NewsResourcesItem.scss';
</style>