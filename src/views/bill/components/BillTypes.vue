<script setup lang="ts">
import { ref, computed } from "vue";
import type { BillType } from "../index";

const { types } = defineProps<{
  types: BillType[];
}>();
const emit = defineEmits<{
  (e: "handle-change-type", typeObj: BillType): void;
}>();
const dividerStyle = {
  fontSize: "18px",
  color: "#000000",
  borderColor: "#bdc3c7",
  marginBottom: "5px",
};
let selectedTypeId = ref(0);
const expenseTypes = computed(() => {
  return types.filter((item) => item.type === 1);
});
// 计算属性
const incomeTypes = computed(() => {
  return types.filter((item) => item.type === 2);
});

// 选择类型，并关闭弹窗
const handleChooseType = (typeObj: BillType) => {
  console.log("typeObj: ", typeObj);
  selectedTypeId.value = typeObj.id;
  emit("handle-change-type", typeObj);
};
</script>

<template>
  <div class="types-wrapper">
    <div class="types-header">请选择类型</div>
    <van-divider :style="dividerStyle" />
    <div class="types-body">
      <div class="types-body-type">
        <van-button
          class="type-button"
          :type="selectedTypeId === 0 ? 'primary' : 'default'"
          @click="handleChooseType({ id: 0, name: '全部类型' })"
          >全部类型</van-button
        >
      </div>
      <van-divider :style="dividerStyle">支出</van-divider>
      <div class="types-body-type">
        <van-button
          v-for="type in expenseTypes"
          :key="type.id"
          class="type-button"
          :type="selectedTypeId === type.id ? 'primary' : 'default'"
          @click="handleChooseType(type)"
          >{{ type.name }}</van-button
        >
      </div>
      <van-divider :style="dividerStyle">收入</van-divider>
      <div class="types-body-type">
        <van-button
          v-for="type in incomeTypes"
          :key="type.id"
          class="type-button"
          :type="selectedTypeId === type.id ? 'primary' : 'default'"
          @click="handleChooseType(type)"
          >{{ type.name }}</van-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.types-wrapper {
  font-size: 18px;
  background-color: #f5f5f5;
}
.types-header {
  padding: 10px 0;
  text-align: center;
}
.types-body {
  padding: 0 10px 10px;
}
.types-body-type {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.type-button {
  width: 31.3%;
  margin: 5px 1%;
}
.type-title {
  font-size: "18px";
  color: #000000;
  border-color: "#bdc3c7";
}
</style>
