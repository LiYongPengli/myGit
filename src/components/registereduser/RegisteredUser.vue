<template>
  <div class="registereduser">
    <div class="content">
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
       <div class="cjsjs_content">
          <div class="jqt">
            <p>72</p>
            <p>本周注册人数</p>
          </div>
          <div class="sqt">
            <p>46</p>
            <p>上周注册人数</p>
          </div>
          <div>
            <p>22.25% </p>
            <p>增长率</p>
          </div>
          <div class="inline">
              <p>1,983</p>
              <p>当前在线人数</p>
          </div>
        </div>
        <!-- 采集数据数图 -->
        <div class="cjsjqst">
          <div class="small">
            <div ref="myChart2" class="myChart2"></div>
          </div>
        </div>
        <!-- 注册数量走势图 -->
        <div class="hdyhqst">
          <div class="small">
            <div ref="myChart3" class="myChart3"></div>
          </div>
        </div>
      </div>
      <div class="content_form">
        <div class="content_form_one">
          <span class="namelist">注册用户名单</span>
          <span class="export">导出</span>
          <input type="text" placeholder="账号/昵称/手机号" />
          <img class="searchinput" src="../../assets/img/search.png" alt="" />
        </div>
        <div class="content_form_list">
          <ul>
            <my-scroll style="content_mt_onescroll">
              <li class="list_li">
                <div class="list_li_accountnumber">账号</div>
                <div class="list_li_name">昵称</div>
                <div class="list_li_phone">手机号</div>
                <div class="list_li_count">微信昵称</div>
                <div class="list_li_time">注册时间</div>
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
                  {{ v.wechatnickname }}
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
import RegisteredUserCom from "./RegisteredUser";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class RegisteredUser extends mixins(RegisteredUserCom) {}
</script>

<style lang="scss" scoped>
@import "./RegisteredUser.scss";
</style>