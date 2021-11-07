<script setup lang="ts">
import { ref, computed, watchEffect, defineEmits } from "vue";
import { Toast } from "vant";
import * as dayjs from "dayjs";
import type { DatetimePickerColumnType, BillType } from "../index";
import { addBill } from "@/api/bill";
const { types } = defineProps<{
  types: BillType[];
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();
const expenseClass = computed(() => {
  return payType.value === "expense" ? "button-expense-actived" : "";
});
const incomeClass = computed(() => {
  return payType.value === "income" ? "button-income-actived" : "";
});
const showTypes = computed(() => {
  return types.filter(
    (item) => item.type === (payType.value === "expense" ? 1 : 2)
  );
});
// 选中的时间格式化
const showSelectedDate = computed(() => {
  return dayjs(selectedDate.value).format("MM-DD");
});
const selectedDate = ref(new Date());
const exposeButton = ref<HTMLElement | null>(null);
const incomeButton = ref(null);
const payType = ref("expense"); // 支出/收入
const showDate = ref(false);
const minDate = ref(new Date(2020, 0, 1)); // 可选账单最小日期
const maxDate = ref(new Date()); // 可选账单最大日期，为当前日期
const billAmount = ref<string>(""); // 账单金额
const billType = ref<number | null>(null); // 账单类型
const remark = ref("");
watchEffect(() => {
  billType.value = showTypes.value[0].id;
});
// 选择支出还是收入
const choosePayType = (type: string) => {
  payType.value = type;
};
// 日期选择器格式化
const formatter = (type: DatetimePickerColumnType, val: number) => {
  if (type === "month") {
    return `${val}月`;
  }
  if (type === "day") {
    return `${val}日`;
  }
  return val;
};
const handelChangeDate = (date: Date) => {
  showDate.value = false;
  selectedDate.value = date;
};

const chooseBillType = (typeId: number) => {
  billType.value = typeId;
};
const closeKeyboard = () => {
  if (billAmount.value.length === 0) {
    Toast("请输入金额！");
    return;
  }
  reqAddBill();
};
const reqAddBill = async () => {
  const { code, message } = await addBill({
    amount: Number(billAmount.value),
    type_id: Number(billType.value),
    date: Number(selectedDate.value),
    pay_type: payType.value === "expense" ? 1 : 2,
    remark: remark.value,
  });
  if (code === 200) {
    Toast(message);
    emit("close");
  }
};
</script>

<template>
  <div class="add-wrapper">
    <div class="add-header">
      <div class="type">
        <span
          :class="expenseClass"
          ref="exposeButton"
          @click="choosePayType('expense')"
        >
          支出
        </span>
        <span
          :class="incomeClass"
          ref="incomeButton"
          @click="choosePayType('income')"
        >
          收入
        </span>
      </div>

      <div class="date">
        <span @click="showDate = true"
          >{{ showSelectedDate }} <van-icon name="arrow-down"
        /></span>
      </div>
    </div>
    <div class="add-money">
      <span class="prefix">¥</span>
      <span class="amount">{{ billAmount }}</span>
    </div>
    <div class="add-types">
      <div v-for="type in showTypes" :key="type.id" class="type">
        <van-tag
          :plain="type.id !== billType"
          :type="type.type === 1 ? 'primary' : 'warning'"
          size="large"
          @click="chooseBillType(type.id)"
        >
          {{ type.name }}
        </van-tag>
      </div>
    </div>
    <!-- 备注 -->
    <div class="add-reamark">
      <van-field
        v-model="remark"
        rows="1"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        show-word-limit
        label-width="3.1em"
        border
        colon
      />
    </div>
    <!-- 金额输入 -->
    <van-number-keyboard
      v-model="billAmount"
      :show="true"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      maxlength="7"
      @close="closeKeyboard"
    />
    <!-- 日期选择 -->
    <van-popup v-model:show="showDate" position="bottom">
      <van-datetime-picker
        style="margin: 10px"
        v-model="selectedDate"
        type="month-day"
        title="选择月日"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="handelChangeDate"
      />
    </van-popup>
  </div>
</template>

<style lang="less" scoped>
.add-wrapper {
  font-size: 12px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-bottom: 214px;

  .add-header {
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    .type {
      span {
        margin: 0 5px;
        border-radius: 25px;
        padding: 4px 11px;
        font-size: 14px;
        background-color: #f5f5f5;
        border: 0.5px solid #f5f5f5;
        color: rgba(0, 0, 0, 0.5);
      }
      .button-expense-actived {
        background-color: #eafbf6;
        color: #007fff;
        border: 0.5px solid #007fff;
      }

      .button-income-actived {
        background-color: #fbf8f0;
        color: #ecbe25;
        border: 0.5px solid #ecbe25;
      }
    }
    .date {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 12px;
      background-color: #f0f0f0;
      border-radius: 20px;
    }
  }
  .add-money {
    padding-bottom: 12px;
    border-bottom: 1px solid #e9e9e9;
    margin: 0 24px;
    .prefix {
      font-size: 36px;
      font-weight: bold;
      vertical-align: top;
    }
    .amount {
      font-size: 40px;
      padding-left: 10px;
    }
  }
  .add-types {
    display: flex;
    overflow-x: auto;
    margin: 0 24px;
    margin-bottom: 20px;
    * {
      touch-action: pan-x;
    }
    white-space: nowrap;
    .type {
      padding: 12px;
    }
  }

  .add-reamark {
    padding: 0 4px;
    margin-bottom: 20px;
  }
}
</style>
