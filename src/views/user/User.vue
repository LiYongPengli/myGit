<template>
  <div class="user">
      <header-two />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import UserCom from './User'
import HeaderTwo from '@/components/HeaderTwo.vue'
@Component({
    components:{
        HeaderTwo
    }
})
export default class User extends mixins(UserCom) {

}
</script>

<style lang="scss" scoped>
@import './User.scss';
</style>