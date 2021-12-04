# 呆呆记账本
> 自己写的移动端记账本，Vue3 + Typescript + Vite + Vant3，可以作为该类技术栈项目搭建的参考
> 页面基本 UI 和逻辑基于 [Nick 大佬的 React 版](https://github.com/Nick930826/juejue-vite-h)，在此基础上加了些自己的想法

## 在线体验
http://ab.svip52.com

可自行注册

懒人:
* 账号：test
* 密码：test1234


## 后端
[呆呆记账本后端](https://github.com/Blackn-L/day-day-account-book-backend)

已部署线上接口[http://api.svip52.com/ab/]

不想部署后端的话，直接在该线上接口后面加上相应接口地址即可

## 插件
* `Vue-Router`
* `axios` 接口请求库，进行二次封装，采用 Hooks 风格
* `less`
* `vite-plugin-style-import` 按需引入插件，实现 Vant 的按需引入
* `lib-flexible`  用于设置 rem 基准值
* `postcss-pxtorem` 用于将 px 单位转化为 rem 单位
* `AntV F2` 移动端图表库

## 页面
* 注册/登录（已完成）
  - [x] 用户名校验(数字、字母、下划线，一种及以上, 4 <= len <= 20)
  - [x] 密码校验(数字、字母、下划线至少包含两种， 8 <= len <= 20)
  - [ ] 验证码
  - [x] 注册页面实时显示用户名/密码格式是否正确

* 账单列表（已完成）
  - [x] 无限滚动
  - [x] 下拉刷新
  - [x] 滑动删除
  - [x] 账单详情
  - [x] 新增/修改账单
  - [x] 自定义支出/收入标签(待开发)
* 账单统计（已完成）
  - [x] 进度条
  - [x] 环形图
  - [x] 无数据页面
* 个人中心(开发 ing)
  - [ ] 修改个人信息
  - [x] 修改密码
  - [x] test 账号无法修改密码
  - [ ] About
  - [x] 退出登录
* 权限校验（已完成）
  - [x] 全局路由守卫，验证 token，无 token 则跳转登录页
  - [x] 401 状态码，token 过期，Axios 处封装，删除 token，跳转登录页
  - [x] 有 token 情况下，打开登录页，直接跳转 '/'
  - [x] 未匹配路由跳转 '/'
## 构建步骤
``` bash
# 克隆项目
git clone git@github.com:Blackn-L/day-day-account-book-frontend.git

# 进入项目目录
cd day-day-account-book-frontend

# 安装依赖，推荐 yarn
yarn # npm i

#  启动项目
yarn dev # npm run dev

# 打包项目
yarn build # npm run build
