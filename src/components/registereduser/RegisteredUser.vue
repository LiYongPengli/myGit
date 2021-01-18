<template>
  <div class="registereduser">
    <div class="content">
      <div class="content_tu">
        <div class="cjsjs">
          <div class="cjsjs_head">
            <el-button
              :type="search_form.stat_type == 'today' ? 'primary' : ''"
              @click="setDay('today')"
              style="width: 91px"
              >今日</el-button
            >
            <el-button
              :type="search_form.stat_type == '7' ? 'primary' : ''"
              @click="setDay('7')"
              >最近7天</el-button
            >
            <el-button
              :type="search_form.stat_type == '30' ? 'primary' : ''"
              @click="setDay('30')"
              >最近30天</el-button
            >
            <el-date-picker
              @change="setDate"
              style="width: 250px; margin: 0 20px; border: 1px solid rgb(58, 58, 72)"
              v-model="dates"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <!-- <span class="cjsjs_head_search">
              <img src="../../assets/img/search.png" alt="" />
            </span> -->
          </div>
        </div>
        <div class="cjsjs_content">
          <div class="jqt">
            <p>{{ init_number(result_data.recent) }}</p>
            <p>{{fetch_text.now}}注册人数</p>
          </div>
          <div class="sqt">
            <p>{{ init_number(result_data.last) }}</p>
            <p>{{fetch_text.last}}注册人数</p>
          </div>
          <div>
            <p>{{ (result_data.rate * 100).toFixed(2) }}%</p>
            <p>增长率</p>
          </div>
          <div class="inline">
            <p>{{ init_number(result_data.reg_total) }}</p>
            <p>累计注册人数</p>
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
          <div>
            <input v-model="search_user" type="text" placeholder="账号/昵称/手机号" />
            <img class="searchinput" src="../../assets/img/search.png" alt="" />
            <span @click="toExport" class="export">导出</span>
          </div>
        </div>
        <!-- 用户列表 -->
        <div class="content_form_list">
          <ul>
            <li class="list_li">
              <div class="list_li_accountnumber">账号</div>
              <div class="list_li_name">昵称</div>
              <div class="list_li_phone">手机号</div>
              <div class="list_li_count">微信昵称</div>
              <div class="list_li_time">注册时间</div>
            </li>
            <li style="height:250px;">
              <my-scroll>
              <li
                v-show="showUsers(v)"
                v-for="(v, k) in result_data.users"
                :key="k"
                :class="{ active: k % 2 != 0 }"
              >
                <div class="list_li_accountnumber">
                  {{ v.account }}
                </div>
                <div class="list_li_name">
                  {{ v.nickname }}
                </div>
                <div class="list_li_phone">
                  {{ v.phone_number }}
                </div>
                <div class="list_li_count">
                  {{ v.wechat_info.binding ? v.wechat_info.nickname : "未绑定" }}
                </div>
                <div class="list_li_time">
                  {{ new Date(v.registration_date).toLocaleString() }}
                </div>
              </li>
            </my-scroll>
            </li>
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
<style lang="scss">
.registereduser {
  .cjsjs_head {
    button {
      width: 100px;
    }
  }
}
</style>
