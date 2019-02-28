# React 多页面 [English](./README.md)

## 版本依赖

- react 16.8.3
- react-dom 16.8.3
- redux 4.0.1
- react-redux 6.0.0
- redux-thunk 2.3.0
- react-router-dom 4.3.1
- antd 3.13.5
- webpack v4+
- babel v7+
- postcss v3.0.0
- react-hot-loader v4.6.5

## 使用

### 安装

```bash
npm i -g react-feeo-cli
react-feeo-cli init <you name>
cd <you name>
# 可选 $ git init
npm i

# 提示 : ERR! husky
git init
```

### 开发

```bash
npm run dev
# open http://localhost:9001
```

### 生产

```bash
# 首次运行请执行，主要是打包不常变换的第三方库
npm run dll

# 生产环境打包
npm run p
```

## 本项目实现了

- 多页面
- 集成 antd
- 按需加载
- 开发组件热替换

### 多页面配置

在./src/pages/下建立目录

如 ./src/pages/Demo/Index.jsx 会自动生产 demo.html

通常 Demo 目录首先字母大写

```bash
npm run dev / npm run p
```

### 集成 antd

配置项在 ./config/webpack.dll.antd.js

默认集成:

```bash
    antd: [
      "antd/es/message",
      "antd/es/spin",
      "antd/es/modal",
      "antd/es/button",
      "antd/es/icon",
      "antd/es/input",
      "antd/es/input-number",
      "antd/es/list",
      "antd/es/tooltip",
      "antd/es/radio",
      "antd/es/switch",
      "antd/es/checkbox",
      "antd/es/select",
      "antd/es/tag"
    ]
```

如需添加其他组件从在上面追加，并执行

```bash
npm run dll:antd
```

### 新增第三放依赖

如果想打包进 vendor 中，请在 ./config/webpack.dll.vendor.js 中追加

```bash
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "react-router-dom",
      "redux",
      "redux-thunk",
      "react-loadable"
    ]
```

如需添加其他组件从在上面追加，并执行

```bash
npm run dll:vendor
```

### 按需加载

路由写法 详见 ./src/pages/Index/Index.jsx
方法 详见 ./src/pages/Index/Main.jsx

### 开发组件热替换

需要在路由页面的入口文件中添加

```bash
import { hot } from "react-hot-loader/root";

#详见  ./src/pages/Index/Router.jsx

```

### git 提交会进行 eslint

```bash
# package.json
"husky": {
    "hooks": {
      "pre-commit": "eslint src --ext .js,.jsx"
    }
  }
#
```
