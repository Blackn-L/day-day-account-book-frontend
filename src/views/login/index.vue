<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import Login, { API as LoginAPI } from "./components/Login.vue";
import Register from "./components/Register.vue";
const router = useRouter();
onBeforeMount(() => {
  if (localStorage.getItem("token")) router.push("/");
});
const refLogin = ref<LoginAPI | undefined>();
const activeTab = ref<string>("login");
const regSuccess = (val: string) => {
  activeTab.value = "login";
  if (refLogin.value) {
    refLogin.value.username = val;
  }
};
</script>

<template>
  <div class="wrapper">
    <van-cell-group inset class="main">
      <van-tabs v-model:active="activeTab">
        <van-tab title="登录" name="login"><Login ref="refLogin" /></van-tab>
        <van-tab title="注册" name="register"
          ><Register @toLogin="regSuccess"
        /></van-tab>
      </van-tabs>
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  height: 100vh;
  background-image: url("@/assets/login_background.jpeg");
  padding-top: 25vh;
}
.main {
  min-height: 30vh;
  margin: 10px;
}
</style>
