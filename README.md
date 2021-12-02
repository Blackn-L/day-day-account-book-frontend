# 呆呆记账本
> 自己写的移动端记账本，Vue3 + Typescript + Vite + Vant3，可以作为该类技术栈项目搭建的参考
> 页面基本 UI 和逻辑基于 [Nick 大佬的 React 版](https://github.com/Nick930826/juejue-vite-h)，在此基础上加了些自己的想法

## 在线体验
http://ab.svip52.com


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
  * 用户名校验
  * 密码校验
  * 验证码（待完成）
  * 登录后跳转登录页面提示已登录并回跳转前页面（待完成）
* 账单列表（已完成）
  * 无限滚动
  * 下拉刷新
  * 滑动删除
  * 账单详情
  * 新增/修改账单
  * 自定义支出/收入标签(待开发)
* 账单统计(已完成)
  * 进度条
  * 环形图
  * 无数据页面(待开发)
* 个人中心(开发 ing)
* 权限校验(已完成)
  * 全局路由守卫，验证 token，无 token 则跳转登录页
  * 401 状态码，token 过期，Axios 处封装，删除 token，跳转登录页
  * 有 token 情况下，打开登录页，直接跳转 '/'
  * 未匹配路由跳转 '/'
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
