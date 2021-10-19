<script setup lang="ts">
import { ref } from "vue";
const username = ref<string>("");
const password = ref<string>("");
const onSubmit = (values: Object) => {
  console.log("submit", values);
};
</script>

<template>
  <van-form @submit="onSubmit" class="login-form">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style lang="less" scoped>
.login-form {
  margin: 10px;
}
</style>
