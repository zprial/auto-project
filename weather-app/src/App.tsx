import React, { useState, useEffect } from 'react';
import { WeatherData } from './types/weather';
import weatherService from './services/weatherService';
import { getCurrentLocation, getWeatherGradient } from './utils';
import './App.css';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [backgroundGradient, setBackgroundGradient] = useState('linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)');
  const [searchQuery, setSearchQuery] = useState('');

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
      handleLocationSelect('北京');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleLocationSelect(searchQuery.trim());
    }
  };

  if (isLoading) {
    return (
      <div className="app" style={{ background: backgroundGradient }}>
        <div className="app-container">
          <div className="loading">
            <div className="loading-spinner">⌛</div>
            <div>正在获取天气信息...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app" style={{ background: backgroundGradient }}>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">🌤️ 天气预报</h1>
          <p className="app-subtitle">实时天气信息与7天预报</p>
        </header>

        <main className="app-main">
          {/* 搜索栏 */}
          <div className="search-section">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索城市..."
                className="search-input"
              />
              <button type="submit" className="search-button">🔍</button>
              <button type="button" onClick={handleCurrentLocation} className="location-button">📍</button>
            </form>
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {weather && (
            <>
              {/* 当前天气 */}
              <div className="current-weather">
                <div className="weather-main">
                  <div className="location-info">
                    <h2>{weather.location.name}</h2>
                    <p>{weather.location.region}, {weather.location.country}</p>
                  </div>
                  
                  <div className="temperature-section">
                    <div className="temperature">
                      <span className="temp-value">{Math.round(weather.current.temp_c)}</span>
                      <span className="temp-unit">°C</span>
                    </div>
                    <div className="feels-like">
                      体感温度 {Math.round(weather.current.feelslike_c)}°C
                    </div>
                  </div>
                  
                  <div className="condition-section">
                    <img 
                      src={`https:${weather.current.condition.icon}`} 
                      alt={weather.current.condition.text}
                      className="weather-icon"
                    />
                    <div className="condition-text">{weather.current.condition.text}</div>
                  </div>
                </div>

                {/* 详细信息 */}
                <div className="weather-details">
                  <div className="detail-item">
                    <span>💨 风速</span>
                    <span>{Math.round(weather.current.wind_kph)} km/h</span>
                  </div>
                  <div className="detail-item">
                    <span>💧 湿度</span>
                    <span>{weather.current.humidity}%</span>
                  </div>
                  <div className="detail-item">
                    <span>👁️ 能见度</span>
                    <span>{Math.round(weather.current.vis_km)} km</span>
                  </div>
                  <div className="detail-item">
                    <span>☀️ 紫外线</span>
                    <span>{weather.current.uv}</span>
                  </div>
                </div>
              </div>

              {/* 7天预报 */}
              <div className="forecast-container">
                <h3>7天天气预报</h3>
                <div className="forecast-list">
                  {weather.forecast.forecastday.map((day, index) => (
                    <div key={day.date} className={`forecast-item ${index === 0 ? 'today' : ''}`}>
                      <div className="forecast-date">
                        {index === 0 ? '今天' : new Date(day.date).toLocaleDateString('zh-CN', { weekday: 'short' })}
                      </div>
                      <img 
                        src={`https:${day.day.condition.icon}`} 
                        alt={day.day.condition.text}
                        className="forecast-icon"
                      />
                      <div className="forecast-condition">
                        {day.day.condition.text}
                      </div>
                      <div className="forecast-temps">
                        <span className="temp-high">{Math.round(day.day.maxtemp_c)}°</span>
                        <span className="temp-low">{Math.round(day.day.mintemp_c)}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>

        <footer className="app-footer">
          <p>天气数据由演示服务提供 | © 2024 天气预报APP</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
