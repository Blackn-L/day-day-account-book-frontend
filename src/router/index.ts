import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/views/bill/index.vue"),
    meta: { checkAuth: true },
  },
  {
    path: "/count",
    component: () => import("@/views/count/index.vue"),
    meta: { checkAuth: true },
  },
  {
    path: "/user",
    component: () => import("@/views/user/index.vue"),
    meta: { checkAuth: true },
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("@/views/bill/components/BillDetail.vue"),
    meta: { checkAuth: true },
  },
];

const router = createRouter({
  // 使用 hash 模式。
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.checkAuth) {
    // 是否需要验证 token
    if (localStorage.getItem("token")) {
      // 是否存在 token
      next();
    } else {
      next({
        path: "/login", // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: { redirect: to.fullPath },
      });
    }
  } else {
    // 不需要 token，继续跳转
    next();
  }
});

export default router;
