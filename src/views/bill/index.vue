<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import BillTypes from "./components/BillTypes.vue";
import BillItem from "./components/BillItem.vue";
import { BillType } from "./index";
import * as dayjs from "dayjs";

const totalExpenses = ref(63444);
const totalIncome = ref(1411);
const showType = ref(false);
const showDate = ref(false);
const selectedType = reactive<BillType>({
  id: 0,
  name: "全部类型",
});

// 最早为 2020 年 1 月 1 日
const minDate = ref(new Date(2020, 0, 1));
// 最迟为当前时间
const maxDate = ref(new Date());
const selectedDate = ref(new Date());

// 计算属性
// 选中的时间格式化
const shouSelectedDate = computed(() => {
  return dayjs(selectedDate.value).format("YYYY-MM");
});

// 账单类型改变
const handleChangeType = (typeObj: BillType) => {
  showType.value = false;
  Object.assign(selectedType, typeObj);
};
// 账单时间改变
const handelChangeDate = (date: Date) => {
  showDate.value = false;
  selectedDate.value = date;
};
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
        <span class="total-count">{{ `￥${totalIncome}` }}</span>
      </div>
    </div>
    <div class="select-type-date">
      <div>
        <span @click="showType = true"
          >{{ selectedType.name }} <van-icon name="arrow-down"
        /></span>
      </div>
      <div style="margin-left: 10px">
        <span @click="showDate = true"
          >{{ shouSelectedDate }} <van-icon name="arrow-down"
        /></span>
      </div>
    </div>
  </div>
    <BillItem />
  <!-- 账单类型弹窗 -->
  <van-popup v-model:show="showType" position="bottom"
    ><BillTypes @handle-change-type="handleChangeType"
  /></van-popup>

  <!-- 账单时间弹窗 -->
  <van-popup v-model:show="showDate" position="bottom"
    ><van-datetime-picker
      v-model="selectedDate"
      type="year-month"
      title="选择年月"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="handelChangeDate"
  /></van-popup>
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
    padding: 2px 10px;
  }
}
</style>
