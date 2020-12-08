<template>
  <div class="people">
    <!-- 已关注 -->
    <div class="concerned">
      <p class="concerned_p">已关注</p>

      <div class="concernedlists">
        <div class="concernedlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/close.png" alt="" />
        </div>
        <div class="concernedlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/close.png" alt="" />
        </div>
        <div class="concernedlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/close.png" alt="" />
        </div>
        <div class="concernedlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/close.png" alt="" />
        </div>
        <div class="concernedlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/close.png" alt="" />
        </div>
        <div class="concernedlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/close.png" alt="" />
        </div>
        <div class="concernedlist">
          <img src="../../assets/img/xdd.png" alt="" />

          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/close.png" alt="" />
        </div>
        <div class="concernedlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/close.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 未关注 -->
    <div class="noattention">
      <p class="noattention_p">未关注</p>
      <p class="noattention_list">
          还没有找到想关注的人物？
      </p>
     <div class="noattentionlists">
        <div class="noattentionlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/add.png" alt="" />
        </div>
        <div class="noattentionlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/add.png" alt="" />
        </div>
        <div class="noattentionlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/add.png" alt="" />
        </div>
        <div class="noattentionlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/add.png" alt="" />
        </div>
        <div class="noattentionlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/add.png" alt="" />
        </div>
        <div class="noattentionlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/add.png" alt="" />
        </div>
        <div class="noattentionlist">
          <img src="../../assets/img/xdd.png" alt="" />

          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/add.png" alt="" />
        </div>
        <div class="noattentionlist">
          <img src="../../assets/img/xdd.png" alt="" />
          <span>习近平</span>
          <p>中国共产党中央委员会总书记</p>
          <img src="../../assets/img/add.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import PeopleCom from "./People";
@Component
export default class People extends mixins(PeopleCom) {}
</script>
<style lang="scss" scoped>
@import "./People.scss";
</style>