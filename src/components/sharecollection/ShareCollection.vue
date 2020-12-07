<template>
  <!-- 查看分享的收藏夹 -->
  <div class="sharecollection">
    <div class="collectionlist">
      <my-scroll>
        <ul class="collectionlist_wrap">
          <li v-for="(v, i) in favoriteList" :key="i">
            <div class="collection">
              <img
                v-if="v.name == '默认'"
                src="../../assets/img/scmr.png"
                alt=""
              />
              <img v-if="v.name != '默认'" :src="v.cover" alt="" />
              <div class="name">
                {{ v.name == "默认" ? "默认标签" : v.name }}
              </div>
              <span class="time">{{ v.created_at.split(".")[0] }} 创建</span>
            </div>
          </li>
        </ul>
      </my-scroll>
    </div>
  </div>
</template>

<script lang="ts">
import { baseApi } from "@/axios/axios";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class ShareCollection extends Vue {
  @Prop({}) rf_id!: string;
  public created(): void {
    this.getList();
  }

  private getList(): void {
    this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'receive_favorite',
          paras: { rf_id: this.rf_id }
        }).then(res=>{
          console.log(res.data)
        }).catch(err=>{
          console.log(err);
        })
  }
}
</script>

<style lang="scss" scoped>
.sharecollection {
}
</style>