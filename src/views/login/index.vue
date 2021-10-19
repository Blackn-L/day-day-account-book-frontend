<script setup lang="ts">
import { ref } from "vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

const activeTab = ref<string>("login");
</script>

<template>
  <van-cell-group inset>
    <van-tabs v-model="activeTab" sticky offset-top="10">
      <van-tab title="登录" name="login"><Login /></van-tab>
      <van-tab title="注册" name="register"><Register /></van-tab>
    </van-tabs>
  </van-cell-group>
</template>

<style lang="less" scoped></style>
