# Changelog

All notable changes to this project will be documented in this file.

## [v1.0.0] - 2026-05-28

### Features

#### 用户系统
- 注册/登录功能，支持用户名密码格式校验
- 用户名规则：数字、字母、下划线至少一种，4-20 字符
- 密码规则：数字、字母、下划线至少两种，8-20 字符
- 注册页面实时显示校验状态
- Token 鉴权机制，全局路由守卫
- Token 过期自动跳转登录页

#### 个人中心
- 修改个性签名
- 更换头像（支持二次确认）
- 修改密码功能
- 项目地址跳转
- 关于我页面
- 退出登录

#### 账单管理
- 新增账单（支持支出/收入类型）
- 编辑账单
- 删除账单（滑动删除）
- 账单详情查看
- 账单列表（无限滚动 + 下拉刷新）
- 自定义账单类型（餐饮、交通、娱乐、购物、工资、奖金、转账、理财等）

#### 账单统计
- 月度支出/收入统计
- 进度条展示各类型占比
- 环形图可视化
- 空数据页面

#### 权限控制
- 全局路由守卫验证 Token
- 401 状态码自动处理
- 未匹配路由重定向

### Technical Stack

- Vue 3.4 + TypeScript
- Vite 5.3
- Vant 4.9（移动端 UI 组件库）
- Vue Router 4
- Axios 1.7（二次封装，Hooks 风格）
- @antv/f2 4.0（移动端图表库）
- Less（CSS 预处理器）
- postcss-pxtorem（px 转 rem）
- unplugin-vue-components（自动按需引入）

### Improvements

- 升级 Vue 3.2 → 3.4
- 升级 Vite 2.6 → 5.3
- 升级 Vant 3.2 → 4.9
- 升级 axios 0.23 → 1.7
- 升级 @antv/f2 3.8 → 4.0
- 移除废弃插件 vite-plugin-style-import，使用 unplugin-vue-components
- 移除不再维护的 lib-flexible
- 组件自动导入，简化 main.js
- 适配 Vant 4 API 变更（datetime-picker → date-picker）
- 适配 @antv/f2 v4 API 变更

[v1.0.0]: https://github.com/Blackn-L/day-day-account-book-frontend/releases/tag/v1.0.0
