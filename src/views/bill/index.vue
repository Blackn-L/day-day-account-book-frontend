<script setup lang="ts">
import { ref } from "vue";
const totalExpenses = ref(63444);
const totalRevenue = ref(1411);
</script>

<template>
  <div class="bill-header">
    <div class="total">
      <div>
        <span>总支出：</span>
        <span class="total-count">{{ `￥${totalExpenses}` }}</span>
      </div>
      <div style="margin-left: 15px">
        <span>总收入：</span>
        <span class="total-count">{{ `￥${totalRevenue}` }}</span>
      </div>
    </div>
    <div class="select-type-date">
      <div>
        <span>全部类型 <van-icon name="arrow-down" /></span>
      </div>
      <div style="margin-left: 10px">
        <span>2021-10 <van-icon name="arrow-down" /></span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bill-header {
  background-color: #007fff;
  color: #fff;
  font-size: 14px;
}
.total {
  display: flex;
  justify-content: flex-start;
  padding: 10px 20px;
}
.total-count {
  font-size: 20px;
  font-weight: bold;
}
.select-type-date {
  display: flex;
  justify-content: flex-end;
  padding: 0 10px 8px;
  div {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    padding:2px 10px
  }
}
</style>
