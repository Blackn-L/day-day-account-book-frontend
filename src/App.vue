<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, watchEffect } from "vue";
import Tabbar from "./components/Tabbar/index.vue";
import { useRoute } from "vue-router";
const showTabbar = ref(true);
const route = useRoute();
// 不需要展示标签栏的路由
const noShowTabbarRouteList = [
  "/login",
  "/detail",
  "/update-password",
  "/upload-avatar",
];
watchEffect(() => {
  showTabbar.value = !noShowTabbarRouteList.includes(route.path);
});
</script>

<template>
  <div class="app">
    <router-view />
    <Tabbar v-show="showTabbar" />
  </div>
</template>

<style lang="less" scoped>
.app {
  min-height: 100vh;

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
</style>
