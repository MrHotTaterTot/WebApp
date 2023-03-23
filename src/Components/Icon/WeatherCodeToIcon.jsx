import { useState, useEffect } from "preact/hooks";
import './Icon.css'

const weatherCodeToIcon = {
    0: "Sun",
    1: "Partly-Cloudy",
    2: "Partly-Cloudy",
    3: "Cloudy-clear at times",
    45: "Fog",
    48: "Fog",
    51: "Drizzle",
    53: "Drizzle",
    55: "Drizzle",
    56: "Drizzle",
    57: "Drizzle",
    61: "Rain&Sun",
    63: "Rain",
    65: "Rain",
    66: "Rain",
    67: "Rain",
    71: "Snow",
    73: "Snow",
    75: "Snow",
    77: "Snow",
    80: "Scatterad-showers",
    81: "Scatterad-showers",
    82: "Scatterad-showers",
    85: "Snow",
    86: "Snow",
    95: "Scatterad-thunderstorm",
    96: "Sever-thunderstorm",
    99: "Sever-thunderstorm",
};

export function WeatherCodeToIcon(props) {
    const [weatherCode, setWeatherCode] = useState(null);

    useEffect(() => {
        setWeatherCode(props.weatherCode);
    }, [props.weatherCode]);

    const getWeatherIconName = (weathercode) => {
        const iconName = weatherCodeToIcon[weatherCode];
        return iconName ? `${iconName}.svg` : "Sun.svg";
    };

    return (
        <img src={`/Icons/${getWeatherIconName(weatherCode)}`} alt="Weather icon" />
    );
}
