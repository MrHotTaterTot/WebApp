import { useWeatherContext } from "../../WeatherDataContext"


import '../pageStyles.css'
import MetricComponent from "../MetricComponent.jsx";

function Sailing() {
    const WeatherCtx = useWeatherContext()

    const weather = WeatherCtx.weather.weatherData


    const unitsMapping = {
        temp: '°C',
        windGusts: 'm/s',
        waveHeight: 'm',
        windSpeed: 'm/s',
        windDirection: '°',
        visibility: 'm',
        precipitation: 'mm',
        precipitationProbability: '%',
    }

    const requiredKeys = [
        'temp',
        'windGusts',
        'waveHeight',
        'windSpeed',
        'windDirection',
        'visibility',
        'precipitation',
        'precipitationProbability',
    ]

    if (!requiredKeys.every(key => key in weather)) {
        return <div>Weather data not loaded</div>
    }


    return (
        <div class="Page-Container">
            <h1>Sailing Page</h1>
            <p>Important Weather information for Sailing</p>
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

export default Sailing;
