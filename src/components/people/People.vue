<template>
  <div class="people">
    <!-- 已关注 -->

    <div class="concerned" v-show="!searchpeople">
      <p class="concerned_p">已关注</p>
      <ul
        class="concernedlists"
        element-loading-background="rgba(58, 58, 72, 0.5)"
        v-loading="loading"
      >
        <li v-show="showItem(v)" v-for="(v, i) in characterFollowList" :key="i" class="concernedlist">
          <div class="concernedlistdiv">
            <img @error="imgError('f',i)" v-if="v.avatar!=-1&&v.avatar!=null&&!v.error" :src="axios.defaults.baseURL+'/attachments/avator/'+v.avatar" alt="" />
            <img v-if="v.avatar!=-1&&v.avatar!=null&&v.error" src="../../assets/img/4041.jpg" alt="" />
            <img v-if="v.avatar==-1||v.avatar==null" src="../../assets/img/zwtx.png" alt="" />
            <span>{{ v.name }}</span>
            <div class="concernedname">
              <speed-text width="150px" height="20px" :text="v.description" />
            </div>
            <!-- <p>中国共产党中央委员会总书记</p> -->

            <img @click="unsub(v, i)" src="../../assets/img/close.png" alt="" />
          </div>
        </li>
      </ul>
    </div>
    <!-- 未关注 -->
    <div class="noattention" v-show="!searchpeople">
      <p class="noattention_p">未关注</p>
      <p class="noattention_list" @click="searchpeople = true">
        还没有找到想关注的人物？
      </p>
      <!-- <div class="noattentionlists">
        <div v-for="(v, i) in characterList" :key="i" class="noattentionlist">
          <img src="../../assets/img/tx.png" alt="" />
          <span>{{ v.name }}</span>
          <p>中国共产党中央委员会总书记</p>
          <img @click="addFollow(v, i)" src="../../assets/img/add.png" alt="" />
        </div>
      </div> -->
      <ul class="noattentionlists">
        <li v-show="showItem(v)" v-for="(v, i) in characterList" :key="i" class="noattentionlist">
          <div class="concernedlistdiv">
            <img @error="imgError('u',i)" v-if="v.avatar!=-1&&v.avatar!=null&&!v.error" :src="axios.defaults.baseURL+'/attachments/avator/'+v.avatar" alt="" />
            <img v-if="v.avatar!=-1&&v.avatar!=null&&v.error" src="../../assets/img/4041.jpg" alt="" />
            <img v-if="v.avatar==-1||v.avatar==null" src="../../assets/img/zwtx.png" alt="" />
            <span>{{ v.name }}</span>
            <div class="concernedname">
              <speed-text width="150px" height="20px" :text="v.description" />
            </div>
            <img @click="addFollow(v, i)" src="../../assets/img/add.png" alt="" />
          </div>
        </li>
      </ul>
      
    </div>
      <!-- 还没有找到想关注的人物列表 -->
     <no-people @follow="noPeopleFollow" @close="searchpeople=false" v-if="searchpeople" />
  </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import PeopleCom from "./People";
import SpeedText from "@/components/SpeedText.vue";
import NoPeople from "./NoPeople.vue";
@Component({
  components: {
    SpeedText,
    NoPeople
  },
})
export default class People extends mixins(PeopleCom) {}
</script>
<style lang="scss" scoped>
@import "./People.scss";
</style>
