declare module "*.vue" {
  // 要让 TypeScript 正确推断 Vue 组件选项中的类型，需要使用 defineComponent 全局方法定义组件
  // https://v3.cn.vuejs.org/guide/typescript-support.html#%E5%AE%9A%E4%B9%89-vue-%E7%BB%84%E4%BB%B6
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
