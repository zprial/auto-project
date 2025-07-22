// 格式化日期
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  };
  return date.toLocaleDateString('zh-CN', options);
};

// 获取今天是星期几
export const getWeekday = (dateString: string): string => {
  const date = new Date(dateString);
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weekdays[date.getDay()];
};

// 根据天气状况获取背景颜色
export const getWeatherGradient = (condition: string, isDay: boolean): string => {
  const dayGradients = {
    sunny: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
    cloudy: 'linear-gradient(135deg, #ddd6fe 0%, #a5b4fc 100%)',
    rainy: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    snowy: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
    default: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)'
  };

  const nightGradients = {
    sunny: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
    cloudy: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
    rainy: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
    snowy: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
    default: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)'
  };

  const gradients = isDay ? dayGradients : nightGradients;
  
  if (condition.includes('晴') || condition.includes('Sunny') || condition.includes('Clear')) {
    return gradients.sunny;
  } else if (condition.includes('云') || condition.includes('Cloud')) {
    return gradients.cloudy;
  } else if (condition.includes('雨') || condition.includes('Rain') || condition.includes('Drizzle')) {
    return gradients.rainy;
  } else if (condition.includes('雪') || condition.includes('Snow')) {
    return gradients.snowy;
  }
  
  return gradients.default;
};

// 获取用户位置
export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('此浏览器不支持地理位置功能'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(new Error('无法获取您的位置信息'));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10分钟缓存
      }
    );
  });
};

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// 获取天气图标URL
export const getWeatherIcon = (iconUrl: string): string => {
  // 如果图标URL以//开头，添加https:
  if (iconUrl.startsWith('//')) {
    return `https:${iconUrl}`;
  }
  return iconUrl;
};

// 风向转换
export const getWindDirection = (degree: number): string => {
  const directions = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
};

// 紫外线指数描述
export const getUVDescription = (uv: number): string => {
  if (uv <= 2) return '低';
  if (uv <= 5) return '中等';
  if (uv <= 7) return '高';
  if (uv <= 10) return '很高';
  return '极高';
};