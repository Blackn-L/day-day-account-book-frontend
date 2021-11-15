<script setup lang="ts">
import { ref } from "vue";
const onClickLeft = () => history.back();
</script>

<template>
  <van-nav-bar
    title="账单详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<style lang="less" scoped></style>
