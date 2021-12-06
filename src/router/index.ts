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
  {
    path: "/update-password",
    name: "update-password",
    component: () => import("@/views/user/components/UpdatePassword.vue"),
    meta: { checkAuth: true },
  },
  {
    path: "/upload-avatar",
    name: "upload-avatar",
    component: () => import("@/views/user/components/uploadAvatar.vue"),
    meta: { checkAuth: true },
  },
  // 任意未定义路由直接重定向到 /
  // vue-router 4.x 删除了 *（星标或通配符）路由
  // 需要使用自定义的 regex 参数来定义所有路由(*、/*)：
  // https://next.router.vuejs.org/zh/guide/migration/index.html#%E5%88%A0%E9%99%A4%E4%BA%86-%EF%BC%88%E6%98%9F%E6%A0%87%E6%88%96%E9%80%9A%E9%85%8D%E7%AC%A6%EF%BC%89%E8%B7%AF%E7%94%B1
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
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
