<template>
  <div class="timesearch">
    <el-date-picker v-model="value1" type="date" placeholder="开始日期">
    </el-date-picker>
    <span style="float:none; display: inline-block;width: 16px;font-weight: bold;color:#676770" class="zhi">-</span>
    <el-date-picker v-model="value2" type="date" placeholder="截止日期">
    </el-date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class TimeSolt extends Vue {
     public value1:string = "";
    public value2:string = "";
}
</script>

<style lang="scss" scoped>
</style>


<style lang="scss">
.el-picker-panel {
  border: 0 !important;
}
.el-date-picker__header {
  color: white;
  background: #494959;
  margin: 0 !important;
  padding: 12px;
  span,
  button {
    color: white;
  }
}
.el-picker-panel__content {
  background: #494959;
  margin: 0 !important;
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
.el-button--default {
  margin-left: 240px;
  width: 100px;
}
.el-date-editor {
  margin-right: 10px;
  width: 140px !important;
  input {
    background: #494959;
    border: 0;
    color: white;
  }
  .timesearch {
    .zhi {
      display: inline-block;
      width: 16px;
      font-weight: bold;
      float: none !important;
    }
  }
}
</style>
