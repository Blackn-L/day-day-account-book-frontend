<script setup lang="ts">
import { ref, reactive } from "vue";
import BillTypes from "./components/BillTypes.vue";
import BillItem from "./components/BillItem.vue";
import AddBill from "./components/AddBill.vue";
import PopDate, { API as PopDateAPI } from "@/components/PopDate.vue";
import dayjs from "dayjs";
import { getBillList } from "@/api/bill";
import type { BillType, Bill } from "./index";
// 利用 ref 获取子组件时，如果是 defineExpose 暴露出来的，需要主动声明其类型
// https://github.com/vuejs/rfcs/pull/210#issuecomment-727067392
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
const refPopDate = ref<PopDateAPI | undefined>();
const totalExpenses = ref(0); // 总支出
const totalIncome = ref(0); // 总收入
const totalPage = ref(0); // 总页数
const showType = ref(false); // 选择账单类型弹窗
const showAddPop = ref(false); // 添加账单弹窗
// 已选账单类型
const selectedType = reactive<BillType>({
  id: 0,
  name: "全部类型",
});
const listLoading = ref(false); // 账单列表加载状态
const listFinished = ref(false); // 账单列表是否已加载完毕
const listRefreshing = ref(false); // 账单列表是否正在刷新

const selectedDate = ref<Date>(new Date());
let billList = ref<Bill[]>([]);
const currentPage = ref(1);

// 账单类型改变
const handleChangeType = (typeObj: BillType) => {
  showType.value = false;
  Object.assign(selectedType, typeObj);
  initParam();
  reqGetBillList();
};
// 账单时间改变
const handelChangeDate = (date: Date) => {
  if (refPopDate.value) refPopDate.value.showDate = false;
  selectedDate.value = date;
  initParam();
  reqGetBillList();
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
    const { code, data } = await getBillList(params);
    if (code === 200) {
      billList.value = billList.value.concat(data.list);
      totalExpenses.value = data?.total_expense || 0;
      totalIncome.value = data?.total_income || 0;
      totalPage.value = data?.total_page || 0;
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
        <span
          @click="
            () => {
              if (refPopDate) refPopDate.showDate = true;
            }
          "
          >{{ dayjs(selectedDate).format("YYYY-MM") }}
          <van-icon name="arrow-down"
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
        <BillItem
          v-for="item in billList"
          :item="item"
          :key="item.date"
          @delete="handleBillAdded"
        />
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
      :initData="{}"
      @close="showAddPop = false"
    />
    /></van-popup
  >

  <!-- 账单类型弹窗 -->
  <van-popup v-model:show="showType" position="bottom" round
    ><BillTypes @handle-change-type="handleChangeType" :types="types"
  /></van-popup>

  <!-- 账单时间弹窗 -->
  <PopDate
    ref="refPopDate"
    :selected-date="selectedDate"
    @on-change="handelChangeDate"
  />
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
