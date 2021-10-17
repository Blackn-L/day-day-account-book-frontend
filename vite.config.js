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
          resolveStyle: (name) => `vant/es/${name}/style`,
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
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: "http://api.svip52.com/pocket/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 将 /api 重写为空
      },
    },
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
