<template>
  <!-- 平台访问数据 -->
  <div class="siteresources">
   <div class="content">
     
      <div class="content_form">
        <div class="content_form_one">
          <span class="namelist">站点浏览次数统计</span>
          <span class="today">今日</span>
          <span class="Cumulative">累计</span>
          <el-date-picker v-model="value1" type="date" placeholder="开始日期">
          </el-date-picker>
          <span class="zhi">-</span>
          <el-date-picker v-model="value2" type="date" placeholder="截止日期">
          </el-date-picker>
          <div class="searchdate">
            <img src="../../assets/img/search.png" alt="" />
          </div>
          <span class="export">导出</span>
        </div>
        <div class="content_form_list">
           <ul>
            <my-scroll style="content_mt_onescroll">
              <li class="list_li">
                <div class="list_li_accountnumber">排名</div>
                <div class="list_li_name">新闻名称</div>
                <div class="list_li_phone">转发次数</div>
                
              </li>
              <li
                v-for="(v, k) in tableData"
                :key="k"
                :class="{ active: k % 2 != 0 }"
              >
                <div class="list_li_accountnumber">
                  {{ v.ranking }}
                </div>
                <div class="list_li_name">
                  {{ v.newsname }}
                </div>
              <div class="list_li_phone value">
                  {{ v.forwardingtimes }}
                </div>
             
              </li>
            </my-scroll>
          </ul>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import SiteResourcesCom from "./SiteResources";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class SiteResources extends mixins(SiteResourcesCom) {}
</script>

<style lang="scss" scoped>
@import "./SiteResources.scss";
</style>