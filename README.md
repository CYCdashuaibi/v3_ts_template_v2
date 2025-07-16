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

## 通用组件使用说明

### YzForm 表单组件

`YzForm` 是基于 Element Plus 二次封装的动态表单组件，支持通过 schema 配置表单项，自动生成表单，支持校验、双向绑定、插槽自定义按钮等。

#### Props 说明
- `modelValue`：表单数据对象，支持 v-model 双向绑定
- `schema`：表单项配置数组（每项包含 prop、label、type、span、required、rules、componentProps、formItemProps 等）
- `rules`：全局校验规则（可选）
- `submitText`：提交按钮文本（可选，默认“提交”）
- `cancelText`：重置按钮文本（可选，默认“重置”）
- `gutter`：表单项间隔（可选，默认 20）
- 其余 Element Plus `el-form` 支持的属性可透传

#### 事件
- `update:modelValue`：表单数据变更时触发
- `submit`：点击提交按钮且校验通过时触发，参数为当前表单数据

#### 基础用法示例
```vue
<template>
  <YzForm
    v-model="formData"
    :schema="formSchema"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { YzForm } from '@/components';

const formData = ref({
  username: '',
  password: ''
});

const formSchema = [
  { prop: 'username', label: '用户名', required: true },
  { prop: 'password', label: '密码', type: 'input', required: true, componentProps: { type: 'password' } }
];

function handleSubmit(data: any) {
  console.log('提交数据', data);
}
</script>
```

#### Schema 字段说明
| 字段            | 说明                 | 类型                | 是否必填 |
|-----------------|----------------------|---------------------|---------|
| prop            | 字段名（model key）  | string              | 是      |
| label           | 表单项标签           | string              | 是      |
| type            | 组件类型（input等）  | string              | 否      |
| span            | 所占栅格（1-24）     | number              | 否      |
| required        | 是否必填             | boolean             | 否      |
| rules           | 校验规则             | FormRules[string]   | 否      |
| componentProps  | 传递给组件的属性     | object              | 否      |
| formItemProps   | 传递给el-form-item   | object              | 否      |

更多用法可参考组件源码或实际业务扩展。

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
