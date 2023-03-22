import { useContext } from 'preact/hooks';
import WeatherDataContext from "../../WeatherDataContext";
import {WeatherCodeToIcon} from "../Icon/WeatherCodeToIcon";
import './HomePage.css'
import WeatherInfo from "./WeatherInfo.jsx";

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
            <WeatherInfo
                city={_city}
                temperature={_temp}
                humidity={_humidity}
                weatherCode={_weatherCode}
                windSpeed={_windSpeed}
                windDirection={_windDirection}
                waveHeight={_waveHeight}
            ></WeatherInfo>
        );

    }


    return (
        <div className="homepage-container">
            {renderWeather()}
        </div>
    );
}

export default HomePage;