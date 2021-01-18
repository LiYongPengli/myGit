<template>
  <!-- 平台访问数据 -->
  <div class="platformaccess">
    <div class="content">
      <div class="content_num">
        <ul>
          <li>
            <div class="peoplenum">
              <p class="num">{{userBehavior?init_number(userBehavior.online.recent):0 }}</p>
              <p class="name">当前在线人数</p>
            </div>
            <div class="yesterday">
              <p class="name">
                昨日同时:{{ userBehavior?init_number(userBehavior.online.last):0 }}
              </p>
              <div v-if="userBehavior" :class="{ upnum: userBehavior.online.rate < 0 }" class="num">
                {{ (Math.abs(userBehavior.online.rate) * 100).toFixed(2) }}%
                <img
                  v-show="userBehavior.online.rate < 0"
                  src="../../assets/img/ptdown.png"
                  alt=""
                />
                <img
                  v-show="userBehavior.online.rate >= 0"
                  src="../../assets/img/ptup.png"
                  alt=""
                />
              </div>
            </div>
          </li>
          <li>
            <div class="peoplenum">
              <p class="num">{{ userBehavior?init_number(userBehavior.visit.recent):0 }}</p>
              <p class="name">今日浏览量</p>
            </div>
            <div class="yesterday">
              <p class="name">
                昨日浏览量:{{ userBehavior?init_number(userBehavior.visit.last):0 }}
              </p>
              <div v-if="userBehavior" :class="{ upnum: userBehavior.visit.rate < 0 }" class="num">
                {{ (Math.abs(userBehavior.visit.rate) * 100).toFixed(2) }}%
                <img
                  v-show="userBehavior.visit.rate < 0"
                  src="../../assets/img/ptdown.png"
                  alt=""
                />
                <img
                  v-show="userBehavior.visit.rate >= 0"
                  src="../../assets/img/ptup.png"
                  alt=""
                />
              </div>
            </div>
          </li>
          <li>
            <div class="peoplenum">
              <p class="num">{{ userBehavior?init_number(userBehavior.active.recent):0 }}</p>
              <p class="name">今日活动用户数</p>
            </div>
            <div class="yesterday">
              <p class="name">
                昨日活动用户数:{{ userBehavior?init_number(userBehavior.active.last):0 }}
              </p>
              <div v-if="userBehavior" :class="{ upnum: userBehavior.active.rate < 0 }" class="num">
                {{ (Math.abs(userBehavior.active.rate) * 100).toFixed(2) }}%
                <img
                  v-show="userBehavior.active.rate < 0"
                  src="../../assets/img/ptdown.png"
                  alt=""
                />
                <img
                  v-show="userBehavior.active.rate >= 0"
                  src="../../assets/img/ptup.png"
                  alt=""
                />
              </div>
            </div>
          </li>
          <li>
            <div class="peoplenum">
              <p class="num">{{ userBehavior?userBehavior.stay.recent.split(".")[0]:0 }}</p>
              <p class="name">平均停留时长</p>
            </div>
            <div class="yesterday">
              <p class="name">
                昨日时长:{{ userBehavior?userBehavior.stay.last.split(".")[0]:0 }}
              </p>
              <div v-if="userBehavior" :class="{ upnum: userBehavior.stay.rate < 0 }" class="num">
                {{ (Math.abs(userBehavior.stay.rate) * 100).toFixed(2) }}%
                <img
                  v-show="userBehavior.stay.rate < 0"
                  src="../../assets/img/ptdown.png"
                  alt=""
                />
                <img
                  v-show="userBehavior.stay.rate >= 0"
                  src="../../assets/img/ptup.png"
                  alt=""
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="content_tu">
        <div class="cjsjs">
          <div class="cjsjs_head">
            <el-button
              :type="form.stat_type == 'today' ? 'primary' : ''"
              @click="setDay('today')"
              >今日</el-button
            >
            <el-button
              :type="form.stat_type == '7' ? 'primary' : ''"
              @click="setDay('7')"
              >最近7天</el-button
            >
            <el-button
              :type="form.stat_type == '30' ? 'primary' : ''"
              @click="setDay('30')"
              >最近30天</el-button
            >
            <el-date-picker
              @change="setDate"
              style="width: 250px; margin-left:20px;border:1px solid rgb(58, 58, 72)"
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
        <!-- 采集数据数图 -->
        <div class="cjsjqst">
          <div class="small">
            <div ref="myChart1" class="myChart2"></div>
          </div>
        </div>
        <!-- 活动用户数趋势图 -->
        <div class="hdyhqst">
          <div class="small">
            <div ref="myChart2" class="myChart3"></div>
          </div>
        </div>
      </div>
      <div class="content_form">
        <div class="content_form_one">
          <span class="namelist">用户登录名单</span>
          <div>
            <span @click="setUserDay('today')" :class="{'CumulativeActive':user_status=='today'}" class="Cumulative">今日</span>
          <span @click="setUserDay('all')" :class="{'CumulativeActive':user_status=='all'}" class="Cumulative1">累计</span>
          <el-date-picker
            @change="setUserDate"
            style="width: 230px; margin: 0 10px;border:1px solid rgb(58, 58, 72)"
            v-model="userdates"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <input
            v-model="search_user"
            :style="{'width':(topic_show?170:200)+'px'}"
            type="text"
            placeholder="账号/昵称/手机号"
          />
          <img class="searchinput" src="../../assets/img/search.png" alt="" />
          <span @click="toExport" class="export">导出</span>
          </div>
        </div>
        <div class="content_form_list">
          <ul>
            <li class="list_li">
              <div class="list_li_accountnumber">账号</div>
              <div class="list_li_name">昵称</div>
              <div class="list_li_phone">手机号</div>
              <div class="list_li_count">
                <div>
                  <span @click="sortType=1">累计登录次数</span>
                  <img v-show="sortType==1&&!sortContent" class="up" src="../../assets/img/up.png" alt="">
                  <img @click="sortContent=!sortContent" v-show="sortType==1&&sortContent" class="up actv" src="../../assets/img/down.png" alt="">
                  <img @click="sortContent=!sortContent" v-show="sortType==1&&!sortContent" class="down" src="../../assets/img/down.png" alt="">
                  <img v-show="sortType==1&&sortContent" class="down actv" src="../../assets/img/up.png" alt="">
                </div>
              </div>
              <div class="list_li_time">
                <div>
                  <span @click="sortType=2">最后登录时间</span>
                  <img v-show="sortType==2&&!sortTime" class="up" src="../../assets/img/up.png" alt="">
                  <img @click="sortTime=!sortTime" v-show="sortType==2&&sortTime" class="up actv" src="../../assets/img/down.png" alt="">
                  <img @click="sortTime=!sortTime" v-show="sortType==2&&!sortTime" class="down" src="../../assets/img/down.png" alt="">
                  <img v-show="sortType==2&&sortTime" class="down actv" src="../../assets/img/up.png" alt="">
                </div>
              </div>
            </li>
            <li style="height:250px;">
              <my-scroll>
              <li
                v-show="showUsers(v)"
                v-for="(v, k) in userLoginList"
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
                  {{ v.login_times }}
                </div>
                <div v-time="v.last_login_date" class="list_li_time">
                  {{ v.last_login_date }}
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
<style lang="scss">
.platformaccess{
  .cjsjs_head{
    button{
      width: 100px;
    }
  }
}
</style>