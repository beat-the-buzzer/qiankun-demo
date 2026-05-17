# Qiankun 微前端学习项目

基于 qiankun 框架搭建的微前端示例项目，包含完整的主应用和多个子应用，涵盖从入门到生产部署的全部知识点。

## 项目架构

```
┌─────────────────────────────────────────────────────────┐
│                    主应用 (main-app)                     │
│                   Vue 3 + Element Plus                   │
│                      端口: 5173/4000                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │  Vue 子应用      │  │      React 子应用            │  │
│  │  端口: 8081/4001 │  │      端口: 8082/4002         │  │
│  │                 │  │  ┌─────────────────────┐    │  │
│  │                 │  │  │    孙子应用 (Vue)    │    │  │
│  │                 │  │  │    端口: 8083/4003   │    │  │
│  │                 │  │  └─────────────────────┘    │  │
│  └─────────────────┘  └─────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 技术栈

| 应用         | 技术栈                                             |
| ------------ | -------------------------------------------------- |
| 主应用       | Vue 3 + Vite + Element Plus + Vue Router + qiankun |
| Vue 子应用   | Vue 3 + Vite + vite-plugin-qiankun                 |
| React 子应用 | React 18 + Vite + vite-plugin-qiankun              |
| 孙子应用     | Vue 3 + Vite + vite-plugin-qiankun                 |

## 功能演示

- ✅ 主应用加载子应用
- ✅ 父子应用通信（Props）
- ✅ 子应用向主应用通信（Callback）
- ✅ 子应用间通信（Global State）
- ✅ 子应用内部路由
- ✅ 样式隔离
- ✅ 子应用嵌套（React 子应用加载 Vue 孙子应用）
- ✅ 生产环境部署

## 在线地址

http://1.12.229.67:4000/

## 快速开始

### 安装依赖

```bash
# 安装所有应用依赖
cd main-app && npm install
cd ../sub-app-vue && npm install
cd ../sub-app-react && npm install
cd ../sub-app-grandchild && npm install
```

### 开发环境启动

```bash
# 终端 1 - 主应用
cd main-app && npm run dev

# 终端 2 - Vue 子应用
cd sub-app-vue && npm run dev

# 终端 3 - React 子应用
cd sub-app-react && npm run dev

# 终端 4 - 孙子应用（可选）
cd sub-app-grandchild && npm run dev
```

访问 http://localhost:5173

### 生产环境构建

```bash
./build.sh
```

## 项目结构

```
qiankun/
├── main-app/                 # 主应用
│   ├── src/
│   │   ├── main.js          # 入口，启动 qiankun
│   │   ├── micro-apps.js    # 子应用注册配置
│   │   ├── global-state.js  # 全局状态管理
│   │   ├── App.vue          # 主布局
│   │   ├── router/          # 路由配置
│   │   ├── store/           # 状态管理
│   │   └── views/           # 页面组件
│   └── .env.*               # 环境变量
│
├── sub-app-vue/              # Vue 子应用
│   ├── src/
│   │   ├── main.js          # 入口，导出生命周期
│   │   ├── router/          # 子应用路由
│   │   └── views/           # 页面组件
│   └── vite.config.js
│
├── sub-app-react/            # React 子应用
│   ├── src/
│   │   ├── main.jsx         # 入口，导出生命周期 + 注册孙子应用
│   │   └── App.jsx          # 主组件
│   └── vite.config.js
│
├── sub-app-grandchild/       # 孙子应用
│   ├── src/
│   │   ├── main.js
│   │   └── App.vue
│   └── vite.config.js
│
├── nginx/                    # Nginx 配置
│   └── nginx.conf
│
├── resources/                # 学习笔记
│   ├── 01-qiankun基础入门.md
│   ├── 02-应用间通信.md
│   ├── 03-子应用生命周期与缓存.md
│   ├── 04-子应用路由配置.md
│   ├── 05-样式隔离.md
│   ├── 06-子应用嵌套与预加载.md
│   ├── 07-qiankun API 参考.md
│   └── 08-生产部署.md
│
├── build.sh                  # 构建脚本
└── deploy.sh                 # 部署脚本
```

## 端口说明

| 应用         | 开发端口 | 生产端口 |
| ------------ | -------- | -------- |
| 主应用       | 5173     | 4000     |
| Vue 子应用   | 8081     | 4001     |
| React 子应用 | 8082     | 4002     |
| 孙子应用     | 8083     | 4003     |

## 学习笔记

详细的学习笔记在 `resources/` 目录下：
[语雀笔记地址](https://www.yuque.com/beloved-x5krn/lyc/vwnz3tws2bvknywi)

## 生产部署

### 1. 修改环境变量

```bash
# main-app/.env.production
VITE_SUB_VUE_ENTRY=//your-server-ip:4001
VITE_SUB_REACT_ENTRY=//your-server-ip:4002
```

### 2. 修改子应用 base

```javascript
// sub-app-vue/vite.config.js
base: mode === "production" ? "//your-server-ip:4001/" : "/";
```

### 3. 构建并部署

```bash
./build.sh
```

### 4. 配置 Nginx

将 `nginx/nginx.conf` 复制到服务器 `/etc/nginx/conf.d/` 目录

## License

MIT
