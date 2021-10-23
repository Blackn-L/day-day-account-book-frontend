<script setup lang="ts">
import { ref } from "vue";
import { login } from "@/api/login";
interface LoginData {
  token: string;
}
const username = ref<string>("");
const password = ref<string>("");
const onSubmit = async (values: Object) => {
  console.log("submit", values);
  try {
    let {data} = await login({
      username: username.value,
      password: password.value,
    });
    // if (data.token) {
    //   window.localStorage.setItem("token", data.token);
    // }
    console.log("data: ", data);
  } catch (error) {
    console.log("error: ", error);
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        clearable
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        clearable
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<style lang="less" scoped></style>
