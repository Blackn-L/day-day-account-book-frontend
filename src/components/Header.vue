<script setup lang="ts">
import { ref } from "vue";
const { title } = defineProps<{
  title: string;
}>();
const onClickLeft = () => history.back();
</script>

<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<style lang="less" scoped></style>
