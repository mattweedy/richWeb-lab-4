import React, { useEffect, useState } from "react";
import { Card } from 'semantic-ui-react';
import moment from 'moment'
import '../stlyes/WeatherCard.css';

const WeatherCard = () => {
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
        <div>
            <h2>Search City for Weather</h2>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', height: '30px', fontSize: '16px', backgroundColor: '#f0f0f0', color: '#333', border: '1px solid #ccc' }} />

            {(typeof weatherData.main != 'undefined') ? (
                <Card className="horizontal-card">
                    <Card.Content>
                        <Card.Header className="header">{weatherData.name}</Card.Header>
                        <br></br>
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