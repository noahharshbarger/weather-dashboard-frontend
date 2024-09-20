import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/weather/${city}`);
            console.log('Response data:', response.data); // Log the response data
            if (response.data && Object.keys(response.data).length > 0) {
                const weatherData = {
                    temp: response.data.temperature,
                    condition: response.data.description,
                    icon: response.data.icon // Fetch icon code from response
                };
                setWeather(weatherData);
                setError('');
            } else {
                setError('No weather data found');
            }
        } catch (err) {
            console.error('Error fetching weather data:', err);
            setError('Could not fetch weather data');
        }
    };

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    };

    return (
        <div className="container">
            <form onSubmit={fetchWeather}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <div className="error">{error}</div>}
            {weather && (
                <div className="weather-info">
                    <p>Temperature: {weather.temp ? ((weather.temp * 9/5) + 32).toFixed(2) + ' °F' : 'N/A'}</p>
                    <p>Condition: {weather.condition ? capitalizeWords(weather.condition) : 'N/A'}</p>
                    {weather.icon && (
                        <img 
                            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                            alt="Weather icon" 
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
