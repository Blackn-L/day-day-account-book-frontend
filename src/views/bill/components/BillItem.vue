<script setup lang="ts">
import { ref, PropType, computed } from "vue";
import { Bill, BillItem } from "../index";
import * as dayjs from "dayjs";

//  props 使用自定义类型，需要借助 PropType https://v3.cn.vuejs.org/guide/typescript-support.html#%E6%B3%A8%E8%A7%A3-props
const props = defineProps({
  item: {
    type: Object as PropType<Bill>,
    required: true,
  },
});

// 当日总支出
const totalExpenses = computed(() => {
  return props.item.bills.reduce((cur: number, bill: BillItem) => {
    if (bill.pay_type === 1) cur += Number(bill?.amount);
    return cur;
  }, 0);
});
// 当日总收入
const totalIncome = computed(() => {
  return props.item.bills.reduce((cur: number, bill: BillItem) => {
    if (bill.pay_type === 2) cur += Number(bill?.amount);
    return cur;
  }, 0);
});
</script>

<template>
  <!-- <div class="card-list"> -->
  <van-cell-group inset class="card">
    <!-- 单日统计 -->
    <div class="card-title">
      <span class="card-title-date"> {{ props.item.date }} </span>
      <span class="card-title-amount">
        <span class="expense"
          ><van-icon name="minus" />￥{{ totalExpenses }}</span
        >
        <span class="income"><van-icon name="plus" />￥{{ totalIncome }}</span>
      </span>
    </div>

    <!-- 单日清单 -->
    <van-cell class="card-item" v-for="bill in props.item.bills" :key="bill.id">
      <div class="item-body">
        <span
          ><van-tag type="primary" size="large">{{
            bill.type_name
          }}</van-tag></span
        >
        <span :style="{ color: 'green' }" v-if="bill.pay_type === 1"
          >- {{ bill.amount }}</span
        >
        <span :style="{ color: 'red' }" v-else>+ {{ bill.amount }}</span>
      </div>
      <div class="item-footer">
        <span>
          {{ dayjs(Number(bill.date)).format("HH:mm") }}
        </span>
        <span v-if="bill.remark">
          {{ " | " + bill.remark }}
        </span>
      </div>
    </van-cell>
  </van-cell-group>
  <!-- </div> -->
</template>

<style lang="less" scoped>
.card-list {
  background-color: #f7f8fa;
  padding: 0 10px;
  height: 80vh;
}
.card {
  margin-top: 10px;
  border: 1px solid #f7f8fa;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);

  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    background-color: #f7f8fa;
    color: #000000;
    .card-title-date {
      font-size: 18px;
    }
    .card-title-amount {
      font-size: 13px;
      .expense {
        color: green;
      }
      .income {
        margin-left: 15px;
        color: red;
      }
    }
  }

  .card-item {
    padding: 10px 10px;
    .item-body {
      font-size: 17px;
      display: flex;
      justify-content: space-between;
    }
    .item-footer {
      padding-top: 10px;
      font-size: 13px;
    }
  }
}
</style>
