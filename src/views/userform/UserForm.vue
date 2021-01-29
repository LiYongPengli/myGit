<template>
  <!-- 个人中心 统计报表 -->
  <div class="userform">
    <div class="top_nav">
      <ul>
        <router-link custom v-slot="{navigate,isActive}" to="/user/form/fetch">
          <li :class="{'router-link-active':isActive}" @click="navigate">数据采集统计</li>
        </router-link>
        <router-link active-class="cllll" custom v-slot="{navigate,isActive}" to="/user/form/platform">
          <li :class="{'router-link-active':isActive}" @click="navigate">平台运行统计</li>
        </router-link>
        <router-link active-class="cllll" custom v-slot="{navigate,isActive}" to="/user/form/resource">
          <li :class="{'router-link-active':isActive}" @click="navigate">资源使用率统计</li>
        </router-link>
        <!-- <router-link tag="li" to="/user/form/platform"
          >平台运行统计</router-link
        >
        <router-link tag="li" to="/user/form/resource"
          >资源使用率统计</router-link
        > -->
      </ul>
    </div>
    <form-fetch v-if="$route.params.type=='fetch'" />
    <platform-operations v-if="$route.params.type=='platform'" />
    <resource-uses v-if="$route.params.type=='resource'" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserFormCom from "./UserForm";
import FormFetch from "@/views/formfetch/FormFetch.vue";
import PlatformOperations from "@/views/platformoperations/PlatformOperations.vue";
import ResourceUses from "@/views/resourceuses/ResourceUses.vue";
@Component({
  components:{
    FormFetch,
    PlatformOperations,
    ResourceUses
  }
})
export default class UserForm extends mixins(UserFormCom) {}
</script>

<style lang="scss" scoped>
@import "./UserForm.scss";
</style>