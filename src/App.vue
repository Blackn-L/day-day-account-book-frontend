<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, watchEffect } from "vue";
import Tabbar from "./components/Tabbar.vue";
import { useRoute } from "vue-router";
const showTabbar = ref(true);
const route = useRoute();
// 不需要展示标签栏的路由
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
  body,
  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  code,
  form,
  fieldset,
  legend,
  input,
  button,
  textarea,
  p,
  blockquote,
  th,
  td {
    margin: 0;
    padding: 0;
  }
  body {
    background: #fff;
    color: #555;
    font-size: 14px;
    font-family: Verdana, Arial, Helvetica, sans-serif;
  }
  td,
  th,
  caption {
    font-size: 14px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
    font-size: 100%;
  }
  address,
  caption,
  cite,
  code,
  dfn,
  em,
  strong,
  th,
  var {
    font-style: normal;
    font-weight: normal;
  }
  a {
    color: #555;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  img {
    border: none;
  }
  ol,
  ul,
  li {
    list-style: none;
  }
  input,
  textarea,
  select,
  button {
    font: 14px Verdana, Helvetica, Arial, sans-serif;
  }
  table {
    border-collapse: collapse;
  }
  html {
    overflow-y: scroll;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .clearfix {
    *zoom: 1;
  }
}
</style>
