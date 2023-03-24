import { h } from 'preact';
import { useWeatherContext } from "../../WeatherDataContext.jsx";
import MetricComponent from '../MetricComponent.jsx';


import '../pageStyles.css'

function Surfing() {

    const WeatherCtx = useWeatherContext()


    const weather = WeatherCtx.weather.weatherData
    const unitsMapping = {
        temp: '°C',
        windGusts: 'm/s',
        waveHeight: 'm',
        windSpeed: 'm/s',
        windDirection: '°',
    }
    const requiredKeys = [
        'temp',
        'windGusts',
        'waveHeight',
        'windSpeed',
        'windDirection',
    ]

    if (!requiredKeys.every(key => key in weather)) {
        return <div>Weather data not loaded</div>
    }


    return (
        <div class="Page-Container">
            <h1>Surfing Page</h1>
            <p>Important Weather information for Surfing</p>
            {requiredKeys.map((key) => (
                <MetricComponent
                    key={key}
                    metric={key}
                    value={weather[key][0]}
                    unit={unitsMapping[key]}
                />
            ))}
        </div>
    );
}

export default Surfing;
