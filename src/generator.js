import React, { useState } from 'react';
import Button from './button';

const Generator = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const cities = [
    { name: 'Berlin', lat: 52.52, lon: 13.41 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Leeds', lat: 53.7965, lon: -1.5478 },
  ];

  const getRandomCity = () => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };

  const fetchWeather = async () => {
    setLoading(true);

    const randomCity = getRandomCity();
    const { name, lat, lon } = randomCity;

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

      const response = await fetch(url);
      const data = await response.json();

      setWeather({ city: name, ...data.current_weather });
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={fetchWeather} label="Generate Random Weather" />

      {loading && <p>Loading...</p>}
      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>Weather in {weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Wind Speed: {weather.windspeed} km/h</p>
          <p>Weather Code: {weather.weathercode}</p>
        </div>
      )}
    </div>
  );
};

export default Generator;
