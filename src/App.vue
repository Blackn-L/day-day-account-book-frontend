<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, watchEffect } from "vue";
import Tabbar from "./components/Tabbar.vue";
import { useRoute } from "vue-router";
const showTabbar = ref(true);
const route = useRoute();
const noShowTabbarRouteList = ["/login"];
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

<style lang="less">
.app {
  min-height: 100vh;
  color: #455a6499;
}
</style>
