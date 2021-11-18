<script setup lang="ts">
import { ref, computed } from "vue";
import type { DatetimePickerColumnType } from "./index";
export interface API {
  showDate: Boolean;
}
const { selectedDate } = defineProps<{
  selectedDate: Date;
}>();
const emit = defineEmits<{
  (e: "onChange", date: Date): void;
}>();
const showDate = ref(false);
// 最早为 2020 年 1 月 1 日
const minDate = ref(new Date(2020, 0, 1));
// 最迟为当前时间
const maxDate = ref(new Date());
defineExpose({
  showDate,
});
const formatter = (type: DatetimePickerColumnType, val: number) => {
  if (type === "year") {
    return `${val}年`;
  }
  if (type === "month") {
    return `${val}月`;
  }
  return val;
};
</script>

<template>
  <van-popup v-model:show="showDate" position="bottom" round
    ><van-datetime-picker
      style="margin: 10px"
      v-model="selectedDate"
      type="year-month"
      title="选择年月"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      @confirm="(date:Date) => emit('onChange', date)"
  /></van-popup>
</template>

<style lang="less" scoped></style>
