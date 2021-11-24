<script setup lang="ts">
import { ref, reactive, watchEffect, computed } from "vue";
import * as dayjs from "dayjs";
import { getMonthBillData, GetBillMonthDataResponse } from "@/api/bill";
import PopDate, { API as PopDateAPI } from "@/components/PopDate.vue";
const refPopDate = ref<PopDateAPI | undefined>();
const selectedDate = ref(new Date());
const curPayType = ref<"expense" | "income">("expense");
const billMonthData = reactive<GetBillMonthDataResponse>({
  expense_list: [],
  income_list: [],
  total_expense: 0,
  total_income: 0,
});
const curTotal = computed(() => {
  return curPayType.value === "expense"
    ? billMonthData.total_expense
    : billMonthData.total_income;
});

// 账单时间改变
const handelChangeDate = (date: Date) => {
  if (refPopDate.value) refPopDate.value.showDate = false;
  selectedDate.value = date;
};

const regGetMonthBillData = async () => {
  const { data, code } = await getMonthBillData(selectedDate.value);
  if (code === 200) Object.assign(billMonthData, data);
};

watchEffect(() => {
  regGetMonthBillData();
});
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <div>
        <span
          class="date"
          @click="
            () => {
              if (refPopDate) refPopDate.showDate = true;
            }
          "
        >
          {{ dayjs(selectedDate).format("YYYY-MM")
          }}<van-icon name="arrow-down"
        /></span>
      </div>
      <div v-if="curPayType === 'expense'" class="amount-base expense">
        <span>共支出</span>
        <span>￥{{ billMonthData.total_expense }}</span>
        <span>共收入 ￥{{ billMonthData.total_income }}</span>
      </div>
      <div v-else class="amount-base income">
        <span>共收入</span>
        <span>￥{{ billMonthData.total_income }}</span>
        <span>共支出 ￥{{ billMonthData.total_expense }}</span>
      </div>
    </div>
    <div class="divider" />
    <div class="main">
      <div class="main-header">
        <span>收支构成</span>
        <div class="type-button">
          <span>支出</span>
          <span>收入</span>
        </div>
      </div>
      <div class="content">
        <div
          class="item"
          v-for="item in curPayType === 'expense'
            ? billMonthData.expense_list
            : billMonthData.income_list"
          :key="item.type_id"
        >
          <div class="title">
            <span>{{ item.type_name }}</span>
            <span>￥{{ item.total_amount }}</span>
          </div>
          <div class="process">
            <van-progress
              :percentage="((item.total_amount / curTotal) * 100).toFixed(2)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 账单时间弹窗 -->
  <PopDate
    ref="refPopDate"
    :selected-date="selectedDate"
    @on-change="handelChangeDate"
  />
</template>

<style lang="less" scoped>
.wrapper {
  // background-color: #f5f5f5;
  .header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin: 10px 20px;
    font-size: 13px;
    font-weight: 500;
    .date {
      background-color: #f5f5f5;
      font-size: 15px;
      padding: 5px;
    }
    .amount-base {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      span:nth-child(1) {
        margin: 4px;
      }
      span:nth-child(2) {
        font-size: 23px;
        font-weight: 600;
      }
      span:nth-child(3) {
        font-size: 11px;
        margin: 4px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .expense {
      color: #007fff;
    }
    .income {
      color: #ecbe25;
    }
  }

  .divider {
    color: #f5f5f5;
    background-color: #f5f5f5;
    border: 5px solid #f5f5f5;
  }

  .main {
    padding: 0 17px;
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 13px 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      align-items: flex-start;

      .item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 5px 0;
        .title {
          flex: 2;
          display: flex;
          justify-content: space-between;
          margin-right: 11px;
        }
        .process {
          flex: 7;
        }
        //   .title {
        //     display: flex;
        //     justify-content: space-between;
        //     align-items: center;
        //     span:nth-child(1) {
        //       margin: 4px;
        //     }
        //     span:nth-child(2) {
        //       font-size: 23px;
        //       font-weight: 600;
        //     }
        //   }
      }
    }
  }
}
</style>
