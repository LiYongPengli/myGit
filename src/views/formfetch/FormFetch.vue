<template>
  <!-- 数据采集页面 -->
  <div class="formfetch">
    <div class="content">
      <div class="count">
        <div class="cjgj">
          <p class="sl">{{ init_number(result_data.country) }}</p>
          <p class="name">采集覆盖国家数</p>
        </div>
        <div class="cjzd">
          <p class="sl">{{ init_number(result_data.media) }}</p>
          <p class="name">采集覆盖站点数</p>
        </div>
        <div class="cjtj">
          <p class="sl">{{ init_number(result_data.news) }}</p>
          <p class="name">累计采集数据</p>
        </div>
      </div>
      <!-- 采集数据数 -->
      <div class="cjsjs">
        <div class="cjsjs_head">
          <p>采集数据数</p>
          <div class="cjsjs_head_right">
          <el-button
            @click="setDay('today')"
            :type="search_form.stat_type == 'today' ? 'primary' : ''"
            >今日</el-button
          >
          <el-button
            @click="setDay('7')"
            :type="search_form.stat_type == '7' ? 'primary' : ''"
            >最近7天</el-button
          >
          <el-button
            @click="setDay('30')"
            class="zjsst"
            :type="search_form.stat_type == '30' ? 'primary' : ''"
            >最近30天</el-button
          >
          <el-date-picker
            @change="setDate"
            style="width: 250px;border:1px solid #3a3a48"
            v-model="dates"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          </div>
        </div>
        <div class="cjsjs_content">
          <div class="jqt">
            <p>{{ init_number(result_data.recent) }}</p>
            <p>{{fetch_text.now}}采集数</p>
          </div>
          <div class="sqt">
            <p>{{ init_number(result_data.last) }}</p>
            <p>{{fetch_text.last}}采集数</p>
          </div>
          <div>
            <p>{{ (result_data.rate * 100).toFixed(2) }}%</p>
            <p>变化趋势</p>
          </div>
        </div>
      </div>
      <div class="cjsjqst">
        <div class="small">
          <div ref="myChart2" class="myChart2"></div>
        </div>
      </div>

      <div class="site">
        <span class="site_p">近七天未采集数据的源站点</span>
        <span @click="toExport" class="site_p_export">导出</span>
        <div class="list">
          <ul>
            <li class="list_li">
              <div class="list_li_number">编号</div>
              <div class="list_li_name">站点名称</div>
              <div class="list_li_time">最后更新时间</div>
            </li>
            <li style="height:250px;">
              <my-scroll>
              <li
                v-for="(v, k) in result_data.not_updated"
                :key="k"
                :class="{ active: k % 2 != 0 }"
              >
                <div class="list_li_number">
                  {{ k + 1 }}
                </div>
                <div class="list_li_name">
                  {{ v.name_zh }}
                </div>
                <div v-time="v.last_update" class="list_li_time"></div>
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
import FormFetchCom from "./FormFetch";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class FormFetch extends mixins(FormFetchCom) {}
</script>

<style lang="scss" scoped>
@import "./FormFetch.scss";
</style>

<style lang="scss">
.el-picker-panel {
  border: 0;
}
.el-date-picker__header {
  color: white;
  background: #494959;
  margin: 0;
  padding: 12px;
  span,
  button {
    color: white;
  }
}
.el-picker-panel__content {
  background: #494959;
  margin: 0;
  padding: 15px;
  color: white;
  table {
    tbody {
      tr {
        th {
          color: white;
        }
        span {
          color: white;
        }
      }
    }
  }
}
.formfetch {
  .el-button--default {
    margin-left: 240px;
    width: 100px;
  }
  .el-date-editor {
    margin-right: 10px;
    width: 140px;
    input {
      background: #494959;
      border: 0;
      color: white;
    }
  }
  .cjsjs_head_right{
    button{
      width: 100px;
    }
    button:hover{
      background-color: #0074ff;
      border: 1px solid #0074ff;
      color: white;
    }
    .el-button--primary{
      background-color: #0074ff;
      border: 1px solid #0074ff;
      color: white;
    }

  }

}
</style>