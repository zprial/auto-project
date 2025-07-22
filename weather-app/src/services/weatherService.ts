import axios from 'axios';
import { WeatherData, SearchResult } from '../types/weather';

// 免费的天气API密钥，使用WeatherAPI.com的免费计划
const API_KEY = 'demo'; // 使用演示数据
const BASE_URL = 'https://api.weatherapi.com/v1';

class WeatherService {
  // 获取当前天气和7天预报
  async getCurrentWeather(location: string): Promise<WeatherData> {
    try {
      // 如果是演示模式，返回模拟数据
      if (API_KEY === 'demo') {
        return this.getDemoWeatherData(location);
      }
      
      const response = await axios.get(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`
      );
      
      return response.data;
    } catch (error) {
      console.error('获取天气数据失败:', error);
      // 如果API调用失败，返回演示数据
      return this.getDemoWeatherData(location);
    }
  }

  // 搜索城市
  async searchCities(query: string): Promise<SearchResult[]> {
    try {
      // 如果是演示模式，返回模拟数据
      if (API_KEY === 'demo') {
        return this.getDemoSearchResults(query);
      }
      
      const response = await axios.get(
        `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
      );
      
      return response.data;
    } catch (error) {
      console.error('搜索城市失败:', error);
      // 如果API调用失败，返回演示数据
      return this.getDemoSearchResults(query);
    }
  }

  // 根据经纬度获取天气
  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    const coords = `${lat},${lon}`;
    return this.getCurrentWeather(coords);
  }

  // 演示用的天气数据
  private getDemoWeatherData(location: string): WeatherData {
    const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '西安', '南京', '武汉', '重庆'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const locationName = location.includes(',') ? randomCity : location || randomCity;
    
    const temp = Math.floor(Math.random() * 35) + 5; // 5-40度
    const humidity = Math.floor(Math.random() * 60) + 30; // 30-90%
    const windSpeed = Math.floor(Math.random() * 20) + 5; // 5-25 km/h
    
    const conditions = [
      { text: '晴朗', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png', code: 1000 },
      { text: '多云', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png', code: 1003 },
      { text: '小雨', icon: '//cdn.weatherapi.com/weather/64x64/day/296.png', code: 1063 },
      { text: '阴天', icon: '//cdn.weatherapi.com/weather/64x64/day/119.png', code: 1006 }
    ];
    
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    // 生成7天预报数据
    const forecastDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const tempVar = Math.floor(Math.random() * 10) - 5; // -5到+5的温度变化
      const dayTemp = temp + tempVar;
      const nightTemp = dayTemp - Math.floor(Math.random() * 8) - 5;
      
      forecastDays.push({
        date: date.toISOString().split('T')[0],
        date_epoch: Math.floor(date.getTime() / 1000),
        day: {
          maxtemp_c: dayTemp,
          maxtemp_f: Math.floor(dayTemp * 9/5 + 32),
          mintemp_c: nightTemp,
          mintemp_f: Math.floor(nightTemp * 9/5 + 32),
          avgtemp_c: Math.floor((dayTemp + nightTemp) / 2),
          avgtemp_f: Math.floor(((dayTemp + nightTemp) / 2) * 9/5 + 32),
          maxwind_mph: windSpeed * 0.621371,
          maxwind_kph: windSpeed,
          totalprecip_mm: Math.random() * 10,
          totalprecip_in: Math.random() * 0.4,
          totalsnow_cm: 0,
          avgvis_km: 10,
          avgvis_miles: 6.2,
          avghumidity: humidity,
          daily_will_it_rain: Math.random() > 0.7 ? 1 : 0,
          daily_chance_of_rain: Math.floor(Math.random() * 100),
          daily_will_it_snow: 0,
          daily_chance_of_snow: 0,
          condition: randomCondition,
          uv: Math.floor(Math.random() * 10) + 1
        },
        astro: {
          sunrise: "06:30 AM",
          sunset: "06:45 PM",
          moonrise: "10:15 PM",
          moonset: "09:30 AM",
          moon_phase: "Waxing Gibbous",
          moon_illumination: "75"
        },
        hour: [] // 简化演示，不包含小时数据
      });
    }

    return {
      location: {
        name: locationName,
        region: '某省',
        country: '中国',
        lat: 39.9042,
        lon: 116.4074,
        tz_id: 'Asia/Shanghai',
        localtime_epoch: Math.floor(Date.now() / 1000),
        localtime: new Date().toLocaleString('zh-CN')
      },
      current: {
        last_updated_epoch: Math.floor(Date.now() / 1000),
        last_updated: new Date().toLocaleString('zh-CN'),
        temp_c: temp,
        temp_f: Math.floor(temp * 9/5 + 32),
        is_day: new Date().getHours() >= 6 && new Date().getHours() < 18 ? 1 : 0,
        condition: randomCondition,
        wind_mph: windSpeed * 0.621371,
        wind_kph: windSpeed,
        wind_degree: Math.floor(Math.random() * 360),
        wind_dir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
        pressure_mb: 1013 + Math.floor(Math.random() * 40) - 20,
        pressure_in: 29.92,
        precip_mm: Math.random() * 5,
        precip_in: Math.random() * 0.2,
        humidity: humidity,
        cloud: Math.floor(Math.random() * 100),
        feelslike_c: temp + Math.floor(Math.random() * 6) - 3,
        feelslike_f: Math.floor((temp + Math.floor(Math.random() * 6) - 3) * 9/5 + 32),
        vis_km: 10,
        vis_miles: 6.2,
        uv: Math.floor(Math.random() * 10) + 1,
        gust_mph: windSpeed * 1.5 * 0.621371,
        gust_kph: windSpeed * 1.5
      },
      forecast: {
        forecastday: forecastDays
      }
    };
  }

  // 演示用的搜索结果
  private getDemoSearchResults(query: string): SearchResult[] {
    const cities = [
      { id: 1, name: '北京', region: '北京市', country: '中国', lat: 39.9042, lon: 116.4074, url: 'beijing-china' },
      { id: 2, name: '上海', region: '上海市', country: '中国', lat: 31.2304, lon: 121.4737, url: 'shanghai-china' },
      { id: 3, name: '广州', region: '广东省', country: '中国', lat: 23.1291, lon: 113.2644, url: 'guangzhou-china' },
      { id: 4, name: '深圳', region: '广东省', country: '中国', lat: 22.5431, lon: 114.0579, url: 'shenzhen-china' },
      { id: 5, name: '杭州', region: '浙江省', country: '中国', lat: 30.2741, lon: 120.1551, url: 'hangzhou-china' },
      { id: 6, name: '成都', region: '四川省', country: '中国', lat: 30.5728, lon: 104.0668, url: 'chengdu-china' },
      { id: 7, name: '西安', region: '陕西省', country: '中国', lat: 34.3416, lon: 108.9398, url: 'xian-china' },
      { id: 8, name: '南京', region: '江苏省', country: '中国', lat: 32.0603, lon: 118.7969, url: 'nanjing-china' },
      { id: 9, name: '武汉', region: '湖北省', country: '中国', lat: 30.5928, lon: 114.3055, url: 'wuhan-china' },
      { id: 10, name: '重庆', region: '重庆市', country: '中国', lat: 29.5630, lon: 106.5516, url: 'chongqing-china' }
    ];

    if (!query) return cities.slice(0, 5);
    
    return cities.filter(city => 
      city.name.toLowerCase().includes(query.toLowerCase()) ||
      city.region.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }
}

export default new WeatherService();