<template>
    <div class="registereduser">
        <div class="content"></div>
    </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import RegisteredUserCom from "./RegisteredUser";
@Component
export default class RegisteredUser extends mixins(RegisteredUserCom) {}
</script>

<style lang="scss" scoped>
@import "./RegisteredUser.scss";
</style>