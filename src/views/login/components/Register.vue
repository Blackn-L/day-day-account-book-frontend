<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { register, LoginAndRegParams } from "@/api/user";
import { Toast } from "vant";

const emit = defineEmits<{
  (e: "toLogin"): void;
}>();
const username = ref<string>("");
const password = ref<string>("");
const onSubmit = async (values: LoginAndRegParams) => {
  if (!values?.username?.trim() || !values?.password?.trim()) {
    Toast.fail("请输入用户名或密码");
    return;
  }
  try {
    const { message } = await register(values);
    Toast.success(message);
    emit("toLogin");
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
        placeholder="用户名"
        clearable
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        clearable
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<style lang="less" scoped></style>
