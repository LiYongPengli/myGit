<template>
  <!-- 数据采集页面 -->
  <div class="formfetch">
    <div class="content">
      <div class="count">
        <div class="cjgj">
          <p class="sl">153</p>
          <p class="name">采集覆盖国家数</p>
        </div>
        <div class="cjzd">
          <p class="sl">1,257</p>
          <p class="name">采集覆盖站点数</p>
        </div>
        <div class="cjtj">
          <p class="sl">3,695,452</p>
          <p class="name">累计采集数据</p>
        </div>
      </div>
      <!-- 采集数据数 -->
      <div class="cjsjs">
        <div class="cjsjs_head">
          <p>采集数据数</p>

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
        <div class="cjsjs_content">
          <div class="jqt">
            <p>3,695,452</p>
            <p>近7天采集数</p>
          </div>
          <div class="sqt">
            <p>1,125,837</p>
            <p>上7天采集数</p>
          </div>
          <div>
            <p>-22.25%</p>
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
        <span class="site_p_export">导出</span>
        <div class="list">
          <ul>
            <my-scroll style="content_mt_onescroll">
              <li class="list_li">
                <div class="list_li_number">编号</div>
                <div class="list_li_name">站点名称</div>
                <div class="list_li_time">最后更新时间</div>
              </li>
              <li v-for="(v, k) in tableData" :key="k" :class="{'active':k%2 != 0}">
                <div class="list_li_number">
                  {{ v.number }}
                </div>
                <div class="list_li_name">
                  {{ v.name }}
                </div>
                <div class="list_li_time">
                  {{ v.date }}
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
}
</style>