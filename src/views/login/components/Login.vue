<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { login, LoginAndRegParams } from "@/api/user";
const router = useRouter();
const username = ref<string>("");
const password = ref<string>("");
const onSubmit = async (values: LoginAndRegParams) => {
  if (!values?.username?.trim() || !values?.password?.trim()) {
    Toast.fail("请输入用户名或密码");
    return;
  }
  try {
    let { data, message } = await login(values);
    if (data.token) {
      localStorage.setItem("token", data.token);
      Toast.success(message);
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
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
        name="username"
        label="用户名"
        clearable
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
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
