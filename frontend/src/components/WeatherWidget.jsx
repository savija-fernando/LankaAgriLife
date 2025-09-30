import React, { useEffect, useState } from "react";

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // ✅ from .env

  useEffect(() => {
    if (!apiKey) {
      setError("Missing API key");
      return;
    }

    // Get user/farm location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.cod === 200) {
                setWeather(data);
              } else {
                setError(data.message);
              }
            })
            .catch(() => setError("Failed to fetch weather"));
        },
        () => {
          setError("Location permission denied");
        }
      );
    } else {
      setError("Geolocation not supported");
    }
  }, [apiKey]);

  if (error) {
    return (
      <div className="bg-red-500 rounded-2xl p-6 text-white shadow-xl">
        <h3 className="text-lg font-semibold">Weather Today</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
        <h3 className="text-lg font-semibold">Weather Today</h3>
        <p className="text-sm text-cyan-100">Detecting location...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Location Row */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Weather Today</h3>
        <span className="text-sm text-cyan-100 font-medium">
           {weather.name}, {weather.sys.country}
        </span>
      </div>

      {/* Main Weather Info */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-cyan-100 text-sm capitalize">
            {weather.weather[0].description}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{weather.main.temp}°C</div>
          <div className="text-cyan-100 text-sm">
            {weather.weather[0].main} 🌤
          </div>
        </div>
      </div>

      {/* Extra Info */}
      <div className="mt-4 flex justify-between text-sm">
        <span>Humidity: {weather.main.humidity}%</span>
        <span>Wind: {weather.wind.speed} m/s</span>
      </div>
    </div>
  );
}
