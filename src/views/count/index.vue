<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { getMonthBillData, GetBillMonthDataResponse } from "@/api/bill";
import PopDate, { API as PopDateAPI } from "@/components/PopDate/index.vue";
import F2 from "@antv/f2";
const router = useRouter();
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
const expenseClass = computed(() => {
  return curPayType.value === "expense" ? "expense-actived" : "";
});
const incomeClass = computed(() => {
  return curPayType.value === "income" ? "income-actived" : "";
});
// 账单时间改变
const handelChangeDate = (date: Date) => {
  if (refPopDate.value) refPopDate.value.showDate = false;
  selectedDate.value = date;
  regGetMonthBillData();
};

const regGetMonthBillData = async () => {
  try {
    const { data, code } = await getMonthBillData(selectedDate.value.getTime());
    if (code === 200) Object.assign(billMonthData, data);
  } catch (error) {
  } finally {
    setTimeout(() => {
      initChart();
    }, 300);
  }
};

// 创建环形图
const initChart = (type: "expense_list" | "income_list" = "expense_list") => {
  // 如果支出或者收入为 0，则不渲染
  if (!curTotal.value) return;
  const _map: { [key: string]: string } = {};
  const _data: { name: string; percent: number; a: string }[] = [];
  billMonthData[type].forEach((obj) => {
    _map[obj.type_name] =
      ((obj.total_amount / curTotal.value) * 100).toFixed(2) + "%";
    _data.push({
      name: obj.type_name,
      percent: Number(((obj.total_amount / curTotal.value) * 100).toFixed(2)),
      a: "1",
    });
  });

  const chart = new F2.Chart({
    id: "donutChart",
    pixelRatio: window.devicePixelRatio,
    padding: [5, "auto"],
  });
  chart.source(_data, {
    percent: {
      formatter: function formatter(val) {
        return val + "%";
      },
    },
  });
  chart.tooltip(false);
  chart.legend({
    position: "right",
    itemFormatter: function itemFormatter(val) {
      return val + "    " + _map[val];
    },
  });
  chart.coord("polar", {
    transposed: true,
    innerRadius: 0.7,
    radius: 0.85,
  });
  chart.axis(false);
  chart
    .interval()
    .position("a*percent")
    .color(
      "name",
      type === "expense_list"
        ? ["#096dd9", "#2f54eb", "#1890ff", "#40a9ff", "#91d5ff", "#e6f7ff"]
        : ["#d4b106", "#d48806", "#fadb14", "#ffc53d", "#ffe58f", "#feffe6"]
    )
    .adjust("stack");

  chart.guide().text({
    position: ["50%", "50%"],
    content: `￥${curTotal.value}`,
    style: {
      fill: "#1890FF",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  chart.render();
};
const changeCurType = (type: "expense" | "income") => {
  curPayType.value = type;
  initChart(type === "expense" ? "expense_list" : "income_list");
};

onMounted(() => {
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
      <div class="main-title">收支构成</div>
      <div class="main-button-type">
        <span :class="expenseClass" @click="changeCurType('expense')"
          >支出</span
        >
        <span :class="incomeClass" @click="changeCurType('income')">收入</span>
      </div>
      <div v-if="curTotal > 0">
        <div class="main-header">
          <van-tag
            mark
            :type="curPayType === 'expense' ? 'success' : 'warning'"
            size="large"
            >进度条</van-tag
          >
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
                :color="curPayType === 'expense' ? '#1989fa' : '#d4b106'"
                :percentage="((item.total_amount / curTotal) * 100).toFixed(2)"
                stroke-width="8"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="curTotal > 0">
        <div class="main-header">
          <van-tag
            mark
            :type="curPayType === 'expense' ? 'success' : 'warning'"
            size="large"
            >环形图</van-tag
          >
        </div>
        <div class="content">
          <canvas id="donutChart" />
        </div>
      </div>
      <van-empty
        :description="`暂无${curPayType === 'expense' ? '支出' : '收入'}账单`"
        v-if="!curTotal"
      >
        <van-button
          round
          type="danger"
          class="bottom-button"
          @click="router.push('/')"
        >
          去添加</van-button
        >
      </van-empty>
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
  .header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0 0;
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
    padding: 10px 17px;
    .main-title {
      font-size: 20px;
      text-align: center;
    }
    .main-button-type {
      display: flex;
      justify-content: center;
      margin: 10px 0;
      span {
        margin: 0 0 0 10px;
        padding: 4px 11px;
        background-color: #f5f5f5;
        border: 0.5px solid #f5f5f5;
        color: rgba(0, 0, 0, 0.5);
      }
      .expense-actived {
        background-color: #eafbf6;
        color: #007fff;
        border: 0.5px solid #007fff;
      }

      .income-actived {
        background-color: #fbf8f0;
        color: #ecbe25;
        border: 0.5px solid #ecbe25;
      }
    }
    .main-header {
      margin: 13px 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0;
        margin-bottom: 20px;
        .title {
          flex: 2;
          display: flex;
          justify-content: space-between;
          margin-right: 11px;
        }
        .process {
          flex: 7;
        }
      }
      #donutChart {
        margin-bottom: 40px;
      }
    }
    .bottom-button {
      width: 160px;
      height: 40px;
    }
  }
}
</style>
