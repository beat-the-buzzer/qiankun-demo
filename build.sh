#!/bin/bash

# qiankun 微前端项目构建脚本

echo "🚀 开始构建所有应用..."

# 构建主应用
echo "📦 构建主应用..."
cd main-app
npm run build
cd ..

# 构建 Vue 子应用
echo "构建 Vue 子应用..."
cd sub-app-vue
npm run build
cd ..

# 构建 React 子应用
echo "构建 React 子应用..."
cd sub-app-react
npm run build
cd ..

# 构建孙子应用
echo "构建孙子应用..."
cd sub-app-grandchild
npm run build
cd ..

echo "所有应用构建完成！"
echo ""
echo "  构建产物位置："
echo "   main-app/dist"
echo "   sub-app-vue/dist"
echo "   sub-app-react/dist"
echo "   sub-app-grandchild/dist"
echo ""
echo "下一步："
echo "   1. 将 dist 目录复制到服务器 /app/ 下"
echo "   2. 将 nginx/nginx.conf 复制到 Nginx 配置目录"
echo "   3. 重启 Nginx: nginx -s reload"
echo "   4. 访问 http://localhost:4000"
