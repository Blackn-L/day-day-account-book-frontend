import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("../components/Part1.vue"),
  },
];

const router = createRouter({
  // 使用 hash 模式。
  history: createWebHashHistory(),
  routes,
});

export default router;
