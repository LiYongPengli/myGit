<template>
<!-- 平台运行统计入口页面 -->
  <div class="platformoperations">
    <div class="content">
      <div class="menu">
        <ul class="top_nav">
          <li
            class="item"
            @click="pageIndex = 0"
            :class="{ active: pageIndex == 0 }"
          >
            平台访问数据 /
          </li>
      
          <li
            class="item"
            @click="pageIndex = 1"
            :class="{ active: pageIndex == 1 }"
          >
            注册用户数据
          </li>
        </ul>
      </div>
      <div class="menu_content">
        <div v-show="pageIndex == 0" class="country">
          <platform-access />
        </div>

        <div v-show="pageIndex == 1" class="media">
          <registered-user />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Component, { mixins } from "vue-class-component";
import PlatformOperationsCom from "./PlatformOperations";
import RegisteredUser from "@/components/registereduser/RegisteredUser.vue";
import PlatformAccess from "@/components/platformaccess/PlatformAccess.vue";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
    RegisteredUser,
    PlatformAccess,
  },
})
export default class PlatformOperations extends mixins(PlatformOperationsCom) {}
</script>

<style lang="scss" scoped>
@import "./PlatformOperations.scss";
</style>