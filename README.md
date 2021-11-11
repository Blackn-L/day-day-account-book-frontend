# 呆呆记账本
> 自己写的移动端记账本，Vue3 + Typescript + Vite + Vant3，可以作为该类技术栈项目搭建的参考
> 页面基本 UI 和逻辑基于 Nick 大佬的 React 版[https://github.com/Nick930826/juejue-vite-h5]，在此基础上加了些自己的想法
## 版本
TSX 版本
SFC 版本
## 在线体验
待部署
## 插件
* `Vue-Router`
* `axios` 接口请求库，进行二次封装，采用 Hooks 风格
* `less`
* `vite-plugin-style-import` 按需引入插件，实现 Vant 的按需引入
* `lib-flexible`  用于设置 rem 基准值
* `postcss-pxtorem` 用于将 px 单位转化为 rem 单位

## 页面
* 注册/登录（已完成）
  * 用户名校验
  * 密码校验
  * 验证码
* 账单列表（已完成）
  * 无限滚动
  * 下拉刷新
* 账单详情(开发 ing)
* 账单统计(待开发)
* 个人中心(待开发)
* 全局路由守卫，验证 token（已完成）
## 后端
待上传
## 构建步骤
``` bash
# 克隆项目
git clone git@github.com:Blackn-L/day-day-account-book-frontend.git

# 进入项目目录
cd day-day-account-book-frontend

# 安装依赖，推荐 yarn
yarn

#  启动项目
yarn dev
