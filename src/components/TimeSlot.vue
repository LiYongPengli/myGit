<template>
  <div class="timesearch">
    <el-date-picker
      @change="cmd('0')"
      v-model="value1"
      type="date"
      placeholder="开始日期"
    >
    </el-date-picker>
    <span
      style="
        float: none;
        display: inline-block;
        width: 16px;
        font-weight: bold;
        color: #676770;
      "
      class="zhi"
      >-</span
    >
    <el-date-picker
      @change="cmd('1')"
      v-model="value2"
      type="date"
      placeholder="截止日期"
    >
    </el-date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class TimeSolt extends Vue {
  @Prop({}) clear!: boolean;
  public value1: string | Date = "";
  public value2: string | Date = "";

  @Watch("clear")
  listenClear(newVal: boolean, oldVal: boolean): void {
    console.log(newVal);
    if (newVal) {
      this.value1 = "";
      this.value2 = "";
    }
  }
  @Emit("dateChange")
  public cmd(index: string): { index: string; value: Date | String } {
    let obj = {
      index: index,
      value: "" as Date | string,
    };
    if (index == "0") {
      obj.value = this.value1;
    } else {
      obj.value = this.value2;
    }
    return obj;
  }
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
  .el-year-table {
    tbody {
      tr {
        td {
          a {
            color: white;
          }
        }
      }
    }
  }
  .el-month-table{
    tbody{
      tr{
        td{
          div{
            a{
              color: white;
            }
          }
        }
      }
    }
  }
}
.el-picker-panel {
  .popper__arrow {
    border-bottom-color: #494959 !important;
  }
  .popper__arrow::after {
    content: none !important;
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
    cursor: pointer;
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
