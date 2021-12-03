<script setup lang="ts">
import { ref } from "vue";
import { updatePassword } from "@/api/user";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import { Toast } from "vant";
const router = useRouter();
const oldPassword = ref("");
const newPassword = ref("");
const repeatPassword = ref("");
const buttonLoading = ref(false);
const validatorRepeatPassword = (value: string) => {
  return value === newPassword.value;
};
const onSubmit = async () => {
  buttonLoading.value = true;
  try {
    const { message, code } = await updatePassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });
    if (code === 200) {
      Toast.success(message);
      setTimeout(() => {
        router.push("/user");
      }, 300);
    }
  } catch (error) {
    console.log("error: ", error);
  } finally {
    buttonLoading.value = false;
  }
};
</script>

<template>
  <Header title="修改密码" />
  <div class="main">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="oldPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入旧密码"
          :rules="[{ required: true, message: '请填写旧密码' }]"
        />
        <van-field
          v-model="newPassword"
          type="password"
          name="密码"
          label="新密码"
          placeholder="请输入新密码"
          :rules="[{ required: true, message: '请填写新密码' }]"
        />
        <van-field
          v-model="repeatPassword"
          type="password"
          name="密码"
          label="确认密码"
          placeholder="请再次输入新密码"
          :rules="[
            { required: true, message: '请再次填写新密码' },
            {
              validator: validatorRepeatPassword,
              message: '两次密码不一致',
            },
          ]"
        />
      </van-cell-group>
      <div class="bottom-button">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="buttonLoading"
          loading-type="spinner"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="less" scoped>
.main {
  margin: 20px 15px;
}
.bottom-button {
  margin-top: 50px;
}
</style>
