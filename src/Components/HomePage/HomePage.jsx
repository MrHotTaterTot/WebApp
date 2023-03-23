import { useContext } from 'preact/hooks';
import WeatherDataContext from "../../WeatherDataContext";
import {WeatherCodeToIcon} from "../Icon/WeatherCodeToIcon";
import './HomePage.css'
import WeatherInfo from "./WeatherInfo.jsx";

export function HomePage() {
    const { weather, city } = useContext(WeatherDataContext);
    const renderWeather = () => {
        if (!weather || !city) return <p>Loading</p>
// if you want to use the weather, just import the weather data from the context
        // import { useContext } from 'preact/hooks';
        // import WeatherDataContext from "../../WeatherDataContext";
// and use it like this:
// const { weather, city } = useContext(WeatherDataContext);
        //weather is saved like that:
        // City is also saved there
        // weather: {
        //     temp: [0 .. 71]
        //     pressure: [0 .. 71]
        //     humidity: [0 .. 71]
        //     precipitationProbability: [0 .. 71]
        //     precipitation: [0 .. 71]
        //     weatherCode: [0 .. 71]
        //     visibility: [0 .. 71]
        //     windSpeed: [0 .. 71]
        //     windDirection: [0 .. 71]
        //     windGusts: [0 .. 71]
        //     waveHeight: [0 .. 71]
        // }
        // Each index is an hour, so weather.temp[0] is the current temperature

        return (
            <WeatherInfo
                city={city.cityName}
                temperature={weather.weatherData.temp[0]}
                humidity={weather.weatherData.humidity[0]}
                weatherCode={weather.weatherData.weatherCode[0]}
                windSpeed={weather.weatherData.windSpeed[0]}
                windDirection={weather.weatherData.windDirection[0]}
                waveHeight={weather.weatherData.waveHeight[0]}
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