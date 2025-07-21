import React from 'react';
import { ForecastDay } from '../types/weather';
import { getWeatherIcon, getWeekday } from '../utils';
import './WeatherForecast.css';

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  if (!forecast || forecast.length === 0) {
    return (
      <div className="forecast-container">
        <h2 className="forecast-title">7天预报</h2>
        <div className="forecast-error">暂无预报数据</div>
      </div>
    );
  }

  return (
    <div className="forecast-container">
      <h2 className="forecast-title">7天天气预报</h2>
      <div className="forecast-list">
        {forecast.map((day, index) => {
          const date = new Date(day.date);
          const isToday = index === 0;
          const dayName = isToday ? '今天' : getWeekday(day.date);
          const dayMonth = `${date.getMonth() + 1}/${date.getDate()}`;
          
          return (
            <div key={day.date} className={`forecast-item ${isToday ? 'today' : ''}`}>
              <div className="forecast-date">
                <div className="day-name">{dayName}</div>
                <div className="day-month">{dayMonth}</div>
              </div>
              
              <div className="forecast-icon">
                <img 
                  src={getWeatherIcon(day.day.condition.icon)} 
                  alt={day.day.condition.text}
                />
              </div>
              
              <div className="forecast-condition">
                {day.day.condition.text}
              </div>
              
              <div className="forecast-temps">
                <span className="temp-high">{Math.round(day.day.maxtemp_c)}°</span>
                <span className="temp-low">{Math.round(day.day.mintemp_c)}°</span>
              </div>
              
              <div className="forecast-details">
                <div className="detail">
                  <span className="detail-icon">💧</span>
                  <span>{day.day.daily_chance_of_rain}%</span>
                </div>
                <div className="detail">
                  <span className="detail-icon">💨</span>
                  <span>{Math.round(day.day.maxwind_kph)}km/h</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;