# react multipage [简体中文](./README.zh-CN.md)

## version

- react 16.8.3
- react-dom 16.8.3
- redux 4.0.1
- react-redux 6.0.0
- redux-thunk 2.3.0
- react-router-dom 4.3.1
- antd 3.13.5
- webpack v4+
- babel v7+

## Usage

### Install

```bash
npm i -g react-feeo-cli
react-feeo-cli init <you name>
cd <you name>
# Optional $ git init
npm i

# tips : ERR! husky
git init
```

### dev

```bash
npm run dev
# open http://localhost:9001
```

### build

```bash
# Third Party Dependency (Change) Packaging Execution
npm run dll

# production
npm run p
```

### new page

New page in src/pages directory

#### example

src/pages/Demo/Index.jsx

```bash
npm run dev / npm run p
```

### git commit warning

```bash
# package.json
"husky": {
    "hooks": {
      "pre-commit": "eslint src --ext .js,.jsx"
    }
  }
# Errors will fail to submit
```
