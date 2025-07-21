# 🔧 API配置指南

## 概述

目前天气预报APP使用演示数据运行。如果您想接入真实的天气数据，请按照以下步骤配置API。

## 推荐的天气API服务

### 1. WeatherAPI.com (推荐)

**为什么推荐：**
- 免费计划：1,000,000 次调用/月
- 提供实时天气、预报、历史数据
- 支持中文城市名搜索
- API响应速度快，数据准确

**注册步骤：**

1. 访问 [WeatherAPI.com](https://www.weatherapi.com/)
2. 点击 "Sign Up Free" 注册账户
3. 验证邮箱后登录控制台
4. 复制您的API密钥

**配置方法：**

1. 打开 `src/services/weatherService.ts`
2. 将第5行的 `API_KEY` 值改为您的真实API密钥：

```typescript
const API_KEY = 'your_actual_api_key_here'; // 替换为您的API密钥
```

3. 删除或注释掉演示数据相关代码（可选）

### 2. OpenWeatherMap

**特点：**
- 免费计划：1,000 次调用/天
- 老牌天气服务商
- 全球覆盖

**注册地址：** [OpenWeatherMap](https://openweathermap.org/api)

### 3. AccuWeather

**特点：**
- 免费计划：50 次调用/天
- 精确度高
- 支持多种语言

**注册地址：** [AccuWeather](https://developer.accuweather.com/)

## 配置步骤详解

### 步骤 1: 获取API密钥

按照上述推荐服务的注册步骤获取API密钥。

### 步骤 2: 修改服务文件

编辑 `src/services/weatherService.ts`：

```typescript
// 第5行：替换API密钥
const API_KEY = 'your_actual_api_key_here';

// 如果使用其他API服务，也需要修改BASE_URL
const BASE_URL = 'https://api.weatherapi.com/v1'; // WeatherAPI
// const BASE_URL = 'https://api.openweathermap.org/data/2.5'; // OpenWeatherMap
```

### 步骤 3: 移除演示数据（可选）

如果您想完全依赖真实API数据，可以：

1. 删除 `getDemoWeatherData` 方法
2. 删除 `getDemoSearchResults` 方法
3. 移除相关的错误处理中的演示数据回退

### 步骤 4: 测试配置

1. 重新构建项目：
```bash
npm run build
```

2. 启动应用进行测试：
```bash
npm start
```

## 环境变量配置（推荐）

为了安全起见，建议使用环境变量存储API密钥：

### 步骤 1: 创建 .env 文件

在项目根目录创建 `.env` 文件：

```bash
REACT_APP_WEATHER_API_KEY=your_actual_api_key_here
REACT_APP_WEATHER_API_URL=https://api.weatherapi.com/v1
```

### 步骤 2: 修改服务文件

更新 `src/services/weatherService.ts`：

```typescript
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'demo';
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL || 'https://api.weatherapi.com/v1';
```

### 步骤 3: 添加到 .gitignore

确保 `.env` 文件在 `.gitignore` 中：

```
# api keys
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## API限制和优化建议

### 1. 请求频率控制

- 避免过于频繁的API调用
- 实现请求缓存机制
- 设置合理的刷新间隔（建议10-30分钟）

### 2. 错误处理

- 实现API配额超限处理
- 添加网络异常重试机制
- 提供离线数据缓存

### 3. 性能优化

```typescript
// 示例：添加请求缓存
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10分钟

async getCurrentWeather(location: string): Promise<WeatherData> {
  const cacheKey = `weather_${location}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await this.fetchWeatherData(location);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
}
```

## 故障排除

### 1. API密钥无效

**错误信息：** 401 Unauthorized
**解决方案：** 检查API密钥是否正确，是否已激活

### 2. API配额超限

**错误信息：** 429 Too Many Requests
**解决方案：** 
- 检查使用量
- 升级API计划
- 实现请求缓存

### 3. 跨域问题

**错误信息：** CORS error
**解决方案：**
- 大多数天气API支持CORS
- 如遇问题，考虑使用代理服务器

### 4. 网络超时

**解决方案：**
```typescript
const response = await axios.get(url, {
  timeout: 10000, // 10秒超时
  retry: 3 // 重试3次
});
```

## 支持

如果您在配置过程中遇到问题：

1. 检查API服务商的文档
2. 查看浏览器开发者工具的网络和控制台标签
3. 确认API密钥有效且有足够配额
4. 在项目Issue中提问

## 许可和使用条款

使用第三方API服务时，请务必：

- 阅读并遵守API服务条款
- 不要超过免费配额限制
- 保护好您的API密钥
- 考虑商用场景的授权要求