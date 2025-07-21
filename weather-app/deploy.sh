#!/bin/bash

# 天气预报APP部署脚本

echo "🌤️ 开始部署天气预报APP..."

# 1. 安装依赖
echo "📦 安装依赖..."
npm install

# 2. 构建项目
echo "🔨 构建项目..."
npm run build

# 3. 启动服务
echo "🚀 启动服务..."
echo "选择启动方式："
echo "1. 使用 serve (推荐)"
echo "2. 使用 Python HTTP服务器"
echo "3. 仅构建，不启动服务"

read -p "请选择 (1-3): " choice

case $choice in
    1)
        echo "使用 serve 启动..."
        if command -v serve &> /dev/null; then
            serve -s build -l 3000
        else
            echo "安装 serve..."
            npm install -g serve
            serve -s build -l 3000
        fi
        ;;
    2)
        echo "使用 Python HTTP服务器启动..."
        python3 -m http.server 3000 --directory build
        ;;
    3)
        echo "构建完成！文件位于 build/ 目录"
        echo "可以手动部署到任何静态文件服务器"
        ;;
    *)
        echo "无效选择，退出"
        exit 1
        ;;
esac

echo "✅ 部署完成！"
echo "🌐 访问地址: http://localhost:3000"