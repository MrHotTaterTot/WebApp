import { useWeatherContext } from "../../WeatherDataContext.jsx"
import MetricComponent from "../MetricComponent.jsx"


import '../pageStyles.css'

function Swimming() {
    const WeatherCtx = useWeatherContext()

    const weather = WeatherCtx.weather.weatherData

    const requiredKeys = [
        'temp',
        'waveHeight',
        'precipitation'
    ]

    let unitsMapping = {
        temp: '°C',
        waveHeight: 'm',
        precipitation: 'mm',
    }
    return (
        <div class="Page-Container">
            <h1>Swimming Page</h1>
            <p>Important Weather information for Swimming</p>
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

export default Swimming;
