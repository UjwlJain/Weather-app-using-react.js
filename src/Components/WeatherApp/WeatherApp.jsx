import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherApp.css';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import drizzleIcon from '../Assets/drizzle.png';
import humidityIcon from '../Assets/humidity.png';
import rainIcon from '../Assets/rain.png';
import searchIcon from '../Assets/search.png';
import snowIcon from '../Assets/snow.png';
import windIcon from '../Assets/wind.png';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState('');
  const [apiKey] = useState('329492ab4b9cd458b154b3dd1a3c483b');
  const [loading, setLoading] = useState(false);

  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  useEffect(() => {
    if (cityName) {
      fetchWeatherData();
    }
  }, [cityName]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl, {
        params: {
          q: cityName,
          appid: apiKey,
          units: 'metric',
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return clearIcon;
      case '01n':
        return clearIcon;
      case '02d':
        return clearIcon;
      case '02n':
        return clearIcon;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return cloudIcon;
      case '09d':
      case '09n':
        return drizzleIcon;
      case '10d':
      case '10n':
      case '11d':
      case '11n':
        return rainIcon;
      case '13d':
      case '13n':
        return snowIcon;
      case '50d':
      case '50n':
        return cloudIcon;
      default:
        return clearIcon;
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityname"
          placeholder="SEARCH"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <div className="search_icon" onClick={fetchWeatherData}>
          <img src={searchIcon} alt="" />
        </div>
        {/* Display weather information */}
        {weatherData.main && (
          <>
            <div className="weather-image">
              <img src={getWeatherIcon(weatherData.weather[0].icon)} alt="" />
            </div>
            <div className="weather-temp">{weatherData.main.temp}°C</div>
            <div className="weather-location">{weatherData.name}</div>
            <div className="data-container">
              <div className="element">
                <img src={humidityIcon} alt="" className="icon" />
                <div className="data">
                  <div className="humidity-percent">{weatherData.main.humidity}%</div>
                  <div className="text">Humidity</div>
                </div>
              </div>
              <div className="element">
                <img src={windIcon} alt="" className="icon" />
                <div className="data">
                  <div className="humidity-percent">{weatherData.wind.speed} km/h</div>
                  <div className="text">Wind Speed</div>
                </div>
              </div>
            </div>
          </>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default WeatherApp;
