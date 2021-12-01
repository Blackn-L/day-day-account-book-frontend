import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport from "vite-plugin-style-import";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vant 按需引入
    styleImport({
      libs: [
        {
          libraryName: "vant",
          esModule: true,
          // https://github.com/anncwb/vite-plugin-style-import/issues/52
          // 不加/node_modules 打包会报错，当前 vite-plugin-style-import 的 bug，待修复
          resolveStyle: (name) => `/node_modules/vant/es/${name}/style`,
        },
      ],
    }),
  ],
  // 配置 less
  css: {
    modules: {
      localsConvention: "dashesOnly",
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },

  // 配置本地代理
  server: {
    proxy: {
      "/api": {
        // 当遇到 /api 路径时，将其转换成 target 的值, /api 是在 axios 实例中配置的
        // user/login => http://127.0.0.1:7001/api/user/login
        // target: "http://127.0.0.1:7001/",
        target: "http://ab.svip52.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 将 /api 重写为空
      },
    },
    port: 3888,
    open: true,
  },

  // 配置路径别名
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
    // alias: {
    //   "@": path.resolve(__dirname, "./src"), // src 路径
    //   utils: path.resolve(__dirname, "./src/utils"), // utils 路径
    //   components: path.resolve(__dirname, "./src/components"), // components 路径
    // },
  },
});
