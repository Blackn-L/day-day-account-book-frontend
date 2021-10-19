<script setup lang="ts">
import { ref } from "vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

const activeTab = ref<string>("login");
</script>

<template>
  <div class="wrapper">
    <van-cell-group inset class="main">
      <van-tabs v-model="activeTab">
        <van-tab title="登录" name="login"><Login /></van-tab>
        <van-tab title="注册" name="register"><Register /></van-tab>
      </van-tabs>
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  height: 100vh;
  background-image: url("../../../public/login_background.jpeg");
  padding-top: 25vh;
}
.main {
  min-height: 30vh;
}
</style>
