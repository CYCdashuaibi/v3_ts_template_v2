# © cyc 2025  版权所有

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


| 字段           | 说明                | 类型              | 是否必填 |
| -------------- | ------------------- | ----------------- | -------- |
| prop           | 字段名（model key） | string            | 是       |
| label          | 表单项标签          | string            | 是       |
| type           | 组件类型（input等） | string            | 否       |
| span           | 所占栅格（1-24）    | number            | 否       |
| required       | 是否必填            | boolean           | 否       |
| rules          | 校验规则            | FormRules[string] | 否       |
| componentProps | 传递给组件的属性    | object            | 否       |
| formItemProps  | 传递给el-form-item  | object            | 否       |

更多用法可参考组件源码或实际业务扩展。

### YzSearch 搜索组件

#### Props 说明


| 属性名     | 说明                      | 类型                | 是否必填 | 默认值 |
| ---------- | ------------------------- | ------------------- | -------- | ------ |
| modelValue | 搜索表单数据对象，v-model | Record<string, any> | 是       | —     |
| schema     | 搜索项配置数组            | IFieldSchema[]      | 是       | —     |
| rules      | 校验规则                  | FormRules           | 否       | —     |
| initHeight | 初始高度（收起时）        | number\| string     | 否       | 52     |
| 其它       | 透传 el-form 的属性       | 参考 Element Plus   | 否       | —     |

#### schema 字段说明（IFieldSchema）


| 字段           | 说明                | 类型                                                         | 是否必填 |
| -------------- | ------------------- | ------------------------------------------------------------ | -------- |
| prop           | 字段名（model key） | string                                                       | 是       |
| label          | 搜索项标签          | string                                                       | 是       |
| type           | 组件类型（input等） | 'input'\| 'select' \| 'textarea' \| 'datepicker' \| 'switch' | 否       |
| required       | 是否必填            | boolean                                                      | 否       |
| rules          | 校验规则            | FormRules[string]                                            | 否       |
| componentProps | 传递给组件的属性    | object                                                       | 否       |
| formItemProps  | 传递给el-form-item  | object                                                       | 否       |

#### 事件

- `update:modelValue`：表单数据变更时触发
- `search`：点击搜索按钮且校验通过时触发，参数为当前表单数据

#### 使用示例

```vue
<template>
  <YzSearch
    v-model="searchData"
    :schema="searchSchema"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { YzSearch } from '@/components';

const searchData = ref({
  username: '',
  status: ''
});

const searchSchema = [
  { prop: 'username', label: '用户名', type: 'input' },
  { prop: 'status', label: '状态', type: 'select', componentProps: { options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] } }
];

function handleSearch(data: any) {
  console.log('搜索数据', data);
}
</script>
```

### YzTable 表格组件

#### Props 说明


| 属性名        | 说明             | 类型                           | 是否必填 | 默认值 |
| ------------- | ---------------- | ------------------------------ | -------- | ------ |
| data          | 表格数据         | any[]                          | 是       | —     |
| columns       | 列配置数组       | IColumnConfig[]                | 是       | —     |
| loading       | 加载中状态       | boolean                        | 否       | false  |
| rowKey        | 行数据的唯一标识 | string                         | 否       | —     |
| stripe        | 斑马纹           | boolean                        | 否       | false  |
| border        | 边框             | boolean                        | 否       | false  |
| size          | 表格尺寸         | 'large'\| 'default' \| 'small' | 否       | —     |
| showSelection | 是否显示多选框   | boolean                        | 否       | false  |
| showIndex     | 是否显示序号列   | boolean                        | 否       | false  |
| indexLabel    | 序号列标题       | string                         | 否       | #      |
| actionLabel   | 操作列标题       | string                         | 否       | —     |
| pagination    | 分页配置         | IPaginationConfig              | 否       | —     |

#### columns 字段说明（IColumnConfig）


| 字段        | 说明                      | 类型                          | 是否必填 |
| ----------- | ------------------------- | ----------------------------- | -------- |
| prop        | 字段名                    | string                        | 否       |
| label       | 列标题                    | string                        | 是       |
| width       | 列宽                      | string\| number               | 否       |
| sortable    | 是否可排序                | boolean\| 'custom'            | 否       |
| slot        | 自定义插槽名              | string                        | 否       |
| formatter   | 格式化函数                | (value, row, index) => string | 否       |
| columnProps | 透传 el-table-column 属性 | object                        | 否       |

#### 事件

- `sort-change`：排序变化时触发
- `selection-change`：多选项变化时触发
- `row-click`：点击行时触发
- `current-change`：分页页码变化时触发
- `size-change`：分页大小变化时触发
- `pagination-change`：分页变化时触发

#### 使用示例

```vue
<template>
  <YzTable
    :data="tableData"
    :columns="columns"
    :pagination="pagination"
    @row-click="handleRowClick"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { YzTable } from '@/components';

const tableData = ref([
  { id: 1, name: '张三', status: 1 },
  { id: 2, name: '李四', status: 0 }
]);

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'status', label: '状态', formatter: (val) => (val ? '启用' : '禁用') }
];

const pagination = {
  pageSizes: [10, 20, 50],
  pageSize: 10,
  currentPage: 1,
  total: 2
};

function handleRowClick(row) {
  console.log('点击行', row);
}
</script>
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

## 页面视图说明

- NotFound 404页面：未找到页面时展示。
- NotPermissions 无权限页面：无权限访问时展示。
- Routes 路由测试页：用于路由相关功能测试。
- Test 测试页：用于功能测试和开发调试。
