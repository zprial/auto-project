import React from 'react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon, getWindDirection, getUVDescription } from '../utils';
import './CurrentWeather.css';

interface CurrentWeatherProps {
  weather: WeatherData;
  isLoading: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <div className="current-weather loading">
        <div className="loading-spinner">⌛</div>
        <div>正在获取天气信息...</div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="current-weather error">
        <div>❌</div>
        <div>无法获取天气信息</div>
      </div>
    );
  }

  const { location, current } = weather;
  const windDir = getWindDirection(current.wind_degree);
  const uvDesc = getUVDescription(current.uv);
  const feelsLike = Math.round(current.feelslike_c);
  const lastUpdated = new Date(current.last_updated).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="current-weather">
      {/* 主要天气信息 */}
      <div className="weather-main">
        <div className="location-info">
          <h1 className="location-name">{location.name}</h1>
          <p className="location-region">{location.region}, {location.country}</p>
          <p className="last-updated">最后更新: {lastUpdated}</p>
        </div>
        
        <div className="temperature-section">
          <div className="temperature">
            <span className="temp-value">{Math.round(current.temp_c)}</span>
            <span className="temp-unit">°C</span>
          </div>
          <div className="feels-like">
            体感温度 {feelsLike}°C
          </div>
        </div>
        
        <div className="condition-section">
          <img 
            src={getWeatherIcon(current.condition.icon)} 
            alt={current.condition.text}
            className="weather-icon"
          />
          <div className="condition-text">{current.condition.text}</div>
        </div>
      </div>

      {/* 详细信息网格 */}
      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <div className="detail-label">风速</div>
            <div className="detail-value">{Math.round(current.wind_kph)} km/h</div>
            <div className="detail-extra">{windDir}风</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <div className="detail-label">湿度</div>
            <div className="detail-value">{current.humidity}%</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">👁️</div>
          <div className="detail-content">
            <div className="detail-label">能见度</div>
            <div className="detail-value">{Math.round(current.vis_km)} km</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <div className="detail-label">气压</div>
            <div className="detail-value">{Math.round(current.pressure_mb)} mb</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">☀️</div>
          <div className="detail-content">
            <div className="detail-label">紫外线</div>
            <div className="detail-value">{current.uv}</div>
            <div className="detail-extra">{uvDesc}</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">☁️</div>
          <div className="detail-content">
            <div className="detail-label">云量</div>
            <div className="detail-value">{current.cloud}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;