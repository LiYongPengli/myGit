<template>
    <div class="useraccount">
        22222222
    </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserAccountCom from "./UserAccount";
 
@Component
export default class UserCollection extends mixins(UserAccountCom) {}
</script>

<style lang="scss" scoped>
@import "./UserAccount.scss";
</style>