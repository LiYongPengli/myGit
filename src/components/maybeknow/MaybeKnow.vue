<template>
  <!-- 聊天工具，可能认识 -->
  <div class="maybeknow">
    <div class="content">
      <div class="title">
        <p class="maybetitle">可能认识的人</p>
      </div>
      <div class="content_userlists">
        <ul>
          <!-- <li v-for="(v, k) in tableData" :key="k" :class="{'active':k%2 != 0}"> -->
          <my-scroll style="content_mt_onescroll">
            <li v-for="(v, k) in userlists" :class="{cur:v.num==1}">
              <div class="content_userlist">
                  <img v-if="v.num ==1" src="../../assets/img/tx.png" alt="">
                <p v-if="v.num ==0" class="content_userlist_engname">
              <!-- <span v-if="item.type_name == '车商'" class="person_name">{{item.car_title}}</span> -->
            
                  {{ v.engname }}
                </p>
                <p class="content_userlist_chinename">
                  {{ v.chinename }}
                </p>
                <p class="content_userlist_add">{{ v.add }}</p>
              </div>
            </li>
          </my-scroll>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MaybeKnowCom from "./MaybeKnow";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class MaybeKnow extends mixins(MaybeKnowCom) {}
</script>

<style lang="scss" scoped>
@import "./MaybeKnow.scss";
</style>