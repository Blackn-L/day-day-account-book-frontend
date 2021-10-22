import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/views/bill/index.vue"),
  },
  {
    path: "/count",
    component: () => import("@/views/count/index.vue"),
  },
  {
    path: "/user",
    component: () => import("@/views/user/index.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
];

const router = createRouter({
  // 使用 hash 模式。
  history: createWebHashHistory(),
  routes,
});

export default router;
