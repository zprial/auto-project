# 🌤️ 天气预报APP

一个现代化、响应式的天气预报应用，使用React + TypeScript构建，提供实时天气信息和7天天气预报。

## ✨ 功能特性

- 🌍 **城市搜索**: 支持全球城市天气查询
- 📍 **定位服务**: 自动获取当前位置天气
- 🌡️ **实时天气**: 显示当前温度、体感温度、湿度等详细信息
- 📅 **7天预报**: 提供未来一周的天气趋势
- 🎨 **动态背景**: 根据天气状况自动切换背景主题
- 📱 **响应式设计**: 完美适配桌面端、平板和手机
- 🌙 **深色模式**: 支持系统深色模式
- ♿ **无障碍**: 支持高对比度和减少动画偏好

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **状态管理**: React Hooks
- **网络请求**: Axios
- **样式**: CSS3 + CSS Grid + Flexbox
- **动画**: CSS Animations
- **构建工具**: Create React App

## 🚀 快速开始

### 环境要求

- Node.js 16.0+
- npm 8.0+

### 安装步骤

1. 克隆项目
```bash
git clone [项目地址]
cd weather-app
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

4. 打开浏览器访问 `http://localhost:3000`

### 构建部署

```bash
npm run build
```

构建文件将生成在 `build/` 目录中。

## 📱 应用截图

### 桌面端
- 现代化的毛玻璃设计
- 丰富的天气信息展示
- 流畅的动画效果

### 移动端
- 完全响应式布局
- 触摸友好的界面
- 优化的加载性能

## 🌟 项目结构

```
src/
├── components/           # 可复用组件
│   ├── SearchBar.tsx    # 搜索栏组件
│   ├── CurrentWeather.tsx # 当前天气显示
│   └── WeatherForecast.tsx # 天气预报组件
├── services/            # API服务
│   └── weatherService.ts # 天气数据服务
├── types/               # TypeScript类型定义
│   └── weather.ts       # 天气数据类型
├── utils/               # 工具函数
│   └── index.ts         # 通用工具函数
├── App.tsx              # 主应用组件
├── App.css              # 主样式文件
└── index.tsx            # 应用入口
```

## 🔧 自定义配置

### API配置

目前使用演示数据，如需接入真实API：

1. 注册 [WeatherAPI.com](https://www.weatherapi.com/) 获取API密钥
2. 修改 `src/services/weatherService.ts` 中的 `API_KEY`
3. 移除演示数据相关代码

### 样式自定义

- 修改 `src/App.css` 调整全局样式
- 修改组件对应的 CSS 文件调整局部样式
- 使用 CSS 变量实现主题切换

## 🌐 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 创建 Issue
- 发送邮件至：[your-email]

---

⭐ 如果这个项目对你有帮助，请给它一个星标！