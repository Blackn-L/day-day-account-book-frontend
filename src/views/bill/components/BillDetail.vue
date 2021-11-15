<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import { getBillDetail } from "@/api/bill";
import type { BillItem } from "../index";
import * as dayjs from "dayjs";
const route = useRoute();
const detail = reactive<BillItem>({});
const id = Number(route.query.id);
onMounted(() => {
  reqGetBillDetail(id);
});

// 获取账单详情
const reqGetBillDetail = async (id: number) => {
  const { data, code } = await getBillDetail(id);
  if (code === 200) {
    console.log("data: ", data);
    Object.assign(detail, data);
    console.log("detail: ", detail);
  }
};
const clickDelete = async () => {
  console.log("clickDelete");
};
const edit = async () => {};
</script>

<template>
  <Header />
  <div class="detail">
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
