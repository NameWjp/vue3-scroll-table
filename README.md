# vue3-scroll-table
模拟 Element 的 table 组件，添加了滚动功能

Demo: [https://namewjp.github.io/vue3-scroll-table/](https://namewjp.github.io/vue3-scroll-table/)

## 开始使用
### 安装
```
npm install -S vue3-scroll-table
```
### 全局注册
```js
import vue3ScrollTable from 'vue3-scroll-table';
import 'vue3-scroll-table/dist/index.css';

app.use(vue3ScrollTable);
```
### 使用
```html
<template>
  <scroll-table :data="tableData" hoverStop :height="200">
    <scroll-table-column prop="date" label="日期" />
    <scroll-table-column prop="name" label="姓名" />
    <scroll-table-column prop="address" label="地址" />
  </scroll-table>
</template>
```

## API
### ScrollTable
#### 属性
| 名称 | 类型 | 描述 | 默认值 | 必填 |
| :-----| :---- | :---- | :---- | :---- |
| data | DefaultRow[] | 表格数据 | [] | 否 |
| height | number | table 高，默认不滚动 | - | 否 |
| interval | number | 滚动间隔 | 2 | 否 |
| transition | number | 滚动过渡时间 | 1 | 否 |
| hoverStop | boolean | hover 状态下是否停止滚动 | false | 否 |
| showHeader | boolean | 是否显示头部 | true | 否 |
#### 事件
| 名称 | 描述 | 参数 |
| :-----| :---- | :---- |
| click | 点击行回调 | row, column, event |

### ScrollTableColumn
#### 属性
| 名称 | 类型 | 描述 | 默认值 | 必填 |
| :-----| :---- | :---- | :---- | :---- |
| label | string | 列名称 | - | 否 |
| prop | string | 对应列内容的字段名 | - | 是 |
| width | string/number | 列宽 | - | 否 |

## 本地开发调试

1. 在根目录依次执行
```bash
# 安装依赖
npm ci

# 实时编译代码
npm run dev
```

2. 进入 example 目录依次执行
```bash
# 安装依赖
npm ci 

# 实时编译代码
npm run dev
```

此时，修改 **根目录** 或者 **example目录** 的任何代码都会导致项目重新打包构建。 
