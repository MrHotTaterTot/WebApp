import { useContext } from 'preact/hooks';
import WeatherDataContext from "../../WeatherDataContext";
import {WeatherCodeToIcon} from "../Icon/WeatherCodeToIcon";
import './HomePage.css'

export function HomePage() {
    const { weather, city } = useContext(WeatherDataContext);
    const renderWeather = () => {
        if (!weather || !city) return <p>Loading</p>

        const _data = weather.weatherData;
        const _city = city.cityName;
        const _temp = _data.hourly.temperature_2m[0];
        const _humidity = _data.hourly.relativehumidity_2m[0];
        const _apparentTemp = _data.hourly.apparent_temperature[0];
        const _precipitationProbability = _data.hourly.precipitation_probability[0];
        const _precipitation = _data.hourly.precipitation[0];
        const _weatherCode = _data.hourly.weathercode[0];
        const _visibility = _data.hourly.visibility[0];
        const _windSpeed = _data.hourly.windspeed_10m[0];
        const _windDirection = _data.hourly.winddirection_10m[0];
        const _windGusts = _data.hourly.windgusts_10m[0];
        const _waveHeight = _data.marine.hourly.wave_height[0];

        return (
            <div className="weather-container">
                <h1>{_city}</h1>
                <div className="weather-info">
                    <div className="weather-main">
                        <p>{_temp}°C</p>
                        <div className="icon-container">
                            <WeatherCodeToIcon weatherCode={_weatherCode} />
                        </div>
                    </div>
                    <div className="weather-details">
                        <div className="weather-details-column">
                            <p>Humidity: {_humidity}%</p>
                            <p>Feels like: {_apparentTemp}°C</p>
                            <p>Precipitation Probability: {_precipitationProbability}%</p>
                            <p>Precipitation: {_precipitation} mm</p>
                        </div>
                        <div className="weather-details-column">
                            <p>Visibility: {_visibility} m</p>
                            <p>Wind Speed: {_windSpeed} mph</p>
                            <p>Wind Direction: {_windDirection}°</p>
                            <p>Wind Gusts: {_windGusts} mph</p>
                            <p>Wave Height: {_waveHeight} m</p>
                        </div>
                    </div>
                </div>
            </div>
        );

    }


    return (
        <div className="homepage-container">
            {renderWeather()}
        </div>
    );
}

export default HomePage;