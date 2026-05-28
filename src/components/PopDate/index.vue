<script setup lang="ts">
import { ref, computed } from "vue";
export interface API {
  showDate: Boolean;
}
const { selectedDate, formatter, type, title } = defineProps<{
  selectedDate: Date;
  formatter?: (type: string, val: string) => string;
  type?: string | null;
  title?: string | null;
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
const _formatter = (type: string, val: string) => {
  if (type === "year") {
    return `${val}年`;
  }
  if (type === "month") {
    return `${val}月`;
  }
  if (type === "day") {
    return `${val}日`;
  }
  return val;
};

// 将 Date 对象转换为字符串数组 [year, month, day]
const dateValue = computed(() => {
  const date = selectedDate;
  return [
    date.getFullYear().toString(),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
  ];
});

const onConfirm = ({ selectedValues }: { selectedValues: string[] }) => {
  const date = new Date(
    Number(selectedValues[0]),
    Number(selectedValues[1]) - 1,
    Number(selectedValues[2])
  );
  emit("onChange", date);
  showDate.value = false;
};

const columnsType = computed(() => {
  if (type === "month-day") return ["month", "day"];
  return ["year", "month"];
});
</script>

<template>
  <van-popup v-model:show="showDate" position="bottom" round>
    <van-date-picker
      v-model="dateValue"
      :title="title || '选择年月'"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter || _formatter"
      :columns-type="columnsType"
      @confirm="onConfirm"
      @cancel="showDate = false"
    />
  </van-popup>
</template>

<style lang="less" scoped></style>
