<template>
  <!-- 头部2 -->
  <div class="footertwo">
    <footer><p>睿读v2.1.35 2018 © 中经软件</p></footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator';
@Component
export default class FooterTwo extends Vue {}
</script>

<style lang="scss" scoped>
footer{
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    margin-bottom: 30px;
    p{
        margin-left: 800px;
    }
}
</style>