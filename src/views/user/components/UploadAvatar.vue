<script setup lang="ts">
import { ref } from "vue";
import Header from "@/components/Header/index.vue";
const avatarList = ref<string[]>([]);
</script>

<template>
  <Header title="更换头像" />
  <van-uploader v-model="avatarList" :max-count="1" :max-size="1024 * 1024" />
</template>

<style lang="less" scoped></style>
