import React, { useEffect, useState } from "react";
import { Card } from 'semantic-ui-react';
import moment from 'moment'
import '../styles/WeatherCard.css';
import '../styles/SearchBar.css';

const WeatherCard = ({ theme }) => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        if (city) {
            const fetchData = async () => {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8c0597e030b36e3a2aeb27ce07b090d0`);
                const data = await response.json();
                setWeatherData(data);
            };
            fetchData();
        }
    }, [city]);

    return (
        <div className={`weather-card ${theme}`}>
            <h2>Search City for Weather</h2>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="search..." />

            {(typeof weatherData.main != 'undefined') ? (
                <Card className="horizontal-card">
                    <Card.Content>
                        <h2>{weatherData.name}</h2>
                        <p>Day: {moment().format('dddd')}</p>
                        <p>Date: {moment().format('LL')}</p>
                        <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
                        {weatherData.main && <p>Feels like: {Math.round(weatherData.main.feels_like - 273.15)}°C</p>}
                        <p>Description: {weatherData.weather[0].description}</p>
                        <p>Humidity: {weatherData.main.humidity} %</p>
                    </Card.Content>
                </Card>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default WeatherCard;