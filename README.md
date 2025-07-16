# Vue 3 + TypeScript + Vite 项目模板

## 项目简介
本项目是基于 Vue 3、TypeScript 和 Vite 构建的前端模板，集成了常用的开发工具和最佳实践，适合快速启动中大型前端项目。

## 技术栈
- [Vue 3](https://cn.vuejs.org/)：主流渐进式前端框架
- [TypeScript](https://www.typescriptlang.org/)：类型安全的 JavaScript 超集
- [Vite](https://cn.vitejs.dev/)：极速的前端构建工具
- [Pinia](https://pinia.vuejs.org/zh/)：新一代状态管理库
- [Vue Router](https://router.vuejs.org/zh/)：官方路由解决方案
- [Element Plus](https://element-plus.org/zh-CN/)：UI 组件库
- [Axios](https://axios-http.com/)：网络请求库
- [Sass](https://sass-lang.com/)：CSS 预处理器

## 环境要求
- Node.js 版本：**>=18.0.0**（建议使用 LTS 版本）
- 推荐使用 [pnpm](https://pnpm.io/zh/) 作为包管理器，也可使用 npm 或 yarn

## 目录结构
```text
src/
├── apis/           # 接口请求相关文件夹
├── assets/         # 静态资源（如图片、字体等）
│   └── images/
├── components/     # 全局/通用组件
│   └── index.ts
├── router/         # 路由配置
│   └── index.ts
├── store/          # 状态管理（Pinia）
│   ├── index.ts
│   └── modules/    # 可扩展的模块目录
├── styles/         # 全局样式、变量、混入等
│   ├── _mixins.scss
│   ├── _variables.scss
│   ├── global.scss
│   └── reset.scss
├── types/          # TypeScript 类型定义
│   └── request.ts
├── utils/          # 工具函数
│   ├── index.ts
│   ├── request.ts
│   └── util.ts
├── views/          # 页面视图
│   └── NotFound/
│       └── index.vue
├── App.vue         # 根组件
├── env.d.ts        # 环境类型声明
├── main.ts         # 入口文件
```

## 安装与启动
1. 安装依赖（推荐使用 pnpm，也可用 npm/yarn）
   ```bash
   pnpm install
   # 或
   npm install
   # 或
   yarn install
   ```
2. 本地开发启动
   ```bash
   pnpm dev
   # 或
   npm run dev
   # 或
   yarn dev
   ```
3. 打包构建
   ```bash
   pnpm build
   # 或
   npm run build
   # 或
   yarn build
   ```
4. 预览打包产物
   ```bash
   pnpm preview
   # 或
   npm run preview
   # 或
   yarn preview
   ```

## 常用命令
- `pnpm dev`：本地开发环境启动
- `pnpm build`：生产环境打包
- `pnpm preview`：本地预览打包产物

## 主要依赖说明
- `vue`、`vue-router`、`pinia`：核心框架与路由、状态管理
- `element-plus`、`@element-plus/icons-vue`：UI 组件库及图标
- `axios`：接口请求
- `dayjs`：日期处理
- `sass-embedded`：Sass 预处理
- `unplugin-auto-import`、`unplugin-vue-components`：自动导入插件
- `typescript`、`vue-tsc`：类型检查
- 详见 `package.json`
