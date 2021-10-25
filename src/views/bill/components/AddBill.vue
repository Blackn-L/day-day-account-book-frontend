<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <div class="add-wrapper">
    <div class="add-header">
      <span class="button-expense"> 支出 </span>
      <span class="button-income"> 收入 </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.add-wrapper {
  height: 60vh;
}
.add-header {
  margin: 20px;
  .button-expense {
    border-radius: 25px;
    padding: 4px 11px;
    font-size: 14px;
    background-color: #f5f5f5;
    .active {
      background-color: #eafbf6;
      color: #007fff;
      border: 0.5px solid #007fff;
    }
  }
}
</style>
