<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { login, LoginAndRegParams } from "@/api/user";
import { tools } from "@/utils/index";
export interface API {
  username: string;
}
const router = useRouter();
const username = ref("");
const password = ref("");
const buttonLoading = ref(false);

const onSubmit = async (values: LoginAndRegParams) => {
  if (!values?.username?.trim() || !values?.password?.trim()) {
    Toast.fail("请输入用户名或密码");
    return;
  }
  try {
    buttonLoading.value = true;
    let { data, message } = await login(values);
    if (data.token) {
      localStorage.setItem("token", data.token);
      Toast.success({ message, duration: 600 });
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  } catch (error) {
    console.log("error: ", error);
  } finally {
    buttonLoading.value = false;
  }
};
defineExpose({
  username,
});
</script>

<template>
  <van-form
    @submit="onSubmit"
    :readonly="buttonLoading"
    validate-trigger="onSubmit"
    label-width="50px"
  >
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="输入用户名"
        clearable
        :rules="[
          { required: true, message: '请填写用户名' },
          {
            validator: (val:string) => tools.useCheckUername(val),
            message: '用户名格式错误',
          },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="输入密码"
        label="密码"
        clearable
        :rules="[
          { required: true, message: '请填写密码' },
          {
            validator: (val:string) => tools.useCheckPassword(val),
            message: '密码格式错误',
          },
        ]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        :loading="buttonLoading"
      >
        登录
      </van-button>
    </div>
  </van-form>
</template>

<style lang="less" scoped></style>
