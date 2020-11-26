<template>
  <!-- 平台访问数据 -->
  <div class="platformaccess">
    <div class="content">
      <div class="content_num">
        <ul>
          <li>
            <div class="peoplenum">
              <p class="num">983</p>
              <p class="name">当前在线人数</p>
            </div>
            <div class="yesterday">
              <p class="name">昨日同时:671</p>
              <p class="num">56.00%</p>
            </div>
          </li>
          <li>
            <div class="peoplenum">
              <p class="num">983</p>
              <p class="name">当前在线人数</p>
            </div>
            <div class="yesterday">
              <p class="name">昨日同时:671</p>
              <p class="num">56.00%</p>
            </div>
          </li>
          <li>
            <div class="peoplenum">
              <p class="num">983</p>
              <p class="name">当前在线人数</p>
            </div>
            <div class="yesterday">
              <p class="name">昨日同时:671</p>
              <p class="num">56.00%</p>
            </div>
          </li>
          <li>
            <div class="peoplenum">
              <p class="num">983</p>
              <p class="name">当前在线人数</p>
            </div>
            <div class="yesterday">
              <p class="name">昨日同时:671</p>
              <p class="num">56.00%</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="content_tu">
        <div class="cjsjs">
          <div class="cjsjs_head">
            <el-button>今日</el-button>
            <el-button type="primary">最近7天</el-button>
            <el-button class="zjsst" type="primary">最近30天</el-button>
            <el-date-picker v-model="value1" type="date" placeholder="开始日期">
            </el-date-picker>
            <span class="zhi">-</span>
            <el-date-picker v-model="value2" type="date" placeholder="截止日期">
            </el-date-picker>
            <span class="cjsjs_head_search">
              <img src="../../assets/img/search.png" alt="" />
            </span>
          </div>
        </div>
        <!-- 采集数据数图 -->
        <div class="cjsjqst">
          <div class="small">
            <div ref="myChart2" class="myChart2"></div>
          </div>
        </div>
        <!-- 活动用户数趋势图 -->
        <div class="hdyhqst">
          <div class="small">
            <div ref="myChart3" class="myChart3"></div>
          </div>
        </div>
      </div>
      <div class="content_form">
        <div class="content_form_one">
          <span class="namelist">用户登录名单</span>
          <span class="Cumulative">累计</span>
          <el-date-picker v-model="value1" type="date" placeholder="开始日期">
          </el-date-picker>
          <span class="zhi">-</span>
          <el-date-picker v-model="value2" type="date" placeholder="截止日期">
          </el-date-picker>
          <div class="searchdate">
            <img src="../../assets/img/search.png" alt="" />
          </div>
          <input type="text" placeholder="账号/昵称/手机号" />
          <img class="searchinput" src="../../assets/img/search.png" alt="" />
          <span class="export">导出</span>
        </div>
        <div class="content_form_list">
          <ul>
            <my-scroll style="content_mt_onescroll">
              <li class="list_li">
                <div class="list_li_accountnumber">账号</div>
                <div class="list_li_name">昵称</div>
                <div class="list_li_phone">手机号</div>
                <div class="list_li_count">累计登录次数</div>
                <div class="list_li_time">最后登录时间</div>
              </li>
              <li
                v-for="(v, k) in tableData"
                :key="k"
                :class="{ active: k % 2 != 0 }"
              >
                <div class="list_li_accountnumber">
                  {{ v.accountnumber }}
                </div>
                <div class="list_li_name">
                  {{ v.name }}
                </div>
                <div class="list_li_phone">
                  {{ v.phone }}
                </div>
                 <div class="list_li_count">
                  {{ v.count }}
                </div>
                 <div class="list_li_time">
                  {{ v.time }}
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
import PlatformAccessCom from "./PlatformAccess";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class PlatformAccess extends mixins(PlatformAccessCom) {}
</script>

<style lang="scss" scoped>
@import "./PlatformAccess.scss";
</style>