import { useState } from 'preact/hooks';
import WeatherDataContext, {useWeatherContext} from "../../WeatherDataContext.jsx";

import { WeatherCodeToIcon } from '../Icon/WeatherCodeToIcon.jsx';
import './CurrentWeatherInfo.css';
import {formatTemp} from "../../utils.js";


function CurrentWeatherInfo({ city, temperature, humidity, weatherCode, windSpeed, windDirection, waveHeight }) {

    const WeatherCtx = useWeatherContext()


    return (
        <div className="weather-info">
            <div className="flex-box">
                <div className="weather-icon weather-icon-drop-shadow">
                    <WeatherCodeToIcon weatherCode={weatherCode} />
                </div>

                <p className="city-name">{city}</p>
                <p className="temperature">{formatTemp(
                    temperature,
                    WeatherCtx.units.get
                )}</p>
            </div>
        </div>
    );
}

export default CurrentWeatherInfo;
