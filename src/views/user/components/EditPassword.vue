<script setup lang="ts">
import { ref } from "vue";
import Header from "@/components/Header.vue";
const oldPassword = ref("");
const newPassword = ref("");
const repeatPassword = ref("");
const errorMessage = ref(""); // 错误提示信息
const comparePassword = () => {
  errorMessage.value =
    newPassword.value === repeatPassword.value ? "" : "两次输入的密码不一致";
};
</script>

<template>
  <Header title="修改密码" />
  <van-cell-group inset>
    <van-field v-model="oldPassword" type="password" label="原密码" />
    <van-field v-model="newPassword" type="password" label="新密码" />
    <van-field
      v-model="repeatPassword"
      type="password"
      label="确认密码"
      @blur="comparePassword"
      error-message="errorMessage"
    />
  </van-cell-group>
</template>

<style lang="less" scoped></style>
