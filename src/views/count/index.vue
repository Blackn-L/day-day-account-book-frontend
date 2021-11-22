<script setup lang="ts">
import { ref, computed } from "vue";
import * as dayjs from "dayjs";
import PopDate, { API as PopDateAPI } from "@/components/PopDate.vue";
const refPopDate = ref<PopDateAPI | undefined>();
const selectedDate = ref(new Date());
const total_expenses = ref(0); // 总支出
const total_incode = ref(0); // 总收入
// 账单时间改变
const handelChangeDate = (date: Date) => {
  if (refPopDate.value) refPopDate.value.showDate = false;
  selectedDate.value = date;
};

</script>

<template>
  <div>
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
      <span>共支出</span>
      <span>￥{{ total_expenses }}</span>
      <span>共收入 ￥{{ total_incode }}</span>
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
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 30px 20px;
  .date {
    background-color: #f5f5f5;
    font-size: 16px;
    padding: 7px;
  }
}
</style>
