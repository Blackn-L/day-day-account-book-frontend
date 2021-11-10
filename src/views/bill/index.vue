<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import BillTypes from "./components/BillTypes.vue";
import BillItem from "./components/BillItem.vue";
import AddBill from "./components/AddBill.vue";
import { BillType, Bill } from "./index";
import * as dayjs from "dayjs";
import type { DatetimePickerColumnType } from "./index";
import { getBillList } from "@/api/bill";
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
const totalExpenses = ref(0); // 总支出
const totalIncome = ref(0); // 总收入
const totalPage = ref(0); // 总页数
const showType = ref(false); // 选择账单类型弹窗
const showDate = ref(false); // 选择账单日期弹窗
const showAddPop = ref(false); // 添加账单弹窗
// 已选账单类型
const selectedType = reactive<BillType>({
  id: 0,
  name: "全部类型",
});
const listLoading = ref(false); // 账单列表加载状态
const listFinished = ref(false); // 账单列表是否已加载完毕
const listRefreshing = ref(false); // 账单列表是否正在刷新
// 最早为 2020 年 1 月 1 日
const minDate = ref(new Date(2020, 0, 1));
// 最迟为当前时间
const maxDate = ref(new Date());
const selectedDate = ref(new Date());
let billList = ref<Bill[]>([]);
const currentPage = ref(1);
// 计算属性
// 选中的时间格式化
const showSelectedDate = computed(() => {
  return dayjs(selectedDate.value).format("YYYY-MM");
});

// 账单类型改变
const handleChangeType = (typeObj: BillType) => {
  showType.value = false;
  Object.assign(selectedType, typeObj);
  initParam();
  reqGetBillList();
};
// 账单时间改变
const handelChangeDate = (date: Date) => {
  showDate.value = false;
  selectedDate.value = date;
  initParam();
  reqGetBillList();
};
const formatter = (type: DatetimePickerColumnType, val: number) => {
  if (type === "year") {
    return `${val}年`;
  }
  if (type === "month") {
    return `${val}月`;
  }
  return val;
};
// 重置数据
const initParam = () => {
  listLoading.value = true;
  listFinished.value = false;
  billList.value = [];
  totalPage.value = 0;
  currentPage.value = 1;
};

// 添加账单成功回调
const handleBillAdded = () => {
  initParam();
  reqGetBillList();
};
// 获取账单列表
const reqGetBillList = async () => {
  // 如果是下拉刷新，则重置列表
  const params = {
    date: Number(selectedDate.value),
    page: currentPage.value,
    page_size: 5,
    type_id: selectedType.id,
  };
  try {
    const { code, data} = await getBillList(params);
    if (code === 200) {
      billList.value = billList.value.concat(data.list);
      totalExpenses.value = data?.totalExpense || 0;
      totalIncome.value = data?.totalIncome || 0;
      totalPage.value = data?.totalPage || 0;
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (currentPage.value < totalPage.value) {
      currentPage.value += 1;
    } else {
      listFinished.value = true;
    }
    listLoading.value = false;
  }
};
// 下拉刷新
const onRefresh = async () => {
  initParam();
  await reqGetBillList();
  listRefreshing.value = false;
};

// 列表 load 事件
const onLoad = async () => {
  await reqGetBillList();
};
</script>

<template>
  <!-- 主体 -->
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
          >{{ showSelectedDate }} <van-icon name="arrow-down"
        /></span>
      </div>
    </div>
  </div>
  <van-pull-refresh v-model="listRefreshing" @refresh="onRefresh">
    <div class="bill-list">
      <van-list
        v-model:loading="listLoading"
        :finished="listFinished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <BillItem v-for="item in billList" :item="item" :key="item.date" />
      </van-list>
    </div>
  </van-pull-refresh>
  <!-- 添加账单按钮 -->
  <div class="add-button">
    <van-button round plain size="large" @click="showAddPop = true">
      <van-icon name="records" size="32" color="#007fff" />
    </van-button>
  </div>

  <!-- 添加账单弹窗 -->
  <van-popup v-model:show="showAddPop" position="bottom" round
    ><AddBill
      @on-bill-added="handleBillAdded"
      :types="types"
      @close="showAddPop = false"
    />
    /></van-popup
  >

  <!-- 账单类型弹窗 -->
  <van-popup v-model:show="showType" position="bottom" round
    ><BillTypes @handle-change-type="handleChangeType" :types="types"
  /></van-popup>

  <!-- 账单时间弹窗 -->
  <van-popup v-model:show="showDate" position="bottom" round
    ><van-datetime-picker
      style="margin: 10px"
      v-model="selectedDate"
      type="year-month"
      title="选择年月"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      @confirm="handelChangeDate"
  /></van-popup>
</template>

<style lang="less" scoped>
.bill-header {
  background-color: #007fff;
  color: #fff;
  font-size: 14px;

  .total {
    display: flex;
    justify-content: flex-start;
    padding: 10px 20px;
    .total-count {
      font-size: 20px;
      font-weight: bold;
    }
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
}
.bill-list {
  background-color: #f7f8fa;
  padding: 1px 0 10px;
}

.add-button {
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 90px;
  right: 30px;
  z-index: 999;
  border-radius: 50%;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
}
</style>
