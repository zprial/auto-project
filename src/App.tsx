import React, { useState, useEffect } from 'react';
import { WeatherData } from './types/weather';
import weatherService from './services/weatherService';
import { getCurrentLocation, getWeatherGradient } from './utils';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import './App.css';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [backgroundGradient, setBackgroundGradient] = useState('linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)');

  // 页面加载时获取默认城市天气
  useEffect(() => {
    handleLocationSelect('北京');
  }, []);

  // 更新背景渐变
  useEffect(() => {
    if (weather) {
      const gradient = getWeatherGradient(
        weather.current.condition.text,
        weather.current.is_day === 1
      );
      setBackgroundGradient(gradient);
    }
  }, [weather]);

  const handleLocationSelect = async (location: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const weatherData = await weatherService.getCurrentWeather(location);
      setWeather(weatherData);
    } catch (err) {
      setError('获取天气信息失败，请稍后重试');
      console.error('Weather fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrentLocation = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const coords = await getCurrentLocation();
      const weatherData = await weatherService.getWeatherByCoords(coords.lat, coords.lon);
      setWeather(weatherData);
    } catch (err) {
      setError('无法获取当前位置，使用默认城市');
      console.error('Location error:', err);
      // 如果获取位置失败，使用默认城市
      handleLocationSelect('北京');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app" style={{ background: backgroundGradient }}>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">🌤️ 天气预报</h1>
          <p className="app-subtitle">实时天气信息与7天预报</p>
        </header>

        <main className="app-main">
          <SearchBar 
            onLocationSelect={handleLocationSelect}
            onCurrentLocation={handleCurrentLocation}
          />

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <CurrentWeather 
            weather={weather!}
            isLoading={isLoading}
          />

          {weather && weather.forecast && (
            <WeatherForecast forecast={weather.forecast.forecastday} />
          )}
        </main>

        <footer className="app-footer">
          <p>天气数据由演示服务提供 | © 2024 天气预报APP</p>
        </footer>
      </div>
      
      {/* 装饰性元素 */}
      <div className="background-decoration">
        <div className="cloud cloud-1">☁️</div>
        <div className="cloud cloud-2">🌤️</div>
        <div className="cloud cloud-3">☁️</div>
      </div>
    </div>
  );
}

export default App;