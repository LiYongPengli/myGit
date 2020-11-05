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
          <el-row>
            <el-button>今日</el-button>
            <el-button type="primary">最近7天</el-button>
            <el-button>最近30天</el-button>
          </el-row>
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
        <div class="list">
          <el-table :data="tableData" style="width: 90%;background-color:red;height:300px">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import FormFetchCom from "./FormFetch";
@Component
export default class FormFetch extends mixins(FormFetchCom) {}
</script>

<style lang="scss" scoped>
@import "./FormFetch.scss";
</style>