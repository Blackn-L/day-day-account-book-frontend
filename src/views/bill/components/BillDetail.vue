<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Toast } from "vant";
import Header from "@/components/Header.vue";
import AddBill from "./AddBill.vue";
import { getBillDetail, deleteBill } from "@/api/bill";
import type { BillItem } from "../index";
import dayjs from "dayjs";
import { BillType } from "../index";
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
const route = useRoute();
const router = useRouter();
const detail = reactive<BillItem>({});
const showAddPop = ref(false);
const id = Number(route.query.id);
// 每次打开都重新渲染该组件
let addBillKey = 1;
onMounted(() => {
  reqGetBillDetail(id);
});

// 获取账单详情
const reqGetBillDetail = async (id: number) => {
  const { data, code } = await getBillDetail(id);
  if (code === 200) {
    Object.assign(detail, data[0]);
  }
};
const clickDelete = async () => {
  const { code, message } = await deleteBill(id);
  if (code === 200) {
    Toast(message);
    setTimeout(() => {
      router.push("/");
    }, 500);
  }
};
const edit = async () => {
  showAddPop.value = true;
};
const handleBillUpdated = () => {
  router.push("/");
};
</script>

<template>
  <Header />
  <div class="detail" v-if="Object.keys(detail).length">
    <div>
      <van-tag
        :type="detail.pay_type === 1 ? 'primary' : 'warning'"
        size="large"
        >{{ detail.type_name }}</van-tag
      >
    </div>

    <div class="amount">
      <span :style="{ color: 'green' }" v-if="detail.pay_type === 1"
        >- {{ detail.amount }}
      </span>
      <span :style="{ color: 'red' }" v-else>+ {{ detail.amount }}</span>
    </div>
    <van-field
      label="记账时间"
      :model-value="dayjs(Number(detail.date)).format('YYYY-MM-DD HH:mm')"
      readonly
    />
    <van-field label="备注" :model-value="detail.remark" readonly />
    <div class="buttons">
      <van-button
        type="danger"
        text="删除"
        icon="delete"
        plain
        @click="clickDelete()"
      />
      <van-button
        type="primary"
        text="编辑"
        icon="records"
        plain
        @click="edit()"
      />
    </div>
  </div>
  <div v-else>
    <van-empty image="error" description="暂无该账单数据" />
  </div>
  <!-- 添加账单弹窗 -->
  <van-popup
    v-model:show="showAddPop"
    @closed="addBillKey++"
    position="bottom"
    round
    ><AddBill
      :types="types"
      :key="addBillKey"
      :defaultData="detail"
      @close="showAddPop = false"
      @on-bill-updated="handleBillUpdated"
    />
    /></van-popup
  >
</template>

<style lang="less" scoped>
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  div {
    margin: 5px;
  }
  .amount {
    font-weight: 600;
    font-size: 20px;
    margin: 10px 0 20px 0;
  }
  .buttons {
    width: 80%;
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
}
</style>
