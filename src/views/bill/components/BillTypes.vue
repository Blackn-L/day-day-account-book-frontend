<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { BillType } from "../index";
const emit = defineEmits(["handle-change-type"]);
const dividerStyle = {
  fontSize: "18px",
  color: "#000000",
  borderColor: "#bdc3c7",
  marginBottom: "5px",
};
let types = reactive<BillType[]>([]);
types = [
  {
    id: 1,
    name: "餐饮",
    type: 1,
  },
  {
    id: 2,
    name: "交通",
    type: 1,
  },
  {
    id: 3,
    name: "娱乐",
    type: 1,
  },
  {
    id: 4,
    name: "购物",
    type: 1,
  },
  {
    id: 5,
    name: "其他",
    type: 1,
  },
  {
    id: 6,
    name: "工资",
    type: 2,
  },
  {
    id: 7,
    name: "奖金",
    type: 2,
  },
  {
    id: 8,
    name: "转账",
    type: 2,
  },
  {
    id: 9,
    name: "理财",
    type: 2,
  },
  {
    id: 10,
    name: "其他",
    type: 2,
  },
];
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
